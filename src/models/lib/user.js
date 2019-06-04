const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    username: String,
    password: String,
    role: String
});

UserSchema.plugin(autoIncrement, {
    inc_field: 'user_id'
});
UserSchema.plugin(mongoosePaginate);

module.exports.User = mongoose.model('User', UserSchema);