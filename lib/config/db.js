var levelup = require('levelup'),
    db = levelup(__dirname + '/../../db', { valueEncoding: 'json' });

module.exports = function (globals) {

    'use strict';

    db.get('user:admin', function (err, value) {

        if (err) {

            db.put('user:admin', globals.admin, function (err) {

                if (err) {
                    console.log('Could not initialise database!');
                    console.log(err);

                    return;
                }

                if (env === 'development') {

                    db.get('user:admin', function (err, value) {

                        if (err) {

                            console.log('An error occurred!', err);
                            console.log(err);

                            return;
                        }

                        console.log('admin = ');
                        console.log(value);
                    });
                }
            });
        }
        else
            console.log('Database initialised.');
    });

    return {

        close: function (callback) {
            return db.close(callback);
        },

        get: function (key, callback) {
            db.get(key, callback);
        },

        users: {
            get: function (username, callback) {

                var user = {};

                return db.get('user:' + username, callback);
            },

            set: function (user, callback) {

                if ((user === undefined || user.name === undefined || user.password === undefined) && user.name !== 'admin')
                    return console.log("User must at least have the attributes 'name' and 'password.");

                db.put('user:' + user.name, user);
            },

            del: function (username, callback) {

                return db.del('user:' + username, callback);
            }
        }
    };
};
