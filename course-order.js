document.addEventListener('DOMContentLoaded', function() {
    const courseSummary = document.getElementById('course-summary');
    const orderForm = document.getElementById('order-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const paymentMethodSelect = document.getElementById('payment-method');
    const stripePaymentElement = document.getElementById('stripe-payment-element');
    const paypalLogoContainer = document.getElementById('paypal-logo-container');

    // Get the course ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    // Fetch course details (in a real application, this would be an API call)
    const course = getCourseDetails(courseId);

    // Display course summary
    courseSummary.innerHTML = `
        <p class="text-lg font-semibold">${course.name}</p>
        <p>Instructor: ${course.instructor}</p>
        <p>Price: $${course.price.toFixed(2)}</p>
    `;

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
    orderForm.addEventListener('submit', async function(e) {
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
                alert('Payment successful!');
                window.location.href = 'thank-you.html';
            }
        } else if (paymentMethod === 'paypal') {
            // Simulate PayPal payment for prototype
            alert('PayPal payment simulation: Payment successful!');
            window.location.href = 'thank-you.html';
        } else {
            alert('Please select a payment method.');
        }
    });

    // Handle cancel button
    cancelBtn.addEventListener('click', function() {
        window.location.href = 'course-detail.html?id=' + courseId;
    });
});

function getCourseDetails(courseId) {
    // In a real application, you would fetch this data from a server
    // For this example, we'll use mock data
    const courses = {
        '1': { name: "JavaScript Basics", instructor: "John Doe", price: 49.99 },
        '2': { name: "Advanced Python", instructor: "Jane Smith", price: 79.99 },
        // Add more courses as needed
    };

    return courses[courseId] || { name: "Unknown Course", instructor: "Unknown", price: 0 };
}