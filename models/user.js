import { Schema,models, model } from "mongoose"

const UserSchema = new Schema({
    email:{
        type:String,
        unique:[true,'Email already exists!'],
        required:[true]
    },
    username:{
        type:String,
        required:[true]
    },
    image:{
        type:String
    }
})

const User = models.User || model("User",UserSchema)

export default User