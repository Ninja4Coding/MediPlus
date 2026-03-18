// --- SECTION 1: NAVIGATION & SCROLL ---
const header = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- SECTION 2: REVEAL ANIMATIONS ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-up, .slide-right, .slide-left').forEach((el) => observer.observe(el));


// --- SECTION 3: MODAL & PREVIEW LOGIC (The New Part) ---
const fileInput = document.getElementById('prescriptionUpload');
const modal = document.getElementById('uploadModal');
const previewImg = document.getElementById('previewImg');
const scannerLine = document.getElementById('scannerLine');
const finalBtn = document.getElementById('finalUploadBtn');

// A. File Select hote hi Modal khulega
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        modal.style.display = 'flex'; // Modal dikhao
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }
});

// B. Modal band karne ka function
function closePreview() {
    modal.style.display = 'none';
    fileInput.value = ""; // Input clear karo taaki same file dubara select ho sake
}

// --- SECTION 4: ACTUAL UPLOAD LOGIC ---
finalBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('prescriptionFile', file);

    // Visual Feedback
    scannerLine.style.display = 'block';
    scannerLine.style.animation = 'scanning 2s infinite linear';
    finalBtn.innerText = "Scanning & Uploading...";
    finalBtn.disabled = true;

    try {
        // Render ka URL yahan aayega
        const response = await fetch('https://mediplus-backend-9qqf.onrender.com/api/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Securely Stored: " + result.message);
            closePreview();
        } else {
            alert("❌ Error: " + result.message);
        }
    } catch (error) {
        console.error("Upload failed", error);
        alert("Server Down! Check your server.");
    } finally {
        scannerLine.style.display = 'none';
        finalBtn.innerText = "Confirm & Upload";
        finalBtn.disabled = false;
    }
});