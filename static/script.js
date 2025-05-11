// Attendre que le document soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log("Site de réservation de médecin chargé");

    // Animation des sections au défilement
    const observateur = new IntersectionObserver((entrees) => {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                entree.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observer les sections principales
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-animation');
        observateur.observe(section);
    });

    // Gestion du bouton de connexion
    const boutonConnexion = document.querySelector('.bouton-connexion');
    if (boutonConnexion) {
        boutonConnexion.addEventListener('click', function() {
            alert("La fonctionnalité de connexion sera bientôt disponible");
        });
    }

    // Gestion du bouton de prise de rendez-vous
    const boutonRDV = document.querySelector('.bouton-principal');
    if (boutonRDV) {
        boutonRDV.addEventListener('click', function() {
            alert("La fonctionnalité de prise de rendez-vous sera bientôt disponible");
        });
    }

    // Gestion du formulaire de recherche
    const formulaireRecherche = document.querySelector('.formulaire-recherche');
    if (formulaireRecherche) {
        formulaireRecherche.addEventListener('submit', function(e) {
            e.preventDefault();
            const specialite = document.querySelector('.formulaire-recherche input:first-child').value;
            const lieu = document.querySelector('.formulaire-recherche input:last-child').value;
            
            alert(`Recherche de médecins pour: ${specialite} à ${lieu}`);
        });
    }

    // Cartes de spécialités interactives
    const cartesSpecialite = document.querySelectorAll('.carte-specialite');
    cartesSpecialite.forEach(carte => {
        carte.addEventListener('click', function() {
            const specialite = this.querySelector('h3').textContent;
            alert(`Vous avez sélectionné la spécialité: ${specialite}`);
        });
    });

    // Bouton de recherche
    const boutonRecherche = document.querySelector('.bouton-recherche');
    if (boutonRecherche) {
        boutonRecherche.addEventListener('click', function(e) {
            e.preventDefault();
            const specialite = document.querySelector('.champ-recherche:first-child input').value;
            const lieu = document.querySelector('.champ-recherche:last-child input').value;
            
            if (!specialite || !lieu) {
                alert("Veuillez remplir tous les champs de recherche");
                return;
            }
            
            alert(`Recherche de médecins pour: ${specialite} à ${lieu}`);
        });
    }
});

// Ajout de CSS dynamique pour les animations
document.head.insertAdjacentHTML('beforeend', `
<style>
.section-animation {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.section-animation.visible {
    opacity: 1;
    transform: translateY(0);
}

.carte-specialite {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.carte-specialite:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
`);