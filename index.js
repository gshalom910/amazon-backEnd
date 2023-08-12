const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 88;

app.get("/", (request, response) => {
  response.status(200).send("👏 Happy to see you 😂😊");
});

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  if (total > 0) {
    // console.log("Payment Request Recieved for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
      //   payment_method_types: ["card"],
    });

    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    response.status(201).send({
      message: "can not process payment",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
