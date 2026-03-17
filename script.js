// 1. NAVBAR SCROLL ANIMATION JS
        const header = document.getElementById('main-nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled'); // Shrinks navbar & adds shadow
            } else {
                header.classList.remove('scrolled'); // Reverts to original size
            }
        });

        // 2. SCROLL REVEAL ANIMATIONS JS
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const hiddenElements = document.querySelectorAll('.slide-up, .slide-right, .slide-left');
        hiddenElements.forEach((el) => observer.observe(el));

        // 3. FILE UPLOAD ALERT (Optional confirmation)
        document.getElementById('prescriptionUpload').addEventListener('change', function () {
            if (this.files && this.files.length > 0) {
                alert("File Selected: " + this.files[0].name + "\n\n(Note: Backend is required to actually save this file)");
            }
        });