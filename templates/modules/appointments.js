/**
 * Appointments page functionality
 */

import { showToast, generateStars } from './common.js';

export function initAppointments() {
    // Get DOM elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const appointmentItems = document.querySelectorAll('.appointment-item');
    const noAppointmentsMsg = document.querySelector('.no-appointments');
    
    // Initialize the page
    setupFilterButtons();
    setupCancelButtons();
    setupRescheduleButtons();
    setupReviewButtons();
    setupRebookButtons();
    setupBookNewButton();
    
    // Filter appointments based on selected filter
    function filterAppointments(filter) {
        let visibleCount = 0;
        
        appointmentItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show or hide the empty state message
        if (visibleCount === 0) {
            noAppointmentsMsg.classList.remove('hidden');
        } else {
            noAppointmentsMsg.classList.add('hidden');
        }
    }
    
    // Set up filter buttons
    function setupFilterButtons() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active class
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter appointments
                const filter = button.getAttribute('data-filter');
                filterAppointments(filter);
            });
        });
    }
    
    // Set up cancel appointment functionality
    function setupCancelButtons() {
        const cancelButtons = document.querySelectorAll('.btn-cancel');
        cancelButtons.forEach(button => {
            button.addEventListener('click', function() {
                const appointmentItem = this.closest('.appointment-item');
                
                if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous?')) {
                    // Add a fade-out animation
                    appointmentItem.style.opacity = '0';
                    appointmentItem.style.transform = 'translateX(20px)';
                    appointmentItem.style.transition = 'all 0.3s ease';
                    
                    // Remove the appointment after animation
                    setTimeout(() => {
                        appointmentItem.remove();
                        
                        // Check if we need to show the empty state
                        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                        const visibleAppointments = document.querySelectorAll(`.appointment-item.${activeFilter}:not([style*="display: none"])`);
                        
                        if (visibleAppointments.length === 0) {
                            noAppointmentsMsg.classList.remove('hidden');
                        }
                    }, 300);
                    
                    // Show confirmation toast
                    showToast('Rendez-vous annulé avec succès');
                }
            });
        });
    }
    
    // Set up reschedule functionality
    function setupRescheduleButtons() {
        const rescheduleButtons = document.querySelectorAll('.btn-reschedule');
        rescheduleButtons.forEach(button => {
            button.addEventListener('click', function() {
                alert('Fonctionnalité de reprogrammation à venir');
            });
        });
    }
    
    // Set up book new appointment button
    function setupBookNewButton() {
        const bookNewBtn = document.querySelector('.btn-book-new');
        if (bookNewBtn) {
            bookNewBtn.addEventListener('click', () => {
                window.location.href = 'index.html'; // Redirect to doctors list
            });
        }
    }
    
    // Set up review functionality
    function setupReviewButtons() {
        const reviewButtons = document.querySelectorAll('.btn-review');
        reviewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const appointmentItem = this.closest('.appointment-item');
                const doctorName = appointmentItem.querySelector('h3').textContent;
                
                // Show a simple rating dialog (this would be a modal in a real app)
                const rating = prompt(`Notez votre consultation avec ${doctorName} (1-5):`, "5");
                
                if (rating !== null) {
                    // Convert actions to "rated" state
                    const actionsDiv = this.parentElement;
                    actionsDiv.innerHTML = `
                        <div class="rating-given">
                            <span>Votre avis: </span>
                            <span class="stars">
                                ${generateStars(parseInt(rating))}
                            </span>
                        </div>
                        <button class="btn-rebook secondary-btn"><i class="far fa-calendar-plus"></i> Reprendre rdv</button>
                    `;
                    actionsDiv.classList.add('completed');
                    
                    // Add click event to the new rebook button
                    actionsDiv.querySelector('.btn-rebook').addEventListener('click', () => {
                        alert('Fonctionnalité de reprise de rendez-vous à venir');
                    });
                    
                    showToast('Merci pour votre avis!');
                }
            });
        });
    }
    
    // Set up rebook functionality 
    function setupRebookButtons() {
        const rebookButtons = document.querySelectorAll('.btn-rebook');
        rebookButtons.forEach(button => {
            button.addEventListener('click', () => {
                alert('Fonctionnalité de reprise de rendez-vous à venir');
            });
        });
    }
}