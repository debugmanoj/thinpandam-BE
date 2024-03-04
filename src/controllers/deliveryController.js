import deliverySchema from "../models/deliverySchema.js";
import customerSchema from "../models/SignUpSchema.js";
import deliveryauth from "../helper/deliveryauth.js";
const createDeliveryUser = async (req, res) => {
  let { fname, lname, userName, phone, address } = req.body;

  try {
    try {
      const user = await deliverySchema.findOne({ phone: phone });
      if (!user) {
        // req.body.password = await hasher.createHash(req.body.password)

        let newUser = await deliverySchema.create(req.body);
        // let id=newUser._id.valueOf()
        // let sendEmail=await emailService.sendActivateEmail(id,newUser.email)
        res.status(200).send({
          message: "User Added Successfully",
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

const checkDeliveryUser = async (req, res) => {
  let { phone } = req.body;

  phone = parseInt(phone);

  try {
    const user = await deliverySchema.findOne({ phone: phone });

    if (user) {
      const token = await deliveryauth.createToken({
        name: user.fname,
        email: user.lname,
        role: "delivery",
      });
      res.status(200).send({
        message: "found",
        phone: user._id,
        token,
        role: "delivery",
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
const getDeliveryUser = async (req, res) => {
  try {
    let result = await deliverySchema.find({});
    let filteredResult = result.filter((val) => {
      if (!val.isClicked) {
        return val;
      }
    });

    res.status(200).send({
      result: filteredResult,
    });
  } catch (error) {}
};
const updateDeliveryUser = async (req, res) => {
  let { _id } = req.body.person;
  let customerId = req.body.customerId;
  try {
    let result = await deliverySchema.findOne({ _id: _id });
    if (result) {
      result.isClicked = !result.isClicked;
      result.customerId = customerId;

      await result.save();
      res.status(200).send({
        message: `User switched to ${result.isClicked}`,
      });
    }
  } catch (error) {}
};
const getAllValidCustomerDetails = async (req, res) => {
  try {
    let result = await deliverySchema.findOne({ _id: req.params.id });
    if (result) {
      if (!result.bothAcceptedBid) {
        let customerBind = await customerSchema.find({
          _id: result.customerId,
        });
        if (customerBind) {
          res.status(200).send({
            list: customerBind,
          });
        }
      } else {
      }
    }
  } catch (error) {}
};
const handleBid = async (req, res) => {
  let { CustomerBid } = req.body;
  try {
    let customerResult = await deliverySchema.findOne({
      customerId: req.params.id,
    });
    if (customerResult) {
      customerResult.bidAmount = CustomerBid;
      await customerResult.save();
      res.status(200).send({
        message: "Send",
        customerAmount: customerResult.bidAmount,
        deliveryBid: customerResult.deliveryBid,
      });
    } else {
      res.status(400).send({
        message: "Not foumd",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
};
const getBid = async (req, res) => {
  let { id } = req.params;
  try {
    let result = await deliverySchema.findOne({ _id: id });
    if (result) {
      // result.customerResponse=null
      // await result.save()
      res.status(200).send({
        bidamount: result.bidAmount,
        fixedCustomerBid: result.fixedCustomerBid,
        fixedDeliveryBid: result.fixedDeliveryBid,
        customerResponse: result.customerResponse,
        bothAcceptedBid: result.bothAcceptedBid,
      });
    }
  } catch (error) {}
};
const updateBid = async (req, res) => {
  let { id } = req.params;
  let { deliveryBid } = req.body;
  try {
    let result = await deliverySchema.findOne({ _id: id });
    if (result) {
      result.deliveryBid = deliveryBid;
      await result.save();
      res.status(200).send({
        message: "Updated",
        customerAmount: result.bidAmount,
        deliveryBid: result.deliveryBid,
      });
    }
  } catch (error) {}
};
const getDeliveryBid = async (req, res) => {
  try {
    let delveryBid = await deliverySchema.findOne({
      customerId: req.params.id,
    });
    if (delveryBid) {
      // delveryBid.DeliveryResponse=null
      await delveryBid.save();
      res.status(200).send({
        deliveryBid: delveryBid.deliveryBid,
        fixedDeliveryBid: delveryBid.fixedDeliveryBid,
        fixedCustomerBid: delveryBid.fixedCustomerBid,
        DeliveryResponse: delveryBid.DeliveryResponse,
        bothAcceptedBid: delveryBid.bothAcceptedBid,
      });
    }
  } catch (error) {}
};
const handleFixBid = async (req, res) => {
  let { id } = req.params;
  //customerBid na delivery kaaran fix button press panni irukan

  //delivery amound naa customer karan fix button press panni irukan
  let { deliveryAmount = null, customerBid = null } = req.body;

  if (deliveryAmount !== null) {
    try {
      let result = await deliverySchema.findOne({
        customerId: id,
      });
      if (result) {
        result.fixedDeliveryBid = deliveryAmount;

        await result.save();
        res.status(200).send({
          message: "I am deliveryAMount",
          fixedCustomerBid: result.fixedCustomerBid,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  } else if (customerBid !== null) {
    try {
      let result = await deliverySchema.findOne({
        _id: id,
      });
      if (result) {
        result.fixedCustomerBid = customerBid;

        await result.save();
        res.status(200).send({
          message: "I am customerBid",
          fixedDeliveryBid: result.fixedDeliveryBid,
        });
      }
    } catch (error) {}
  } else {
    res.status(500).send({
      message: "No values found",
    });
  }

  // try {
  //   let result=await deliverySchema.findOne({
  //     customerId:id})
  //   if(result){
  //     console.log(result);
  //     result.fixBid=deliveryAmount

  //   }
  // } catch (error) {

  // }
};
const ResetBid = async (req, res) => {
  let { id } = req.params;
  let { fixedDeliveryBid = 1, fixedCustomerBid = 1 } = req.body;
  // console.log(fixedDeliveryBid)
  if (fixedDeliveryBid == 0) {
    try {
      let result = await deliverySchema.findOne({ _id: id });

      if (result) {
        result.fixedDeliveryBid = 0;
        result.DeliveryResponse = "delivery rejected bid";
        await result.save();
        res.status(200).send({
          message: "delivery rejected bid",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  } else if (fixedCustomerBid == 0) {
    try {
      let result = await deliverySchema.findOne({ customerId: id });
      if (result) {
        result.fixedCustomerBid = 0;
        result.customerResponse = "Customer rejected bid";

        await result.save();
        res.status(200).send({
          message: "Customer rejected the bid",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server error",
      });
    }
  }

  // try {
  //   let result=await deliverySchema.findOne({_id:id})

  //   if(result){
  //     result.fixedDeliveryBid=0;
  //     await result.save()
  //     console.log(result.fixedDeliveryBid)
  //     res.status(200).send({
  //       message:"done"
  //     })
  //   }
  // } catch (error) {
  //   res.status(500).send({
  //     message:error
  //   })
  // }
};
const acceptBid = async (req, res) => {
  let { id } = req.params;
  let { deliveryAcceptResponse = "", customerAcceptResponse = "" } = req.body;

  if (deliveryAcceptResponse != null) {
    try {
      let result = await deliverySchema.findOne({ _id: id });
      if (result) {
        result.bothAcceptedBidAmount = result.fixedDeliveryBid;
        result.DeliveryResponse = deliveryAcceptResponse;
        result.bothAcceptedBid = true;
        await result.save();
        res.status(200).send({
          message: "updated delivery response",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  }

  if (customerAcceptResponse != null) {
    try {
      let result = await deliverySchema.findOne({ customerId: id });

      if (result) {
        result.bothAcceptedBidAmount = result.fixedCustomerBid;
        result.customerResponse = customerAcceptResponse;
        result.bothAcceptedBid = true;
        await result.save();
        res.status(200).send({
          message: "UPdated the customer Response",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  } else {
    console.log("I am worked on else block");
  }
};
const resetAllFields = async (req, res) => {
  let { id } = req.params;
  try {
    let result = await deliverySchema.findOne({ _id: id });
    if (result) {
      (result.isClicked = false),
        // result.customerId="",
        (result.deliveryBid = ""),
        (result.bidAmount = ""),
        (result.fixBid = ""),
        (result.fixedDeliveryBid = "");
      result.DeliveryResponse = "";
      result.customerResponse = "";
      result.PendingCustomer = result.PendingCustomer + 1;

      await result.save();
      res.status(200).send({
        message: "Done",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "internal server error",
    });
  }
};

const pendingCustomer = async (req, res) => {
  let { id } = req.params;
  try {
    let result = await deliverySchema.findOne({ _id: id });
    if (result) {
      if (result.bothAcceptedBid) {
        let customerResult = await customerSchema.findOne({
          _id: result.customerId,
        });
        if (customerResult) {
          res.status(200).send({
            fname: customerResult.fname,
            lname: customerResult.lname,
            address: customerResult.address,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
};

const clearCustomerId = async (req, res) => {
  let { id } = req.params;
  try {
    let result = await deliverySchema.findOne({ _id: id });
    if (result) {
      if (result.isPayment) {
        result.customerId = null;
        result.fixedCustomerBid = null;
        result.isClicked = false;
        if (!result.PendingCustomer == 0) {
          result.PendingCustomer = result.PendingCustomer - 1;
        }

        (result.bothAcceptedBid = null), (result.isPayment = false);
        result.bothAcceptedBidAmount = 0;
        await result.save();
        res.status(200).send({
          message: "I am done",
        });
      } else {
        res.status(400).send({
          message: "Wait for payment",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server Error",
    });
  }
};

const deliveryDetails = async (req, res) => {
  let { id } = req.params;
  try {
    let result = await deliverySchema.findOne({ _id: id });
    if (result) {
      res.status(200).send({
        PendingCustomer: result.PendingCustomer,
        monthlyEarn: result.monthlyEarn,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
};
export default {
  createDeliveryUser,
  checkDeliveryUser,
  getDeliveryUser,
  updateDeliveryUser,
  getAllValidCustomerDetails,
  handleBid,
  getBid,
  updateBid,
  getDeliveryBid,
  handleFixBid,
  ResetBid,
  acceptBid,
  resetAllFields,
  pendingCustomer,
  clearCustomerId,
  deliveryDetails,
};
