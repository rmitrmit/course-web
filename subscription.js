document.addEventListener('DOMContentLoaded', function() {
    const subscriptionForm = document.getElementById('subscription-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const paymentMethodSelect = document.getElementById('payment-method');
    const stripePaymentElement = document.getElementById('stripe-payment-element');
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    // Get the subscription type from the page title
    const subscriptionType = document.title.includes('Monthly') ? 'monthly' : 'annual';
    const subscriptionAmount = subscriptionType === 'monthly' ? 49.99 : 399.99;

    // Initialize Stripe
    const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');
    const elements = stripe.elements();
    const cardElement = elements.create('card');

    // Handle payment method selection
    paymentMethodSelect.addEventListener('change', function() {
        if (this.value === 'credit-card') {
            stripePaymentElement.classList.remove('hidden');
            paypalButtonContainer.classList.add('hidden');
            cardElement.mount('#stripe-payment-element');
        } else if (this.value === 'paypal') {
            stripePaymentElement.classList.add('hidden');
            paypalButtonContainer.classList.remove('hidden');
            initPayPalButton();
        } else {
            stripePaymentElement.classList.add('hidden');
            paypalButtonContainer.classList.add('hidden');
        }
    });

    // Handle form submission
    subscriptionForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const paymentMethod = paymentMethodSelect.value;

        if (paymentMethod === 'credit-card') {
            const {token, error} = await stripe.createToken(cardElement);
            if (error) {
                console.error(error);
                alert('Payment failed: ' + error.message);
            } else {
                // Send the token to your server
                console.log('Stripe token:', token);
                alert(`Subscription successful! You will be charged $${subscriptionAmount} for your ${subscriptionType} subscription.`);
                window.location.href = 'thank-you.html';
            }
        } else if (paymentMethod === 'paypal') {
            // PayPal payment is handled by the PayPal button
            alert('Please use the PayPal button to complete your subscription.');
        } else {
            alert('Please select a payment method.');
        }
    });

    // Handle cancel button
    cancelBtn.addEventListener('click', function() {
        window.location.href = 'pricing.html';
    });

    // Initialize PayPal button
    function initPayPalButton() {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: subscriptionAmount.toFixed(2)
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    console.log('PayPal transaction completed by ' + details.payer.name.given_name);
                    alert(`Subscription successful! You will be charged $${subscriptionAmount} for your ${subscriptionType} subscription.`);
                    window.location.href = 'thank-you.html';
                });
            }
        }).render('#paypal-button-container');
    }
});