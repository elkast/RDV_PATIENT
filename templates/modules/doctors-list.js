/**
 * Doctors list page functionality
 */

import { showToast, generateStars } from './common.js';

export function initDoctorsList() {
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

    // Initialiser l'application
    initSpecialtiesFilter();
    renderDoctors();
    setupEventListeners();

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

    // Configure all event listeners
    function setupEventListeners() {
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
    }
}