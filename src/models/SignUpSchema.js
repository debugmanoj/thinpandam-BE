import mongoose from "./makeConnection.js";

const signUp = new mongoose.Schema(
  {
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    userName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    currentFood: {
      type: Array,
      default: null,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: null,
    },
    isPayment: {
      type: Boolean,
      default: false,
    },
    CustomerTotalOrderedFood: {
      type: Array,
      default: null,
    },
  },
  {
    collection: "customer",
    versionKey: false,
  }
);

const customerSchema = mongoose.model("customer", signUp);
export default customerSchema;
