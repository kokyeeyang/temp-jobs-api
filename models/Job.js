const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'Please provide company name'],
        maxlength: 50
    },
    position:{
        type:String,
        required:[true, 'Please provide position'],
        maxlength: 100
    },
    status:{
        type:String,
        enum:['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        //object id is the id for each data row
        type:mongoose.Types.ObjectId,
        // refers to User model
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Job', jobSchema)