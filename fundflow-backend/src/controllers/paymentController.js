// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const db = require("../db"); // adjust based on your setup

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// // Create order
// exports.createOrder = async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const options = {
//       amount: parseInt(amount) * 100, // Razorpay expects paise
//       currency: "INR",
//       receipt: `rcpt_${Date.now()}`
//     };

//     const order = await razorpay.orders.create(options);
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(500).json({ message: "Order creation failed", error: err.message });
//   }
// };

// // Verify and save donation
// exports.verifyPayment = async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     campaignId,
//     donatedAmount,
//     donorName,
//     email
//   } = req.body;

//   const hash = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(razorpay_order_id + "|" + razorpay_payment_id)
//     .digest("hex");

//   if (hash === razorpay_signature) {
//     try {
//       await db.query(
//         "UPDATE campaigns SET donated_amount = donated_amount + ? WHERE id = ?",
//         [donatedAmount, campaignId]
//       );

//       // (Optional) Log donation
//       await db.query(
//         "INSERT INTO donations (campaign_id, donor_name, email, amount) VALUES (?, ?, ?, ?)",
//         [campaignId, donorName, email, donatedAmount]
//       );

//       return res.status(200).json({ message: "Payment verified and donation recorded." });
//     } catch (error) {
//       return res.status(500).json({ message: "DB Error", error });
//     }
//   } else {
//     res.status(400).json({ message: "Invalid signature" });
//   }
// };
