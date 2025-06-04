function validateAndRedirect(event) {
    event.preventDefault(); // Prevent form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('Please fill in all fields.');
        return;
    }
    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Redirect to payment page after successful validation
    window.location.href = 'payment.html';
}

// Attach event listener to signup form
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', validateAndRedirect);
}