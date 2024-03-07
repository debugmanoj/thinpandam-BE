import foodSchema from "../models/foodSchema.js"
const getAllfoods=async (req,res)=>{
    try {
        let foods=await foodSchema.find({})

        if(foods){
            // const jsonFoods = JSON.stringify(foods);
            res.status(200).send(
                foods      
            )
        }
        else{
            console.log("hello Zero document");
        }
    } catch (error) {
        
    }
}
export default {getAllfoods}