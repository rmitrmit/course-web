let generatedOTP = null;

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

function sendOTP() {
    generatedOTP = generateOTP();
    document.getElementById('qrcode').innerHTML = '';

    // Corrected template literal for text
    const qrCode = new QRCode(document.getElementById('qrcode'), {
        text: `Your OTP: ${generatedOTP}`, // Use backticks for template literals
        width: 128,
        height: 128,
    });
    
    document.getElementById('qrcode').style.display = 'block';
    document.getElementById('user-email').style.display = 'none';
    document.querySelector('button[type="button"]').style.display = 'none';
    document.getElementById('otp-section').style.display = 'block';
}

function verifyOTP() {
    const enteredOTP = document.getElementById('otp-input').value;
    if (enteredOTP == generatedOTP) {
        document.getElementById('message').innerText = "OTP verified successfully!";
        
        setTimeout(() => {
            window.location.href = 'forgot-password.html';
        }, 1500); 
    } else {
        document.getElementById('message').innerText = "Incorrect OTP. Please try again.";
    }
}
