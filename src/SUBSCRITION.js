import React, { useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const UserActivationForm = () => {
    const [isPaymentComplete, setPaymentComplete] = useState(false);
    const [DESCRIPTION, setDESCRIPTION] = useState("User Activation Account");


    const handlePayment = async (token) => {
        try {
            // Make API request to process the payment
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/payment`, { token, amount: 550000,DESCRIPTION});

            // Set payment complete status
            setPaymentComplete(true);
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.cardRow}>
                <div style={{ ...styles.card, ...styles.bigCard, ...styles.centered }}>
                    <h2>Welcome to JETTRADE FX</h2>
                    <h5>Activate Your Account</h5>
                    {isPaymentComplete ? (
                        <div style={styles.paymentComplete}>
                            <h3>Payment Successful!</h3>
                            <p>Your account has been activated.</p>
                            <p>Enjoy the benefits of your activated account.</p>
                        </div>
                    ) : (
                        <div style={styles.paymentForm}>
                            <h6>Pay ₹3500.00 for
                                Account opening and software usage charges/subscription
                            </h6>
                            <StripeCheckout
                                token={handlePayment}
                                stripeKey="pk_test_51NI5o0SAzinzFTdr3jkeLcPPyKXrjHJJHRVfIdEvLAXsHouyREWY7iza3qnVTx6ndEvD1BgpV3agl93RSJ5jWJAd00bzApCnhj"
                                amount={350000}
                                currency="INR"
                                description={DESCRIPTION}
                                billingAddress
                                shippingAddress
                            />
                            <p>Accepted Payment Methods: Credit/Debit Card</p>
                            <p>Secure payment process powered by Stripe.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Remaining styles...

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    cardRow: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    card: {
        width: '300px',
        height: '200px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.5s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    bigCard: {
        width: '400px',
        height: '300px',
    },
    centered: {
        marginTop: '50px',
        textAlign: 'center',
    },
    paymentForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
    },
    paymentComplete: {
        textAlign: 'center',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#8B5BE6',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default UserActivationForm;
