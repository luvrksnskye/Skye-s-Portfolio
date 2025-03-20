document.addEventListener("DOMContentLoaded", function() {
    const youtubeIcon = document.querySelector(".desktop-icon .youtube");
    const goalsIcon = document.querySelector(".desktop-icon .goals");
    const medicationIcon = document.querySelector(".desktop-icon .pills");
    
    const openWindowSound = new Audio("assets/sounds/kari.wav");
    const closeWindowSound = new Audio("assets/sounds/sqek.mp3");
    const tripSound = new Audio("assets/sounds/trip.mp3"); // You'll need to add this sound
    
    function createWindow(title, content, windowClass) {
        const existingWindow = document.getElementById(windowClass);
        if (existingWindow) {
            if (existingWindow.classList.contains("close-animation")) {
                existingWindow.classList.remove("close-animation");
                return existingWindow;
            }
            return existingWindow;
        }
        
        openWindowSound.play();
        
        const windowElement = document.createElement("div");
        windowElement.className = `window ${windowClass}`;
        windowElement.id = windowClass;
        windowElement.style.position = "absolute";
        windowElement.style.top = "100px";
        windowElement.style.left = "50%";
        windowElement.style.transform = "translateX(-50%)";
        windowElement.style.width = "500px";
        windowElement.style.zIndex = "10000";
        windowElement.setAttribute("data-x", 0);
        windowElement.setAttribute("data-y", 0);
        
        const titleElement = document.createElement("div");
        titleElement.className = "title";
        titleElement.innerHTML = `<span>${title}</span>`;
        
        // Add close button functionality
        titleElement.addEventListener("click", function(e) {
            if (e.offsetX > titleElement.offsetWidth - 30) {
                closeWindow(windowElement);
            }
        });
        
        const contentElement = document.createElement("div");
        contentElement.className = "content";
        contentElement.innerHTML = content;
        
        windowElement.appendChild(titleElement);
        windowElement.appendChild(contentElement);
        
        document.body.appendChild(windowElement);
        
        windowElement.style.opacity = "0";
        windowElement.style.transform = "translateX(-50%) scale(0.9)";
        
        setTimeout(() => {
            windowElement.style.transition = "all 0.3s ease";
            windowElement.style.opacity = "1";
            windowElement.style.transform = "translateX(-50%) scale(1)";
            
            // Remove the transition after initial animation
            setTimeout(() => {
                windowElement.style.transition = "none";
                windowElement.style.transform = "none";
                
                // Make the window draggable after it's fully visible
                makeDraggable(windowElement);
            }, 300);
        }, 10);
        
        return windowElement;
    }
    
    function closeWindow(windowElement) {
        if (!windowElement.classList.contains("close-animation")) {
            windowElement.classList.add("close-animation");
            closeWindowSound.play();
            
            setTimeout(() => {
                windowElement.remove();
            }, 500);
        }
    }
    
    function makeDraggable(element) {
        interact(element)
            .draggable({
                allowFrom: '.title',
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],
                listeners: {
                    start(event) {
                        // Bring window to front when dragging starts
                        element.style.zIndex = getHighestZIndex() + 1;
                    },
                    move(event) {
                        const target = event.target;
                        
                        // Get the current position from data attributes
                        let x = parseFloat(target.getAttribute('data-x')) || 0;
                        let y = parseFloat(target.getAttribute('data-y')) || 0;
                        
                        // Update the position
                        x += event.dx;
                        y += event.dy;
                        
                        // Apply the new position
                        target.style.transform = `translate(${x}px, ${y}px)`;
                        
                        // Store the new position
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    }
                }
            })
            .on('tap', function(event) {
                // Bring window to front when clicked
                element.style.zIndex = getHighestZIndex() + 1;
            });
    }
    
    function getHighestZIndex() {
        let highestZ = 10000;
        const windows = document.querySelectorAll('.window');
        windows.forEach(window => {
            const zIndex = parseInt(window.style.zIndex);
            if (zIndex > highestZ) {
                highestZ = zIndex;
            }
        });
        return highestZ;
    }
    
    function createDistortionEffect() {
        // Create the distortion overlay
        const overlay = document.createElement('div');
        overlay.className = 'distortion-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 99999;
            pointer-events: none;
            mix-blend-mode: overlay;
            opacity: 0;
            transition: opacity 1.5s ease-in;
        `;
        document.body.appendChild(overlay);
        
        // Add video background
        const videoBackground = document.createElement('video');
        videoBackground.src = "assets/trip-overlay.mp4";
        videoBackground.autoplay = true;
        videoBackground.loop = true;
        videoBackground.muted = true;
        videoBackground.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.9;
            mix-blend-mode: screen;
        `;
        overlay.appendChild(videoBackground);
        
        // Create several visual effects layers with more liquid-like animations
        for (let i = 0; i < 5; i++) {
            const layer = document.createElement('div');
            layer.className = `distortion-layer-${i}`;
            layer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(
                    circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                    hsl(${Math.random() * 360}, 100%, 50%), 
                    hsl(${Math.random() * 360}, 100%, 50%)
                );
                opacity: ${0.3 + Math.random() * 0.3};
                mix-blend-mode: ${['overlay', 'difference', 'screen', 'color-dodge'][Math.floor(Math.random() * 4)]};
                animation: liquid-distort-${i} 8s infinite alternate ease-in-out;
                filter: blur(${10 + Math.random() * 15}px) contrast(1.2);
            `;
            overlay.appendChild(layer);
            
            // Create keyframe animation for each layer with smoother transitions
            const keyframes = `
                @keyframes liquid-distort-${i} {
                    0% {
                        transform: translate(${Math.random() * 8 - 4}%, ${Math.random() * 8 - 4}%) scale(${0.9 + Math.random() * 0.3}) rotate(${Math.random() * 5 - 2.5}deg);
                        filter: hue-rotate(0deg) blur(${10 + Math.random() * 15}px) contrast(1.2);
                        border-radius: ${Math.random() * 40}% ${Math.random() * 40}% ${Math.random() * 40}% ${Math.random() * 40}%;
                    }
                    25% {
                        transform: translate(${Math.random() * 8 - 4}%, ${Math.random() * 8 - 4}%) scale(${0.9 + Math.random() * 0.3}) rotate(${Math.random() * 5 - 2.5}deg);
                        filter: hue-rotate(90deg) blur(${10 + Math.random() * 15}px) contrast(1.3);
                        border-radius: ${Math.random() * 40}% ${Math.random() * 40}% ${Math.random() * 40}% ${Math.random() * 40}%;
                    }
                    50% {
                        transform: translate(${Math.random() * 8 - 4}%, ${Math.random() * 8 - 4}%) scale(${0.9 + Math.random() * 0.3}) rotate(${Math.random() * 5 - 2.5}deg);
                        filter: hue-rotate(180deg) blur(${10 + Math.random() * 15}px) contrast(1.4);
                        border-radius: ${Math.random() * 40}% ${Math.random() * 40}% ${Math.random() * 40}% ${Math.random() * 40}%;
                    }
                    75% {
                        transform: translate(${Math.random() * 8 - 4}%, ${Math.random() * 8 - 4}%) scale(${0.9 + Math.random() * 0.3}) rotate(${Math.random() * 5 - 2.5}deg);
                        filter: hue-rotate(270deg) blur(${10 + Math.random() * 15}px) contrast(1.3);
                        border-radius: ${Math.random() * 40}% ${Math.random() * 40}% ${Math.random() * 40}% ${Math.random() * 40}%;
                    }
                    100% {
                        transform: translate(${Math.random() * 8 - 4}%, ${Math.random() * 8 - 4}%) scale(${0.9 + Math.random() * 0.3}) rotate(${Math.random() * 5 - 2.5}deg);
                        filter: hue-rotate(360deg) blur(${10 + Math.random() * 15}px) contrast(1.2);
                        border-radius: ${Math.random() * 40}% ${Math.random() * 40}% ${Math.random() * 40}% ${Math.random() * 40}%;
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.innerHTML = keyframes;
            document.head.appendChild(style);
        }
        
        // Create distortion canvas with WebGL for more advanced effects
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100000;
            pointer-events: none;
            mix-blend-mode: overlay;
            opacity: 0.5;
        `;
        overlay.appendChild(canvas);
        
        // Create liquid bubble shapes that float around
        for (let i = 0; i < 15; i++) {
            const bubble = document.createElement('div');
            const size = 60 + Math.random() * 140;
            
            bubble.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                background-color: hsl(${Math.random() * 360}, 100%, 50%);
                opacity: ${0.2 + Math.random() * 0.2};
                mix-blend-mode: ${['overlay', 'difference', 'screen', 'color-dodge'][Math.floor(Math.random() * 4)]};
                filter: blur(${5 + Math.random() * 15}px);
                z-index: ${100000 + i};
                pointer-events: none;
                animation: liquid-bubble-${i} ${5 + Math.random() * 10}s infinite alternate ease-in-out;
                border-radius: 50%;
                box-shadow: inset 0 0 ${10 + Math.random() * 30}px rgba(255, 255, 255, 0.5);
            `;
                
            overlay.appendChild(bubble);
            
            const bubbleKeyframes = `
                @keyframes liquid-bubble-${i} {
                    0% {
                        transform: translate(0, 0) scale(1);
                        background-color: hsl(${Math.random() * 360}, 100%, 50%);
                        border-radius: 50%;
                    }
                    33% {
                        transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(${0.7 + Math.random() * 0.6});
                        background-color: hsl(${Math.random() * 360}, 100%, 50%);
                        border-radius: ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}%;
                    }
                    66% {
                        transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(${0.7 + Math.random() * 0.6});
                        background-color: hsl(${Math.random() * 360}, 100%, 50%);
                        border-radius: ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}%;
                    }
                    100% {
                        transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(${0.7 + Math.random() * 0.6});
                        background-color: hsl(${Math.random() * 360}, 100%, 50%);
                        border-radius: ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}%;
                    }
                }
            `;
            
            const bubbleStyle = document.createElement('style');
            bubbleStyle.innerHTML = bubbleKeyframes;
            document.head.appendChild(bubbleStyle);
        }
        
 // Use the proper trippy sound
const tripSound = new Audio("assets/sounds/trippy.mp3");
tripSound.volume = 0.5;
tripSound.play();

// Fade in the overlay
setTimeout(() => {
    overlay.style.opacity = '1';
}, 10);

// Start the fade out transition 3 seconds before the effect ends
setTimeout(() => {
    overlay.style.transition = 'opacity 3s ease-out';
    overlay.style.opacity = '0';
    
    // Also start fading out the sound
    const fadeAudio = setInterval(() => {
        // Reduce volume by 0.05 every 100ms
        if (tripSound.volume > 0.05) {
            tripSound.volume -= 0.05;
        } else {
            tripSound.volume = 0;
            clearInterval(fadeAudio);
        }
    }, 100);
}, 12000); // 15 - 3 = 12 seconds

// Remove all effects after 15 seconds
setTimeout(() => {
    overlay.remove();
    videoBackground.pause();
    Array.from(document.querySelectorAll('style')).forEach(style => {
        if (style.innerHTML.includes('liquid-distort-') || 
            style.innerHTML.includes('liquid-bubble-')) {
            style.remove();
        }
    });
    
    // Remove any shapes we created
    document.querySelectorAll('div').forEach(div => {
        if (div.style.mixBlendMode && div.style.pointerEvents === 'none' && 
            div.parentElement && div.parentElement.className === 'distortion-overlay') {
            div.remove();
        }
    });
    
    // The sound should already be faded out, now stop it completely
    tripSound.pause();
    tripSound.currentTime = 0;
}, 60000);
    }
    
    const youtubeContent = `
        <div style="text-align: center;">
            <h3>Skye's Favorite Music</h3>
            <p>Enjoy some relaxing music while you browse my portfolio! <emj>♪</emj></p>
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px; border: 2px solid var(--skye-border-color); box-shadow: 0 4px 8px rgba(255, 174, 198, 0.3);">
                <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                    src="https://www.youtube.com/embed/vjAo8TPF8CU?autoplay=0" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div style="margin-top: 15px;">
                <p>More of my favorites:</p>
                <div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
                    <div class="button youtube-link" data-id="Pn61zKFkf2A">Nintendo music</div>
                    <div class="button youtube-link" data-id="Xb2CiR8XT2w">Undertale music</div>
                    <div class="button youtube-link" data-id="lTRiuFIWV54">Ghibli Lofi</div>
                </div>
            </div>
        </div>
    `;
    
    const goalsContent = `
        <div>
            <h3>Skye's Goals for 2025</h3>
            <div class="task-item">
                <h4>Learning Goals</h4>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="goal1">
                    <label for="goal1">Master React and build a complete web application</label>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="goal2">
                    <label for="goal2">Learn advanced CSS animations and effects</label>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="goal3">
                    <label for="goal3">Complete courses on UI/UX design</label>
                </div>
            </div>
            
            <div class="task-item">
                <h4>Creative Goals</h4>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="goal4">
                    <label for="goal4">Get a graphics tablet and learn digital art</label>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="goal5">
                    <label for="goal5">Create my own UI assets and icon set</label>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="goal6">
                    <label for="goal6">Design and code a small web game</label>
                </div>
            </div>
            
            <div class="task-item">
                <h4>Project Goals</h4>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="goal7">
                    <label for="goal7">Launch Echo Studios website</label>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="goal8">
                    <label for="goal8">Finish Selysunny's art portfolio site</label>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="goal9">
                    <label for="goal9">Create a website for Cream's Cafe characters</label>
                </div>
            </div>
            
        </div>
    `;
    
    if (youtubeIcon) {
        youtubeIcon.addEventListener("click", function() {
            const youtubeWindow = createWindow("YouTube Music", youtubeContent, "window-youtube");
            
            setTimeout(() => {
                const youtubeLinks = document.querySelectorAll('.youtube-link');
                youtubeLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        const videoId = this.getAttribute('data-id');
                        const iframe = youtubeWindow.querySelector('iframe');
                        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                    });
                });
            }, 100);
        });
    }
    
    if (goalsIcon) {
        goalsIcon.addEventListener("click", function() {
            const goalsWindow = createWindow("My Goals", goalsContent, "window-goals");
            
            setTimeout(() => {
                const addGoalBtn = document.getElementById('add-goal-btn');
                if (addGoalBtn) {
                    addGoalBtn.addEventListener('click', function() {
                        const newGoalInput = document.getElementById('new-goal');
                        const goalText = newGoalInput.value.trim();
                        
                        if (goalText) {
                            const goalId = 'goal-' + Date.now();
                            
                            const goalContainer = document.createElement('div');
                            goalContainer.style.display = 'flex';
                            goalContainer.style.alignItems = 'center';
                            goalContainer.style.marginBottom = '10px';
                            goalContainer.innerHTML = `
                                <input type="checkbox" id="${goalId}">
                                <label for="${goalId}">${goalText}</label>
                            `;
                            
                            const addGoalSection = newGoalInput.closest('.task-item');
                            addGoalSection.parentNode.insertBefore(goalContainer, addGoalSection);
                            
                            newGoalInput.value = '';
                            
                            openWindowSound.play();
                        }
                    });
                }
                
                const checkboxes = goalsWindow.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    const savedState = localStorage.getItem(checkbox.id);
                    if (savedState === 'true') {
                        checkbox.checked = true;
                    }
                    
                    checkbox.addEventListener('change', function() {
                        localStorage.setItem(this.id, this.checked);
                        
                        if (this.checked) {
                            const achievementSound = new Audio("assets/sounds/kari.wav");
                            achievementSound.play();
                            
                            const star = document.createElement('img');
                            star.src = 'assets/heart.png';
                            star.style.position = 'absolute';
                            star.style.width = '20px';
                            star.style.height = '20px';
                            star.style.left = (this.offsetLeft + this.offsetWidth) + 'px';
                            star.style.top = this.offsetTop + 'px';
                            star.style.zIndex = '10001';
                            star.style.pointerEvents = 'none';
                            star.style.animation = 'floatUp 1.5s ease-in-out forwards';
                            
                            this.parentNode.appendChild(star);
                            
                            setTimeout(() => {
                                star.remove();
                            }, 1500);
                        }
                    });
                });
            }, 100);
        });
    }
    
    if (medicationIcon) {
        medicationIcon.addEventListener("click", function() {
            const medicationContent = `
                <div style="display: flex; gap: 20px; align-items: center;">
                    <div style="display: flex; flex-direction: column; align-items: center; width: 150px;">
                        <img src="assets/meds.png" class="medication-img" style="width: 120px; cursor: pointer; cursor: url('assets/click.png'), auto;" />
                        <div class="button medication-btn" style="margin-top: 15px;">Go</div>
                    </div>
                    <div style="flex: 1;">
                        <h3>Skye's Med Cabinet</h3>
                        <p>It's like happiness in a bottle, except it's just chemicals tricking your brain into functioning!</p>
                        <p>Click the bottle for a refreshing dose of pixel placebo! Side effects may include: temporary joy and scrolling productivity.</p>
                    </div>
                </div>
            `;
            
            const medicationWindow = createWindow("Medication", medicationContent, "window-medication");
            
            setTimeout(() => {
                const medicationImg = medicationWindow.querySelector('.medication-img');
                const medicationBtn = medicationWindow.querySelector('.medication-btn');
                
                function shakeMedication() {
                    medicationImg.style.animation = 'none';
                    // Trigger reflow
                    void medicationImg.offsetWidth;
                    medicationImg.style.animation = 'jump 0.5s ease';
                    
                    // Create floating hearts
                    const heart = document.createElement('img');
                    heart.src = 'assets/heart.png';
                    heart.style.position = 'absolute';
                    heart.style.width = '20px';
                    heart.style.height = '20px';
                    heart.style.left = (medicationImg.offsetLeft + medicationImg.offsetWidth/2) + 'px';
                    heart.style.top = medicationImg.offsetTop + 'px';
                    heart.style.zIndex = '10001';
                    heart.style.pointerEvents = 'none';
                    heart.style.animation = 'floatUp 1.5s ease-in-out forwards';
                    
                    medicationImg.parentNode.appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, 1500);
                    
                    // Play sound
                    const medicationSound = new Audio("assets/sounds/kari.wav");
                    medicationSound.play();
                }
                
                if (medicationImg) {
                    medicationImg.addEventListener('click', shakeMedication);
                }
                
                if (medicationBtn) {
                    // Replace the normal click function with the distortion effect
                    medicationBtn.addEventListener('click', function() {
                        // Play a more psychedelic sound
                        const tripSound = new Audio("assets/sounds/kari.wav");
                        tripSound.playbackRate = 0.5;
                        tripSound.volume = 0.7;
                        tripSound.play();
                        
                        // Trigger the extreme distortion effect
                        createDistortionEffect();
                    });
                }
            }, 100);
        });
    }
    
    
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            const img = this.querySelector('img');
            if (img) {
                if (img.classList.contains('youtube')) {
                    e.preventDefault();
                    youtubeIcon.click();
                } else if (img.classList.contains('goals')) {
                    e.preventDefault();
                    goalsIcon.click();
                } else if (img.classList.contains('medication')) {
                    e.preventDefault();
                    medicationIcon.click();
                }
            }
        });
    });
    
    // Add click event to bring any window to front when clicked
    document.addEventListener('mousedown', function(event) {
        const window = event.target.closest('.window');
        if (window) {
            window.style.zIndex = getHighestZIndex() + 1;
        }
    });
});