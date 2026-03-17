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

        // 3. FILE UPLOAD FETCH API (Connects to Backend)
        document.getElementById('prescriptionUpload').addEventListener('change', async function() {
            if(this.files && this.files.length > 0) {
                const file = this.files[0];
                
                // File ko FormData me daalna zaroori hai
                const formData = new FormData();
                formData.append('prescriptionFile', file); 

                try {
                    alert("Uploading... Please wait."); 
                    const response = await fetch('https://mediplus-backend-9qqf.onrender.com/api/upload', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();
                    
                    if(response.ok) {
                        alert("Success: " + result.message);
                    } else {
                        alert("Error: " + result.message);
                    }

                } catch (error) {
                    console.error("Upload failed", error);
                    alert("Upload failed! Make sure your backend server is running.");
                }
            }
        });
