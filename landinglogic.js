// Sample data for booked classes
      const bookedClasses = JSON.parse(localStorage.getItem("bookedClasses")) || [];


      function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }

      function getStatusClass(status) {
        switch(status) {
          case 'upcoming': return 'status-upcoming';
          case 'completed': return 'status-completed';
          case 'cancelled': return 'status-cancelled';
          default: return 'status-upcoming';
        }
      }

      function getStatusText(status) {
        switch(status) {
          case 'upcoming': return 'Upcoming';
          case 'completed': return 'Completed';
          case 'cancelled': return 'Cancelled';
          default: return 'Unknown';
        }
      }

      function renderClasses() {
        const classesGrid = document.getElementById('classesGrid');
        
        if (bookedClasses.length === 0) {
          classesGrid.innerHTML = `
            <div class="empty-state">
              <i class="ri-calendar-line"></i>
              <h3>No Classes Booked Yet</h3>
              <p>Start your fitness journey by booking your first class!</p>
              <button class="btn" onclick="bookNewClass()" style="margin-top: 1rem;">
                Book Your First Class
              </button>
            </div>
          `;
          return;
        }

        classesGrid.innerHTML = bookedClasses.map(classItem => `
          <div class="class-card">
            <div class="class-header">
              <h3>${classItem.name}</h3>
              <span class="class-type">${classItem.type}</span>
            </div>
            <div class="class-body">
              <div class="class-info">
                <span><i class="ri-calendar-line"></i> ${formatDate(classItem.date)}</span>
              </div>
              <div class="class-info">
                <span><i class="ri-time-line"></i> ${classItem.time}</span>
                <span><i class="ri-timer-line"></i> ${classItem.duration}</span>
              </div>
              <div class="class-info">
                <span><i class="ri-user-line"></i> ${classItem.instructor}</span>
              </div>
              <div class="class-status ${getStatusClass(classItem.status)}">
                ${getStatusText(classItem.status)}
              </div>
              ${classItem.status === 'upcoming' ? `
                <div class="class-actions">
                  <button class="btn btn-small btn-outline" onclick="rescheduleClass(${classItem.id})">
                    <i class="ri-calendar-event-line"></i> Reschedule
                  </button>
                  <button class="btn btn-small btn-danger" onclick="cancelClass(${classItem.id})">
                    <i class="ri-close-line"></i> Cancel
                  </button>
                </div>
              ` : classItem.status === 'completed' ? `
                <div class="class-actions">
                  <button class="btn btn-small btn-outline" onclick="bookAgain(${classItem.id})">
                    <i class="ri-repeat-line"></i> Book Again
                  </button>
                  <button class="btn btn-small" onclick="rateClass(${classItem.id})">
                    <i class="ri-star-line"></i> Rate Class
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('');
      }

      function updateStats() {
        const total = bookedClasses.length;
        const completed = bookedClasses.filter(c => c.status === 'completed').length;
        const upcoming = bookedClasses.filter(c => c.status === 'upcoming').length;
        
        document.getElementById('totalClasses').textContent = total;
        document.getElementById('completedClasses').textContent = completed;
        document.getElementById('upcomingClasses').textContent = upcoming;
      }

      function bookNewClass() {
      // Show the redirect modal
      document.getElementById('bookingRedirectModal').classList.remove('hidden');
  
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = 'classRegis.html';
      }, 1500); // 1.5 second delay
    }

      let cancelClassId = null;

function cancelClass(classId) {
  cancelClassId = classId;
  document.getElementById('cancelModal').classList.remove('hidden');
}

function confirmCancel() {
  const classIndex = bookedClasses.findIndex(c => c.id === cancelClassId);
  if (classIndex !== -1) {
    bookedClasses[classIndex].status = 'cancelled';
    localStorage.setItem("bookedClasses", JSON.stringify(bookedClasses));
    renderClasses();
    updateStats();
    closeCancelModal();
    showSuccessModal();
  }
}

function closeCancelModal() {
  document.getElementById('cancelModal').classList.add('hidden');
}

function showSuccessModal() {
  document.getElementById('cancelSuccessModal').classList.remove('hidden');
}

function closeSuccessModal() {
  document.getElementById('cancelSuccessModal').classList.add('hidden');
}

      let rescheduleClassId = null;

function rescheduleClass(classId) {
  rescheduleClassId = classId;
  const options = [
    "06:00", "08:00", "10:00",
    "12:00", "14:00", "17:00", "20:00"
  ];

  const select = document.getElementById('rescheduleOptions');
  select.innerHTML = options.map(opt => `<option value="${opt}">${opt}</option>`).join('');

  // Reset date picker to today
  const dateInput = document.getElementById('rescheduleDate');
  dateInput.value = new Date().toISOString().split('T')[0];

  document.getElementById('rescheduleModal').classList.remove('hidden');
}


function confirmReschedule() {
  const newDate = document.getElementById('rescheduleDate').value;
  const newTime = document.getElementById('rescheduleOptions').value;

  if (!newDate || !newTime) {
    alert("Please select both a date and time.");
    return;
  }

  const classIndex = bookedClasses.findIndex(c => c.id === rescheduleClassId);
  if (classIndex !== -1) {
    bookedClasses[classIndex].date = newDate;
    bookedClasses[classIndex].time = newTime;
    localStorage.setItem("bookedClasses", JSON.stringify(bookedClasses));
    renderClasses();
    updateStats();
    closeRescheduleModal();
    alert("Class rescheduled successfully!");
  }
}

function closeRescheduleModal() {
  document.getElementById('rescheduleModal').classList.add('hidden');
}

      function bookAgain(classId) {
        const classItem = bookedClasses.find(c => c.id === classId);
        if (classItem) {
          alert(`Booking another ${classItem.name} class...`);
        }
      }

      function rateClass(classId) {
        const rating = prompt('Rate this class (1-5 stars):');
        if (rating && rating >= 1 && rating <= 5) {
          alert(`Thank you for rating this class ${rating} stars!`);
        }
      }

      function logout() {
        if (confirm('Are you sure you want to logout?')) {
          alert('Logging out...');
          // In a real app, this would clear session and redirect
          window.location.href = 'index.html';
        }
      }

      // Initialize the dashboard
      document.addEventListener('DOMContentLoaded', function() {
        renderClasses();
        updateStats();
      });