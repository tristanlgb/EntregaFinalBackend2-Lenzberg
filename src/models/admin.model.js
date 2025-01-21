import mongoose from "mongoose"

const adminSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    role:{
        type:String,
        default:"admin"
    },
    password:String,
    orders:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"orders"
        }
    ]

})

export default mongoose.model('admin',adminSchema)