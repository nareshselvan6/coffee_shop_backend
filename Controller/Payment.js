
// import Stripe from "stripe";
// import dotenv from "dotenv";

// dotenv.config();

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// const stripe = new Stripe(stripeSecretKey, {
//     apiVersion: "2024-04-10",
// });

// export const payment = async (req, res) => {
//     const { totalqty } = req.body;
    

//     const success=req.headers.origin?req.headers.origin:"https://coffee-shop-frontend-vert.vercel.app/products";

    
//     let lineItems = [{
//         price_data: {
//             currency: "inr",
//             product_data: {
//                 name: "Food cost"
//             },
//             unit_amount: Number(totalqty) * 100 // Convert to cents
//         },
//         quantity: 1
//     }];


//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
           
//             success_url: `${success}/stripaymentsuccess`,
//             cancel_url: `${success}/stripaymentfailure`
//         });
//         console.log(session);
//         res.json({ id: session.id });
//     } catch (error) {
//         console.error("Error creating Stripe session:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };


import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-04-10",
});

export const payment = async (req, res) => {
    const { totalqty } = req.body;

    // Debugging: Check if the environment variable and totalqty are correctly loaded
    // console.log("Stripe Secret Key Loaded:", stripeSecretKey ? "Yes" : "No");
    // console.log("Total Quantity Received:", totalqty);

    const success = req.headers.origin
        ? req.headers.origin
        : "https://coffee-shop-frontend-vert.vercel.app/products";

    let lineItems = [{
        price_data: {
            currency: "inr",
            product_data: {
                name: "Food cost"
            },
            unit_amount: Number(totalqty) * 100 // Convert to cents
        },
        quantity: 1
    }];

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${success}/stripaymentsuccess`,
            cancel_url: `${success}/stripaymentfailure`
        });
        
        // Debugging: Check the session details
        // console.log("Stripe Session Created:", session);
        
        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
