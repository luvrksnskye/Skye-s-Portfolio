document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.responsive-background').style.backgroundImage = 'url("assets/background/morning.png")';

    const desktopIcons = document.querySelectorAll('.desktop-icon');
    
    desktopIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconClass = this.querySelector('img').className;
            
            switch(iconClass) {
                case 'time':
                    openTimeWindow();
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
                    // Play select sound effect
                    const selectSound = new Audio('assets/sounds/execute.wav');
                    selectSound.play();
                    
                    const fadeOverlay = document.createElement('div');
                    fadeOverlay.style.position = 'fixed';
                    fadeOverlay.style.top = '0';
                    fadeOverlay.style.left = '0';
                    fadeOverlay.style.width = '100%';
                    fadeOverlay.style.height = '100%';
                    fadeOverlay.style.backgroundColor = 'rgb(10, 0, 42)'; 
                    fadeOverlay.style.zIndex = '99999999999999';
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
                        document.querySelector('.responsive-background').style.backgroundImage = `url("${option.background}")`;
                        
                        // Begin fade out
                        setTimeout(() => {
                            fadeOverlay.style.opacity = '0';
                            
                            // Remove overlay after fade out completes
                            setTimeout(() => {
                                document.body.removeChild(fadeOverlay);
                                // Close the window after the transition completes
                                if (document.body.contains(timeWindow)) {
                                    timeWindow.classList.add('close-animation');
                                    setTimeout(() => {
                                        document.body.removeChild(timeWindow);
                                    }, 500);
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
                        
                        timeWindow.classList.add('close-animation');
                        setTimeout(() => {
                            document.body.removeChild(timeWindow);
                        }, 500);
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
                        timeWindow.classList.add('close-animation');
                        setTimeout(() => {
                            document.body.removeChild(timeWindow);
                        }, 500);
                    }
                });
                
                content.appendChild(closeButton);
            }
            
            document.body.appendChild(timeWindow);
        } else {
            timeWindow.style.zIndex = getHighestZIndex() + 1;
        }
    }
    
    function openInfoWindow() {
        let infoWindow = document.getElementById('info-window');
        
        if (!infoWindow) {
            infoWindow = document.createElement('div');
            infoWindow.id = 'info-window';
            infoWindow.className = 'window window-info';
            
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
                        
                        infoWindow.classList.add('close-animation');
                        setTimeout(() => {
                            document.body.removeChild(infoWindow);
                        }, 500);
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
                        infoWindow.classList.add('close-animation');
                        setTimeout(() => {
                            document.body.removeChild(infoWindow);
                        }, 500);
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
                            trashWindow.classList.add('close-animation');
                            setTimeout(() => {
                                document.body.removeChild(trashWindow);
                            }, 500);
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
                        
                        trashWindow.classList.add('close-animation');
                        setTimeout(() => {
                            document.body.removeChild(trashWindow);
                        }, 500);
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
                        trashWindow.classList.add('close-animation');
                        setTimeout(() => {
                            document.body.removeChild(trashWindow);
                        }, 500);
                    }
                });
                
                content.appendChild(closeButton);
            }
            
            document.body.appendChild(trashWindow);
        } else {
            trashWindow.style.zIndex = getHighestZIndex() + 1;
        }
    }
    
    function makeWindowDraggable(windowElement) {
        const titleBar = windowElement.querySelector('.title');
        
        if (!titleBar) return;
        
        // Add click handler for the close button
        titleBar.addEventListener('click', function(e) {
            const rect = titleBar.getBoundingClientRect();
            const rightSide = rect.right - 30;
            
            if (e.clientX > rightSide) {
                if (document.body.contains(windowElement)) {
                    // Play closing sound
                    const closeSound = new Audio('assets/sounds/touch.wav');
                    closeSound.play();
                    
                    windowElement.classList.add('close-animation');
                    setTimeout(() => {
                        if (document.body.contains(windowElement)) {
                            document.body.removeChild(windowElement);
                        }
                    }, 500);
                }
            }
        });
        
        // Set up interact.js for dragging
        interact(windowElement)
            .draggable({
                // Enable inertia for smoother movement
                inertia: {
                    resistance: 10,
                    minSpeed: 100,
                    endSpeed: 10
                },
                // Keep the element within the viewport
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true,
                        // Allow some overflow
                        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                    })
                ],
                // Only allow dragging from the title bar
                allowFrom: '.title',
                // Disable dragging if on close button area
                ignoreFrom: '.title:after',
                
                listeners: {
                    start: function(event) {
                        // Bring window to front when dragging starts
                        windowElement.style.zIndex = getHighestZIndex() + 1;
                        windowElement.classList.add('active');
                        
                        // Add a subtle scale effect
                        windowElement.style.transform = 'scale(1.01)';
                        
                        // Change cursor
                        document.body.style.cursor = 'grabbing';
                        titleBar.style.cursor = 'grabbing';
                        
                        // Prevent text selection globally during drag
                        document.body.style.userSelect = 'none';
                        document.body.style.webkitUserSelect = 'none';
                        document.body.style.mozUserSelect = 'none';
                        document.body.style.msUserSelect = 'none';
                        
                        // Add shadow effect
                        windowElement.style.boxShadow = '0 8px 20px rgba(255, 174, 198, 0.5)';
                        
                        // Prevent default behaviors
                        event.preventDefault();
                    },
                    move: function(event) {
                        // Get current position
                        let x = (parseFloat(windowElement.getAttribute('data-x')) || 0) + event.dx;
                        let y = (parseFloat(windowElement.getAttribute('data-y')) || 0) + event.dy;
                        
                        // Apply transform
                        windowElement.style.transform = `translate(${x}px, ${y}px) scale(1.01)`;
                        
                        // Store the position
                        windowElement.setAttribute('data-x', x);
                        windowElement.setAttribute('data-y', y);
                        
                        // Prevent default behaviors
                        event.preventDefault();
                    },
                    end: function(event) {
                        // Reset cursor
                        document.body.style.cursor = '';
                        titleBar.style.cursor = '';
                        
                        // Re-enable text selection
                        document.body.style.userSelect = '';
                        document.body.style.webkitUserSelect = '';
                        document.body.style.mozUserSelect = '';
                        document.body.style.msUserSelect = '';
                        
                        // Get final position
                        const x = parseFloat(windowElement.getAttribute('data-x')) || 0;
                        const y = parseFloat(windowElement.getAttribute('data-y')) || 0;
                        
                        // Apply smooth transition back to normal scale
                        windowElement.style.transition = 'transform 0.2s ease';
                        windowElement.style.transform = `translate(${x}px, ${y}px) scale(1)`;
                        
                        // Remove transition after it completes
                        setTimeout(() => {
                            windowElement.style.transition = '';
                        }, 200);
                        
                        // Reset shadow
                        windowElement.style.boxShadow = '';
                    }
                }
            });
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
                if (windowId === 'time-window') {
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
    
    // Helper function to get highest z-index
    function getHighestZIndex() {
        return Math.max(
            0,
            ...Array.from(document.querySelectorAll('.window'))
                .map(el => parseInt(getComputedStyle(el).zIndex) || 0)
        );
    }
});