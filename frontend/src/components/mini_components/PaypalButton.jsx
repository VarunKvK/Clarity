'use client'
import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ price, onSuccess, onError }) => {
    return (
        <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: price.toString(),
                            },
                        },
                    ],
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                    onSuccess(details);
                });
            }}
            onError={(err) => {
                onError(err);
            }}
        />
    );
};

export default PayPalButton;
