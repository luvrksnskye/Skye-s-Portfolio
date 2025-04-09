document.addEventListener("DOMContentLoaded", function() {
    const youtubeIcon = document.querySelector(".desktop-icon .youtube");
    const goalsIcon = document.querySelector(".desktop-icon .goals");
    const medicationIcon = document.querySelector(".desktop-icon .pills");
    
    const openWindowSound = new Audio("assets/sounds/kari.wav");
    const closeWindowSound = new Audio("assets/sounds/sqek.mp3");
    const tripSound = new Audio("assets/sounds/trip.mp3"); 
    
    let medicationAbuseCount = 0;
    
    const warningMessages = [
        "Stop doing that.",
        "Those aren't for recreational use.",
        "I'm watching you.",
        "That's not how medication works.",
        "Seriously?",
        "Do NOT take more than prescribed.",
        "Those are expensive, you know.",
        "This is your brain on pixels.",
        "Digital drugs aren't real drugs.",
        "Your insurance won't cover this abuse.",
        "The pharmacy called. They're concerned.",
        "404: Responsibility not found.",
        "Error: Human judgment malfunction.",
        "Are you having fun yet?",
        "Your digital doctor is disappointed.",
        "Pixel pills have pixel consequences.",
        "Side effects include: this warning.",
        "Your browser history will show this.",
        "The NSA has noted your activity.",
        "Try drinking digital water instead."
    ];
    
    const angryWarningMessages = [
        "I SAID STOP!",
        "THIS IS NOT A GAME!",
        "DO YOU THINK THIS IS FUNNY?",
        "MEDICATION ABUSE IS SERIOUS!",
        "YOUR VIRTUAL LICENSE IS REVOKED!",
        "THIS IS YOUR LAST WARNING!",
        "SYSTEM ALERT: USER VIOLATION!",
        "ENOUGH ALREADY!",
        "STOP CLICKING THAT BUTTON!",
        "ADMIN OVERRIDE IMMINENT!",
        "YOU'RE GOING TO BREAK THE SYSTEM!",
        "DIGITAL INTERVENTION REQUIRED!",
        "EMERGENCY SHUTDOWN PROTOCOL INITIATED!",
        "THIS IS WHY WE CAN'T HAVE NICE THINGS!",
        "ACCESS WILL BE RESTRICTED!"
    ];
    
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
        windowElement.style.top = "10px";
        windowElement.style.left = "30%";
        windowElement.style.transform = "translateX(-50%)";
        windowElement.style.width = "500px";
        windowElement.style.zIndex = "10000";
        windowElement.setAttribute("data-x", 0);
        windowElement.setAttribute("data-y", 0);
        
        const titleElement = document.createElement("div");
        titleElement.className = "title";
        titleElement.innerHTML = `<span>${title}</span>`;
        
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
            
            setTimeout(() => {
                windowElement.style.transition = "none";
                windowElement.style.transform = "none";
                
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
                        element.style.zIndex = getHighestZIndex() + 1;
                    },
                    move(event) {
                        const target = event.target;
                        
                        let x = parseFloat(target.getAttribute('data-x')) || 0;
                        let y = parseFloat(target.getAttribute('data-y')) || 0;
                        
                        x += event.dx;
                        y += event.dy;
                        
                        target.style.transform = `translate(${x}px, ${y}px)`;
                        
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    }
                }
            })
            .on('tap', function(event) {
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
        const overlay = document.createElement('div');
        overlay.className = 'distortion-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            z-index: 1000;
            pointer-events: none;
            mix-blend-mode: difference;
            opacity: 0;
            transition: opacity 1.5s ease-in;
        `;
        document.body.appendChild(overlay);
        
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
            opacity: 0.5;
            mix-blend-mode: screen;
        `;
        overlay.appendChild(videoBackground);
        
        for (let i = 0; i < 10; i++) {
            const layer = document.createElement('div');
            layer.className = `distortion-layer-${i}`;
            layer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1000000;
                background: radial-gradient(
                    circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                    hsla(${Math.random() * 360}, 60%, 85%, 0.4),
                    hsla(${Math.random() * 360}, 50%, 80%, 0.2)
                );
                opacity: ${0.2 + Math.random() * 0.2};
                mix-blend-mode: ${['overlay', 'soft-light', 'screen'][Math.floor(Math.random() * 3)]};
                animation: liquid-distort-${i} ${5 + Math.random() * 8}s infinite alternate ease-in-out;
                filter: blur(${8 + Math.random() * 20}px) contrast(0.9);
                transform-origin: ${Math.random() * 100}% ${Math.random() * 100}%;
            `;
            overlay.appendChild(layer);
            
            const keyframes = `
                @keyframes liquid-distort-${i} {
                    0% {
                        transform: translate(${Math.random() * 10 - 5}%, ${Math.random() * 10 - 5}%) scale(${0.8 + Math.random() * 0.5}) rotate(${Math.random() * 10 - 5}deg);
                        filter: hue-rotate(0deg) blur(${10 + Math.random() * 20}px) contrast(0.9) saturate(0.8);
                        border-radius: ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}%;
                        background: radial-gradient(
                            circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                            hsla(${Math.random() * 360}, 60%, 85%, 0.4),
                            hsla(${Math.random() * 360}, 50%, 80%, 0.2)
                        );
                    }
                    25% {
                        transform: translate(${Math.random() * 10 - 5}%, ${Math.random() * 10 - 5}%) scale(${0.8 + Math.random() * 0.5}) rotate(${Math.random() * 10 - 5}deg);
                        filter: hue-rotate(90deg) blur(${10 + Math.random() * 20}px) contrast(0.9) saturate(0.8);
                        border-radius: ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}%;
                        background: radial-gradient(
                            circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                            hsla(${Math.random() * 360}, 60%, 85%, 0.4),
                            hsla(${Math.random() * 360}, 50%, 80%, 0.2)
                        );
                    }
                    50% {
                        transform: translate(${Math.random() * 10 - 5}%, ${Math.random() * 10 - 5}%) scale(${0.8 + Math.random() * 0.5}) rotate(${Math.random() * 10 - 5}deg);
                        filter: hue-rotate(180deg) blur(${10 + Math.random() * 20}px) contrast(0.9) saturate(0.8);
                        border-radius: ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}%;
                        background: radial-gradient(
                            circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                            hsla(${Math.random() * 360}, 60%, 85%, 0.4),
                            hsla(${Math.random() * 360}, 50%, 80%, 0.2)
                        );
                    }
                    75% {
                        transform: translate(${Math.random() * 10 - 5}%, ${Math.random() * 10 - 5}%) scale(${0.8 + Math.random() * 0.5}) rotate(${Math.random() * 10 - 5}deg);
                        filter: hue-rotate(270deg) blur(${10 + Math.random() * 20}px) contrast(0.9) saturate(0.8);
                        border-radius: ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}%;
                        background: radial-gradient(
                            circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                            hsla(${Math.random() * 360}, 60%, 85%, 0.4),
                            hsla(${Math.random() * 360}, 50%, 80%, 0.2)
                        );
                    }
                    100% {
                        transform: translate(${Math.random() * 10 - 5}%, ${Math.random() * 10 - 5}%) scale(${0.8 + Math.random() * 0.5}) rotate(${Math.random() * 10 - 5}deg);
                        filter: hue-rotate(360deg) blur(${10 + Math.random() * 20}px) contrast(0.9) saturate(0.8);
                        border-radius: ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}% ${30 + Math.random() * 70}%;
                        background: radial-gradient(
                            circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                            hsla(${Math.random() * 360}, 60%, 85%, 0.4),
                            hsla(${Math.random() * 360}, 50%, 80%, 0.2)
                        );
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.innerHTML = keyframes;
            document.head.appendChild(style);
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 11;
            pointer-events: none;
            mix-blend-mode: overlay;
            opacity: 0.4;
        `;
        overlay.appendChild(canvas);
        
        const warpOverlay = document.createElement('div');
        warpOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 12;
            pointer-events: none;
            animation: screen-warp 8s infinite alternate ease-in-out;
            opacity: 0.3;
            mix-blend-mode: soft-light;
        `;
        overlay.appendChild(warpOverlay);
        
        const warpStyle = document.createElement('style');
        warpStyle.innerHTML = `
            @keyframes screen-warp {
                0% {
                    backdrop-filter: hue-rotate(0deg) blur(0px) contrast(0.9);
                    background: radial-gradient(circle at center, transparent, rgba(255, 180, 255, 0.45));
                }
                25% {
                    backdrop-filter: hue-rotate(90deg) blur(2px) contrast(0.9);
                    background: radial-gradient(circle at 70% 30%, transparent, rgba(180, 255, 255, 0.4));
                }
                50% {
                    backdrop-filter: hue-rotate(180deg) blur(4px) contrast(0.9);
                    background: radial-gradient(circle at 30% 70%, transparent, rgba(255, 255, 180, 0.47));
                }
                75% {
                    backdrop-filter: hue-rotate(270deg) blur(2px) contrast(0.9);
                    background: radial-gradient(circle at 40% 40%, transparent, rgba(180, 255, 180, 0.44));
                }
                100% {
                    backdrop-filter: hue-rotate(360deg) blur(0px) contrast(0.9);
                    background: radial-gradient(circle at center, transparent, rgba(255, 180, 180, 0.41));
                }
            }
        `;
        document.head.appendChild(warpStyle);
        
        for (let i = 0; i < 20; i++) {
            const bubble = document.createElement('div');
            const size = 40 + Math.random() * 160;
            
            bubble.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                background-color: hsla(${Math.random() * 360}, 60%, 85%, 0.3);
                opacity: ${0.15 + Math.random() * 0.25};
                mix-blend-mode: ${['overlay', 'soft-light', 'screen'][Math.floor(Math.random() * 3)]};
                filter: blur(${5 + Math.random() * 20}px) contrast(0.9) saturate(0.8);
                z-index: ${20 + i};
                pointer-events: none;
                animation: liquid-bubble-${i} ${4 + Math.random() * 15}s infinite alternate ease-in-out;
                border-radius: ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}%;
                box-shadow: 
                    inset 0 0 ${30 + Math.random() * 70}px rgba(255, 255, 255, 0.3),
                    0 0 ${20 + Math.random() * 30}px rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2);
            `;
                
            overlay.appendChild(bubble);
            
            const bubbleKeyframes = `
                @keyframes liquid-bubble-${i} {
                    0% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                        background-color: hsla(${Math.random() * 360}, 60%, 85%, 0.3);
                        border-radius: ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}%;
                        filter: blur(${5 + Math.random() * 10}px) saturate(0.8) hue-rotate(0deg);
                    }
                    25% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(${0.6 + Math.random() * 0.8}) rotate(${Math.random() * 40 - 20}deg);
                        background-color: hsla(${Math.random() * 360}, 60%, 85%, 0.3);
                        border-radius: ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}%;
                        filter: blur(${5 + Math.random() * 10}px) saturate(0.8) hue-rotate(90deg);
                    }
                    50% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(${0.6 + Math.random() * 0.8}) rotate(${Math.random() * 40 - 20}deg);
                        background-color: hsla(${Math.random() * 360}, 60%, 85%, 0.3);
                        border-radius: ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}%;
                        filter: blur(${5 + Math.random() * 10}px) saturate(0.8) hue-rotate(180deg);
                    }
                    75% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(${0.6 + Math.random() * 0.8}) rotate(${Math.random() * 40 - 20}deg);
                        background-color: hsla(${Math.random() * 360}, 60%, 85%, 0.3);
                        border-radius: ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}%;
                        filter: blur(${5 + Math.random() * 10}px) saturate(0.8) hue-rotate(270deg);
                    }
                    100% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(${0.6 + Math.random() * 0.8}) rotate(${Math.random() * 40 - 20}deg);
                        background-color: hsla(${Math.random() * 360}, 60%, 85%, 0.3);
                        border-radius: ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}%;
                        filter: blur(${5 + Math.random() * 10}px) saturate(0.8) hue-rotate(360deg);
                    }
                }
            `;
            
            const bubbleStyle = document.createElement('style');
            bubbleStyle.innerHTML = bubbleKeyframes;
            document.head.appendChild(bubbleStyle);
        }
        
        for (let i = 0; i < 10; i++) {
            const geo = document.createElement('div');
            const size = 30 + Math.random() * 100;
            const shape = Math.random() > 0.5 ? 'polygon' : 'circle';
            
            if (shape === 'polygon') {
                const sides = 3 + Math.floor(Math.random() * 5);
                const points = Array.from({length: sides}, (_, i) => {
                    const angle = (i / sides) * Math.PI * 2;
                    const radius = 50 + Math.random() * 10;
                    const x = 50 + Math.cos(angle) * radius;
                    const y = 50 + Math.sin(angle) * radius;
                    return `${x}% ${y}%`;
                }).join(', ');
                
                geo.style.clipPath = `polygon(${points})`;
            } else {
                geo.style.borderRadius = Math.random() > 0.5 ? '50%' : 
                    `${20 + Math.random() * 80}% ${20 + Math.random() * 80}% ${20 + Math.random() * 80}% ${20 + Math.random() * 80}%`;
            }
            
            geo.style.cssText += `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                background: linear-gradient(
                    ${Math.random() * 360}deg,
                    hsla(${Math.random() * 360}, 60%, 85%, 0.3),
                    hsla(${Math.random() * 360}, 50%, 80%, 0.2)
                );
                opacity: ${0.1 + Math.random() * 0.2};
                mix-blend-mode: ${['overlay', 'soft-light', 'screen'][Math.floor(Math.random() * 3)]};
                filter: blur(${Math.random() * 5}px);
                z-index: ${30 + i};
                pointer-events: none;
                animation: geo-float-${i} ${8 + Math.random() * 15}s infinite alternate ease-in-out;
                transform-style: preserve-3d;
                box-shadow: 
                    inset 0 0 ${10 + Math.random() * 30}px rgba(255, 255, 255, 0.3),
                    0 0 ${5 + Math.random() * 15}px rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3);
            `;
                
            overlay.appendChild(geo);
            
            const geoKeyframes = `
                @keyframes geo-float-${i} {
                    0% {
                        transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
                        filter: hue-rotate(0deg) brightness(1);
                    }
                    33% {
                        transform: translate3d(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px, ${Math.random() * 200}px) 
                                  rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) rotateZ(${Math.random() * 360}deg);
                        filter: hue-rotate(120deg) brightness(1.1);
                    }
                    66% {
                        transform: translate3d(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px, ${Math.random() * 200}px) 
                                  rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) rotateZ(${Math.random() * 360}deg);
                        filter: hue-rotate(240deg) brightness(1.2);
                    }
                    100% {
                        transform: translate3d(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px, ${Math.random() * 200}px) 
                                  rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) rotateZ(${Math.random() * 360}deg);
                        filter: hue-rotate(360deg) brightness(1.1);
                    }
                }
            `;
            
            const geoStyle = document.createElement('style');
            geoStyle.innerHTML = geoKeyframes;
            document.head.appendChild(geoStyle);
        }
        
        const pulseOverlay = document.createElement('div');
        pulseOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 40;
            pointer-events: none;
            animation: pulse-glow 5s infinite alternate ease-in-out;
            mix-blend-mode: screen;
        `;
        overlay.appendChild(pulseOverlay);
        
        const pulseStyle = document.createElement('style');
        pulseStyle.innerHTML = `
            @keyframes pulse-glow {
                0% {
                    box-shadow: inset 0 0 200px rgba(255, 180, 255, 0.44);
                }
                33% {
                    box-shadow: inset 0 0 200px rgba(255, 180, 212, 0.37);
                }
                66% {
                    box-shadow: inset 0 0 200px rgba(255, 255, 180, 0.38);
                }
                100% {
                    box-shadow: inset 0 0 200px rgba(195, 180, 255, 0.34);
                }
            }
        `;
        document.head.appendChild(pulseStyle);
        
        const textOverlay = document.createElement('div');
        textOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 50;
            pointer-events: none;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0.3;
            transform: translateZ(0);
        `;
        
        for (let i = 0; i < 50; i++) {
            const character = document.createElement('div');
            character.textContent = String.fromCharCode(33 + Math.floor(Math.random() * 93));
            character.style.cssText = `
                position: absolute;
                font-family: 'kawaii', sans-serif;
                font-size: ${20 + Math.random() * 60}px;
                color: hsla(${Math.random() * 360}, 60%, 85%, 0.4);
                text-shadow: 0 0 10px currentColor;
                opacity: ${0.1 + Math.random() * 0.2};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-char-${i} ${10 + Math.random() * 20}s infinite alternate ease-in-out;
                transform-origin: center;
            `;
            textOverlay.appendChild(character);
            
            const charKeyframes = `
                @keyframes float-char-${i} {
                    0% {
                        transform: translate(0, 0) rotate(0deg) scale(1);
                        color: hsla(${Math.random() * 360}, 60%, 85%, 0.4);
                        text-shadow: 0 0 10px currentColor;
                    }
                    25% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 2});
                        color: hsla(${Math.random() * 360}, 60%, 85%, 0.4);
                        text-shadow: 0 0 ${10 + Math.random() * 20}px currentColor;
                    }
                    50% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 2});
                        color: hsla(${Math.random() * 360}, 60%, 85%, 0.4);
                        text-shadow: 0 0 ${10 + Math.random() * 20}px currentColor;
                    }
                    75% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 2});
                        color: hsla(${Math.random() * 360}, 60%, 85%, 0.4);
                        text-shadow: 0 0 ${10 + Math.random() * 20}px currentColor;
                    }
                    100% {
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 2});
                        color: hsla(${Math.random() * 360}, 60%, 85%, 0.4);
                        text-shadow: 0 0 ${10 + Math.random() * 20}px currentColor;
                    }
                }
            `;
            
            const charStyle = document.createElement('style');
            charStyle.innerHTML = charKeyframes;
            document.head.appendChild(charStyle);
            
            setInterval(() => {
                character.textContent = String.fromCharCode(33 + Math.floor(Math.random() * 93));
            }, 300 + Math.random() * 3000);
        }
        
        overlay.appendChild(textOverlay);
        
        const tripSound = new Audio("assets/sounds/trippy.mp3");
        tripSound.volume = 0.5;
        tripSound.play();
        
        const fixedBackground = document.querySelector('.fixed-background');
        if (fixedBackground) {
            const originalBackgroundStyle = {
                zIndex: fixedBackground.style.zIndex,
                filter: fixedBackground.style.filter,
                transform: fixedBackground.style.transform
            };
            
            fixedBackground.style.zIndex = "-1";
            fixedBackground.style.filter = "saturate(1.1) contrast(1.05)";
            
            setTimeout(() => {
                fixedBackground.style.zIndex = originalBackgroundStyle.zIndex;
                fixedBackground.style.filter = originalBackgroundStyle.filter;
            }, 15000);
        }
        
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            overlay.style.transition = 'opacity 3s ease-out';
            overlay.style.opacity = '0';
            
            const fadeAudio = setInterval(() => {
                if (tripSound.volume > 0.05) {
                    tripSound.volume -= 0.05;
                } else {
                    tripSound.volume = 0;
                    clearInterval(fadeAudio);
                }
            }, 100);
        }, 6000);
        
        setTimeout(() => {
            overlay.remove();
            
            const blackScreen = document.createElement('div');
            blackScreen.className = 'black-screen-overlay';
            blackScreen.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: black;
                z-index: 100000;
                opacity: 0;
                transition: opacity 1s ease-in;
            `;
            document.body.appendChild(blackScreen);
            
            setTimeout(() => {
                blackScreen.style.opacity = '1';
                
                const medicationWindow = document.getElementById('window-medication');
                if (medicationWindow) {
                    closeWindow(medicationWindow);
                }
                
            }, 100);
            
            setTimeout(() => {
                blackScreen.style.transition = 'opacity 1s ease-out';
                blackScreen.style.opacity = '0';
                
                setTimeout(() => {
                    let randomMessage;
                    if (medicationAbuseCount >= 3) {
                        randomMessage = angryWarningMessages[Math.floor(Math.random() * angryWarningMessages.length)];
                    } else {
                        randomMessage = warningMessages[Math.floor(Math.random() * warningMessages.length)];
                    }
                    
                    const warningContent = `
                        <div style="display: flex; flex-direction: column; align-items: center; padding: 20px;">
                            <div style="font-size: 20px; color: #d32f2f; margin-bottom: 15px; font-weight: bold;">
                                ${randomMessage}
                            </div>
                            <img src="assets/warning.png" style="width: 100px; margin-bottom: 20px;">
                            <div style="font-size: 16px; text-align: center;">
                                Digital medication should be taken as directed.
                                <br><br>
                                Side effects may include: file corruption, data loss, 
                                and disappointed operating systems.
                            </div>
                        </div>
                    `;
                    
                    createWindow("WARNING", warningContent, "window-warning");
                    
                }, 500);
                
                setTimeout(() => {
                    blackScreen.remove();
                    
                    Array.from(document.querySelectorAll('style')).forEach(style => {
                        if (style.innerHTML.includes('liquid-distort-') || 
                            style.innerHTML.includes('liquid-bubble-') ||
                            style.innerHTML.includes('geo-float-') ||
                            style.innerHTML.includes('float-char-') ||
                            style.innerHTML.includes('screen-warp') ||
                            style.innerHTML.includes('pulse-glow')) {
                            style.remove();
                        }
                    });
                    
                    document.querySelectorAll('div').forEach(div => {
                        if (div.style.mixBlendMode && div.style.pointerEvents === 'none' && 
                            div.parentElement && div.parentElement.className === 'distortion-overlay') {
                            div.remove();
                        }
                    });
                    
                    tripSound.pause();
                    tripSound.currentTime = 0;
                    
                }, 2000);
                
            }, 3000);
            
        }, 9000);
    }
    
    function makeWindowEscape(windowElement) {
        const originalPosition = {
            x: parseFloat(windowElement.getAttribute('data-x')) || 0,
            y: parseFloat(windowElement.getAttribute('data-y')) || 0
        };
        
        document.addEventListener('mousemove', function(e) {
            if (!document.body.contains(windowElement)) {
                document.removeEventListener('mousemove', this);
                return;
            }
            
            const windowRect = windowElement.getBoundingClientRect();
            
            const windowCenterX = windowRect.left + windowRect.width / 2;
            const windowCenterY = windowRect.top + windowRect.height / 2;
            
            const dx = e.clientX - windowCenterX;
            const dy = e.clientY - windowCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const escapeX = -dx * (1 - distance / 200) * 10;
                const escapeY = -dy * (1 - distance / 200) * 10;
                
                const newX = originalPosition.x + escapeX;
                const newY = originalPosition.y + escapeY;
                
                const maxX = window.innerWidth - windowRect.width;
                const maxY = window.innerHeight - windowRect.height;
                const boundedX = Math.max(0, Math.min(maxX, newX));
                const boundedY = Math.max(0, Math.min(maxY, newY));
                
                windowElement.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
                windowElement.setAttribute('data-x', boundedX);
                windowElement.setAttribute('data-y', boundedY);
                
                originalPosition.x = boundedX;
                originalPosition.y = boundedY;
            }
        });
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
                    void medicationImg.offsetWidth;
                    medicationImg.style.animation = 'jump 0.5s ease';
                    
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
                    
                    const medicationSound = new Audio("assets/sounds/kari.wav");
                    medicationSound.play();
                }
                
                if (medicationImg) {
                    medicationImg.addEventListener('click', shakeMedication);
                }
                
                if (medicationBtn) {
                    let angryMessageCount = 0;
                    medicationBtn.addEventListener('click', function() {
                        medicationAbuseCount++;
                        
                        if (medicationAbuseCount >= 3) {
                            makeWindowEscape(medicationWindow);
                        }
                        
                        if (medicationAbuseCount >= 4) {
                            angryMessageCount++;
                            const angryMessage = angryWarningMessages[angryMessageCount % angryWarningMessages.length];
                            
                            // Create overlay with red filter
                            const redFilterOverlay = document.createElement('div');
                            redFilterOverlay.style.cssText = `
                                position: fixed;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background-color: rgba(255, 0, 0, 0.3);
                                z-index: 999999;
                                pointer-events: none;
                                transition: opacity 0.3s ease;
                            `;
                            document.body.appendChild(redFilterOverlay);
                            
                            // Create angry message element on top of everything
                            const angryDiv = document.createElement('div');
                            angryDiv.style.cssText = `
                                position: fixed;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                font-size: 40px;
                                font-weight: bold;
                                color: white;
                                text-shadow: 0 0 10px red, 0 0 20px red, 0 0 30px red;
                                z-index: 1000000;
                                pointer-events: none;
                                white-space: nowrap;
                                text-align: center;
                                animation: pulse 0.5s ease-in-out infinite alternate;
                            `;
                            angryDiv.textContent = angryMessage;
                            document.body.appendChild(angryDiv);
                            
                            // Add pulse animation
                            const pulseStyle = document.createElement('style');
                            pulseStyle.innerHTML = `
                                @keyframes pulse {
                                    0% { transform: translate(-50%, -50%) scale(1); }
                                    100% { transform: translate(-50%, -50%) scale(1.1); }
                                }
                            `;
                            document.head.appendChild(pulseStyle);
                            
                            // Play error sound
                            const errorSound = new Audio("assets/sounds/sqek.mp3");
                            errorSound.volume = 0.7;
                            errorSound.play();
                            
                            // Remove elements after 2 seconds
                            setTimeout(() => {
                                redFilterOverlay.style.opacity = "0";
                                angryDiv.style.opacity = "0";
                                
                                setTimeout(() => {
                                    redFilterOverlay.remove();
                                    angryDiv.remove();
                                    pulseStyle.remove();
                                }, 300);
                            }, 2000);
                        }
                        
                        if (medicationAbuseCount >= 6) {
                            const errorSound = new Audio("assets/sounds/sqek.mp3");
                            errorSound.volume = 0.7;
                            errorSound.play();
                            
                            const redOverlay = document.createElement('div');
                            redOverlay.style.cssText = `
                                position: fixed;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background-color: rgba(255, 0, 0, 0.5);
                                z-index: 9999999;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 80px;
                                font-weight: bold;
                                color: white;
                                text-shadow: 0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.5);
                                pointer-events: none;
                                opacity: 0;
                                transition: opacity 0.5s ease;
                            `;
                            redOverlay.textContent = "STOP";
                            document.body.appendChild(redOverlay);
                            
                            setTimeout(() => {
                                redOverlay.style.opacity = "1";
                                setTimeout(() => {
                                    redOverlay.style.opacity = "0";
                                    setTimeout(() => {
                                        redOverlay.remove();
                                    }, 500);
                                }, 300);
                            }, 10);
                            
                            return;
                        }
                        
                        const tripSound = new Audio("assets/sounds/kari.wav");
                        tripSound.playbackRate = 0.5;
                        tripSound.volume = 0.7;
                        tripSound.play();
                        
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
    
    document.addEventListener('mousedown', function(event) {
        const window = event.target.closest('.window');
        if (window) {
            window.style.zIndex = getHighestZIndex() + 1;
        }
    });
});