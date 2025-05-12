document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the doctors list page or profile page
    const isDoctorsList = document.getElementById('doctors-list');
    const isDoctorProfile = document.querySelector('.doctor-profile-container');

    if (isDoctorsList) {
        // Doctors list page functionality
        const searchInput = document.getElementById('search-input');
        const allSpecialtiesBtn = document.getElementById('all-specialties');
        const allCategoriesBtn = document.getElementById('all-categories');
        const filtersModal = document.getElementById('filters-modal');
        const closeModal = document.querySelector('.close-modal');
        const specialtiesList = document.querySelector('.specialties-list');
        const applyFiltersBtn = document.getElementById('apply-filters');
        const resetFiltersBtn = document.getElementById('reset-filters');

        // Données des médecins
        const doctors = [
            {
                id: 1,
                name: 'Dr. Sophie Martin',
                specialty: 'Médecin généraliste',
                image: '/a/91dbf956-397c-418c-99b3-6afe54e16006',
                rating: 4.8,
                ratingCount: 124,
                availability: 'Aujourd\'hui',
                availabilityStatus: 'Disponible'
            },
            {
                id: 2,
                name: 'Dr. Thomas Dubois',
                specialty: 'Cardiologue',
                image: '/a/91dbf956-397c-418c-99b3-6afe54e16006',
                rating: 4.9,
                ratingCount: 89,
                availability: 'Demain',
                availabilityStatus: 'Disponible'
            },
            {
                id: 3,
                name: 'Dr. Marie Leclerc',
                specialty: 'Pédiatre',
                image: '/a/91dbf956-397c-418c-99b3-6afe54e16006',
                rating: 4.7,
                ratingCount: 156,
                availability: 'Vendredi',
                availabilityStatus: 'Disponible'
            },
            {
                id: 4,
                name: 'Dr. Philippe Moreau',
                specialty: 'Dermatologue',
                image: '/a/91dbf956-397c-418c-99b3-6afe54e16006',
                rating: 4.6,
                ratingCount: 112,
                availability: 'Lundi prochain',
                availabilityStatus: 'Peu disponible'
            }
        ];

        // Liste des spécialités pour le filtre
        const specialties = [
            'Médecin généraliste',
            'Cardiologue',
            'Pédiatre',
            'Dermatologue',
            'Ophtalmologue',
            'Gynécologue',
            'Psychiatre',
            'Orthopédiste'
        ];

        // Référence aux éléments DOM
        const doctorsList = document.getElementById('doctors-list');

        // Variables d'état
        let activeFilters = [];
        let searchTerm = '';

        // Fonction pour afficher les médecins
        function renderDoctors() {
            // Filtrer les médecins en fonction de la recherche et des filtres
            const filteredDoctors = doctors.filter(doctor => {
                const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesFilter = activeFilters.length === 0 || activeFilters.includes(doctor.specialty);

                return matchesSearch && matchesFilter;
            });

            // Vider la liste
            doctorsList.innerHTML = '';

            // Ajouter les médecins filtrés
            if (filteredDoctors.length === 0) {
                doctorsList.innerHTML = `
                    <div class="no-results">
                        <p>Aucun médecin ne correspond à votre recherche</p>
                    </div>
                `;
            } else {
                filteredDoctors.forEach(doctor => {
                    const doctorCard = document.createElement('div');
                    doctorCard.className = 'doctor-card';
                    doctorCard.style.animationDelay = `${filteredDoctors.indexOf(doctor) * 0.1}s`;

                    // Générer les étoiles pour la notation
                    const stars = generateStars(doctor.rating);

                    // Déterminer la couleur de disponibilité
                    const availabilityColor = doctor.availabilityStatus === 'Disponible' ? '#4caf50' : 
                                              doctor.availabilityStatus === 'Peu disponible' ? '#ff9800' : '#f44336';

                    doctorCard.innerHTML = `
                        <div class="doctor-image">
                            <img src="${doctor.image}" alt="${doctor.name}">
                        </div>
                        <div class="doctor-info">
                            <h2 class="doctor-name">${doctor.name}</h2>
                            <p class="doctor-specialty">${doctor.specialty}</p>
                            <div class="doctor-rating">
                                <span class="rating-stars">${stars}</span>
                                <span class="rating-count">(${doctor.ratingCount} avis)</span>
                            </div>
                            <div class="doctor-availability" style="color: ${availabilityColor};">
                                <i class="fas fa-clock"></i>
                                <span>${doctor.availabilityStatus}: ${doctor.availability}</span>
                            </div>
                            <div class="doctor-actions">
                                <button class="btn-appointment">Prendre rendez-vous</button>
                                <button class="btn-profile">Voir profil</button>
                            </div>
                        </div>
                    `;

                    doctorsList.appendChild(doctorCard);
                });
            }
        }

        // Générer les étoiles pour la notation
        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

            let starsHTML = '';

            for (let i = 0; i < fullStars; i++) {
                starsHTML += '<i class="fas fa-star"></i>';
            }

            if (halfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            }

            for (let i = 0; i < emptyStars; i++) {
                starsHTML += '<i class="far fa-star"></i>';
            }

            return starsHTML;
        }

        // Initialiser les spécialités dans le modal
        function initSpecialtiesFilter() {
            specialtiesList.innerHTML = '';

            specialties.forEach(specialty => {
                const specialtyItem = document.createElement('div');
                specialtyItem.className = 'specialty-item';

                specialtyItem.innerHTML = `
                    <input type="checkbox" id="${specialty}" class="specialty-checkbox" value="${specialty}" 
                        ${activeFilters.includes(specialty) ? 'checked' : ''}>
                    <label for="${specialty}">${specialty}</label>
                `;

                specialtiesList.appendChild(specialtyItem);
            });
        }

        // Événements
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            renderDoctors();
        });

        allSpecialtiesBtn.addEventListener('click', () => {
            initSpecialtiesFilter();
            filtersModal.style.display = 'block';
        });

        allCategoriesBtn.addEventListener('click', () => {
            // À implémenter pour le filtrage par catégorie
            alert('Fonctionnalité de filtrage par catégorie à venir');
        });

        closeModal.addEventListener('click', () => {
            filtersModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === filtersModal) {
                filtersModal.style.display = 'none';
            }
        });

        applyFiltersBtn.addEventListener('click', () => {
            activeFilters = [];

            document.querySelectorAll('.specialty-checkbox:checked').forEach(checkbox => {
                activeFilters.push(checkbox.value);
            });

            filtersModal.style.display = 'none';
            renderDoctors();

            // Mettre à jour le texte du bouton de filtre
            if (activeFilters.length === 0) {
                allSpecialtiesBtn.textContent = 'Toutes les spécialités';
            } else if (activeFilters.length === 1) {
                allSpecialtiesBtn.textContent = activeFilters[0];
            } else {
                allSpecialtiesBtn.textContent = `${activeFilters.length} spécialités`;
            }
        });

        resetFiltersBtn.addEventListener('click', () => {
            document.querySelectorAll('.specialty-checkbox').forEach(checkbox => {
                checkbox.checked = false;
            });

            activeFilters = [];
            allSpecialtiesBtn.textContent = 'Toutes les spécialités';
            renderDoctors();
        });

        // Initialiser l'application
        initSpecialtiesFilter();
        renderDoctors();
    }

    if (isDoctorProfile) {
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

        // Schedule date selection
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

        // Favorite button toggle
        const favoriteBtn = document.querySelector('.btn-favorite');
        let isFavorite = false;

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

        // Share functionality (simplified)
        const shareBtn = document.querySelector('.btn-share');

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

        // "Load more reviews" button
        const loadMoreBtn = document.querySelector('.btn-load-more');
        let reviewsLoaded = 3; // Initial number of reviews shown

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

        // Map placeholder click handler
        const mapPlaceholder = document.querySelector('.map-placeholder');

        mapPlaceholder.addEventListener('click', () => {
            // Open Google Maps in a new tab
            window.open('https://maps.google.com/?q=15+Rue+des+Médecins+75001+Paris+France', '_blank');
        });
    }

    // Animation for the buttons (common functionality)
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('button-click');
            setTimeout(() => {
                this.classList.remove('button-click');
            }, 150);
        });
    });
});