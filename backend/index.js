const port= 4000;
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path =require("path");
const cors =require('cors');
const { error } = require('console');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const stripe =require('stripe')('sk_test_51Ot40ASGEKNzWeY4TZTUu5qmYxvdbreHaFkpit4AAVmfRydskQQSsv0vg0otLXgGfkB2c6FRnKnWjVpxccubYbbE009fWKjg4Y');

const router = express.Router();
app.use(express.json());
app.use(cors());



// DataBase connection with MongoDB
mongoose.connect("mongodb+srv://akriti000:clayjensen@cluster0.cn6uufh.mongodb.net/e-commerce");
// , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

//API Creation

app.get("/", (req, res) =>{
    res.send("Express app is running");
});

//Image storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb)=>{
        // console.log(file);
       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage : storage})

//Creating API for Image Upload
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    });
});
//adding navbar items
const NavItemSchema = new mongoose.Schema({
    text: String,
    link: String
  });
  
  const NavItem = mongoose.model('NavItem', NavItemSchema);

// Schema for Creating Products


const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type: String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    // quantity:{
    //     type:Number,
    //     required:true,
    // },
    date:{
        type:Date,
        default: Date.now(),
    },
    available:{
        type:Boolean,
        default: true,
    },


})

app.get('/navitems', async (req, res) => {
    try {
      const navItems = await NavItem.find({});
      res.json(navItems);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

// Endpoint to add a navbar item
app.post('/addnavitem', async (req, res) => {
    try {
      const { text, link } = req.body;
      const newItem = new NavItem({ text, link });
      await newItem.save();
      res.json(newItem);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  
  // Endpoint to delete a navbar item
  app.delete('/deletenavitem/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await NavItem.findByIdAndDelete(id);
      res.send('Navbar item deleted');
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
// app.post('/addnav',async (req,res)=>{
//     let addtitle =await NavItem.find({});
   
//     await addtitle.save();
//     res.json(addtitle);

// })
app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array= products.slice(-1);
        let last_product =last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product= new Product({
        id:id,
        name: req.body.name, 
        image: req.body.image,   //from multer middleware
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,

    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API For deleting Products
app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API for getting all products
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("ALL PRODUCTS Fetched");
    res.send(products);

})
//Creating  Schema for User Model
const Users =mongoose.model('Users',{
    name:{
        type : String ,
    },
    email:{
        type :String ,
        unique: true ,
    } , 
    password:{
        type :String ,
    },
    cartData:{
        type:Object,
    },
    purchaseHistory:{
        type:Object,
    },
    paymentData: {
        type:Object,
    },
    date:{
        type: Date,
        default:Date.now,
    }

})

//creating purchase schema
const Purchase = mongoose.model('Purchase',{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who placed the order
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

//Creating endpoint for registering the users
app.post('/signup', async (req,res) => {
    let check =await Users.findOne({email : req.body.email}) ;
    if(check){
        return res.status(400).json({success:false,errors:"Existing e-mail"})
    }
    let cart ={};
    let paymentData={};
  
    for (let i =0; i<300; i++){
        cart[i]=0;
    }
    let purchaseHistory={};
    for(let j=0; j<300;j++) {
        purchaseHistory[`item${j}`]=0;
    };  //Initializing
   
    const user=new Users ({
        name : req.body.name , 
        email : req.body.email ,
        password : req.body.password,
        cartData: cart,
        purchaseHistory: purchaseHistory,
        paymentData: paymentData
    })
    await user.save();

    const data ={
        user:{
            id :user.id,
        }
    }

    const token = jwt.sign(data,'serect_ecom');
    res.json({success:true,token})

})

//Creating endpoint for user login
app.post('/login', async (req,res)=>{
    let user= await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data ={
                user:{
                    id:user.id
                }
            }
            const token =jwt.sign(data,'serect_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Invalid Wrong E-mail ID"});
    }
})

//Creating endpoint for new collections data
app.get('/newcollection',async(req,res)=>{
    let products=await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection);
})

//Creating endpoint for forget password
// app.post('/forgetpassword',async(req,res)=>{
//     const { email } = req.body;

//     // Generate a unique token (you can use a library like crypto)
//     const token = 'auth-token';
  
//     // Save the token, email, and timestamp in MongoDB
//     // (create a new document in your 'passwordResetTokens' collection)
  
//     // Send an email with a link containing the token
//     const transporter = nodemailer.createTransport({
//         host: 'your-smtp-server.com',
//     port: 587, // The port number may vary depending on your SMTP server configuration
//     secure: false, // Set to true if using a secure connection (e.g., with SSL/TLS)
//     auth: {
//       user: 'your-email@example.com',
//       pass: 'your-email-password',
//     },
//     });
  
//     const mailOptions = {
//       from: 'akritidahal000@gmail.com', 
//       to: email,
//       subject: 'Password Reset',
//       html: `<p>Click the following link to reset your password: <a href="http://localhost:587:/reset-password/${token}">Reset Password</a></p>`,
//     };
  
//     try {
//       await transporter.sendMail(mailOptions);
//       res.json({ message: 'Password reset email sent successfully.' });
//     } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ error: 'Error sending email.' });
//     }
//   });

 

const passwordResetTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' } // Token expires after 1 hour
});

module.exports = mongoose.model('PasswordResetToken', passwordResetTokenSchema);
  // backend/routes/auth.js



// Endpoint for forget password
app.post('/forgetpassword', async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a unique token (you can use a library like crypto)
    const token = 'auth-token';

    // Send an email with a link containing the token
    const transporter = nodemailer.createTransport({
      host: 'akritidahal000@gmail.com',
      port: 587, // The port number may vary depending on your SMTP server configuration
      secure: true, // Set to true if using a secure connection (e.g., with SSL/TLS)
      auth: {
        user: 'akritidahal000@gmail.com',
        pass: 'H@rrypotter00',
      },
    });

    const mailOptions = {
      from: 'akritidahal000@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click the following link to reset your password: <a href="http://localhost:4000/reset-password/${token}">Reset Password</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email.' });
  }
});



 



// Creating endpoint for popular in wonen/shop now section
// app.get("/popularinbridal",async(req,res)=> {
//     let products = await Product.find({category:'bridal'});
//     let popular_in_bridal =products.slice(0,3);
//     console.log("Popular in WomenFetched");
//     res.send(popular_in_bridal);


// })



//Creating middleware to fetch users
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors : "Please authenticate using valid token"})
    }
    else{
        try {
            const data= jwt.verify(token,'serect_ecom');
            req.user = data.user;
            next();
            
        } catch (error) {
            res.status(401).send({errors : 'Please authenticate using valid token'});
            console.error('Error authenticating user:', error);
            res.status(401).json({ error: 'Invalid token' });
            
        }
    }


}


// Creeating endpoint for adding product to cartdata

app.post('/addtocart',fetchUser,async(req,res) => {
    console.log(req.body,req.user);
    console.log('Added',req.body.itemId);
    let userData =await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    // res.send(userData.cartData)
    res.send("Added");
})

app.post('/addtopurchasehistory',fetchUser,async(req,res)=>{
    console.log(req.body,req.user);
    console.log('Added',req.body.itemId);
    userData.purchaseHistory[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{purchaseHistory:userData.purchaseHistory});
    // res.send(userData.cartData)
    res.send("Added");

})





// creating  end point for removing the cart data 
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log(req.body,req.user);
    console.log('Removed',req.body.itemId);
    let userData =await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;

    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    // res.send(userData.cartData)
    res.send("Removed");

})

// //creating endpoint to get cart data
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userData =await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);

})


//ohhhhhh paisa payment checkout api



// app.post('/api/create-checkout-session', async(req, res) => {
//     const { products } = req.body;
//     let hasuser= await Users.findOne({email:req.body.email});
//     console.log(products);
//     if(hasuser){
//     const lineItems = products.map((product) => ({
//         price_data: {
//             currency: 'npr',
//             product_data: {
//                 name: product.name,
//             },
//             unit_amount: product.new_price * 100,
//         },
//         quantity: product.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: lineItems,
//         mode: 'payment',
//         success_url: 'http://localhost:3000/success',
//         cancel_url: 'http://localhost:3000/cancel',
//     });



//     // Save purchase details to the database
//     // try {
//     //     for (const product of products) {
//     //         const purchase = new Purchase({
//     //             user:req.body.user, // Assuming you have user ID available in the request
             
//     //     // name: req.product.name, 
//     //  //from multer middleware
//     //     category: req.body.category,
//     //     new_price: req.body.new_price,
      
//     //         });
//     //         await purchase.save();
//     //     }
//     // } catch (error) {
//     //     console.error('Error saving purchase to database:', error);
//     //     // Handle error saving to database
//     //     return res.status(500).json({ error: 'Failed to save purchase to database' });
//     // }

//     res.json({ id: session.id });
// }
// else{
//     console.log(hasuser);
//     res.json({success:true,errors:'Please Login to Checkout'});
//   }
// });


//ohhh my gudd removing from cart after the successful payment
app.post('/api/remove-from-cart', async (req, res) => {
    const { productId } = req.body;

    await Product.updateOne({ id: productId }, { $set: { inCart: false } });
});


app.post('/api/create-checkout-session', async(req,res)=>{
    const { products ,paymentData} = req.body;

    // const user = await Users.findOne({ email });
    // if (!user) {
    //     return res.status(401).json({ error: 'Please login to process payment' });
    // }
   
    console.log(products);
    // if (!Array.isArray(products)) {
    //     return res.status(400).json({ error: 'Invalid products data' });
    // }

    const lineItems = products.map((product)=>({
        
        price_data:{
            currency:'npr',
            product_data:{
                name:product.name,
            },
            unit_amount:product.new_price*100,

        },
        quantity:product.quantity,

    }));
   

    const session =await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:lineItems,
        mode:'payment',
        success_url:'http://localhost:3000/success',
        cancel_url:'http://localhost:3000/cancel',

    });
    // user.paymentData = {
    //     paymentMethod,
    //     // Add more payment-related fields here as needed
    // };
    // await user.save();
    res.json({id:session.id});
    res.send({url:session})
})


//user profile view
app.get('/profileview',fetchUser,async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// schema for purchase
// const Purchase = mongoose.model('Purchase', {
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     product_name: String,
//     price: Number,
//     quantity: Number,
//     date: { type: Date, default: Date.now() }
// });




// 3. Retrieve Purchase History
app.get('/purchase-history', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in the request object
        const purchases = await Purchase.find({ user_id: userId });
        res.json({ purchases });
    } catch (error) {
        console.error('Error retrieving purchase history:', error);
        res.status(500).json({ error: 'Error retrieving purchase history' });
    }
});


// purchase history of user
// app.post('/purchase', fetchUser, async (req, res) => {
    
//     try {
//         const { productName, price, quantity } = req.body;
//         const user = await Users.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const purchase = {
//             productName,
//             price,
//             quantity
//         };
//         // user.purchaseHistory.push(purchase);
//         await user.save();
//         res.json({ success: true, message: 'Purchase history updated successfully' });
//     } catch (error) {
//         console.error('Error updating purchase history:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


app.post('/stripe-webhook', async (req, res) => {
    // Retrieve the event from the Stripe webhook payload
    const event = req.body;

    // Handle the event based on its type
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const paymentIntent = session.payment_intent;
            // Fetch payment details from Stripe using paymentIntent ID
            const paymentIntentData = await stripe.paymentIntents.retrieve(paymentIntent);

            // Create an order object with relevant details
            const order = new Purchase({
                userId: session.customer,
                paymentId: session.payment_intent,
                paymentStatus: session.payment_status,
                amountPaid: paymentIntentData.amount / 100, // Convert amount to currency units
                currency: paymentIntentData.currency,
                products: session.display_items.map(item => ({
                    name: item.custom.name,
                    price: item.amount / 100, // Convert price to currency units
                    quantity: item.quantity
                })),
                createdAt: new Date()
            });

            // Save the order to the database
            await order.save();

            // Send a response to confirm successful processing of the webhook event
            res.json({ received: true });
            break;
        default:
            // Handle other types of events if needed
            res.json({ received: false });
            break;
    }
});

app.listen(port,(error)=>{
    if(!error){
        console.log( "Server is running on Port " +port);
    }
    else{
        console.log("Error in server " +error);
    }
})
