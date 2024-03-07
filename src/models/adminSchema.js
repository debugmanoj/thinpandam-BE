import mongoose from "./makeConnection.js";

const adminsignUp=new mongoose.Schema(
    {
        email:{
            type:String
        },
        password:{
            type:String
        },
        role:{
            type:String
        }
    },
    {
        collection: "admin",
        versionKey: false,
      }

)

const adminSchema = mongoose.model("admin", adminsignUp);
export default adminSchema;
