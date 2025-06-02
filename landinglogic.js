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
        alert('Redirecting to class booking page...');
        // In a real app, this would redirect to the class booking page
        window.location.href = 'classRegis.html';
      }

      function cancelClass(classId) {
        if (confirm('Are you sure you want to cancel this class?')) {
          const classIndex = bookedClasses.findIndex(c => c.id === classId);
          if (classIndex !== -1) {
            bookedClasses[classIndex].status = 'cancelled';
            renderClasses();
            updateStats();
            alert('Class cancelled successfully!');
          }
        }
      }

      function rescheduleClass(classId) {
        alert('Reschedule functionality would open a date/time picker here.');
        // In a real app, this would open a reschedule modal
      }

      function bookAgain(classId) {
        const classItem = bookedClasses.find(c => c.id === classId);
        if (classItem) {
          alert(`Booking another ${classItem.name} class...`);
          // In a real app, this would add a new booking
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
          // window.location.href = 'index.html';
        }
      }

      // Initialize the dashboard
      document.addEventListener('DOMContentLoaded', function() {
        renderClasses();
        updateStats();
      });