document.getElementById("paymentForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        cardNumber: document.getElementById("cardNumber").value,
        expiryDate: document.getElementById("expiryDate").value,
        cvv: document.getElementById("cvv").value,
        plan: document.getElementById("plan").value
      };

      console.log("Payment Submitted:", formData);
      alert("Thank you! Your payment has been processed.");
      window.location.href = "LandingPage.html";
    });