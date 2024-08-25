const express = require('express');
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const PvtJobRoutes = require("./routes/privateJob");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

//For payment
const {OrderModel} = require("./models/Order.models")
const morgan = require("morgan")
const crypto = require("crypto");

dotenv.config();
const PORT = process.env.PORT || 5000;
cloudinaryConnect();
database.connect();
app.use(cookieParser());
app.use(express.json());

//For payment
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}))


app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
)


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1",PvtJobRoutes);


app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});


// Payment Razorpay
const Razorpay = require("razorpay")
const razorpay = new Razorpay({
    key_id:'rzp_test_4vH2Yp0UzIbsOh',
    key_secret:'RGl3byRXYcSfSUn8luGPmZwa',
});


app.post("/payment/checkout",async(req,res) => {
    const {name,amount} = req.body

    const order = await razorpay.orders.create({
        amount: Number(amount*100),
        currency:"INR"
    })

    await OrderModel.create({
        order_id:order.id,
        name:name,
        amount:amount
    })

    console.log({order});
    res.json({order});
})

app.post("/payment/payment-verification",async(req,res) => {
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body

    const body_data = razorpay_order_id+" "+razorpay_payment_id

    const expect = crypto.createHmac('sha256','RGl3byRXYcSfSUn8luGPmZwa',)
    .update(body_data).digest("hex")
   
    const isValid = expect === razorpay_signature;
    if(isValid){
        
        await OrderModel.findOne({order_id:razorpay_order_id},{
            $set:{
                razorpay_payment_id,razorpay_order_id,razorpay_signature
            }
        })
        res.redirect(`http://localhost:3000/success?payment_id=${razorpay_payment_id}`)
        return 
    }
    else{
        // res.redirect("http://localhost:3000/failure")
        res.redirect(`http://localhost:3000/success?payment_id=${razorpay_payment_id}`)
        return 
    }
   
})

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`)
})


















