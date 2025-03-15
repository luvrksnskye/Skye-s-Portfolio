document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('.fixed-background').style.backgroundImage = 'url("assets/background/morning.png")';

    const desktopIcons = document.querySelectorAll('.desktop-icon');
    
    desktopIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconClass = this.querySelector('img').className;
            
            switch(iconClass) {
                case 'time':
                    openTimeWindow();
                    break;
                case 'gallery':
                    openGalleryWindow();
                    break;
                case 'info':
                    openInfoWindow();
                    break;
                case 'trash':
                    openTrashWindow();
                    break;
            }
        });
    });
    
    // Detect if device is mobile
    function isMobileDevice() {
        return window.innerWidth <= 767;
    }
    
    // Create responsive window dimensions based on screen size
    function getResponsiveWindowDimensions(defaultWidth, defaultHeight) {
        if (isMobileDevice()) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            
            return {
                width: Math.min(screenWidth * 0.9, defaultWidth) + 'px',
                height: Math.min(screenHeight * 0.7, defaultHeight) + 'px',
                top: '50px',
                left: (screenWidth * 0.05) + 'px'
            };
        } else {
            return {
                width: defaultWidth + 'px',
                height: defaultHeight + 'px',
                top: null,
                left: null
            };
        }
    }
    
    function openTimeWindow() {
        let timeWindow = document.getElementById('time-window');
        
        if (!timeWindow) {
            timeWindow = document.createElement('div');
            timeWindow.id = 'time-window';
            timeWindow.className = 'window window-time';
            timeWindow.style.position = 'absolute';
            timeWindow.style.zIndex = '1000';
            timeWindow.style.top = '0px'; // Set top position to 0
            timeWindow.style.left = '0px'; // Set left position to 0
            
            // Apply responsive dimensions
            const dimensions = getResponsiveWindowDimensions(500, 350);
            timeWindow.style.width = dimensions.width;
            timeWindow.style.height = dimensions.height;
            
            if (isMobileDevice()) {
                timeWindow.style.top = dimensions.top;
                timeWindow.style.left = dimensions.left;
            } else {
                timeWindow.style.top = '490px'; 
                timeWindow.style.left = '50%';
                timeWindow.style.transform = 'translateX(-50%)';
            }
            
            const titleBar = document.createElement('div');
            titleBar.className = 'title';
            titleBar.innerHTML = '<span>Sleep</span>';
            
            const content = document.createElement('div');
            content.className = 'content';
            
            const headerContainer = document.createElement('div');
            headerContainer.style.display = 'flex';
            headerContainer.style.justifyContent = 'center'; 
            headerContainer.style.alignItems = 'center';
            headerContainer.style.padding = isMobileDevice() ? '10px' : '20px'; 
            
            const icon = document.createElement('img');
            icon.src = 'assets/time.png';
            icon.alt = 'Time icon';
            icon.style.width = isMobileDevice() ? '60px' : '80px'; 
            icon.style.height = isMobileDevice() ? '60px' : '80px'; 
            icon.style.marginRight = isMobileDevice() ? '10px' : '20px'; 
            
            const text = document.createElement('span');
            text.textContent = 'Time to sleep?';
            text.style.fontSize = isMobileDevice() ? '20px' : '24px'; 
            
            headerContainer.appendChild(icon);
            headerContainer.appendChild(text);

            const optionsContainer = document.createElement('div');
            optionsContainer.style.display = 'flex';
            optionsContainer.style.flexDirection = isMobileDevice() ? 'column' : 'row';
            optionsContainer.style.justifyContent = 'space-between';
            optionsContainer.style.padding = isMobileDevice() ? '10px' : '20px'; 
            optionsContainer.style.gap = isMobileDevice() ? '15px' : '0'; 

            const sleepOptions = [
                { icon: 'assets/time_evening.png', text: 'sleep until dusk', background: 'assets/background/afternoon.webp', sound: 'assets/sounds/afternoon.mp3' },
                { icon: 'assets/time_night.png', text: 'sleep until night', background: 'assets/background/night.png', sound: 'assets/sounds/night.mp3' },
                { icon: 'assets/time_noon.png', text: 'sleep until tomorrow', background: 'assets/background/morning.png', sound: 'assets/sounds/morning.mp3' }
            ];
            
            sleepOptions.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.style.display = 'flex';
                optionDiv.style.flexDirection = 'column';
                optionDiv.style.alignItems = 'center';
                optionDiv.style.cursor = 'pointer';
                optionDiv.style.transition = 'transform 0.2s ease';
                optionDiv.style.width = isMobileDevice() ? '100%' : '33%';
                
                optionDiv.onmouseover = function() { this.style.transform = 'scale(1.05)'; };
                optionDiv.onmouseout = function() { this.style.transform = 'scale(1)'; };
                
                const icon = document.createElement('img');
                icon.src = option.icon;
                icon.alt = option.text;
                icon.style.width = isMobileDevice() ? '50px' : '60px'; 
                icon.style.height = isMobileDevice() ? '50px' : '60px'; 
                icon.style.marginBottom = '10px';
                
                const text = document.createElement('span');
                text.textContent = option.text;
                text.style.fontSize = isMobileDevice() ? '16px' : '20px';
                text.style.display = 'block'; 
                text.style.textAlign = 'center';
                
                optionDiv.addEventListener('click', function() {
                    const fadeOverlay = document.createElement('div');
                    fadeOverlay.style.position = 'fixed';
                    fadeOverlay.style.top = '0';
                    fadeOverlay.style.left = '0';
                    fadeOverlay.style.width = '100%';
                    fadeOverlay.style.height = '100%';
                    fadeOverlay.style.backgroundColor = 'rgb(10, 0, 42)'; 
                    fadeOverlay.style.zIndex = '9999';
                    fadeOverlay.style.opacity = '0';
                    fadeOverlay.style.transition = 'opacity 1s ease';
                    document.body.appendChild(fadeOverlay);
                    
                    // Play sound effect
                    const audio = new Audio(option.sound);
                    audio.volume = 0.2; // Set volume to 5 (out of 10)
                    audio.loop = true; // Loop the sound
                    audio.play();
                    
                    // Fade in
                    setTimeout(() => {
                        fadeOverlay.style.opacity = '1';
                    }, 10);
                    
                    // Change background after fade completes
                    setTimeout(() => {
                        // Change the background
                        document.querySelector('.fixed-background').style.backgroundImage = `url("${option.background}")`;
                        
                        // Begin fade out
                        setTimeout(() => {
                            fadeOverlay.style.opacity = '0';
                            
                            // Remove overlay after fade out completes
                            setTimeout(() => {
                                document.body.removeChild(fadeOverlay);
                                // Close the window after the transition completes
                                if (document.body.contains(timeWindow)) {
                                    document.body.removeChild(timeWindow);
                                }
                            }, 1000);
                        }, 500);
                    }, 1000);
                });
                
                // Assemble the option
                optionDiv.appendChild(icon);
                optionDiv.appendChild(text);
                optionsContainer.appendChild(optionDiv);
            });
            
            // Assemble the window
            content.appendChild(headerContainer);
            content.appendChild(optionsContainer);
            timeWindow.appendChild(titleBar);
            timeWindow.appendChild(content);
            
            // Make the window draggable on desktop only
            if (!isMobileDevice()) {
                makeWindowDraggable(timeWindow);
            }
            
            // Add close button functionality using event delegation
            titleBar.addEventListener('click', function(e) {
                // Check if the click was on the after pseudo-element (close button)
                // This is approximate since we can't directly target pseudo-elements
                const rect = titleBar.getBoundingClientRect();
                const rightSide = rect.right - 30; // Approximate position of buttons
                
                if (e.clientX > rightSide) {
                    if (document.body.contains(timeWindow)) {
                        // Play closing sound
                        const closeSound = new Audio('assets/sounds/touch.wav');
                        closeSound.play();
                        
                        document.body.removeChild(timeWindow);
                    }
                }
            });
            
            // Add touch close button for mobile
            if (isMobileDevice()) {
                const closeButton = document.createElement('button');
                closeButton.textContent = 'Close';
                closeButton.className = 'button';
                closeButton.style.marginTop = '15px';
                closeButton.style.alignSelf = 'center';
                closeButton.style.display = 'block';
                closeButton.style.width = '80%';
                closeButton.style.margin = '15px auto 0 auto';
                
                closeButton.addEventListener('click', function() {
                    const closeSound = new Audio('assets/sounds/touch.wav');
                    closeSound.play();
                    
                    if (document.body.contains(timeWindow)) {
                        document.body.removeChild(timeWindow);
                    }
                });
                
                content.appendChild(closeButton);
            }
            
            document.body.appendChild(timeWindow);
        } else {
            timeWindow.style.zIndex = getHighestZIndex() + 1;
        }
    }
    
    function openGalleryWindow() {
        let galleryWindow = document.getElementById('gallery-window');
        
        if (!galleryWindow) {
            galleryWindow = document.createElement('div');
            galleryWindow.id = 'gallery-window';
            galleryWindow.className = 'window window-gallery';
            galleryWindow.style.position = 'absolute';
            galleryWindow.style.zIndex = getHighestZIndex() + 1;
            galleryWindow.style.top = '0px'; // Set top position to 0
            galleryWindow.style.left = '0px'; // Set left position to 0
            
            // Apply responsive dimensions
            const dimensions = getResponsiveWindowDimensions(600, 490);
            galleryWindow.style.width = dimensions.width;
            galleryWindow.style.height = dimensions.height;
            
            if (isMobileDevice()) {
                galleryWindow.style.top = dimensions.top;
                galleryWindow.style.left = dimensions.left;
            } else {
                galleryWindow.style.top = '550px';
                galleryWindow.style.left = '30%';
            }
            
            const titleBar = document.createElement('div');
            titleBar.className = 'title';
            titleBar.innerHTML = '<span>Gallery</span>';
            
            const content = document.createElement('div');
            content.className = 'content';
            content.style.padding = isMobileDevice() ? '10px' : '20px';
            
            // Adjust gallery grid based on screen size
            const imgSize = isMobileDevice() ? '120px' : '150px';
            const imgGap = isMobileDevice() ? '10px' : '15px';
            
            content.innerHTML = `
                <h2>Photo Gallery</h2>
                <div style="display: flex; flex-wrap: wrap; gap: ${imgGap}; justify-content: center;">
                    <img src="assets/bread-kitty.jpg" alt="Bread Kitty" style="width: ${imgSize}; height: ${imgSize}; object-fit: cover; border-radius: 5px; cursor: pointer;">
                    <img src="assets/music-cat.jpg" alt="music cat" style="width: ${imgSize}; height: ${imgSize}; object-fit: cover; border-radius: 5px; cursor: pointer;">
                    <img src="assets/pixel-cat.jpg" alt="pixel cat" style="width: ${imgSize}; height: ${imgSize}; object-fit: cover; border-radius: 5px; cursor: pointer;">
                    <img src="assets/kitty-computer.jpg" alt="meee" style="width: ${imgSize}; height: ${imgSize}; object-fit: cover; border-radius: 5px; cursor: pointer;">
                    <img src="assets/bag-cat.jpg" alt="Pkitty" style="width: ${imgSize}; height: ${imgSize}; object-fit: cover; border-radius: 5px; cursor: pointer;">
                </div>
            `;
            
            galleryWindow.appendChild(titleBar);
            galleryWindow.appendChild(content);
            
            // Make the window draggable on desktop only
            if (!isMobileDevice()) {
                makeWindowDraggable(galleryWindow);
            }
            
            // Add close button functionality
            titleBar.addEventListener('click', function(e) {
                const rect = titleBar.getBoundingClientRect();
                const rightSide = rect.right - 30;
                
                if (e.clientX > rightSide) {
                    if (document.body.contains(galleryWindow)) {
                        // Play closing sound
                        const closeSound = new Audio('assets/sounds/touch.wav');
                        closeSound.play();
                        
                        document.body.removeChild(galleryWindow);
                    }
                }
            });
            
            // Add touch close button for mobile
            if (isMobileDevice()) {
                const closeButton = document.createElement('button');
                closeButton.textContent = 'Close';
                closeButton.className = 'button';
                closeButton.style.marginTop = '15px';
                closeButton.style.display = 'block';
                closeButton.style.width = '80%';
                closeButton.style.margin = '15px auto 0 auto';
                
                closeButton.addEventListener('click', function() {
                    const closeSound = new Audio('assets/sounds/touch.wav');
                    closeSound.play();
                    
                    if (document.body.contains(galleryWindow)) {
                        document.body.removeChild(galleryWindow);
                    }
                });
                
                content.appendChild(closeButton);
            }
            
            document.body.appendChild(galleryWindow);
        } else {
            galleryWindow.style.zIndex = getHighestZIndex() + 1;
        }
    }
    
    function openInfoWindow() {
        let infoWindow = document.getElementById('info-window');
        
        if (!infoWindow) {
            infoWindow = document.createElement('div');
            infoWindow.id = 'info-window';
            infoWindow.className = 'window window-info';
            infoWindow.style.position = 'absolute';
            infoWindow.style.zIndex = getHighestZIndex() + 1;
            infoWindow.style.top = '0px'; // Set top position to 0
            infoWindow.style.left = '0px'; // Set left position to 0
            
            // Apply responsive dimensions
            const dimensions = getResponsiveWindowDimensions(500, 450);
            infoWindow.style.width = dimensions.width;
            infoWindow.style.height = dimensions.height;
            
            if (isMobileDevice()) {
                infoWindow.style.top = dimensions.top;
                infoWindow.style.left = dimensions.left;
            } else {
                infoWindow.style.top = '520px';
                infoWindow.style.left = '40%';
            }
            
            const titleBar = document.createElement('div');
            titleBar.className = 'title';
            titleBar.innerHTML = '<span>System Information</span>';
            
            const content = document.createElement('div');
            content.className = 'content';
            content.style.padding = isMobileDevice() ? '15px' : '20px';
            content.innerHTML = `
                <h2>System Information</h2>
                <p style="margin-top: 20px; font-size: ${isMobileDevice() ? '14px' : '16px'};">Initially I started programming this site as a small Portfolio, however, I got carried away with my ideas and ended up making all this lol This doesn't look professional at all, but it was fun to make and I think that's all that matters because I could enjoy it a lot. Sometimes we just need to let our imagination out for a while and create whatever, you know? After all, that's the wonderful thing about coding. Anyway! I would like to give credit to several developers who inspired me in this, but the list would be long. I just want to thank everyone and you, if you're reading this! <emj>✨</emj> <emj>🎊</emj></p>
            `;
            
            infoWindow.appendChild(titleBar);
            infoWindow.appendChild(content);
            
            // Make the window draggable on desktop only
            if (!isMobileDevice()) {
                makeWindowDraggable(infoWindow);
            }
            
            // Add close button functionality
            titleBar.addEventListener('click', function(e) {
                const rect = titleBar.getBoundingClientRect();
                const rightSide = rect.right - 30;
                
                if (e.clientX > rightSide) {
                    if (document.body.contains(infoWindow)) {
                        // Play closing sound
                        const closeSound = new Audio('assets/sounds/touch.wav');
                        closeSound.play();
                        
                        document.body.removeChild(infoWindow);
                    }
                }
            });
            
            // Add touch close button for mobile
            if (isMobileDevice()) {
                const closeButton = document.createElement('button');
                closeButton.textContent = 'Close';
                closeButton.className = 'button';
                closeButton.style.marginTop = '15px';
                closeButton.style.display = 'block';
                closeButton.style.width = '80%';
                closeButton.style.margin = '15px auto 0 auto';
                
                closeButton.addEventListener('click', function() {
                    const closeSound = new Audio('assets/sounds/touch.wav');
                    closeSound.play();
                    
                    if (document.body.contains(infoWindow)) {
                        document.body.removeChild(infoWindow);
                    }
                });
                
                content.appendChild(closeButton);
            }
            
            document.body.appendChild(infoWindow);
        } else {
            infoWindow.style.zIndex = getHighestZIndex() + 1;
        }
    }
    
    function openTrashWindow() {
        let trashWindow = document.getElementById('trash-window');
        
        if (!trashWindow) {
            trashWindow = document.createElement('div');
            trashWindow.id = 'trash-window';
            trashWindow.className = 'window window-trash';
            trashWindow.style.position = 'absolute';
            trashWindow.style.zIndex = getHighestZIndex() + 1;
            trashWindow.style.top = '0px'; // Set top position to 0
            trashWindow.style.left = '0px'; // Set left position to 0
            
            // Apply responsive dimensions
            const dimensions = getResponsiveWindowDimensions(400, 460);
            trashWindow.style.width = dimensions.width;
            trashWindow.style.height = dimensions.height;
            
            if (isMobileDevice()) {
                trashWindow.style.top = dimensions.top;
                trashWindow.style.left = dimensions.left;
            } else {
                trashWindow.style.top = '600px';
                trashWindow.style.left = '45%';
            }
            
            const titleBar = document.createElement('div');
            titleBar.className = 'title';
            titleBar.innerHTML = '<span>Trash</span>';
            
            const content = document.createElement('div');
            content.className = 'content';
            content.style.padding = isMobileDevice() ? '15px' : '20px';
            
            const listItemSize = isMobileDevice() ? '16px' : '20px';
            
            content.innerHTML = `
                <h2>Frontend Dev Tools</h2>
                <ul style="list-style-type: none; padding: 0;">
                    <li style="margin: 10px 0;"><img src="assets/heart.png" style="width: ${listItemSize}; height: ${listItemSize}; margin-right: 10px;"> HTML5</li>
                    <li style="margin: 10px 0;"><img src="assets/heart.png" style="width: ${listItemSize}; height: ${listItemSize}; margin-right: 10px;"> CSS3</li>
                    <li style="margin: 10px 0;"><img src="assets/heart.png" style="width: ${listItemSize}; height: ${listItemSize}; margin-right: 10px;"> JavaScript</li>
                    <li style="margin: 10px 0;"><img src="assets/heart.png" style="width: ${listItemSize}; height: ${listItemSize}; margin-right: 10px;"> React</li>
                    <li style="margin: 10px 0;"><img src="assets/heart.png" style="width: ${listItemSize}; height: ${listItemSize}; margin-right: 10px;"> Vue.js</li>
                    <li style="margin: 10px 0;"><img src="assets/heart.png" style="width: ${listItemSize}; height: ${listItemSize}; margin-right: 10px;"> Sass</li>
                </ul>
            `;
            
            const emptyButton = document.createElement('button');
            emptyButton.textContent = 'Clear Tools';
            emptyButton.className = 'button'; 
            emptyButton.style.padding = isMobileDevice() ? '6px 12px' : '8px 15px';
            emptyButton.style.margin = '10px 0';
            emptyButton.style.cursor = 'pointer';
            emptyButton.onclick = function() {
                content.innerHTML = '<h2>Frontend Dev Tools</h2><p>Tools have been cleared.</p>';
                
                // Play sound effect
                const audio = new Audio('assets/sounds/execute.wav');
                audio.play();
                
                // Re-add close button for mobile if needed
                if (isMobileDevice()) {
                    const closeButton = document.createElement('button');
                    closeButton.textContent = 'Close';
                    closeButton.className = 'button';
                    closeButton.style.marginTop = '15px';
                    closeButton.style.display = 'block';
                    closeButton.style.width = '80%';
                    closeButton.style.margin = '15px auto 0 auto';
                    
                    closeButton.addEventListener('click', function() {
                        const closeSound = new Audio('assets/sounds/touch.wav');
                        closeSound.play();
                        
                        if (document.body.contains(trashWindow)) {
                            document.body.removeChild(trashWindow);
                        }
                    });
                    
                    content.appendChild(closeButton);
                }
            };
            
            content.appendChild(emptyButton);
            trashWindow.appendChild(titleBar);
            trashWindow.appendChild(content);
            
            // Make the window draggable on desktop only
            if (!isMobileDevice()) {
                makeWindowDraggable(trashWindow);
            }
            
            // Add close button functionality
            titleBar.addEventListener('click', function(e) {
                const rect = titleBar.getBoundingClientRect();
                const rightSide = rect.right - 30;
                
                if (e.clientX > rightSide) {
                    if (document.body.contains(trashWindow)) {
                        // Play closing sound
                        const closeSound = new Audio('assets/sounds/touch.wav');
                        closeSound.play();
                        
                        document.body.removeChild(trashWindow);
                    }
                }
            });
            
            // Add touch close button for mobile
            if (isMobileDevice()) {
                const closeButton = document.createElement('button');
                closeButton.textContent = 'Close';
                closeButton.className = 'button';
                closeButton.style.marginTop = '15px';
                closeButton.style.display = 'block';
                closeButton.style.width = '80%';
                closeButton.style.margin = '15px auto 0 auto';
                
                closeButton.addEventListener('click', function() {
                    const closeSound = new Audio('assets/sounds/touch.wav');
                    closeSound.play();
                    
                    if (document.body.contains(trashWindow)) {
                        document.body.removeChild(trashWindow);
                    }
                });
                
                content.appendChild(closeButton);
            }
            
            document.body.appendChild(trashWindow);
        } else {
            trashWindow.style.zIndex = getHighestZIndex() + 1;
        }
    }
    
    // Add window resize handler for dynamic adjustments
    window.addEventListener('resize', function() {
        // Get all open windows
        const windows = document.querySelectorAll('.window');
        
        windows.forEach(windowEl => {
            // Only adjust if this is a mobile device
            if (isMobileDevice()) {
                const windowId = windowEl.id;
                let defaultWidth = 500;
                let defaultHeight = 400;
                
                // Determine default sizes based on window type
                if (windowId === 'gallery-window') {
                    defaultWidth = 600;
                    defaultHeight = 490;
                } else if (windowId === 'time-window') {
                    defaultWidth = 500;
                    defaultHeight = 350;
                } else if (windowId === 'info-window') {
                    defaultWidth = 500;
                    defaultHeight = 450;
                } else if (windowId === 'trash-window') {
                    defaultWidth = 400;
                    defaultHeight = 460;
                }
                
                // Apply responsive dimensions
                const dimensions = getResponsiveWindowDimensions(defaultWidth, defaultHeight);
                windowEl.style.width = dimensions.width;
                windowEl.style.height = dimensions.height;
                windowEl.style.top = dimensions.top;
                windowEl.style.left = dimensions.left;
                windowEl.style.transform = ''; // Remove any transform
            }
        });
    });
    
    // Helper function to make windows draggable
    function makeWindowDraggable(windowElement) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        const titleBar = windowElement.querySelector('.title');
        if (titleBar) {
            // Add mouse events for desktop
            titleBar.onmousedown = dragMouseDown;
            
            // Add touch events for mobile devices with touch screens
            titleBar.ontouchstart = touchDragStart;
        }
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            
            // Check if click was on the close button area
            const rect = titleBar.getBoundingClientRect();
            const rightSide = rect.right - 30; // Approximate position of buttons
            if (e.clientX > rightSide) {
                return; 
            }
            
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            
            windowElement.classList.add('active');
            windowElement.style.zIndex = getHighestZIndex() + 1;
        }
        
        function touchDragStart(e) {
            if (e.touches.length === 1) {
                e.preventDefault();
                
                // Check if touch was on the close button area
                const rect = titleBar.getBoundingClientRect();
                const rightSide = rect.right - 30;
                const touch = e.touches[0];
                
                if (touch.clientX > rightSide) {
                    return;
                }
                
                pos3 = touch.clientX;
                pos4 = touch.clientY;
                
                document.ontouchend = closeTouchDrag;
                document.ontouchmove = touchElementDrag;
                
                windowElement.classList.add('active');
                windowElement.style.zIndex = getHighestZIndex() + 1;
            }
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
          
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Keep window within viewport bounds
            const newTop = windowElement.offsetTop - pos2;
            const newLeft = windowElement.offsetLeft - pos1;
            
            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Get window dimensions
            const windowWidth = windowElement.offsetWidth;
            const windowHeight = windowElement.offsetHeight;
            
            // Calculate bounds (allow some part of the window to be outside viewport)
            const minLeft = -windowWidth * 0.7;
            const maxLeft = viewportWidth - windowWidth * 0.3;
            const minTop = 0; // Don't allow window to go above the viewport
            const maxTop = viewportHeight - 40; // Allow title bar to remain visible
            
            // Apply bounds
            windowElement.style.top = Math.max(minTop, Math.min(maxTop, newTop)) + "px";
            windowElement.style.left = Math.max(minLeft, Math.min(maxLeft, newLeft)) + "px";
        }
        
        function touchElementDrag(e) {
            if (e.touches.length === 1) {
                e.preventDefault();
                
                const touch = e.touches[0];
                
                pos1 = pos3 - touch.clientX;
                pos2 = pos4 - touch.clientY;
                pos3 = touch.clientX;
                pos4 = touch.clientY;
                
                // Keep window within viewport bounds (same logic as mouse drag)
                const newTop = windowElement.offsetTop - pos2;
                const newLeft = windowElement.offsetLeft - pos1;
                
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const windowWidth = windowElement.offsetWidth;
                const windowHeight = windowElement.offsetHeight;
                
                const minLeft = -windowWidth * 0.7;
                const maxLeft = viewportWidth - windowWidth * 0.3;
                const minTop = 0;
                const maxTop = viewportHeight - 40;
                
                windowElement.style.top = Math.max(minTop, Math.min(maxTop, newTop)) + "px";
                windowElement.style.left = Math.max(minLeft, Math.min(maxLeft, newLeft)) + "px";
            }
        }
        
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
        
        function closeTouchDrag() {
            document.ontouchend = null;
            document.ontouchmove = null;
        }
    }
    
    // Helper function to get highest z-index
    function getHighestZIndex() {
        const windows = document.querySelectorAll('.window');
        let highest = 0;
        
        windows.forEach(window => {
            const zIndex = parseInt(window.style.zIndex || 0);
            if (zIndex > highest) {
                highest = zIndex;
            }
        });
        
        return highest;
    }
});
