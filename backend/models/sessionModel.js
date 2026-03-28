import mogoose from "mongoose"

const sessionSchema = new mogoose.Schema({
    userId : {
        type : mogoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})

export const Session = mogoose.model("Session",sessionSchema);

