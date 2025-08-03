// Main application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements - keeping existing elements
    const loginBtn = document.getElementById('loginBtn');
    const loginBtnWelcome = document.getElementById('loginBtnWelcome');
    const userArea = document.getElementById('userArea');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const ticketsCount = document.getElementById('ticketsCount');
    const welcomeSection = document.getElementById('welcomeSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const prizesSection = document.getElementById('prizesSection');
    const historySection = document.getElementById('historySection');
    const profileSection = document.getElementById('profileSection');
    const scratchGameSection = document.getElementById('scratchGameSection');
    const getTicketBtn = document.getElementById('getTicketBtn');
    const backToDashboard = document.getElementById('backToDashboard');
    const historyContainer = document.getElementById('historyContainer');
    const cardTypeLabel = document.getElementById('cardTypeLabel');
    
    // Profile Elements
    const profileAvatar = document.getElementById('profileAvatar');
    const profileName = document.getElementById('profileName');
    const profileTelegramId = document.getElementById('profileTelegramId');
    const gameIdsList = document.getElementById('gameIdsList');
    const addGameIdBtn = document.getElementById('addGameIdBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const viewClaimHistory = document.getElementById('viewClaimHistory');
    
    // Method info elements
    const rechargeInfo = document.getElementById('rechargeInfo');
    const vipInfo = document.getElementById('vipInfo');
    const bettingInfo = document.getElementById('bettingInfo');
    const inviteInfo = document.getElementById('inviteInfo');
    
    // Modals
    const modals = document.querySelectorAll('.modal');
    const registerGameIdModal = document.getElementById('registerGameIdModal');
    const getTicketModal = document.getElementById('getTicketModal');
    const winPrizeModal = document.getElementById('winPrizeModal');
    const loseModal = document.getElementById('loseModal');
    const requestSentModal = document.getElementById('requestSentModal');
    const viewPrizeModal = document.getElementById('viewPrizeModal');
    
    // Forms
    const gameIdForm = document.getElementById('gameIdForm');
    const ticketRequestForm = document.getElementById('ticketRequestForm');
    const platformSelect = document.getElementById('platformSelect');
    const gameId = document.getElementById('gameId');
    const ticketPlatformSelect = document.getElementById('ticketPlatformSelect');
    
    // Method Selection
    const methodRecharge = document.getElementById('methodRecharge');
    const methodVIP = document.getElementById('methodVIP');
    const methodBetting = document.getElementById('methodBetting');
    const methodInvite = document.getElementById('methodInvite');
    const rechargeFields = document.getElementById('rechargeFields');
    const vipFields = document.getElementById('vipFields');
    const bettingFields = document.getElementById('bettingFields');
    const inviteFields = document.getElementById('inviteFields');
    
    // Prize Information
    const prizeName = document.getElementById('prizeName');
    const prizeCode = document.getElementById('prizeCode');
    const prizeReveal = document.getElementById('prizeReveal');
    
    // Buttons
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const okBtn = document.getElementById('okBtn');
    
    // Close Modal Buttons
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Play Buttons
    const playButtons = document.querySelectorAll('.play-btn');
    
    // Nav Items for Bottom Navigation
    const navItems = document.querySelectorAll('.nav-item');

    // Banner Slider
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let bannerInterval;

    // Prize Buttons
    const btnPrizes = document.querySelectorAll('.btn-prizes');
    const prizeCategories = document.querySelectorAll('.prize-categories .category');
    const prizesList = document.querySelectorAll('.prizes-list');
    const closePrizeModal = document.querySelector('.close-prize-modal');

    // User State
    let currentUser = null;
    let userTickets = 0;
    let userGameIds = {};
    let currentCardType = null;
    let currentTicketCost = 0;
    
    // Sample prizes for different card types (maintaining from original)
    const prizesTypeA = [
        { name: "1 reais", probability: 20, type: "money" },
        { name: "2 reais", probability: 15, type: "money" },
        { name: "3 reais", probability: 10, type: "money" },
        { name: "5 reais", probability: 8, type: "money" },
        { name: "10 reais", probability: 5, type: "money" },
        { name: "15 reais", probability: 4, type: "money" },
        { name: "20 reais", probability: 3, type: "money" },
        { name: "25 reais", probability: 2, type: "money" },
        { name: "50 reais", probability: 1, type: "money" },
        { name: "100 reais", probability: 0.5, type: "money" },
        { name: "200 reais", probability: 0.3, type: "money" },
        { name: "300 reais", probability: 0.2, type: "money" },
        { name: "500 reais", probability: 0.1, type: "money" },
        { name: "700 reais", probability: 0.05, type: "money" },
        { name: "1000 reais", probability: 0.02, type: "money" },
        { name: "2000 reais", probability: 0.01, type: "money" },
        { name: "3000 reais", probability: 0.005, type: "money" },
        { name: "PowerBank", probability: 0.1, type: "item" },
        { name: "Smart Watch", probability: 0.05, type: "item" }
    ];
    
    const prizesTypeB = [
        { name: "1 reais", probability: 15, type: "money" },
        { name: "2 reais", probability: 12, type: "money" },
        { name: "3 reais", probability: 10, type: "money" },
        { name: "5 reais", probability: 8, type: "money" },
        { name: "10 reais", probability: 6, type: "money" },
        { name: "15 reais", probability: 5, type: "money" },
        { name: "20 reais", probability: 4, type: "money" },
        { name: "25 reais", probability: 3, type: "money" },
        { name: "50 reais", probability: 2, type: "money" },
        { name: "100 reais", probability: 1, type: "money" },
        { name: "500 reais", probability: 0.5, type: "money" },
        { name: "1000 reais", probability: 0.2, type: "money" },
        { name: "JBL SPEAKER", probability: 0.2, type: "item" },
        { name: "iPhone 12", probability: 0.05, type: "item" },
        { name: "Fone de ouvido", probability: 0.3, type: "item" },
        { name: "Realme Smartphone", probability: 0.1, type: "item" },
        { name: "Copo Stanley", probability: 0.2, type: "item" },
        { name: "Bola de Futebol", probability: 0.4, type: "item" },
        { name: "Chinelo Havaianas", probability: 0.5, type: "item" },
        { name: "Perfume 212VIP", probability: 0.15, type: "item" }
    ];
    
    const prizesTypeC = [
        { name: "1000 reais", probability: 2, type: "money" },
        { name: "2000 reais", probability: 1, type: "money" },
        { name: "3000 reais", probability: 0.5, type: "money" },
        { name: "5000 reais", probability: 0.2, type: "money" },
        { name: "Smart TV 4K", probability: 0.3, type: "item" },
        { name: "Smart Watch", probability: 0.5, type: "item" },
        { name: "iPad 10th Gen", probability: 0.2, type: "item" },
        { name: "JBL SPEAKER", probability: 0.4, type: "item" },
        { name: "Apple Airpods 3rd Gen", probability: 0.3, type: "item" },
        { name: "Perfume 212VIP", probability: 0.6, type: "item" },
        { name: "Air Fryer", probability: 0.4, type: "item" },
        { name: "iPhone 15", probability: 0.1, type: "item" },
        { name: "Adaptor iPhone", probability: 0.7, type: "item" },
        { name: "Copo Stanley Rosa", probability: 0.5, type: "item" },
        { name: "Playstation 5", probability: 0.05, type: "item" }
    ];
    
    // Initialize
    function init() {
        // Check login status
        checkLoginStatus();
        
        // Check if this is a login callback
        const urlParams = new URLSearchParams(window.location.search);
        const loginStatus = urlParams.get('login');
        if (loginStatus === 'success') {
            // Reload user data after successful login
            fetchUserData();
            // Clear the URL parameter
            window.history.replaceState({}, document.title, '/');
        } else if (loginStatus === 'error') {
            const reason = urlParams.get('reason') || '';
            let errorMessage = 'Login failed. Please try again.';
            
            if (reason === 'invalid_auth') {
                errorMessage = 'Invalid authentication data from Telegram.';
            } else if (reason === 'session_error') {
                errorMessage = 'Session creation failed. Please try again.';
            } else if (reason === 'server_error') {
                errorMessage = 'Server error occurred. Please try again later.';
            }
            
            showNotification(errorMessage, 'error');
            // Clear the URL parameter
            window.history.replaceState({}, document.title, '/');
        }
        
        // Initialize Banner Slider
        startBannerSlider();
        
        // Initialize Winners Carousel
        startWinnersCarousel();
        
        // Add event listeners
        addEventListeners();
    }
    
    // Start Banner Slider
    function startBannerSlider() {
        // Hide all slides except the first one
        bannerSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.classList.add('hidden');
            }
        });
        
        // Set the first dot as active
        bannerDots.forEach((dot, index) => {
            if (index === 0) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Start automatic slideshow
        bannerInterval = setInterval(() => {
            nextSlide();
        }, 5000);
        
        // Add click event to dots
        bannerDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(bannerInterval);
                showSlide(index);
                bannerInterval = setInterval(() => {
                    nextSlide();
                }, 5000);
            });
        });
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % bannerSlides.length;
        showSlide(nextIndex);
    }
    
    function showSlide(index) {
        // Hide current slide
        bannerSlides[currentSlide].classList.add('hidden');
        bannerDots[currentSlide].classList.remove('active');
        
        // Show new slide
        bannerSlides[index].classList.remove('hidden');
        bannerDots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Fetch user data from server
    function fetchUserData() {
        fetch('/api/auth/check-session')
            .then(response => response.json())
            .then(data => {
                if (data.success && data.isLoggedIn) {
                    currentUser = data.user;
                    // Update UI with real user data
                    updateUIForLoggedUser();
                    // Fetch ticket balance
                    fetch('/api/tickets/balance')
                        .then(response => response.json())
                        .then(ticketData => {
                            if (ticketData.success) {
                                userTickets = ticketData.tickets;
                                ticketsCount.textContent = userTickets;
                            }
                        })
                        .catch(error => console.error('Error fetching tickets:', error));
                }
            })
            .catch(error => console.error('Error checking session:', error));
    }
    
    // Updated event listeners function with improved bottom navigation
    function addEventListeners() {
        // Login Buttons
        if (loginBtn) loginBtn.addEventListener('click', handleLogin);
        if (loginBtnWelcome) loginBtnWelcome.addEventListener('click', handleLogin);
        
        // Get Ticket Button
        if (getTicketBtn) getTicketBtn.addEventListener('click', openGetTicketModal);
        
        // Back to Dashboard Button
        if (backToDashboard) backToDashboard.addEventListener('click', showDashboard);
        
        // Game ID Form
        if (gameIdForm) gameIdForm.addEventListener('submit', handleGameIdSubmit);
        
        // Ticket Request Form
        if (ticketRequestForm) ticketRequestForm.addEventListener('submit', handleTicketRequest);
        
        // Method Selection Change
        if (methodRecharge) methodRecharge.addEventListener('change', toggleMethodFields);
        if (methodVIP) methodVIP.addEventListener('change', toggleMethodFields);
        if (methodBetting) methodBetting.addEventListener('change', toggleMethodFields);
        if (methodInvite) methodInvite.addEventListener('change', toggleMethodFields);
        
        // Play Buttons
        playButtons.forEach(button => {
            button.addEventListener('click', () => {
                const cardType = button.getAttribute('data-card-type');
                const ticketCost = parseInt(button.getAttribute('data-ticket-cost'));
                startGame(cardType, ticketCost);
            });
        });
        
        // Prize Buttons
        btnPrizes.forEach(button => {
            button.addEventListener('click', () => {
                const cardType = button.closest('.game-card').querySelector('.play-btn').getAttribute('data-card-type');
                openPrizeModal(cardType);
            });
        });
        
        // Prize Categories
        prizeCategories.forEach(category => {
            category.addEventListener('click', () => {
                // Remove active class from all categories
                prizeCategories.forEach(cat => cat.classList.remove('active'));
                // Add active class to clicked category
                category.classList.add('active');
                
                // Show corresponding prizes list
                const cardType = category.getAttribute('data-card');
                prizesList.forEach(list => list.classList.add('hidden'));
                document.getElementById(`prizesList${cardType}`).classList.remove('hidden');
            });
        });
        
        // Close Prize Modal
        if (closePrizeModal) closePrizeModal.addEventListener('click', () => closeModal(viewPrizeModal));
        
        // Modal Close Buttons
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                closeModal(modal);
            });
        });
        
        // Result Modal Buttons
        if (backToHomeBtn) backToHomeBtn.addEventListener('click', handleBackToHome);
        if (tryAgainBtn) tryAgainBtn.addEventListener('click', handleTryAgain);
        if (okBtn) okBtn.addEventListener('click', () => closeModal(requestSentModal));
        
        // Close modals when clicking outside
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) closeModal(this);
            });
        });
        
        // Profile Buttons
        if (addGameIdBtn) addGameIdBtn.addEventListener('click', () => openModal(registerGameIdModal));
        if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
        if (viewClaimHistory) viewClaimHistory.addEventListener('click', () => showSection('history'));
        
        // Ensure bottom navigation works
        document.querySelectorAll('.bottom-nav .nav-item').forEach(navItem => {
            navItem.addEventListener('click', function(e) {
                e.preventDefault();
                
                const action = this.getAttribute('data-action');
                const section = this.getAttribute('data-section');
                
                console.log("Nav item clicked:", action || section);
                
                // Remove active class from all nav items
                document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.classList.add('active');
                
                if (action === 'register') {
                    openModal(registerGameIdModal);
                } else if (action === 'ticket') {
                    openGetTicketModal();
                } else if (section) {
                    showSection(section);
                }
            });
        });
    }
    
    // New function to handle section switching
    function showSection(sectionName) {
        console.log("Showing section:", sectionName);
        
        // Hide all sections
        const allSections = document.querySelectorAll('.container > section');
        allSections.forEach(section => section.classList.add('hidden'));
        
        // Show requested section
        const targetSection = document.getElementById(sectionName + 'Section');
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
    }
    
    // Improved checkLoginStatus function
    function checkLoginStatus() {
        console.log("Checking login status...");
        
        fetch('/api/auth/check-session')
            .then(response => response.json())
            .then(data => {
                console.log("Session check response:", data);
                
                if (data.success && data.isLoggedIn) {
                    console.log("User is logged in:", data.user);
                    currentUser = data.user;
                    
                    // Update UI with real user data
                    updateUIForLoggedUser();
                    
                    // Fetch ticket balance
                    fetch('/api/tickets/balance')
                        .then(response => response.json())
                        .then(ticketData => {
                            if (ticketData.success) {
                                userTickets = ticketData.tickets;
                                ticketsCount.textContent = userTickets;
                                console.log("User tickets loaded:", userTickets);
                            }
                        })
                        .catch(error => console.error('Error fetching tickets:', error));
                    
                    // Check if user has Game IDs registered
                    fetch('/api/user/game-ids')
                        .then(response => response.json())
                        .then(idsData => {
                            if (idsData.success) {
                                userGameIds = idsData.gameIds || {};
                                console.log("User game IDs loaded:", userGameIds);
                                
                                // Update profile game IDs list
                                updateGameIdsList();
                                
                                // If no game IDs registered, show the Game ID modal
                                if (Object.keys(userGameIds).length === 0) {
                                    console.log("No Game IDs registered, showing modal");
                                    setTimeout(() => openModal(registerGameIdModal), 1000);
                                }
                            }
                        })
                        .catch(error => console.error('Error fetching game IDs:', error));
                } else {
                    console.log("User not logged in");
                    showWelcomeScreen();
                }
            })
            .catch(error => {
                console.error('Error checking auth status:', error);
                showWelcomeScreen();
            });
    }
    
    // Update Game IDs list in profile
    function updateGameIdsList() {
        if (!gameIdsList) return;
        
        // Clear the list
        gameIdsList.innerHTML = '';
        
        // Check if user has any game IDs
        if (Object.keys(userGameIds).length === 0) {
            gameIdsList.innerHTML = '<div class="text-center text-gray-500">Belum ada Game ID terdaftar</div>';
            return;
        }
        
        // Add game IDs to the list
        for (const platform in userGameIds) {
            const gameIdItem = document.createElement('div');
            gameIdItem.className = 'game-id-item';
            gameIdItem.innerHTML = `
                <div>
                    <div class="game-id-platform">${platform}</div>
                    <div class="game-id-value">${userGameIds[platform]}</div>
                </div>
                <button class="edit-game-id" data-platform="${platform}">Edit</button>
            `;
            gameIdsList.appendChild(gameIdItem);
        }
        
        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-game-id').forEach(button => {
            button.addEventListener('click', () => {
                const platform = button.getAttribute('data-platform');
                editGameId(platform, userGameIds[platform]);
            });
        });
    }
    
    // Edit Game ID
    function editGameId(platform, currentId) {
        // Populate the form
        platformSelect.value = platform;
        gameId.value = currentId;
        
        // Disable platform selection since we're editing
        platformSelect.disabled = true;
        
        // Show the modal
        openModal(registerGameIdModal);
        
        // Update form submit handler for editing
        gameIdForm.onsubmit = function(e) {
            e.preventDefault();
            
            const newId = gameId.value.trim();
            
            if (!newId) {
                showNotification('Silakan masukkan Game ID yang valid.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = gameIdForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Menyimpan...';
            submitBtn.disabled = true;
            
            // Save game ID to server (still using the same endpoint)
            fetch('/api/user/game-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ platform, gameId: newId })
            })
            .then(response => response.json())
            .then(data => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                if (data.success) {
                    // Update local game IDs
                    userGameIds[platform] = newId;
                    
                    // Close modal and update UI
                    closeModal(registerGameIdModal);
                    updateGameIdsList();
                    
                    // Show success notification
                    showNotification('Game ID berhasil diperbarui!', 'success');
                } else {
                    showNotification(data.message || 'Gagal menyimpan Game ID. Silakan coba lagi.', 'error');
                }
            })
            .catch(error => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                console.error('Error saving game ID:', error);
                showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
            })
            .finally(() => {
                // Re-enable platform selection for future adds
                platformSelect.disabled = false;
                
                // Reset form submit handler
                gameIdForm.onsubmit = handleGameIdSubmit;
            });
        };
    }
    
    // Improved handleLogin function
    function handleLogin() {
        console.log("Initiating Telegram login...");
        
        // Use the numeric bot ID (first part of the token before the colon)
        const botId = '8360720049'; // Ensure this matches your actual bot ID
        const callbackUrl = window.location.origin + '/api/auth/telegram-callback';
        const width = 550;
        const height = 470;
        
        const url = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent(window.location.origin)}&return_to=${encodeURIComponent(callbackUrl)}`;
        
        console.log("Opening Telegram auth URL:", url);
        
        // Open popup for login
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);
        window.open(url, 'telegram-login', `width=${width},height=${height},left=${left},top=${top}`);
        
        // Add event listener for message from popup
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'telegram-login-success') {
                console.log("Login success message received");
                fetchUserData();
            }
        }, false);
    }
    
    // Handle logout
    function handleLogout() {
        fetch('/api/auth/logout', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Clear user data
                currentUser = null;
                userTickets = 0;
                userGameIds = {};
                
                // Show welcome screen
                showWelcomeScreen();
                
                // Show notification
                showNotification('Logout berhasil', 'success');
            } else {
                showNotification('Gagal logout. Silakan coba lagi.', 'error');
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
            showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        });
    }
    
    // Improved updateUIForLoggedUser function
    function updateUIForLoggedUser() {
        console.log("Updating UI for logged user");
        
        // Update user info display
        if (userName) userName.textContent = `${currentUser.firstName} ${currentUser.lastName || ''}`;
        if (userAvatar) userAvatar.src = currentUser.photoUrl || 'images/default-avatar.png';
        if (ticketsCount) ticketsCount.textContent = userTickets;
        
        // Update profile information
        if (profileAvatar) profileAvatar.src = currentUser.photoUrl || 'images/default-avatar.png';
        if (profileName) profileName.textContent = `${currentUser.firstName} ${currentUser.lastName || ''}`;
        if (profileTelegramId) profileTelegramId.textContent = `@${currentUser.username || currentUser.telegramId}`;
        
        // Show/hide elements - make sure these elements exist before modifying
        if (userInfo) userInfo.classList.remove('hidden');
        if (loginBtn) loginBtn.classList.add('hidden');
        if (welcomeSection) welcomeSection.classList.add('hidden');
        if (dashboardSection) dashboardSection.classList.remove('hidden');
        
        // Add welcome animation
        const userWelcome = document.createElement('div');
        userWelcome.className = 'welcome-popup';
        userWelcome.innerHTML = `<div class="welcome-content">Welcome, ${currentUser.firstName}! 👋</div>`;
        document.body.appendChild(userWelcome);
        
        setTimeout(() => {
            userWelcome.classList.add('show');
            setTimeout(() => {
                userWelcome.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(userWelcome);
                }, 300);
            }, 2000);
        }, 100);
        
        // Populate platform select dropdown for ticket requests
        populatePlatformSelect();
        
        // Load history
        loadHistory();
        
        console.log("UI updated for logged user");
    }
    
    function showWelcomeScreen() {
        // Show welcome screen for non-logged users
        if (userInfo) userInfo.classList.add('hidden');
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (welcomeSection) welcomeSection.classList.remove('hidden');
        if (dashboardSection) dashboardSection.classList.add('hidden');
        if (scratchGameSection) scratchGameSection.classList.add('hidden');
        if (prizesSection) prizesSection.classList.add('hidden');
        if (historySection) historySection.classList.add('hidden');
        if (profileSection) profileSection.classList.add('hidden');
    }
    
    // Game ID Registration
    function handleGameIdSubmit(e) {
        e.preventDefault();
        
        const platform = platformSelect.value;
        const id = gameId.value.trim();
        
        if (!platform || !id) {
            showNotification('Silakan pilih platform dan masukkan Game ID yang valid.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = gameIdForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Menyimpan...';
        submitBtn.disabled = true;
        
        // Save game ID to server
        fetch('/api/user/game-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ platform, gameId: id })
        })
        .then(response => response.json())
        .then(data => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            if (data.success) {
                // Update local game IDs
                userGameIds[platform] = id;
                
                // Close modal and update UI
                closeModal(registerGameIdModal);
                updateUIForLoggedUser();
                updateGameIdsList();
                
                // Show success notification
                showNotification('Game ID berhasil disimpan!', 'success');
            } else {
                showNotification(data.message || 'Gagal menyimpan Game ID. Silakan coba lagi.', 'error');
            }
        })
        .catch(error => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            console.error('Error saving game ID:', error);
            showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        });
    }
    
    // Ticket Requests
    function openGetTicketModal() {
        if (Object.keys(userGameIds).length === 0) {
            showNotification('Anda harus mendaftarkan Game ID terlebih dahulu.', 'warning');
            openModal(registerGameIdModal);
            return;
        }
        
        populatePlatformSelect();
        
        // Reset method fields
        methodRecharge.checked = true;
        toggleMethodFields();
        
        openModal(getTicketModal);
    }
    
    function populatePlatformSelect() {
        // Clear existing options except the default one
        while (ticketPlatformSelect.options.length > 1) {
            ticketPlatformSelect.remove(1);
        }
        
        // Add user's registered platforms
        for (const platform in userGameIds) {
            const option = document.createElement('option');
            option.value = platform;
            option.textContent = `${platform} (ID: ${userGameIds[platform]})`;
            ticketPlatformSelect.appendChild(option);
        }
        
        // Add animation to highlight the dropdown
        if (ticketPlatformSelect.parentElement) {
            ticketPlatformSelect.parentElement.classList.add('highlight');
            setTimeout(() => {
                ticketPlatformSelect.parentElement.classList.remove('highlight');
            }, 1000);
        }
    }
    
    function toggleMethodFields() {
        // Hide all method fields first
        rechargeFields.classList.add('hidden');
        vipFields.classList.add('hidden');
        bettingFields.classList.add('hidden');
        inviteFields.classList.add('hidden');
        
        // Hide all method info
        rechargeInfo.classList.add('hidden');
        vipInfo.classList.add('hidden');
        bettingInfo.classList.add('hidden');
        inviteInfo.classList.add('hidden');
        
        // Show the selected method fields with animation
        if (methodRecharge && methodRecharge.checked) {
            rechargeFields.classList.remove('hidden');
            rechargeInfo.classList.remove('hidden');
            animateElement(rechargeFields);
            animateElement(rechargeInfo);
        } else if (methodVIP && methodVIP.checked) {
            vipFields.classList.remove('hidden');
            vipInfo.classList.remove('hidden');
            animateElement(vipFields);
            animateElement(vipInfo);
        } else if (methodBetting && methodBetting.checked) {
            bettingFields.classList.remove('hidden');
            bettingInfo.classList.remove('hidden');
            animateElement(bettingFields);
            animateElement(bettingInfo);
        } else if (methodInvite && methodInvite.checked) {
            inviteFields.classList.remove('hidden');
            inviteInfo.classList.remove('hidden');
            animateElement(inviteFields);
            animateElement(inviteInfo);
        }
    }
    
    function handleTicketRequest(e) {
        e.preventDefault();
        
        const platform = ticketPlatformSelect.value;
        let method = '';
        
        if (methodRecharge && methodRecharge.checked) {
            method = 'recharge';
        } else if (methodVIP && methodVIP.checked) {
            method = 'vip';
        } else if (methodBetting && methodBetting.checked) {
            method = 'betting';
        } else if (methodInvite && methodInvite.checked) {
            method = 'invite';
        }
        
        if (!platform || !method) {
            showNotification('Silakan pilih platform dan metode untuk mendapatkan tiket.', 'warning');
            return;
        }
        
        // Get additional fields based on method
        let requestData = { platform, method };
        
        if (method === 'recharge') {
            const amount = document.getElementById('rechargeAmount').value;
            const orderId = document.getElementById('rechargeOrderId').value;
            if (!amount || !orderId) {
                showNotification('Silakan isi jumlah recharge dan Order ID.', 'warning');
                return;
            }
            requestData.amount = amount;
            requestData.orderId = orderId;
        } else if (method === 'vip') {
            const vipLevel = document.getElementById('vipLevel').value;
            requestData.vipLevel = vipLevel;
        } else if (method === 'betting') {
            const bettingAmount = document.getElementById('bettingAmount').value;
            if (!bettingAmount) {
                showNotification('Silakan isi jumlah betting.', 'warning');
                return;
            }
            requestData.bettingAmount = bettingAmount;
        } else if (method === 'invite') {
            const inviteCount = document.getElementById('inviteCount').value;
            const referralIds = document.getElementById('referralIds').value;
            if (!inviteCount || !referralIds) {
                showNotification('Silakan isi jumlah referral dan Referral IDs.', 'warning');
                return;
            }
            requestData.inviteCount = inviteCount;
            requestData.referralIds = referralIds;
        }
        
        // Show loading state
        const submitBtn = ticketRequestForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        // Send ticket request to server
        fetch('/api/tickets/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            if (data.success) {
                closeModal(getTicketModal);
                openModal(requestSentModal);
                
                // Add confetti effect
                showConfetti();
                
                // Reset form
                ticketRequestForm.reset();
                
                // Add to history
                const historyEntry = {
                    type: 'ticket',
                    method: method,
                    platform: platform,
                    details: getMethodDetails(method, requestData),
                    date: new Date()
                };
                addHistoryEntry(historyEntry);
            } else {
                showNotification(data.message || 'Gagal mengirim permintaan tiket. Silakan coba lagi.', 'error');
            }
        })
        .catch(error => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            console.error('Error requesting tickets:', error);
            showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        });
    }
    
    function getMethodDetails(method, data) {
        switch (method) {
            case 'recharge':
                return `Deposit R$${data.amount}`;
            case 'vip':
                return `VIP Level ${data.vipLevel}`;
            case 'betting':
                return `Betting R$${data.bettingAmount}`;
            case 'invite':
                return `${data.inviteCount} Referrals`;
            default:
                return '';
        }
    }
    
    // Open Prize Modal
    function openPrizeModal(cardType) {
        // Set active tab to the selected card type
        document.querySelectorAll('.prize-categories .category').forEach(cat => {
            if (cat.getAttribute('data-card') === cardType) {
                cat.click();
            }
        });
        
        openModal(viewPrizeModal);
    }
    
    // Game Play
    function startGame(cardType, ticketCost) {
        if (userTickets < ticketCost) {
            showNotification(`Anda tidak memiliki cukup tiket. Diperlukan ${ticketCost} tiket untuk memainkan Kupon Gosok ${cardType}.`, 'warning');
            return;
        }
        
        // Confirm ticket usage with a nicer confirmation dialog
        showConfirmDialog(`Anda akan menggunakan ${ticketCost} tiket untuk memainkan Kupon Gosok ${cardType}. Lanjutkan?`, () => {
            // Request server to start game and deduct tickets
            fetch('/api/scratch-cards/play', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cardType, ticketCost })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update user tickets
                    userTickets = data.tickets;
                    ticketsCount.textContent = userTickets;
                    
                    // Set current game
                    currentCardType = cardType;
                    currentTicketCost = ticketCost;
                    
                    // Set card type label
                    cardTypeLabel.textContent = cardType;
                    
                    // Show game section with transition
                    dashboardSection.classList.add('fade-out');
                    setTimeout(() => {
                        dashboardSection.classList.add('hidden');
                        dashboardSection.classList.remove('fade-out');
                        scratchGameSection.classList.add('fade-in');
                        scratchGameSection.classList.remove('hidden');
                        setTimeout(() => {
                            scratchGameSection.classList.remove('fade-in');
                        }, 500);
                    }, 300);
                    
                    // Initialize scratch card
                    initScratchCard();
                } else {
                    showNotification(data.message || 'Gagal memulai permainan. Silakan coba lagi.', 'error');
                }
            })
            .catch(error => {
                console.error('Error starting game:', error);
                showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
            });
        });
    }
    
    // Enhanced Scratch Card Implementation
    function initScratchCard() {
        // Create scratch card instance if not exists
        if (!window.scratchCard) {
            // Create the canvas for scratch card
            const canvas = document.getElementById('scratchCanvas');
            
            if (!canvas) {
                console.error('Scratch canvas not found!');
                return;
            }
            
            // Initialize the scratch card
            window.scratchCard = new ScratchCard('scratchCanvas', currentCardType, 50);
            
            // Set reveal callback
            window.scratchCard.onReveal = function(prize) {
                if (prize) {
                    // Show win modal with the prize
                    prizeName.textContent = prize.name;
                    prizeCode.textContent = generateRandomCode();
                    
                    // Record the win in history
                    addHistoryEntry({
                        type: 'game',
                        cardType: currentCardType,
                        prize: prize.name,
                        date: new Date()
                    });
                    
                    setTimeout(() => {
                        openModal(winPrizeModal);
                    }, 1000);
                } else {
                    // Show lose modal
                    setTimeout(() => {
                        openModal(loseModal);
                    }, 1000);
                    
                    // Record the loss in history
                    addHistoryEntry({
                        type: 'game',
                        cardType: currentCardType,
                        prize: null,
                        date: new Date()
                    });
                }
            };
        } else {
            // Reset the existing scratch card
            window.scratchCard.reset();
        }
    }
    
    function showDashboard() {
        scratchGameSection.classList.add('fade-out');
        setTimeout(() => {
            scratchGameSection.classList.add('hidden');
            scratchGameSection.classList.remove('fade-out');
            dashboardSection.classList.add('fade-in');
            dashboardSection.classList.remove('hidden');
            setTimeout(() => {
                dashboardSection.classList.remove('fade-in');
            }, 500);
        }, 300);
    }
    
    function handleBackToHome() {
        closeModal(winPrizeModal);
        showDashboard();
    }
    
    function handleTryAgain() {
        closeModal(loseModal);
        showDashboard();
    }
    
    // Helper Functions
    function openModal(modal) {
        if (!modal) return;
        
        // Hide any visible modals first
        document.querySelectorAll('.modal.show').forEach(m => {
            m.classList.remove('show');
        });
        
        modal.classList.add('show');
        modal.classList.add('fade-in');
        setTimeout(() => {
            modal.classList.remove('fade-in');
        }, 300);
    }
    
    function closeModal(modal) {
        if (!modal) return;
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.classList.remove('show');
            modal.classList.remove('fade-out');
        }, 300);
    }
    
    function generateRandomCode(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'PS';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    
    function getPrizeByCardType() {
        let prizes;
        
        switch (currentCardType) {
            case 'A':
                prizes = prizesTypeA;
                break;
            case 'B':
                prizes = prizesTypeB;
                break;
            case 'C':
                prizes = prizesTypeC;
                break;
            default:
                prizes = prizesTypeA;
        }
        
        // Sum of all probabilities
        const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0);
        
        // Add "lose" option with a higher probability
        const loseProbability = totalProbability * 2; // Making the lose chance higher
        const randomValue = Math.random() * (totalProbability + loseProbability);
        
        if (randomValue > totalProbability) {
            return null; // No prize (lose)
        }
        
        // Determine which prize was won
        let cumulativeProbability = 0;
        for (const prize of prizes) {
            cumulativeProbability += prize.probability;
            if (randomValue <= cumulativeProbability) {
                return prize;
            }
        }
        
        return null; // Fallback, should not happen
    }
    
    // Enhanced UI Functions
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.classList.add('fadeOut');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', () => {
            notification.classList.add('fadeOut');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        notification.appendChild(closeBtn);
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-remove after delay
        setTimeout(() => {
            notification.classList.add('fadeOut');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    function showConfirmDialog(message, onConfirm, onCancel) {
        // Create dialog element
        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.innerHTML = `
            <div class="confirm-dialog-content">
                <p>${message}</p>
                <div class="confirm-dialog-buttons">
                    <button class="btn confirm-yes">Ya</button>
                    <button class="btn confirm-no">Tidak</button>
                </div>
            </div>
        `;
        
        // Add event listeners
        const yesBtn = dialog.querySelector('.confirm-yes');
        const noBtn = dialog.querySelector('.confirm-no');
        
        yesBtn.addEventListener('click', () => {
            document.body.removeChild(dialog);
            if (typeof onConfirm === 'function') onConfirm();
        });
        
        noBtn.addEventListener('click', () => {
            document.body.removeChild(dialog);
            if (typeof onCancel === 'function') onCancel();
        });
        
        document.body.appendChild(dialog);
    }
    
    function animateElement(element) {
        element.classList.add('animate-in');
        setTimeout(() => {
            element.classList.remove('animate-in');
        }, 500);
    }
    
    function showConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confettiContainer.appendChild(confetti);
        }
        
        document.body.appendChild(confettiContainer);
        
        setTimeout(() => {
            confettiContainer.classList.add('fadeOut');
            setTimeout(() => {
                if (confettiContainer.parentNode) {
                    confettiContainer.parentNode.removeChild(confettiContainer);
                }
            }, 1000);
        }, 3000);
    }
    
    function startWinnersCarousel() {
        const container = document.querySelector('.carousel-container');
        if (!container) return;
        
        const items = container.querySelectorAll('.carousel-item');
        if (items.length === 0) return;
        
        // Clone items to create seamless loop
        items.forEach(item => {
            const clone = item.cloneNode(true);
            container.appendChild(clone);
        });
    }
    
    // History Management
    function loadHistory() {
        // Fetch history from server
        fetch('/api/user/history')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Clear container
                    historyContainer.innerHTML = '';
                    
                    // Add history items
                    if (data.history.length === 0) {
                        historyContainer.innerHTML = '<div class="no-history">Belum ada riwayat aktivitas.</div>';
                        return;
                    }
                    
                    data.history.forEach(item => {
                        addHistoryItemToDOM(item);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading history:', error);
                historyContainer.innerHTML = '<div class="error-message">Gagal memuat riwayat. Silakan refresh halaman.</div>';
            });
    }
    
    function addHistoryEntry(entry) {
        // In real app, this would send the entry to the server
        // For now, just add to DOM
        addHistoryItemToDOM(entry, true);
    }
    
    function addHistoryItemToDOM(item, prepend = false) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        // Format date
        const date = new Date(item.date);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        let historyHTML = '';
        
        if (item.type === 'game') {
            const resultClass = item.prize ? 'win' : 'lose';
            const resultText = item.prize ? `Menang: ${item.prize}` : 'Tidak menang';
            
            historyHTML = `
                <div>
                    <strong>Kupon Gosok ${item.cardType}</strong>
                    <div class="history-prize ${resultClass}">${resultText}</div>
                </div>
                <div class="history-date">${formattedDate}</div>
            `;
        } else if (item.type === 'ticket') {
            historyHTML = `
                <div>
                    <strong>${capitalizeFirstLetter(item.method)}</strong>
                    <div>${item.details}</div>
                </div>
                <div class="history-date">${formattedDate}</div>
            `;
        }
        
        historyItem.innerHTML = historyHTML;
        
        // Add animation
        historyItem.classList.add('fade-in');
        
        if (prepend) {
            historyContainer.prepend(historyItem);
        } else {
            historyContainer.appendChild(historyItem);
        }
        
        setTimeout(() => {
            historyItem.classList.remove('fade-in');
        }, 500);
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Initialize the app
    init();
    
    // Add the CSS for new animations and UI elements
    addAnimationStyles();
    
    function addAnimationStyles() {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            /* Animations */
            .fade-in {
                animation: fadeIn 0.3s forwards;
                opacity: 0;
            }
            .fade-out {
                animation: fadeOut 0.3s forwards;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(10px); }
            }
            
            /* Notification */
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                z-index: 10000;
                max-width: 300px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                transform: translateY(-20px);
                opacity: 0;
                transition: transform 0.3s, opacity 0.3s;
            }
            
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .notification.fadeOut {
                opacity: 0;
                transform: translateY(-20px);
            }
            
            .notification.info {
                background-color: #3498db;
            }
            
            .notification.success {
                background-color: #2ecc71;
            }
            
            .notification.warning {
                background-color: #f39c12;
            }
            
            .notification.error {
                background-color: #e74c3c;
            }
            
            .notification-close {
                position: absolute;
                top: 5px;
                right: 10px;
                cursor: pointer;
                font-size: 18px;
            }
            
            /* Confirm Dialog */
            .confirm-dialog {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s forwards;
            }
            
            .confirm-dialog-content {
                background-color: #1e1e1e;
                border-radius: 12px;
                padding: 20px;
                width: 90%;
                max-width: 400px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                text-align: center;
            }
            
            .confirm-dialog-buttons {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-top: 20px;
            }
            
            .confirm-dialog .btn {
                padding: 10px 20px;
                border-radius: 8px;
                border: none;
                font-weight: 600;
                cursor: pointer;
                min-width: 100px;
                transition: transform 0.2s, background-color 0.2s;
            }
            
            .confirm-dialog .btn:active {
                transform: scale(0.98);
            }
            
            .confirm-dialog .confirm-yes {
                background-color: #ff3a5e;
                color: white;
            }
            
            .confirm-dialog .confirm-no {
                background-color: #303030;
                color: white;
                border: 1px solid rgba(255,255,255,0.1);
            }
            
            /* Form highlight animation */
            .highlight {
                animation: highlight 1s;
            }
            
            @keyframes highlight {
                0% { background-color: transparent; }
                30% { background-color: rgba(255, 58, 94, 0.2); }
                100% { background-color: transparent; }
            }
            
            .animate-in {
                animation: scaleIn 0.5s forwards;
                transform-origin: top center;
            }
            
            @keyframes scaleIn {
                0% { transform: scaleY(0.8); opacity: 0; }
                100% { transform: scaleY(1); opacity: 1; }
            }
            
            /* Confetti */
            .confetti-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
                z-index: 9999;
            }
            
            .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                opacity: 0;
                transform: translateY(0);
                animation: confetti-fall 3s linear forwards;
            }
            
            @keyframes confetti-fall {
                0% {
                    opacity: 1;
                    top: -10px;
                    transform: translateX(0) rotate(0deg);
                }
                100% {
                    opacity: 0.3;
                    top: 100%;
                    transform: translateX(100px) rotate(720deg);
                }
            }
            
            /* Welcome popup */
            .welcome-popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.8);
                background-color: rgba(255, 58, 94, 0.9);
                color: white;
                padding: 15px 30px;
                border-radius: 30px;
                box-shadow: 0 5px 25px rgba(255, 58, 94, 0.5);
                opacity: 0;
                transition: transform 0.3s, opacity 0.3s;
                z-index: 10000;
            }
            
            .welcome-popup.show {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            
            .welcome-content {
                font-size: 18px;
                font-weight: bold;
            }
            
            /* Profile styles */
            .profile-section {
                padding: 20px;
            }
            
            .profile-header {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .profile-avatar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                object-fit: cover;
                border: 3px solid var(--accent-color);
            }
            
            .profile-info {
                margin-left: 20px;
            }
            
            .profile-name {
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 5px;
            }
            
            .profile-telegram-id {
                color: var(--text-secondary);
                font-size: 14px;
            }
            
            .profile-section-title {
                font-size: 18px;
                font-weight: bold;
                margin: 20px 0 10px;
                display: flex;
                align-items: center;
            }
            
            .profile-section-title i {
                margin-right: 8px;
                color: var(--accent-color);
            }
            
            .game-ids-container {
                background-color: var(--card-bg);
                border-radius: var(--border-radius);
                padding: 15px;
                margin-bottom: 20px;
            }
            
            .game-id-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .game-id-item:last-child {
                border-bottom: none;
            }
            
            .game-id-platform {
                font-weight: bold;
                margin-bottom: 4px;
            }
            
            .game-id-value {
                color: var(--text-secondary);
                font-size: 14px;
            }
            
            .edit-game-id {
                background-color: rgba(255, 255, 255, 0.1);
                color: var(--text-color);
                border: none;
                border-radius: 4px;
                padding: 6px 12px;
                font-size: 12px;
                cursor: pointer;
            }
            
            .add-game-id-btn {
                background-color: var(--accent-color);
                color: white;
                border: none;
                border-radius: var(--button-radius);
                padding: 10px 15px;
                font-size: 14px;
                font-weight: bold;
                display: flex;
                align-items: center;
                margin-top: 10px;
                cursor: pointer;
            }
            
            .add-game-id-btn i {
                margin-right: 8px;
            }
            
            .logout-btn {
                background-color: transparent;
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: var(--text-color);
                border-radius: var(--button-radius);
                padding: 12px;
                width: 100%;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                margin-top: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .logout-btn i {
                margin-right: 8px;
                color: #e74c3c;
            }
            
            /* Prize display */
            .prizes-modal-content {
                height: 80vh;
                display: flex;
                flex-direction: column;
            }
            
            .prize-categories {
                display: flex;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                overflow-x: auto;
                scrollbar-width: none;
            }
            
            .prize-categories::-webkit-scrollbar {
                display: none;
            }
            
            .prize-categories .category {
                padding: 12px 20px;
                white-space: nowrap;
                cursor: pointer;
                position: relative;
                color: var(--text-secondary);
            }
            
            .prize-categories .category.active {
                color: var(--accent-color);
            }
            
            .prize-categories .category.active:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 3px;
                background-color: var(--accent-color);
            }
            
            .prizes-list {
                flex: 1;
                overflow-y: auto;
                padding: 15px;
            }
            
            .prize-item {
                display: flex;
                align-items: center;
                padding: 10px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .prize-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
            }
            
            .prize-details {
                flex: 1;
            }
            
            .prize-name {
                font-weight: bold;
                margin-bottom: 4px;
            }
            
            .prize-type {
                font-size: 12px;
                color: var(--text-secondary);
            }
            
            .prize-probability {
                font-size: 12px;
                color: var(--accent-color);
                background-color: var(--accent-light);
                padding: 4px 8px;
                border-radius: 12px;
            }
            
            /* Ticket request info */
            .method-info {
                background-color: rgba(255, 255, 255, 0.05);
                border-radius: var(--border-radius);
                padding: 12px;
                margin-top: 10px;
                margin-bottom: 16px;
                font-size: 14px;
                color: var(--text-secondary);
            }
            
            .method-info ul {
                margin: 8px 0 0 20px;
            }
            
            .method-info li {
                margin-bottom: 6px;
            }
            
            .method-info strong {
                color: var(--accent-color);
            }
            
            /* Banner slider */
            .banner-slider {
                position: relative;
                border-radius: var(--border-radius);
                overflow: hidden;
                margin-bottom: 20px;
            }
            
            .banner-slide {
                width: 100%;
                border-radius: var(--border-radius);
                transition: opacity 0.5s;
            }
            
            .banner-slide img {
                width: 100%;
                display: block;
                border-radius: var(--border-radius);
            }
            
            .banner-dots {
                position: absolute;
                bottom: 10px;
                left: 0;
                right: 0;
                display: flex;
                justify-content: center;
                gap: 8px;
            }
            
            .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .dot.active {
                background-color: var(--accent-color);
                transform: scale(1.2);
                box-shadow: 0 0 10px var(--accent-light);
            }
        `;
        document.head.appendChild(styleEl);
    }
});
