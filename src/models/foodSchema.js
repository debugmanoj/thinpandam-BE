import mongoose from "./makeConnection.js";

const food=new mongoose.Schema
(
    {
        id:{
            type:Number
        },

        foodTitle:{
        type:String
       },
       price:{
        type:Number,
        default:0
       },
       img:{
        type:String
       },
       qty:{
        type:Number,
        default:0
       },
       isClicked:{
        type:Boolean,
        default:false
       },
       isCart:{
        type:Boolean,
        default:false
       },
       alreadyInCart:{
        type:Number,
        default:0
       },
       Cart:{
        type:String,
        default:"Add to Cart"
       },
       totalCart:{
        type:Number,
        default:0

       },
       orgPrice:{
        type:Number
       }
    },
    {
        collection: "food",
        versionKey: false,
    }

)
const foodSchema = mongoose.model("food", food);
export default foodSchema;