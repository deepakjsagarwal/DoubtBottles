const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    description:{
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    course: {
        type: Schema.Types.ObjectId,
        ref:'Course'
    },
    isResolved:{
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum:["message","enroll"]
    }

})


module.exports = mongoose.model('Notification',notificationSchema)