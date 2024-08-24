document.addEventListener('DOMContentLoaded', function() {
    const subscriptionForm = document.getElementById('subscription-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const paymentMethodSelect = document.getElementById('payment-method');
    const stripePaymentElement = document.getElementById('stripe-payment-element');
    const paypalLogoContainer = document.getElementById('paypal-logo-container');

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
            paypalLogoContainer.classList.add('hidden');
            cardElement.mount('#stripe-payment-element');
        } else if (this.value === 'paypal') {
            stripePaymentElement.classList.add('hidden');
            paypalLogoContainer.classList.remove('hidden');
        } else {
            stripePaymentElement.classList.add('hidden');
            paypalLogoContainer.classList.add('hidden');
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
            // Simulate PayPal payment for prototype
            alert(`PayPal payment simulation: Subscription successful! You will be charged $${subscriptionAmount} for your ${subscriptionType} subscription.`);
            window.location.href = 'thank-you.html';
        } else {
            alert('Please select a payment method.');
        }
    });

    // Handle cancel button
    cancelBtn.addEventListener('click', function() {
        window.location.href = 'pricing.html';
    });
});