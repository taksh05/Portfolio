/* ==========================================================================
   Tactile & Visual Premium 3D Engine - Taksh Paneri Portfolio
   ========================================================================== */

// --- Project Data for Modals ---
const projectData = {
    "3d-model-display": {
        title: "3D-Model-Display",
        subtitle: "React, Three.js, Model-Viewer, Sketchfab",
        desc: "A highly interactive 3D WebGL model viewer enabling browser-native rendering of heavy CAD models and optimized OBJ/FBX assets. Built to streamline 3D asset presentation with zero external plugins.",
        bullets: [
            "Optimized high-poly assets (reduced polygon counts by 65% in Blender, converted textures to KTX2/WebP).",
            "Integrated Google Model-Viewer and Sketchfab API for quick-embed and customized frame controls.",
            "Features fully customized orbital rotations, zoom limits, panning, studio-glowing lighting presets, and wireframe toggles."
        ],
        github: "https://github.com/taksh05/xr.git",
        live: null
    },
    "student-assignment": {
        title: "Student Assignment Portal",
        subtitle: "MongoDB, Express.js, React, Node.js (MERN)",
        desc: "A secure, scalable workspace managing student assignments, grading, submissions, and administrative communications. Features clean, isolated dashboard environments for students, teachers, and admins.",
        bullets: [
            "Built modular REST APIs utilizing Express.js and managed schemas in MongoDB Atlas.",
            "Implemented secure JSON Web Token (JWT) authorization protocols alongside Bcrypt password hashing.",
            "Created responsive grading interfaces featuring drag-and-drop file upload capabilities and real-time email triggers."
        ],
        github: "https://github.com/taksh05/Assignment-Portal.git",
        live: null
    },
    "gesture-recogniser": {
        title: "Smart Hand Gesture Recogniser",
        subtitle: "TensorFlow.js, MediaPipe, HTML5, CSS3, JavaScript",
        desc: "A computer vision model operating entirely client-side, interpreting video stream feeds into system and browser commands. Creates a hands-free navigation layer for users.",
        bullets: [
            "Integrated TensorFlow.js MediaPipe Hands model to map hand landmark coordinates in real-time.",
            "Formulated custom mathematical algorithms analyzing distance and angles between finger coordinates to classify gestures.",
            "Designed a highly efficient client-side structure running at 30+ FPS, ensuring absolute data privacy."
        ],
        github: "https://github.com/taksh05/HAND-GESTURE",
        live: null
    },
    "student-hub": {
        title: "Smart Student Hub",
        subtitle: "HTML5, CSS3, JavaScript, LocalStorage",
        desc: "A local dashboard utility helping students manage tasks, note archives, exams schedules, and class progress trackers.",
        bullets: [
            "Implemented Client-side LocalStorage to persist user schedules and notes with zero server overhead.",
            "Designed an interactive calendar grid displaying upcoming deadlines.",
            "Features modern UI themes with fully customizable glassmorphic colors."
        ],
        github: "https://github.com/taksh05/Smart-Student-Hub",
        live: null
    },
    "art-craft": {
        title: "Kala Connect (Art & Craft)",
        subtitle: "A-Frame, HTML5, CSS3, WebVR",
        desc: "An immersive WebVR virtual gallery that connects local traditional artisans with global buyers, showcasing high-fidelity 3D representations of physical crafts.",
        bullets: [
            "Constructed virtual exhibition rooms using A-Frame primitives and custom GLTF models.",
            "Optimized texture resolutions and mesh geometries in Blender to allow smooth VR navigation on mobile headsets.",
            "Engineered proximity-based audio and raycasted descriptions when looking at specific artwork nodes."
        ],
        github: "https://github.com/Kavirajsinghv21/Kala_Connect/invitations",
        live: null
    },
    "exafix": {
        title: "ExaFIX",
        subtitle: "HTML5, CSS3, JavaScript, REST APIs",
        desc: "A diagnostic repair guide portal presenting automated system status monitors and visual diagnostic checklists for systems administrators.",
        bullets: [
            "Constructed highly clean, responsive layout tables displaying server latency and package data in real-time.",
            "Implemented custom CSS animations for neon status indicator alerts.",
            "Optimized codebase to ensure load times under 300ms."
        ],
        github: null,
        live: "https://34.28.117.27/"
    }
};

// --- Initialization Variables ---
let scene, camera, renderer, clock;
let particles, particleGeometry;
const particleCount = 4500;

// State Machine for scrolling and morphing
const scrollState = { progress: 0 };
const particleStates = [];

// Mouse tracking
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

// --- Custom Cursor Logic ---
function initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const glow = document.querySelector('.custom-cursor-glow');

    window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Add a slight lag to the outer glow for premium organic motion
        gsap.to(glow, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.15,
            ease: "power2.out"
        });
        
        // Map mouse coords (-1 to 1) for Three.js camera parallax
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Add Hover states to interactive elements
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag-badge, .timeline-content, .achievement-card, .form-group input, .form-group textarea');
    hoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        elem.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// --- Mobile Nav Drawer ---
function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const links = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        toggle.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : 'auto';
    }

    toggle.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', toggleMenu));
}

// --- Modal System ---
function initModals() {
    const modalOverlay = document.getElementById('project-modal');
    const modalClose = modalOverlay.querySelector('.modal-close');
    const modalBody = modalOverlay.querySelector('.modal-body');
    const triggers = document.querySelectorAll('.modal-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectId = trigger.getAttribute('data-modal');
            const data = projectData[projectId];
            if (!data) return;

            // Populate Modal
            let bulletHTML = "";
            if (data.bullets) {
                bulletHTML = `<ul class="modal-bullet-list">` + 
                    data.bullets.map(b => `<li>${b}</li>`).join('') + 
                    `</ul>`;
            }

            let actionsHTML = "";
            if (data.github) {
                actionsHTML += `<a href="${data.github}" target="_blank" class="btn btn-primary btn-glow"><i class="fab fa-github"></i> View Repository</a>`;
            }
            if (data.live) {
                actionsHTML += `<a href="${data.live}" target="_blank" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Live Site</a>`;
            }

            modalBody.innerHTML = `
                <h3 class="modal-title">${data.title}</h3>
                <h4 class="modal-subtitle">${data.subtitle}</h4>
                
                <h4 class="modal-section-title">Overview</h4>
                <p class="modal-desc">${data.desc}</p>
                
                <h4 class="modal-section-title">Key Contributions</h4>
                ${bulletHTML}
                
                <div class="modal-actions">
                    ${actionsHTML}
                </div>
            `;

            modalOverlay.classList.add('active');
        });
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

// --- Three.js Programmatic Particle Glow Texture ---
function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Create radial gradient for a soft spherical neon glow
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.15, 'rgba(0, 240, 255, 0.9)');
    grad.addColorStop(0.4, 'rgba(189, 0, 255, 0.45)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
}

// --- Generate Particle States (Coordinate Math) ---
function generateParticleStates() {
    const states = {
        hero: new Float32Array(particleCount * 3),
        about: new Float32Array(particleCount * 3),
        projects: new Float32Array(particleCount * 3),
        skills: new Float32Array(particleCount * 3),
        journey: new Float32Array(particleCount * 3),
        contact: new Float32Array(particleCount * 3)
    };

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // 1. HERO STATE - 3D Digital Wave Plane Grid
        const cols = 60;
        const rows = 75;
        const col = i % cols;
        const row = Math.floor(i / cols);
        
        // Map grid coordinates to 3D space
        const x = ((col / cols) - 0.5) * 16.0; // range: -8.0 to 8.0
        const z = ((row / rows) - 0.5) * 16.0; // range: -8.0 to 8.0
        const y = -1.2; // Base height floor
        
        states.hero[i3] = x;
        states.hero[i3 + 1] = y;
        states.hero[i3 + 2] = z;

        // 2. ABOUT STATE - Double Helix
        const strand = i % 2 === 0 ? 1 : -1;
        const helixAngle = (i / particleCount) * Math.PI * 14; // 7 full loops
        const helixRadius = 1.8;
        states.about[i3] = helixRadius * Math.cos(helixAngle) * strand;
        states.about[i3 + 1] = ((i / particleCount) - 0.5) * 8.5; // Vertical alignment
        states.about[i3 + 2] = helixRadius * Math.sin(helixAngle) * strand;

        // 3. PROJECTS STATE - Nested Flat Concentric Rings
        const ring = i % 3;
        const ringRadius = 1.5 + ring * 1.6;
        const ringAngle = Math.random() * Math.PI * 2;
        states.projects[i3] = ringRadius * Math.cos(ringAngle);
        states.projects[i3 + 1] = (Math.random() - 0.5) * 0.3; // Tiny vertical jitter
        states.projects[i3 + 2] = ringRadius * Math.sin(ringAngle);

        // 4. SKILLS STATE - Exploded Star Dome / Point Sphere Grid
        const skillsTheta = Math.random() * Math.PI * 2;
        const skillsPhi = Math.acos((Math.random() * 2) - 1);
        const skillsRadius = 3.6;
        states.skills[i3] = skillsRadius * Math.sin(skillsPhi) * Math.cos(skillsTheta);
        states.skills[i3 + 1] = skillsRadius * Math.sin(skillsPhi) * Math.sin(skillsTheta);
        states.skills[i3 + 2] = skillsRadius * Math.cos(skillsPhi);

        // 5. EXPERIENCE (JOURNEY) STATE - Cylindrical Tunnel Grid
        const tunnelTheta = Math.random() * Math.PI * 2;
        const tunnelRadius = 2.6;
        states.journey[i3] = tunnelRadius * Math.cos(tunnelTheta);
        states.journey[i3 + 1] = tunnelRadius * Math.sin(tunnelTheta);
        states.journey[i3 + 2] = ((i / particleCount) - 0.5) * 24.0; // Long depth tunnel along Z axis

        // 6. CONTACT STATE - Logarithmic Vortex
        const vortexTheta = (i / particleCount) * Math.PI * 36; // Multi-spiral
        const vortexRadius = Math.pow((i / particleCount), 0.45) * 5.5;
        states.contact[i3] = vortexRadius * Math.cos(vortexTheta);
        states.contact[i3 + 1] = (Math.random() - 0.5) * 0.4;
        states.contact[i3 + 2] = vortexRadius * Math.sin(vortexTheta);
    }

    particleStates.push(states.hero, states.about, states.projects, states.skills, states.journey, states.contact);
}

// --- Camera Animation Paths ---
const cameraStates = [
    { pos: new THREE.Vector3(0, 1.8, 6.8), lookAt: new THREE.Vector3(0, -0.6, 0) },   // Hero (Tilted look over the waves)
    { pos: new THREE.Vector3(-3.2, 0.4, 6.8), lookAt: new THREE.Vector3(1.2, 0, 0) },  // About
    { pos: new THREE.Vector3(3.2, 2.0, 7.2), lookAt: new THREE.Vector3(-1.0, 0, 0) },   // Projects
    { pos: new THREE.Vector3(-2.8, -0.5, 6.2), lookAt: new THREE.Vector3(1.0, 0.2, 0) },// Skills
    { pos: new THREE.Vector3(0, 0, 11.5), lookAt: new THREE.Vector3(0, 0, -4.0) },    // Journey (look deep down Z tunnel)
    { pos: new THREE.Vector3(0, 0, 7.0), lookAt: new THREE.Vector3(0, 0, 0) }         // Contact
];

// --- Core WebGL Engine Setup ---
function initThree() {
    const canvas = document.getElementById('webgl-canvas');

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03030c, 0.04); // Cyber-mist

    // Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.copy(cameraStates[0].pos);
    camera.lookAt(cameraStates[0].lookAt);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 0.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xbd00ff, 0.8);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    // Particles Setup
    clock = new THREE.Clock();
    generateParticleStates();

    // Base geometry starts with HERO coordinates
    particleGeometry = new THREE.BufferGeometry();
    const initialPositions = new Float32Array(particleStates[0]);
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(initialPositions, 3));

    // Material utilizing custom canvas glow texture
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        sizeAttenuation: true,
        transparent: true,
        alphaMap: createGlowTexture(),
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xffffff
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Resize Handler
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// --- GSAP Scrolltrigger Bindings ---
function initScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('section');
    const numSections = sections.length;

    // Track scroll bar progress and map it to our state machine (scrollState.progress ranges from 0 to numSections - 1)
    gsap.to(scrollState, {
        progress: numSections - 1,
        ease: "none",
        scrollTrigger: {
            trigger: "#content-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.0,
            onUpdate: (self) => {
                // Update header background scroll layout class
                const header = document.querySelector('header');
                if (self.scroll() > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Update scroll progress bar width
                const scrollProgress = document.getElementById('scroll-progress');
                scrollProgress.style.width = (self.progress * 100) + '%';
            }
        }
    });

    // Add fading & sliding animations to HTML card overlays
    sections.forEach((section, idx) => {
        if (idx === 0) return; // Skip hero section

        const card = section.querySelector('.glass-card') || section.querySelector('.grid') || section.querySelector('.timeline');
        if (!card) return;

        gsap.fromTo(card, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    end: "top 35%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

// --- Optimized Render Loop ---
function renderLoop() {
    requestAnimationFrame(renderLoop);

    const elapsedTime = clock.getElapsedTime();

    // Mouse Parallax interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Scroll Interpolation States
    const progress = scrollState.progress;
    const baseStateIdx = Math.floor(progress);
    const targetStateIdx = Math.min(baseStateIdx + 1, particleStates.length - 1);
    const lerpFactor = progress - baseStateIdx;

    // Interpolate Camera Positions & Target LookAt Vectors
    const currentCamPos = new THREE.Vector3();
    const currentLookAt = new THREE.Vector3();

    currentCamPos.lerpVectors(cameraStates[baseStateIdx].pos, cameraStates[targetStateIdx].pos, lerpFactor);
    currentLookAt.lerpVectors(cameraStates[baseStateIdx].lookAt, cameraStates[targetStateIdx].lookAt, lerpFactor);

    // Apply mouse parallax to camera position
    camera.position.x = currentCamPos.x + mouse.x * 0.4;
    camera.position.y = currentCamPos.y + mouse.y * 0.4;
    camera.position.z = currentCamPos.z;
    camera.lookAt(currentLookAt);

    // Interpolate Particle Coordinates + Add Simplex Simulating Sine Oscillations
    const posAttribute = particleGeometry.attributes.position;
    const posArray = posAttribute.array;
    const baseCoords = particleStates[baseStateIdx];
    const targetCoords = particleStates[targetStateIdx];

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        let x1 = baseCoords[i3];
        let y1 = baseCoords[i3 + 1];
        let z1 = baseCoords[i3 + 2];

        // Apply moving ripple wave specifically for Hero state (idx 0)
        if (baseStateIdx === 0) {
            const distance = Math.sqrt(x1 * x1 + z1 * z1);
            const waveHeight = Math.sin(distance * 0.55 - elapsedTime * 2.4) * 0.45 + Math.cos(x1 * 0.35 + elapsedTime * 1.6) * 0.25;
            y1 += waveHeight;
        }

        let x2 = targetCoords[i3];
        let y2 = targetCoords[i3 + 1];
        let z2 = targetCoords[i3 + 2];

        if (targetStateIdx === 0) {
            const distance = Math.sqrt(x2 * x2 + z2 * z2);
            const waveHeight = Math.sin(distance * 0.55 - elapsedTime * 2.4) * 0.45 + Math.cos(x2 * 0.35 + elapsedTime * 1.6) * 0.25;
            y2 += waveHeight;
        }

        // Base linear interpolation between sections
        let x = x1 + (x2 - x1) * lerpFactor;
        let y = y1 + (y2 - y1) * lerpFactor;
        let z = z1 + (z2 - z1) * lerpFactor;

        // Add subtle organic waving for non-Hero sections (when we scroll down)
        if (baseStateIdx > 0) {
            const waveFreq = 1.2 + baseStateIdx * 0.2;
            const waveAmp = 0.05 + Math.sin(elapsedTime * 0.5) * 0.01;
            const noise = Math.sin(elapsedTime * waveFreq + i * 0.04) * waveAmp;
            x += noise;
            y += noise;
            z += noise;
        }

        posArray[i3] = x;
        posArray[i3 + 1] = y;
        posArray[i3 + 2] = z;
    }
    posAttribute.needsUpdate = true;

    // Rotate the particle system as a whole
    particles.rotation.y = elapsedTime * 0.04;
    // Add additional rotations depending on the state
    if (baseStateIdx === 1) {
        particles.rotation.x = elapsedTime * 0.02; // Twist DNA double helix
    } else if (baseStateIdx === 5) {
        particles.rotation.z = elapsedTime * 0.08; // Swirl vortex
    } else {
        particles.rotation.x = 0;
        particles.rotation.z = 0;
    }

    renderer.render(scene, camera);
}

// --- Contact Form Submission (FormSubmit.co API) ---
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.form-submit-btn');
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending... <i class="fas fa-spinner fa-spin"></i>`;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        fetch("https://formsubmit.co/ajax/takshpaneri05@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === "true" || data.success === true) {
                showFormAlert("Message sent successfully! FormSubmit will email you once to activate this form.", "success");
                form.reset();
            } else {
                showFormAlert("Something went wrong. Please try again.", "error");
            }
        })
        .catch(error => {
            console.error(error);
            showFormAlert("Network error. Please try again.", "error");
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        });
    });
}


function showFormAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `form-alert glass-card ${type === 'success' ? 'alert-success' : 'alert-error'}`;
    alertBox.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        padding: 1.2rem 2rem;
        border-radius: 12px;
        font-family: var(--font-primary);
        font-size: 0.95rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s;
        pointer-events: auto;
    `;

    if (type === 'success') {
        alertBox.style.borderColor = 'var(--color-cyan)';
        alertBox.style.boxShadow = '0 10px 30px rgba(0, 240, 255, 0.2)';
        alertBox.innerHTML = `<i class="fas fa-check-circle" style="color: var(--color-cyan); margin-right: 0.8rem;"></i> ${message}`;
    } else {
        alertBox.style.borderColor = 'var(--color-magenta)';
        alertBox.style.boxShadow = '0 10px 30px rgba(255, 0, 122, 0.2)';
        alertBox.innerHTML = `<i class="fas fa-exclamation-circle" style="color: var(--color-magenta); margin-right: 0.8rem;"></i> ${message}`;
    }

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.transform = 'translateY(0)';
        alertBox.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        alertBox.style.transform = 'translateY(100px)';
        alertBox.style.opacity = '0';
        setTimeout(() => {
            alertBox.remove();
        }, 400);
    }, 6000);
}

// --- Start Application ---
window.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initMobileNav();
    initModals();
    initContactForm();
    initThree();
    initScrollTrigger();
    renderLoop();
});

const roles = [
  "MERN Stack Developer",
  "AR/VR Developer",
  "WebGL Enthusiast",
  "Google Student Ambassador",
  "AI Explorer",
  "Hackathon Winner"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typedText = document.getElementById("typed-text");

function typeEffect() {

    const currentWord = roles[roleIndex];

    if(!deleting){
        typedText.textContent =
            currentWord.substring(0,charIndex+1);

        charIndex++;

        if(charIndex === currentWord.length){
            deleting = true;
            setTimeout(typeEffect,1500);
            return;
        }

    }else{

        typedText.textContent =
            currentWord.substring(0,charIndex-1);

        charIndex--;

        if(charIndex === 0){
            deleting = false;
            roleIndex =
                (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect,deleting ? 50 : 100);
}

typeEffect();