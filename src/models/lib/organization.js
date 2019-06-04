const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const OrganizationSchema = new Schema({
    name: String,
    registartionCode: String,
    certificateCode: String,
    status: String,
    legalizeDate: Date,
    members: [String]
})

OrganizationSchema.plugin(autoIncrement, {
    inc_field: 'organization_id'
});

OrganizationSchema.plugin(mongoosePaginate);

module.exports.Organization = mongoose.model('Organization', OrganizationSchema);