import Razorpay from 'razorpay';
import customerSchema from "../models/SignUpSchema.js"
import deliverySchema from "../models/deliverySchema.js";
import crypto from 'crypto';
import dotenv from 'dotenv'
dotenv.config()
const razorpay = new Razorpay({
	key_id: process.env.key_id,
	   key_secret: process.env.key_secret
	})

const secret_key = process.env.key_secret


const order=async (req, res) => {
    // initializing razorpay
    const razorpay = new Razorpay({
        key_id: req.body.keyId,
        key_secret: req.body.keySecret,
    });

    // setting up options for razorpay order.
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "any unique id for every order",
        payment_capture: 1
    };
    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
       res.status(400).send('Not able to create order. Please try again!');
    }
}

const paymentCapture= async (req, res) => {
    try {
        // Validate the request
        // Perform data validation or other checks if needed
        
        
        const { orderDetails } = req.body;
        const {deliveryCharge}=req.body
        console.log(deliveryCharge);
        const order_id = orderDetails.orderId;
        const razorpay_payment_id = orderDetails.paymentId.current;
        const razorpay_signature = orderDetails.signature;
        const {id}=req.body

        

        const generated_signature = crypto.createHmac('sha256', secret_key)
            .update(order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            console.log('Request is legit');

            let customerValueUpdate=await customerSchema.findOne({_id:id})
            if(customerValueUpdate){
                customerValueUpdate.currentFood.map((val,i)=>{
                    customerValueUpdate.CustomerTotalOrderedFood.push(val)

                })
                let sample=await deliverySchema.findOne({customerId:id})
                if(sample){
                    sample.isPayment=true
                    sample.monthlyEarn+=deliveryCharge;
                    await sample.save()
                }
                
                customerValueUpdate.currentFood=[]
                customerValueUpdate.totalPrice=null
                await customerValueUpdate.save()
                // let delivery=await deliverySchema.findOne({})

            }
            // Payment is successful, you can proceed with further actions like storing information in a database

            return res.json({ status: 'ok' });
        } else {
            console.log('Invalid signature');
             res.status(400).send('Invalid signature');
        }
    } catch (error) {
        console.error('Error handling payment:', error);
        return res.status(500).send('Internal Server Error');
    }
};

export default {order,paymentCapture}