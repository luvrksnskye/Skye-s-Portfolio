document.addEventListener('DOMContentLoaded', function() {
    // Sound effects
    const clickSound = new Audio("assets/sounds/kari.wav");
    const closeSound = new Audio("assets/sounds/sqek.mp3");
    
    // Animate skill bars on load
    setTimeout(function() {
        document.querySelectorAll('.skill-level-fill').forEach(function(bar) {
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 500);
    
    // Toggle skill descriptions
    document.querySelectorAll('.skill-item').forEach(function(item) {
        item.addEventListener('click', function(event) {
            clickSound.currentTime = 0;
            clickSound.play();
            
            const description = this.querySelector('.skill-description');
            const allDescriptions = document.querySelectorAll('.skill-description');
            
            // Close all other descriptions
            allDescriptions.forEach(function(desc) {
                if (desc !== description) {
                    desc.style.height = '0px';
                }
            });
            
            // Toggle current description
            if (description.style.height === '0px' || description.style.height === '') {
                description.style.height = description.scrollHeight + 'px';
            } else {
                description.style.height = '0px';
            }
            
            // Create heart image animation instead of emoji
            const heart = document.createElement('img');
            heart.src = "assets/heart.png";
            heart.classList.add('emoji-float');
            heart.style.left = (event.pageX - 10) + 'px';
            heart.style.top = (event.pageY - 10) + 'px';
            heart.style.display = 'block';
            document.body.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(function() {
                document.body.removeChild(heart);
            }, 2000);
        });
    });
    
    // Toggle interest details
    document.querySelectorAll('.interest-card').forEach(function(card) {
        card.addEventListener('click', function(event) {
            clickSound.currentTime = 0;
            clickSound.play();
            
            const details = this.querySelector('.interest-details');
            
            // Toggle details
            if (details.style.maxHeight === '0px' || details.style.maxHeight === '') {
                details.style.maxHeight = '200px';
                this.style.height = 'auto';
            } else {
                details.style.maxHeight = '0px';
            }
            
            // Create heart image animation instead of emoji
            const heart = document.createElement('img');
            heart.src = "assets/heart.png";
            heart.classList.add('emoji-float');
            heart.style.left = (event.pageX - 10) + 'px';
            heart.style.top = (event.pageY - 10) + 'px';
            heart.style.display = 'block';
            document.body.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(function() {
                document.body.removeChild(heart);
            }, 2000);
        });
    });
    
    // Navigation between skill sections
    document.querySelectorAll('.section-button').forEach(function(button) {
        button.addEventListener('click', function() {
            clickSound.currentTime = 0;
            clickSound.play();
            
            const section = this.getAttribute('data-section');
            
            // Hide all sections
            document.querySelectorAll('.skill-category').forEach(function(cat) {
                cat.style.display = 'none';
            });
            
            // Show selected section
            document.getElementById(section + '-skills').style.display = 'block';
            
            // Update active button
            document.querySelectorAll('.section-button').forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Helper function to get highest z-index
    function getHighestZIndex() {
        let highestZ = 10000;
        const windows = document.querySelectorAll('.window');
        windows.forEach(window => {
            const zIndex = parseInt(window.style.zIndex || 10000);
            if (zIndex > highestZ) {
                highestZ = zIndex;
            }
        });
        return highestZ;
    }
    
    // Make element draggable
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
    
    // Create popup window function
    function createPopupWindow(title, content) {
        clickSound.currentTime = 0;
        clickSound.play();
        
        // Check if popup already exists and remove it
        const existingPopup = document.getElementById("info-popup-window");
        if (existingPopup) {
            document.body.removeChild(existingPopup);
        }
        
        // Create window container
        const popup = document.createElement('div');
        popup.id = "info-popup-window";
        popup.className = "window";
        popup.style.position = 'absolute';
        popup.style.top = '100px';
        popup.style.left = '50%';
        popup.style.transform = 'translateX(-50%)';
        popup.style.zIndex = getHighestZIndex() + 1;
        popup.setAttribute('data-x', 0);
        popup.setAttribute('data-y', 0);
        
        // Create window title
        const titleBar = document.createElement('div');
        titleBar.className = "title";
        titleBar.innerHTML = `<span>${title}</span>`;
        
        // Make title clickable to close window
        titleBar.addEventListener('click', function(e) {
            if (e.offsetX > titleBar.offsetWidth - 30) {
                closeSound.currentTime = 0;
                closeSound.play();
                popup.classList.add('close-animation');
                setTimeout(() => {
                    document.body.removeChild(popup);
                }, 500);
            }
        });
        
        // Create window content
        const contentDiv = document.createElement('div');
        contentDiv.className = "content";
        contentDiv.style.height = "auto";
        contentDiv.style.maxHeight = "400px";
        contentDiv.innerHTML = content;
        
        // Assemble window
        popup.appendChild(titleBar);
        popup.appendChild(contentDiv);
        document.body.appendChild(popup);
        
        // Set initial position with animation
        popup.style.opacity = "0";
        popup.style.transform = "translateX(-50%) scale(0.9)";
        
        setTimeout(() => {
            popup.style.transition = "all 0.3s ease";
            popup.style.opacity = "1";
            popup.style.transform = "translateX(-50%) scale(1)";
            
            // Remove the transition after initial animation
            setTimeout(() => {
                popup.style.transition = "none";
                popup.style.transform = "none";
                
                // Make the window draggable after it's fully visible
                makeDraggable(popup);
            }, 300);
        }, 10);
        
        return popup;
    }
    
    // Fun buttons - Add checks to make sure elements exist
    if (document.getElementById('more-about-me')) {
        document.getElementById('more-about-me').addEventListener('click', function() {
            createPopupWindow("About Me", "Thanks for visiting my portfolio! I'm always working on new projects and improving my skills. Feel free to reach out if you'd like to collaborate!");
        });
    }
    
    if (document.getElementById('more-interests')) {
        document.getElementById('more-interests').addEventListener('click', function() {
            const interests = [
                "I love stargazing and learning about astronomy!",
                "I'm absolutely obsessed with strawberries lol",
                "I enjoy watching meteor showers and tracking constellations",
                "I collect astronomy-themed stationery and cute space-themed stickers!",
                "I love discovering new celestial events like eclipses and comets"
            ];
            
            createPopupWindow("some random stuff", "<ul style='padding-left: 20px;'><li>" + interests.join("</li><li>") + "</li></ul>");
        });
    }
    
    // Window buttons (close)
    document.querySelectorAll('.window .buttons').forEach(function(button) {
        button.addEventListener('click', function() {
            closeSound.currentTime = 0;
            closeSound.play();
            
            const window = this.closest('.window');
            window.classList.add('close-animation');
            
            setTimeout(function() {
                window.style.display = 'none';
                window.classList.remove('close-animation');
            }, 500);
        });
    });
    
    // Make existing windows draggable
    document.querySelectorAll('.window').forEach(function(window) {
        if (!window.hasAttribute('data-draggable')) {
            window.setAttribute('data-draggable', 'true');
            window.setAttribute('data-x', 0);
            window.setAttribute('data-y', 0);
            makeDraggable(window);
        }
    });
    
    // Add click event to bring any window to front when clicked
    document.addEventListener('mousedown', function(event) {
        const window = event.target.closest('.window');
        if (window) {
            window.style.zIndex = getHighestZIndex() + 1;
        }
    });
});