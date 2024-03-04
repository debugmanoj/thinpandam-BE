import customerSchema from "../models/SignUpSchema.js";
import deliverySchema from "../models/deliverySchema.js";
import auth from "../helper/auth.js";

const createUser = async (req, res) => {
  let { fname, lname, userName, phone, address } = req.body;

  try {
    try {
      const user = await customerSchema.findOne({ phone: phone });
      if (!user) {
        // req.body.password = await hasher.createHash(req.body.password)

        let newUser = await customerSchema.create(req.body);
        // let id=newUser._id.valueOf()
        // let sendEmail=await emailService.sendActivateEmail(id,newUser.email)
        res.status(200).send({
          message: "User Added Successfully",
          checkMail: "Activate Link sent to your Email",
        });
      } else {
        res.status(400).send({
          message: `User with ${phone} already exists`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const checkUser = async (req, res) => {
  let { phone } = req.body;

  phone = parseInt(phone);

  try {
    const user = await customerSchema.findOne({ phone: phone });

    if (user) {
      const token = await auth.createToken({
        name: user.fname,
        email: user.lname,
        role: user.role,
      });
      res.status(200).send({
        message: "found",
        phone: user._id,
        token,
        role: "user",
      });
    } else {
      res.status(400).send({
        message: `User with ${phone} not exists`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const updateFood = async (req, res) => {
  let { id } = req.params;

  try {
    let customerFood = await customerSchema.findOne({ _id: id });
    if (customerFood) {
      // console.log(customerFood.currentFood.length);

      req.body.addFoodToCustomer.map((val, i) => {
        customerFood.currentFood.push(val);
      });
      customerFood.totalPrice = req.body.totalPrice;
      await customerFood.save();

      res.status(200).send({
        message: "true",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
};

const sendOldCurrentFoodList = async (req, res) => {
  let { id } = req.params;
  try {
    let foodList = await customerSchema.findOne({ _id: id });
    if (foodList) {
      res.status(200).send({
        currentFood: foodList.currentFood,
      });
    }
  } catch (error) {}
};

const getFood = async (req, res) => {
  let { id } = req.params;

  try {
    let foodList = await customerSchema.findOne({ _id: id });

    if (foodList) {
      let acceptedBid = await deliverySchema.findOne({ customerId: id });
      if (acceptedBid) {
        res.status(200).send({
          currentFood: foodList.currentFood,
          fname: foodList.fname,
          lname: foodList.lname,
          totalPrice: foodList.totalPrice,
          bothAcceptedBidAmount: acceptedBid.bothAcceptedBidAmount,
        });
      } else {
        res.status(200).send({
          currentFood: foodList.currentFood,
          fname: foodList.fname,
          lname: foodList.lname,
          totalPrice: foodList.totalPrice,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

const TotalOrderedFood = async (req, res) => {
  let { id } = req.params;

  try {
    let fetchFoods = await customerSchema.findOne({ _id: id });
    if (fetchFoods) {
      res.status(200).send({
        CustomerTotalOrderedFood: fetchFoods.CustomerTotalOrderedFood,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const editProfile = async (req, res) => {
  let { id } = req.params;
  try {
    let result = await customerSchema.findOne({ _id: id });
    if (result) {
      res.status(200).send({
        fname: result.fname,
        lname: result.lname,
        userName: result.userName,
        address: result.address,
      });
    }
  } catch (error) {}
};

const updateProfile = async (req, res) => {
  console.log(req.body);

  let { id } = req.params;
  try {
    let result = await customerSchema.findOne({ _id: id });
    if (result) {
      result.fname = values.fname;
      result.lname = values.lname;
      result.userName = values.userName;
      await result.save();
    }
    res.status(200).send({
      sucess: "Successful",
    });
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
};
export default {
  createUser,
  checkUser,
  updateFood,
  getFood,
  TotalOrderedFood,
  sendOldCurrentFoodList,
  editProfile,
  updateProfile,
};
