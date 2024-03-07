import adminSchema from "../models/adminSchema.js"
import adminAuth from "../helper/adminAuth.js"
import foodSchema from "../models/foodSchema.js"

const checkAdmin = async (req, res) => {
    let { email,password } = req.body;
  
    try {
      const user = await adminSchema.findOne({ email: email });
  
      if (user) {
        const token = await adminAuth.createToken({
          name: user.fname,
          email: user.lname,
          role: user.role,
        });
        res.status(200).send({
          message: "found",
          id: user._id,
          token,
          role: "admin",
        });
      } else {
        res.status(400).send({
          message: `User with ${email} not exists`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  };
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
const addFood=async(req,res)=>{
  
  let {foodTitle,image,price}=req.body.values
  try {
    const lastDocument = await foodSchema.findOne().sort({ id: -1 }).limit(1);
    
    const lastIdValue = lastDocument.id;
    if(lastIdValue){
      let foodDetails={
        id:lastIdValue+1,
        foodTitle:foodTitle,
        img:image,
        orgPrice:price

      }
      try {
        const lastDocument = await foodSchema.create(foodDetails);  
        res.status(201).send({
          message:"Added the food"
        });

      } catch (error) {
        res.status(400).send({
          error:"Error on inserting Data"
        })
      }
      
    }
  } catch (error) {
    
  }
}
  
export default {checkAdmin,getAllfoods,addFood}