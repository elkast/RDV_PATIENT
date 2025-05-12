/**
 * Doctor profile page functionality
 */

export function initDoctorProfile() {
    // Doctor Profile Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and hide all contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.add('hidden'));

            // Add active class to clicked button and show corresponding content
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.remove('hidden');
        });
    });

    // Initialize different sections
    initScheduleSection();
    initFavoriteButton();
    initShareButton();
    initReviewsSection();
    initMapInteraction();
}

// Schedule date selection
function initScheduleSection() {
    const dateBlocks = document.querySelectorAll('.date-block:not(.inactive)');

    dateBlocks.forEach(block => {
        block.addEventListener('click', () => {
            // Remove active class from all dates
            dateBlocks.forEach(date => date.querySelector('.date').classList.remove('active'));

            // Add active class to clicked date
            block.querySelector('.date').classList.add('active');
        });
    });

    // Time slot selection
    const timeSlots = document.querySelectorAll('.time-slot:not(.booked)');

    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            // Remove selected class from all slots
            timeSlots.forEach(s => s.classList.remove('selected'));

            // Add selected class to clicked slot
            slot.classList.add('selected');

            // Show confirmation dialog (simplified)
            if (confirm(`Confirmer le rendez-vous le 15 mai à ${slot.textContent} ?`)) {
                alert('Rendez-vous confirmé !');
                // Here we would normally send the data to a server
            }
        });
    });
}

// Favorite button toggle
function initFavoriteButton() {
    const favoriteBtn = document.querySelector('.btn-favorite');
    let isFavorite = false;

    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => {
            isFavorite = !isFavorite;

            if (isFavorite) {
                favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favoris';
                favoriteBtn.style.color = '#e91e63';
            } else {
                favoriteBtn.innerHTML = '<i class="far fa-heart"></i> Favoris';
                favoriteBtn.style.color = '#666';
            }
        });
    }
}

// Share functionality
function initShareButton() {
    const shareBtn = document.querySelector('.btn-share');

    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            // Check if Web Share API is supported
            if (navigator.share) {
                navigator.share({
                    title: 'Dr. Sophie Martin - Médecin généraliste',
                    text: 'Consultez le profil du Dr. Sophie Martin, Médecin généraliste à Paris.',
                    url: window.location.href,
                })
                .catch(error => console.log('Erreur de partage :', error));
            } else {
                // Fallback for browsers that don't support Web Share API
                prompt('Copiez ce lien pour partager le profil :', window.location.href);
            }
        });
    }
}

// Reviews section 
function initReviewsSection() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    let reviewsLoaded = 3; // Initial number of reviews shown

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Normally we would fetch more reviews from a server
            // For demo purposes, we'll just add some dummy reviews
            const reviewsList = document.querySelector('.reviews-list');

            for (let i = 0; i < 3; i++) {
                const reviewItem = document.createElement('div');
                reviewItem.className = 'review-item';
                reviewItem.innerHTML = `
                    <div class="review-header">
                        <div class="reviewer-info">
                            <span class="reviewer-initial">${String.fromCharCode(65 + Math.floor(Math.random() * 26))}</span>
                            <div>
                                <div class="reviewer-name">Patient ${reviewsLoaded + i + 1}</div>
                                <div class="review-date">1 mars 2023</div>
                            </div>
                        </div>
                        <div class="review-rating">
                            ${Array(5).fill().map((_, j) => `<i class="${j < 4 || Math.random() > 0.5 ? 'fas' : 'far'} fa-star"></i>`).join('')}
                        </div>
                    </div>
                    <div class="review-content">
                        <p>Très bonne expérience avec le Dr. Martin. Consultation efficace et médecin à l'écoute.</p>
                    </div>
                `;

                // Insert before the "Load more" button
                reviewsList.insertBefore(reviewItem, loadMoreBtn);
            }

            reviewsLoaded += 3;

            // Hide the button if we've loaded enough reviews
            if (reviewsLoaded >= 12) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
}

// Map interaction
function initMapInteraction() {
    const mapPlaceholder = document.querySelector('.map-placeholder');

    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', () => {
            // Open Google Maps in a new tab
            window.open('https://maps.google.com/?q=15+Rue+des+Médecins+75001+Paris+France', '_blank');
        });
    }
}