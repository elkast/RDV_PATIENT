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

    // Cartes de spécialités interactives - animation au survol uniquement
    const cartesSpecialite = document.querySelectorAll('.carte-specialite');
    cartesSpecialite.forEach(carte => {
        carte.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        carte.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
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