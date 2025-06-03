 document.addEventListener('DOMContentLoaded', function() {
            // Class selection
            const classCards = document.querySelectorAll('.class-card');
            const selectedClassInput = document.getElementById('selected-class');
            
            classCards.forEach(card => {
                card.addEventListener('click', function() {
                    // Remove selected class from all cards
                    classCards.forEach(c => c.classList.remove('selected'));
                    
                    // Add selected class to clicked card
                    this.classList.add('selected');
                    
                    // Update hidden input value
                    selectedClassInput.value = this.getAttribute('data-class-id');
                });
            });
            
            // Form validation
            const registrationForm = document.getElementById('registration-form');
            const confirmationModal = document.getElementById('confirmation-modal');
            const closeModalBtn = document.getElementById('close-modal');
            
            registrationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                let isValid = true;
                
                // Check if a class is selected
                if (selectedClassInput.value === '') {
                    isValid = false;
                    alert('Please select a class');
                }
                
                // Check required fields
                const requiredFields = registrationForm.querySelectorAll('[required]');
                requiredFields.forEach(field => {
                    if (!field.value) {
                        isValid = false;
                        const errorElement = document.getElementById(`${field.id}-error`);
                        if (errorElement) {
                            errorElement.style.display = 'block';
                        }
                    } else {
                        const errorElement = document.getElementById(`${field.id}-error`);
                        if (errorElement) {
                            errorElement.style.display = 'none';
                        }
                    }
                });
                
                // Validate email format
                const emailInput = document.getElementById('email');
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailInput.value && !emailPattern.test(emailInput.value)) {
                    isValid = false;
                    document.getElementById('email-error').style.display = 'block';
                }
                
                if (isValid) {
                    // Form is valid, show confirmation modal
                    const selectedClass = document.querySelector('.class-card.selected h3').textContent;
                    const selectedDate = new Date(document.getElementById('date').value);
                    const formattedDate = selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    });
                    const selectedTime = document.getElementById('time').value;
                    let formattedTime = '';
                    
                    if (selectedTime) {
                        const timeOption = document.querySelector(`#time option[value="${selectedTime}"]`);
                        formattedTime = timeOption.textContent;
                    }
                    
                    document.getElementById('confirm-class').textContent = selectedClass;
                    document.getElementById('confirm-date').textContent = formattedDate;
                    document.getElementById('confirm-time').textContent = formattedTime;
                    document.getElementById('confirm-email').textContent = document.getElementById('email').value;
                    
                    confirmationModal.style.display = 'flex';
                }
            });
            
            // Close modal
            closeModalBtn.addEventListener('click', function() {
                confirmationModal.style.display = 'none';
                registrationForm.reset();
                classCards.forEach(card => card.classList.remove('selected'));
            });
            
            // Date validation - prevent past dates
            const dateInput = document.getElementById('date');
            const today = new Date();
            const formattedToday = today.toISOString().split('T')[0];
            dateInput.setAttribute('min', formattedToday);
            
            // Simple field validation on blur
            const inputFields = registrationForm.querySelectorAll('input, select');
            inputFields.forEach(field => {
                field.addEventListener('blur', function() {
                    if (this.hasAttribute('required') && !this.value) {
                        const errorElement = document.getElementById(`${this.id}-error`);
                        if (errorElement) {
                            errorElement.style.display = 'block';
                        }
                    } else {
                        const errorElement = document.getElementById(`${this.id}-error`);
                        if (errorElement) {
                            errorElement.style.display = 'none';
                        }
                    }
                });
            });
        });

// Store registered class in localStorage after form submission
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedCard = document.querySelector('.class-card.selected');
    if (!selectedCard) {
        alert('Please select a class');
        return;
    }

    const classData = {
        id: Date.now(),
        name: selectedCard.getAttribute('data-name') || 'Unnamed Class',
        type: selectedCard.getAttribute('data-type') || 'Unknown',
        date: document.getElementById('date')?.value || '',
        time: document.getElementById('time')?.value || '',
        instructor: document.getElementById('instructor-name')?.value || '',
        duration: document.getElementById('class-duration')?.value || '',
        status: "upcoming"
    };

    let classes = JSON.parse(localStorage.getItem("bookedClasses")) || [];
    classes.push(classData);
    localStorage.setItem("bookedClasses", JSON.stringify(classes));

    const successMsg = document.getElementById('success-message');
const successBackdrop = document.getElementById('success-backdrop');


    successMsg.classList.add('show');
    successBackdrop.classList.add('show');

    setTimeout(() => {
    successMsg.classList.remove('show');
    successBackdrop.classList.remove('show');
    }, 3000);
    window.location.href = "LandingPage.html";

    this.reset();
    selectedCard.classList.remove('selected');
});
