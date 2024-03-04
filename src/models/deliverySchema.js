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

    rating: {
      type: Number,
      default: 0,
    },
    monthlyEarn: {
      type: Number,
      default: 0,
    },
    annualEarn: {
      type: Number,
      default: 0,
    },
    PendingCustomer: {
      type: Number,
      default: 0,
    },
    notification: {
      type: Number,
      default: 0,
    },
    isClicked: {
      type: Boolean,
      default: false,
    },
    customerId: {
      type: String,
      default: null,
    },
    bidAmount: {
      type: Number,
      default: null,
    },
    deliveryBid: {
      type: Number,
      default: null,
    },
    fixBid: {
      type: Number,
      default: null,
    },
    fixedCustomerBid: {
      type: Number,
      default: null,
    },
    fixedDeliveryBid: {
      type: Number,
      default: null,
    },
    DeliveryResponse: {
      type: String,
      default: null,
    },
    customerResponse: {
      type: String,
      default: null,
    },
    bothAcceptedBid: {
      type: Boolean,
      default: false,
    },
    bothAcceptedBidAmount: {
      type: Number,
      default: null,
    },
    completedBid: {
      type: Boolean,
      default: false,
    },
    isPayment: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: null,
    },
  },
  {
    collection: "delivery",
    versionKey: false,
  }
);

const customerSchema = mongoose.model("delivery", signUp);
export default customerSchema;
