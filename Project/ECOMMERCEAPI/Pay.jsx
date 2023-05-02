import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from "react";

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);


    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post('http://localhost:5000/api/checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: 94900
                });
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        if (stripeToken) {
            makeRequest();
        }
    }, [stripeToken])

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            {stripeToken ? (<span>Processing... Please wait.</span>) : (

                <StripeCheckout
                    name="SUps Supplements"
                    billingAddress
                    shippingAddress
                    description=" Your total is 949TRY"
                    amount={94900}
                    token={onToken}
                    stripeKey={process.env.STRIPE_KEY}
                >

                    <button
                        style={{
                            border: "none",
                            width: 120,
                            borderRadius: 5,
                            padding: "20px",
                            backgroundColor: "black",
                            color: "white",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Pay Now
                    </button>
                </StripeCheckout>
            )}
        </div>
    );
}