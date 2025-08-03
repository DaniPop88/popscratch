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
    const scratchGameSection = document.getElementById('scratchGameSection');
    const getTicketBtn = document.getElementById('getTicketBtn');
    const backToDashboard = document.getElementById('backToDashboard');
    const historyContainer = document.getElementById('historyContainer');
    const cardTypeLabel = document.getElementById('cardTypeLabel');
    
    // Modals
    const modals = document.querySelectorAll('.modal');
    const registerGameIdModal = document.getElementById('registerGameIdModal');
    const getTicketModal = document.getElementById('getTicketModal');
    const winPrizeModal = document.getElementById('winPrizeModal');
    const loseModal = document.getElementById('loseModal');
    const requestSentModal = document.getElementById('requestSentModal');
    
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
            showNotification('Login failed. Please try again.', 'error');
            // Clear the URL parameter
            window.history.replaceState({}, document.title, '/');
        }
        
        // Initialize Winners Carousel
        startWinnersCarousel();
        
        // Add event listeners
        addEventListeners();
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
        
        // Bottom Nav Items
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(navItem => navItem.classList.remove('active'));
                this.classList.add('active');
                
                // Handle specific navigation actions
                const action = this.getAttribute('data-action');
                if (action === 'ticket') {
                    openGetTicketModal();
                } else if (action === 'register') {
                    openModal(registerGameIdModal);
                }
            });
        });
    }
    
    // Login & Authentication (keeping the existing implementation)
    function checkLoginStatus() {
        // Check session with server
        fetch('/api/auth/check')
            .then(response => response.json())
            .then(data => {
                if (data.success && data.isAuthenticated) {
                    currentUser = data.user;
                    
                    // Fetch ticket balance
                    fetch('/api/tickets/balance')
                        .then(response => response.json())
                        .then(ticketData => {
                            if (ticketData.success) {
                                userTickets = ticketData.tickets;
                                
                                // Fetch user's game IDs
                                fetch('/api/user/game-ids')
                                    .then(response => response.json())
                                    .then(idsData => {
                                        if (idsData.success) {
                                            userGameIds = idsData.gameIds || {};
                                            updateUIForLoggedUser();
                                        }
                                    })
                                    .catch(error => console.error('Error fetching game IDs:', error));
                            }
                        })
                        .catch(error => console.error('Error fetching tickets:', error));
                } else {
                    showWelcomeScreen();
                }
            })
            .catch(error => {
                console.error('Error checking auth status:', error);
                showWelcomeScreen();
            });
    }
    
    function handleLogin() {
        // Use the numeric bot ID (first part of the token before the colon)
        const botId = '8360720049';
        const callbackUrl = window.location.origin + '/api/auth/telegram-callback';
        const width = 550;
        const height = 470;
        
        const url = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent(window.location.origin)}&return_to=${encodeURIComponent(callbackUrl)}`;
        
        // Open popup for login
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);
        window.open(url, 'telegram-login', `width=${width},height=${height},left=${left},top=${top}`);
    }
    
    function updateUIForLoggedUser() {
        // Update user info display
        userName.textContent = `${currentUser.firstName} ${currentUser.lastName || ''}`;
        userAvatar.src = currentUser.photoUrl || 'images/default-avatar.png';
        ticketsCount.textContent = userTickets;
        
        // Show/hide elements
        userInfo.classList.remove('hidden');
        loginBtn.classList.add('hidden');
        welcomeSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        
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
    }
    
    function showWelcomeScreen() {
        // Show welcome screen for non-logged users
        userInfo.classList.add('hidden');
        loginBtn.classList.remove('hidden');
        welcomeSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
        scratchGameSection.classList.add('hidden');
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
        
        // Show the selected method fields with animation
        if (methodRecharge && methodRecharge.checked) {
            rechargeFields.classList.remove('hidden');
            animateElement(rechargeFields);
        } else if (methodVIP && methodVIP.checked) {
            vipFields.classList.remove('hidden');
            animateElement(vipFields);
        } else if (methodBetting && methodBetting.checked) {
            bettingFields.classList.remove('hidden');
            animateElement(bettingFields);
        } else if (methodInvite && methodInvite.checked) {
            inviteFields.classList.remove('hidden');
            animateElement(inviteFields);
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
            body: JSON.stringify({ platform, method })
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
            window.scratchCard = new ScratchCard('scratchCanvas', null, 50);
            
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
    
    // ScratchCard Class
    class ScratchCard {
        constructor(canvasId, imageUrl, revealPercentage = 50) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;
            
            this.ctx = this.canvas.getContext('2d');
            this.brush = new Image();
            this.brush.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURUxpcWlrXXR0XYODZZSUbpmZcJmZcJubcZ6ecqGhdKKidKKidaOjdaSkdqWld6amd6amd6amd6endqendqendqend6ioeKmpd6mpd6mpeKmpeKqqeaqqeaureamreaurequreq2te62te62te62te62te62te66ufK+vfa+vfbCwfbCwfrGxf7Gxf7Gxf7GxgLKygLKygLOzgbS0grW1g7W1g7a2hLe3hbi4hbm5hrm5hrq6h7u7h7u7iLy8ib29ib29ib29ir6+ir6+ir6+i7+/jMDAjcHBjcLCjsPDj8TEj8XFkMXFkcbGkcbGkcbGksfHk8jIk8jIlMnJlcnJlcrKlsvLl8vLl8zMmMzMmMzMmM3Nmc7Oms/Pm8/Pm9DQnNDQnNDQnNHRndLSntLSntPTn9PTn9TTn9TUoNXVodbWotbWotfXo9jYpNjYpNjYpNjYpdjZpdjZpdjZpdjZpdnapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapdjapNgD+IgAAAP90Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/3yBxO0AAAPCSURBVGje7dn5PxVRFAfw2UkpJVuIkIQQWSohKm1IthAhEimSSiVF9kS2LNmyL9m3kH3fQva993vnDJpi5r1mzL36wz1/wcycc+/nfc97594z94EgWfSYDkRy9YuN8uVAJbv8u6NVAEbZs4jDMeA7KpzJscWXwlw8OiKcQboP+LPHx3A0udJnkwy+inN+EGbuQSE21ip4MYnH3C+SVtGM5QgCNZoW40m3gMW4UMhpOgx2WB7gsay+o6qynCqMvS8v2E5JUHaHlYWVA2zP5qRbn0Vg5tez18SjLUkwvBYKZjHYpr9xtLjYoOc2DqaP+5W+GmcxiqXl9L9Z5/NaHJP66HStV1/1qGQJZjHKzBVt3u9Kt/RZW7MsLVxbshhHp5WJ8+m29Has2K6rZHTShaSQfSw4wY3GJyK4qX2i6QijkwyNRCdsO9ZrBV3iy29DV/CUwlPHue3ZRvlTjB07WDGmkDR2G8CNaNgLJWyRXDxKAcoGMGCw+XsJ1kj2B2UOUGbDgMHnD6NoGrMPGw3AhgF0b+duoHgasx2rDMCCAUwowR04nMZsw3IDsGMALSpwJ46mMY3FApvkDKBSDS7HvjRmC5ZKOIATAzhThbtxKI3ZjDkGYMsADmvArTiaxmzCLF2wYQH11bgJB9OYjZipA3YQqkr7HVdhZxqzHjN0wR7C2UdcgC1pzFpM1wEHyGh/FF9hRRqzClNBgBURruVSLEpjVmASCHCEIMKXPeCFgRXG/8UMI/MZBoyC14ye4wGunUIlPKo0ZjnGgwCn8BwP8HDKGM9lm56rJhXjGo+HjP/jQYmGutFj01gJDzVDjJa+iYbLaCwbDSLcBivdGO1zUh0W9qexyHiIBSGejzKiM+dtMG7EmDQWkdQ6zVJwf7h5u6I4PMkTSS0zLSUXGJr3KzeOCMJoGrNkWGQrOc/Ukz/vXoN5DCL9rgvWFcfEdjbd0NyHsthMLI1lA6LbG5qggKOZiXEbMbp/c1NHY9XyAyxGO5vOEsxe2gaqKioq/7sGGBfxXcn3HXgTwhc1JZM0xNJYepFf+MlTlwUWG/DD+Se4HCOjiUzG+83+fU8GBi6DK9H6GE1kPJeKjpGxLAXXo36MJjKaP4tlHIvB9XgN/Zfxkx3huDTXY2i0KI05gtdRGstQoW1pzHHsj9FYBrHjNJZFXCTLOBaP+zGayGQhnuySZRzLwY9o/RM8ka2lG8tCrMVoIjPZWxqNJjJZDNfFMpnIJI6UyWKpzJbLZDaOxdJ4/AGUs+I5XgQOYQAAAABJRU5ErkJggg==';
            this.imageUrl = imageUrl || this._createPrizeImage();
            this.revealPercentage = revealPercentage;
            this.isDrawing = false;
            this.revealedPixels = 0;
            this.totalPixels = this.canvas.width * this.canvas.height;
            this.lastX = 0;
            this.lastY = 0;
            this.revealed = false;
            this.prize = null;
            this.onReveal = null;

            this._init();
        }

        _init() {
            this._createOverlay();
            this._setupEventListeners();
            this._generateRandomPrize();
        }

        _createOverlay() {
            this.ctx.fillStyle = '#303030';  
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Add some scratch card effects
            this.ctx.font = 'bold 24px Inter';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Add sparkles or design elements
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                const size = Math.random() * 3 + 1;
                
                this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
                this.ctx.beginPath();
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
                this.ctx.fill();
            }

            // Add text on the scratch area
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            this.ctx.fillText('Gesek Di Sini!', this.canvas.width / 2, this.canvas.height / 2);
            
            // Add border
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(5, 5, this.canvas.width - 10, this.canvas.height - 10);
        }

        _setupEventListeners() {
            const self = this;
            
            // Mouse Events
            this.canvas.addEventListener('mousedown', function(e) {
                self.isDrawing = true;
                self.lastX = e.offsetX;
                self.lastY = e.offsetY;
            });
            
            this.canvas.addEventListener('mousemove', function(e) {
                if (self.isDrawing) {
                    self._handleDrawing(e.offsetX, e.offsetY);
                }
            });
            
            document.addEventListener('mouseup', function() {
                self.isDrawing = false;
            });

            // Touch Events
            this.canvas.addEventListener('touchstart', function(e) {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = self.canvas.getBoundingClientRect();
                self.lastX = touch.clientX - rect.left;
                self.lastY = touch.clientY - rect.top;
                self.isDrawing = true;
            });

            this.canvas.addEventListener('touchmove', function(e) {
                e.preventDefault();
                if (self.isDrawing) {
                    const touch = e.touches[0];
                    const rect = self.canvas.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;
                    self._handleDrawing(x, y);
                }
            });

            this.canvas.addEventListener('touchend', function() {
                self.isDrawing = false;
            });
        }

        _handleDrawing(x, y) {
            const ctx = this.ctx;
            
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 40;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Calculate revealed area
            this._calculateRevealedArea();
            
            // Update last position
            this.lastX = x;
            this.lastY = y;
        }

        _calculateRevealedArea() {
            // Get image data to calculate transparent pixels
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            const pixels = imageData.data;
            let transparentPixels = 0;
            
            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] < 10) { // Almost transparent
                    transparentPixels++;
                }
            }
            
            this.revealedPixels = transparentPixels;
            const percentRevealed = (transparentPixels / this.totalPixels) * 100;
            
            // If revealed enough, show the prize
            if (percentRevealed > this.revealPercentage && !this.revealed) {
                this.revealed = true;
                this._revealPrize();
            }
        }

        _revealPrize() {
            // Update the prize text if available
            if (prizeReveal) {
                prizeReveal.innerHTML = this.prize ? 
                    `<div class="prize-result">${this.prize.name}</div>` : 
                    `<div class="prize-result lose">Coba lagi 😢</div>`;
            }
            
            // Call onReveal callback if provided
            if (typeof this.onReveal === 'function') {
                this.onReveal(this.prize);
            }
        }

        _generateRandomPrize() {
            // Use the prize probabilities from the card type
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
                this.prize = null; // No prize (lose)
                return;
            }
            
            // Determine which prize was won
            let cumulativeProbability = 0;
            for (const prize of prizes) {
                cumulativeProbability += prize.probability;
                if (randomValue <= cumulativeProbability) {
                    this.prize = prize;
                    return;
                }
            }
            
            this.prize = null; // Fallback, should not happen
        }

        _createPrizeImage() {
            // This would normally be a real image URL
            return '';
        }

        reset() {
            this.revealed = false;
            this.revealedPixels = 0;
            this._createOverlay();
            this._generateRandomPrize();
            
            if (prizeReveal) {
                prizeReveal.innerHTML = 'Gesek untuk melihat hadiah!';
            }
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
        modal.classList.remove('hidden');
        modal.classList.add('fade-in');
        setTimeout(() => {
            modal.classList.remove('fade-in');
        }, 300);
    }
    
    function closeModal(modal) {
        if (!modal) return;
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.classList.add('hidden');
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
        const container = document.querySelector('.winners-carousel-container');
        if (!container) return;
        
        const items = container.querySelectorAll('.winner-item');
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
                    <strong>${item.action}</strong>
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
        `;
        document.head.appendChild(styleEl);
    }
});
