const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: false
    },
    country_extension: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: true
    },
    public_key: {
        type: Array,
        required: true
    },
    private_key: {
        type: Array,
        required: true
    },
    wallet_chains: {
        type: Array,
        required: true
    },
    collection_name: {
        type: Array,
        required: false
    },
    collection_chains: {
        type: Array,
        required: false
    },
    collection_assets: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)