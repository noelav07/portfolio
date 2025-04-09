// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Navigation Menu
function myMenuFunction() {
  const menuBtn = document.getElementById("myNavMenu");
  menuBtn.classList.toggle("responsive");
}

// Header Shadow on Scroll
window.onscroll = function() { headerShadow(); };

function headerShadow() {
  const navHeader = document.getElementById("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
  } else {
    navHeader.style.boxShadow = "none";
  }
}

// Typing Effect
const typingEffect = new Typed(".typedText", {
  strings: ["IT Infra Engineer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000
});

// GSAP Animations
gsap.from(".featured-text-card", {
  duration: 1,
  y: 50,
  opacity: 0,
  ease: "power3.out"
});

gsap.from(".featured-name", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.2,
  ease: "power3.out"
});

gsap.from(".featured-text-info", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.4,
  ease: "power3.out"
});

gsap.from(".featured-text-btn", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.6,
  ease: "power3.out"
});

gsap.from(".social_icons", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.8,
  ease: "power3.out"
});

// Project Box Animations
gsap.utils.toArray('.project-box').forEach(box => {
  gsap.from(box, {
    scrollTrigger: {
      trigger: box,
      start: "top bottom",
      toggleActions: "play none none reverse"
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out"
  });
});

// Skills Animation
gsap.utils.toArray('.skills-list span').forEach((skill, index) => {
  gsap.from(skill, {
    scrollTrigger: {
      trigger: skill,
      start: "top bottom",
      toggleActions: "play none none reverse"
    },
    duration: 0.5,
    x: -50,
    opacity: 0,
    delay: index * 0.1,
    ease: "power3.out"
  });
});

// Active Link on Scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
    } else {
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

// Contact Form
function toggleContactForm() {
  const form = document.getElementById("contactForm");
  
  // Make sure form exists
  if (!form) {
    console.error("Contact form not found");
    return;
  }
  
  // Toggle visibility with animation
  if (form.style.display === "block") {
    // Fade out animation
    form.style.opacity = "0";
    form.style.transform = "translateY(20px)";
    
    // Hide after animation completes
    setTimeout(() => {
      form.style.display = "none";
    }, 300);
  } else {
    // Show form first, then animate in
    form.style.display = "block";
    
    // Force browser reflow to ensure animation works
    void form.offsetWidth;
    
    // Animate in
    setTimeout(() => {
      form.style.opacity = "1";
      form.style.transform = "translateY(0)";
      
      // Add focus to the first input field
      const firstInput = form.querySelector('input[type="text"]');
      if (firstInput) firstInput.focus();
    }, 10);
  }
}

function closeContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  
  // Fade out animation
  form.style.opacity = "0";
  form.style.transform = "translateY(20px)";
  
  // Hide after animation completes
  setTimeout(() => {
    form.style.display = "none";
  }, 300);
}

// Close form when clicking outside
document.addEventListener("click", function(event) {
  const form = document.getElementById("contactForm");
  if (!form || form.style.display !== "block") return;
  
  const buttons = document.querySelectorAll('[onclick="toggleContactForm()"]');
  let clickedButton = false;
  
  // Check if one of the toggle buttons was clicked
  buttons.forEach(button => {
    if (button.contains(event.target)) {
      clickedButton = true;
    }
  });
  
  // If click was outside form and not on a toggle button, close form
  if (!form.contains(event.target) && !clickedButton) {
    closeContactForm();
  }
});

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitButton = form.querySelector('button[type="submit"]');
  
  // Simple validation
  if (!nameInput.value || !emailInput.value || !messageInput.value) {
    showFormError("Please fill out all fields");
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    showFormError("Please enter a valid email address");
    emailInput.focus();
    return;
  }
  
  // Disable button and show loading state
  submitButton.disabled = true;
  const originalButtonText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="uil uil-spinner" style="animation: spin 1s linear infinite;"></i> Sending...';
  
  // Simulate API call (replace with actual API call)
  setTimeout(() => {
    // Show success message
    showFormSuccess("Thank you for your message! I'll get back to you soon.");
    
    // Clear the form
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
    
    // Reset button
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
    
    // Close the form after a delay
    setTimeout(closeContactForm, 3000);
  }, 1500);
}

// Show error message
function showFormError(message) {
  // Check if error message element exists
  let errorElement = document.querySelector('.form-error-message');
  
  // Create it if it doesn't exist
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'form-error-message';
    errorElement.style.color = '#ef4444';
    errorElement.style.marginBottom = '10px';
    errorElement.style.fontSize = '14px';
    errorElement.style.fontWeight = '500';
    errorElement.style.display = 'flex';
    errorElement.style.alignItems = 'center';
    errorElement.style.gap = '5px';
    
    const form = document.getElementById("contactForm");
    form.querySelector('form').insertBefore(errorElement, form.querySelector('button'));
  }
  
  // Set error message
  errorElement.innerHTML = `<i class="uil uil-exclamation-circle"></i> ${message}`;
  
  // Shake animation
  errorElement.style.animation = 'shake 0.5s ease-in-out';
  setTimeout(() => {
    errorElement.style.animation = '';
  }, 500);
}

// Show success message
function showFormSuccess(message) {
  // Check if success message element exists
  let successElement = document.querySelector('.form-success-message');
  
  // Create it if it doesn't exist
  if (!successElement) {
    successElement = document.createElement('div');
    successElement.className = 'form-success-message';
    successElement.style.color = '#10b981';
    successElement.style.marginBottom = '10px';
    successElement.style.fontSize = '14px';
    successElement.style.fontWeight = '500';
    successElement.style.display = 'flex';
    successElement.style.alignItems = 'center';
    successElement.style.gap = '5px';
    successElement.style.animation = 'fadeIn 0.5s ease-in-out';
    
    const form = document.getElementById("contactForm");
    form.querySelector('form').insertBefore(successElement, form.querySelector('button'));
  }
  
  // Set success message
  successElement.innerHTML = `<i class="uil uil-check-circle"></i> ${message}`;
}

// Add keydown event to detect Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const form = document.getElementById("contactForm");
    if (form && form.style.display === 'block') {
      closeContactForm();
    }
  }
});

// Initialize Three.js Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0); // Pure white transparent background
document.querySelector('.featured-image').appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 4;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create gradient effect with multiple particle systems
const particlesMaterial1 = new THREE.PointsMaterial({
  size: 0.006,
  color: 0x4facfe, // Light blue
  transparent: true,
  opacity: 0.8
});

const particlesMaterial2 = new THREE.PointsMaterial({
  size: 0.006,
  color: 0xff6b6b, // Coral red
  transparent: true,
  opacity: 0.6
});

const particlesMaterial3 = new THREE.PointsMaterial({
  size: 0.006,
  color: 0x00f2fe, // Cyan
  transparent: true,
  opacity: 0.5
});

const particlesMesh1 = new THREE.Points(particlesGeometry, particlesMaterial1);
const particlesMesh2 = new THREE.Points(particlesGeometry, particlesMaterial2);
const particlesMesh3 = new THREE.Points(particlesGeometry, particlesMaterial3);

scene.add(particlesMesh1);
scene.add(particlesMesh2);
scene.add(particlesMesh3);

particlesMesh2.position.set(0.5, -0.5, 0);
particlesMesh3.position.set(-0.5, 0.5, 0);

camera.position.z = 2;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  particlesMesh1.rotation.y += 0.001;
  particlesMesh2.rotation.y -= 0.001;
  particlesMesh3.rotation.x += 0.001;
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
