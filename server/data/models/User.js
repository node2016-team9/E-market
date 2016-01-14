var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption'),
    Schema = mongoose.Schema;

module.exports.init = function () {
    var userSchema = new mongoose.Schema({
        username: {type: String, require: '{PATH} is required', unique: true},
        salt: String,
        hashPass: String,
        points: Number,
        postedProducts: [{type: Schema.Types.ObjectId, ref: 'Products'}],
        roles: [{type: String}],
        email: {type: String, require: true, unique: true},
        firstName: {type: String},
        lastName: {type: String},
        orders: [{type: Schema.Types.ObjectId, ref: 'Products'}],
        phoneNumber: String,
        avatar: String
    });

    userSchema.method({
        authenticate: function (password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'aleks123');
            User.create({
                username: 'aleks.stojcheva',
                email: 'aleks@yahoo.com',
                salt: salt,
                hashPass: hashedPwd,
                firstName: 'Aleksandra',
                lastName: 'Stojcheva',
                roles: ['admin']
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'ivo123');
            User.create({
                username: 'ivo.arnaudov',
                email: 'ivo@yahoo.com',
                salt: salt,
                hashPass: hashedPwd,
                firstName: 'Ivaylo',
                lastName: 'Arnaudov',
                roles: ['admin']
            });
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'vlado123');
            User.create(
                {
                    username: 'vladimir',
                    email: 'vlado@yahoo.com',
                    salt: salt,
                    hashPass: hashedPwd,
                    firstName: 'Vladimir',
                    lastName: 'Iliev',
                    roles: ['admin']

                }
            );
            console.log('Users added to database...');
        }
    });
}



