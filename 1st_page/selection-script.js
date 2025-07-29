document.addEventListener('DOMContentLoaded', () => {

    // --- Original Logic for Saving Choice ---
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            const language = card.dataset.lang;
            localStorage.setItem('selectedLanguage', language);
            
            // Add a small delay for visual feedback before redirecting
            card.style.transform = "scale(0.95)";
            card.style.opacity = "0.7";
            
            setTimeout(() => {
                window.location.href = card.href;
            }, 200);
        });

        // Set the glow color from the data attribute
        const glowColor = card.dataset.glowColor;
        if (glowColor) {
            card.style.setProperty('--glow-color', glowColor);
        }

        // --- New Logic for 3D Tilt Effect ---
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -7; // Max rotation 7 degrees
            const rotateY = ((x - centerX) / centerX) * 7;  // Max rotation 7 degrees

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});