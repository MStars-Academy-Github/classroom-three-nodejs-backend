import { CardElement } from "@stripe/react-stripe-js";
import { useElements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { Box } from "@mui/material";

export default function PaymentForm({ price }) {
  const [success, setSuccess] = useState();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/v1/payment", {
          amount: price,
          id,
        });
        if (response.data.success) {
          console.log(response.data);
          console.log("Successfull payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <div>
      {!success ? (
        <Box onSubmit={handleSubmit} component="form">
          <CardElement />
          <button>PAY</button>
        </Box>
      ) : (
        <div>
          <h2 style={{ color: "black" }}>success</h2>
        </div>
      )}
    </div>
  );
}
