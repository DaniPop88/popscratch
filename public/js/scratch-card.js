// Enhanced Scratch Card Implementation - Combined Version
class ScratchCard {
    constructor(canvasId, cardType, revealPercentage = 50) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.cardType = cardType;
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
        // Get the prize using the existing system
        this.prize = getPrizeByCardType();
        
        // Try to load background image specific to card type
        const backgroundImage = new Image();
        backgroundImage.src = `images/scratch-${this.cardType.toLowerCase()}.jpg`;
        
        backgroundImage.onload = () => {
            // If image loads successfully, use it
            this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        };
        
        backgroundImage.onerror = () => {
            // If image fails to load, create default overlay
            this._createDefaultOverlay();
        };
        
        // Set up listeners
        this._setupEventListeners();
        
        // Prepare the prize reveal area
        this._setupPrizeReveal();
    }

    _createDefaultOverlay() {
        this.ctx.fillStyle = '#303030';  
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Add scratch card effects
        this.ctx.font = 'bold 24px Inter, Arial, sans-serif';
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
    
    _setupPrizeReveal() {
        const prizeReveal = document.getElementById('prizeReveal');
        if (!prizeReveal) return;
        
        // Clear the prize reveal area
        prizeReveal.innerHTML = '';
        prizeReveal.classList.add('hidden');
        
        if (this.prize) {
            // If there's a prize, create the winning content
            const prizeIcon = document.createElement('i');
            prizeIcon.className = this.prize.type === 'money' ? 'fas fa-money-bill-wave' : 'fas fa-gift';
            prizeIcon.style.fontSize = '48px';
            prizeIcon.style.marginBottom = '10px';
            
            const prizeText = document.createElement('div');
            prizeText.textContent = this.prize.name;
            
            prizeReveal.appendChild(prizeIcon);
            prizeReveal.appendChild(prizeText);
        } else {
            // If no prize, create the losing content
            const sadIcon = document.createElement('i');
            sadIcon.className = 'far fa-frown';
            sadIcon.style.fontSize = '48px';
            sadIcon.style.marginBottom = '10px';
            
            const loseText = document.createElement('div');
            loseText.textContent = 'Belum Beruntung';
            
            const tryAgainText = document.createElement('div');
            tryAgainText.textContent = 'Coba Lagi Nanti';
            tryAgainText.style.fontSize = '16px';
            tryAgainText.style.marginTop = '10px';
            
            prizeReveal.appendChild(sadIcon);
            prizeReveal.appendChild(loseText);
            prizeReveal.appendChild(tryAgainText);
        }
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
        // Hide scratch instructions if they exist
        const scratchInstructions = document.getElementById('scratchInstructions');
        if (scratchInstructions) {
            scratchInstructions.classList.add('hidden');
        }
        
        // Show the prize reveal element if it exists
        const prizeReveal = document.getElementById('prizeReveal');
        if (prizeReveal) {
            prizeReveal.classList.remove('hidden');
        }
        
        // Update the prize text if it exists
        const prizeText = document.getElementById('prize-text');
        if (prizeText) {
            prizeText.innerHTML = this.prize ? 
                `<div class="prize-result">${this.prize.name}</div>` : 
                `<div class="prize-result lose">Belum Beruntung</div>`;
        }
        
        // Add to history
        if (typeof addHistoryEntry === 'function') {
            addHistoryEntry({
                date: new Date(),
                type: 'game',
                cardType: this.cardType,
                prize: this.prize ? this.prize.name : null
            });
        }
        
        // Show appropriate modal after delay
        setTimeout(() => {
            if (this.prize) {
                // Show win modal
                const prizeName = document.getElementById('prizeName');
                const prizeCode = document.getElementById('prizeCode');
                
                if (prizeName) prizeName.textContent = this.prize.name;
                if (prizeCode) prizeCode.textContent = this._generateUniqueCode();
                
                if (typeof openModal === 'function') {
                    openModal(document.getElementById('winPrizeModal'));
                }
            } else {
                // Show lose modal
                if (typeof openModal === 'function') {
                    openModal(document.getElementById('loseModal'));
                }
            }
        }, 1500);
        
        // Call onReveal callback if provided
        if (typeof this.onReveal === 'function') {
            this.onReveal(this.prize);
        }
        
        // Remove event listeners
        this._removeEventListeners();
    }
    
    _removeEventListeners() {
        const self = this;
        
        this.canvas.removeEventListener('mousedown', function(e) {
            self.isDrawing = true;
            self.lastX = e.offsetX;
            self.lastY = e.offsetY;
        });
        
        this.canvas.removeEventListener('mousemove', function(e) {
            if (self.isDrawing) {
                self._handleDrawing(e.offsetX, e.offsetY);
            }
        });
        
        document.removeEventListener('mouseup', function() {
            self.isDrawing = false;
        });

        this.canvas.removeEventListener('touchstart', function(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = self.canvas.getBoundingClientRect();
            self.lastX = touch.clientX - rect.left;
            self.lastY = touch.clientY - rect.top;
            self.isDrawing = true;
        });

        this.canvas.removeEventListener('touchmove', function(e) {
            e.preventDefault();
            if (self.isDrawing) {
                const touch = e.touches[0];
                const rect = self.canvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                self._handleDrawing(x, y);
            }
        });

        this.canvas.removeEventListener('touchend', function() {
            self.isDrawing = false;
        });
    }

    _generateUniqueCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'PS';
        
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return code;
    }

    reset() {
        this.revealed = false;
        this.revealedPixels = 0;
        
        // Try to reload background image
        const backgroundImage = new Image();
        backgroundImage.src = `images/scratch-${this.cardType.toLowerCase()}.jpg`;
        
        backgroundImage.onload = () => {
            this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        };
        
        backgroundImage.onerror = () => {
            this._createDefaultOverlay();
        };
        
        // Get new prize
        this.prize = getPrizeByCardType();
        
        // Reset the prize reveal
        this._setupPrizeReveal();
        
        // Reset event listeners
        this._setupEventListeners();
        
        // Reset instructions visibility
        const scratchInstructions = document.getElementById('scratchInstructions');
        if (scratchInstructions) {
            scratchInstructions.classList.remove('hidden');
        }
        
        // Hide prize reveal
        const prizeReveal = document.getElementById('prizeReveal');
        if (prizeReveal) {
            prizeReveal.classList.add('hidden');
        }
        
        // Reset prize text
        const prizeText = document.getElementById('prize-text');
        if (prizeText) {
            prizeText.innerHTML = 'Gesek untuk melihat hadiah!';
        }
    }
}

// Initialize function that works with the existing app
function initScratchCard() {
    // Create scratch card instance if not exists
    if (!window.scratchCard) {
        const canvas = document.getElementById('scratchCard');
        if (!canvas) {
            console.error('Scratch canvas not found!');
            return;
        }
        
        window.scratchCard = new ScratchCard('scratchCard', currentCardType);
    } else {
        // Reset the existing scratch card
        window.scratchCard.reset();
    }
}
