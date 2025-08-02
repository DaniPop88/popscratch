// Main application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
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

    // User State
    let currentUser = null;
    let userTickets = 0;
    let userGameIds = {};
    let currentCardType = null;
    let currentTicketCost = 0;
    
    // Sample prizes for different card types
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
            alert('Login failed. Please try again.');
            // Clear the URL parameter
            window.history.replaceState({}, document.title, '/');
        }
        
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
    }
    
    // Login & Authentication
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
        
        // Populate platform select dropdown for ticket requests
        populatePlatformSelect();
        
        // Load history (mock)
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
            alert('Silakan pilih platform dan masukkan Game ID yang valid.');
            return;
        }
        
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
            if (data.success) {
                // Update local game IDs
                userGameIds[platform] = id;
                
                // Close modal and update UI
                closeModal(registerGameIdModal);
                updateUIForLoggedUser();
            } else {
                alert(data.message || 'Gagal menyimpan Game ID. Silakan coba lagi.');
            }
        })
        .catch(error => {
            console.error('Error saving game ID:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        });
    }
    
    // Ticket Requests
    function openGetTicketModal() {
        if (Object.keys(userGameIds).length === 0) {
            alert('Anda harus mendaftarkan Game ID terlebih dahulu.');
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
    }
    
    function toggleMethodFields() {
        // Hide all method fields first
        rechargeFields.classList.add('hidden');
        vipFields.classList.add('hidden');
        bettingFields.classList.add('hidden');
        inviteFields.classList.add('hidden');
        
        // Show the selected method fields
        if (methodRecharge && methodRecharge.checked) {
            rechargeFields.classList.remove('hidden');
        } else if (methodVIP && methodVIP.checked) {
            vipFields.classList.remove('hidden');
        } else if (methodBetting && methodBetting.checked) {
            bettingFields.classList.remove('hidden');
        } else if (methodInvite && methodInvite.checked) {
            inviteFields.classList.remove('hidden');
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
            alert('Silakan pilih platform dan metode untuk mendapatkan tiket.');
            return;
        }
        
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
            if (data.success) {
                closeModal(getTicketModal);
                openModal(requestSentModal);
            } else {
                alert(data.message || 'Gagal mengirim permintaan tiket. Silakan coba lagi.');
            }
        })
        .catch(error => {
            console.error('Error requesting tickets:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        });
    }
    
    // Game Play
    function startGame(cardType, ticketCost) {
        if (userTickets < ticketCost) {
            alert(`Anda tidak memiliki cukup tiket. Diperlukan ${ticketCost} tiket untuk memainkan Kupon Gosok ${cardType}.`);
            return;
        }
        
        // Confirm ticket usage
        if (!confirm(`Anda akan menggunakan ${ticketCost} tiket untuk memainkan Kupon Gosok ${cardType}. Lanjutkan?`)) {
            return;
        }
        
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
                
                // Show game section
                dashboardSection.classList.add('hidden');
                scratchGameSection.classList.remove('hidden');
                
                // Initialize scratch card
                if (typeof initScratchCard === 'function') {
                    initScratchCard();
                }
            } else {
                alert(data.message || 'Gagal memulai permainan. Silakan coba lagi.');
            }
        })
        .catch(error => {
            console.error('Error starting game:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        });
    }
    
    function showDashboard() {
        scratchGameSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
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
        modal.classList.remove('hidden');
    }
    
    function closeModal(modal) {
        modal.classList.add('hidden');
    }
    
    function generateRandomCode(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
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
        
        if (prepend) {
            historyContainer.prepend(historyItem);
        } else {
            historyContainer.appendChild(historyItem);
        }
    }
    
    // Initialize the app
    init();
});