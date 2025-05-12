document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on
    const isDoctorsList = document.getElementById('doctors-list');
    const isDoctorProfile = document.querySelector('.doctor-profile-container');
    const isAppointmentsPage = document.querySelector('.appointments-container');

    // Load appropriate module based on current page
    if (isDoctorsList) {
        import('./modules/doctors-list.js')
            .then(module => module.initDoctorsList())
            .catch(err => console.error('Error loading doctors list module:', err));
    }

    if (isDoctorProfile) {
        import('./modules/doctor-profile.js')
            .then(module => module.initDoctorProfile())
            .catch(err => console.error('Error loading doctor profile module:', err));
    }

    if (isAppointmentsPage) {
        import('./modules/appointments.js')
            .then(module => module.initAppointments())
            .catch(err => console.error('Error loading appointments module:', err));
    }

    // Common functionality for all pages
    import('./modules/common.js')
        .then(module => module.initCommon())
        .catch(err => console.error('Error loading common module:', err));
});