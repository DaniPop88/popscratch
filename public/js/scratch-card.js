// Scratch Card Functionality

function initScratchCard() {
    const canvas = document.getElementById('scratchCard');
    const ctx = canvas.getContext('2d');
    const prizeReveal = document.getElementById('prizeReveal');
    const scratchInstructions = document.getElementById('scratchInstructions');
    
    // Set canvas dimensions to match the container
    const containerWidth = canvas.width;
    const containerHeight = canvas.height;
    
    // Variables for scratch functionality
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let scratchedPercentage = 0;
    let totalPixels = containerWidth * containerHeight;
    let scratchedPixels = 0;
    let revealThreshold = 0.5; // Reveal prize when 50% is scratched
    let prizeRevealed = false;
    
    // Get the prize (or null if no prize)
    const prize = getPrizeByCardType();
    
    // Setup background image (the scratch-off cover)
    const backgroundImage = new Image();
    backgroundImage.src = `images/scratch-${currentCardType.toLowerCase()}.jpg`; // Use different images for different card types
    
    backgroundImage.onload = function() {
        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, containerWidth, containerHeight);
        
        // Prepare the prize reveal area
        setupPrizeReveal();
    };
    
    function setupPrizeReveal() {
        // Clear the prize reveal area
        prizeReveal.innerHTML = '';
        prizeReveal.classList.add('hidden');
        
        if (prize) {
            // If there's a prize, create the winning content
            const prizeIcon = document.createElement('i');
            prizeIcon.className = prize.type === 'money' ? 'fas fa-money-bill-wave' : 'fas fa-gift';
            prizeIcon.style.fontSize = '48px';
            prizeIcon.style.marginBottom = '10px';
            
            const prizeText = document.createElement('div');
            prizeText.textContent = prize.name;
            
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
    
    // Event Listeners for scratching
    canvas.addEventListener('mousedown', startScratching);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopScratching);
    canvas.addEventListener('mouseleave', stopScratching);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopScratching);
    
    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        startScratching({ offsetX: x, offsetY: y });
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        scratch({ offsetX: x, offsetY: y });
    }
    
    function startScratching(e) {
        isDrawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
    
    function scratch(e) {
        if (!isDrawing) return;
        
        // Set scratch style
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 40;
        ctx.lineCap = 'round';
        
        // Draw scratch line
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        
        // Update scratched pixels estimate
        const distance = Math.sqrt(
            Math.pow(e.offsetX - lastX, 2) + Math.pow(e.offsetY - lastY, 2)
        );
        scratchedPixels += distance * ctx.lineWidth;
        
        // Calculate scratched percentage
        scratchedPercentage = Math.min(1, scratchedPixels / (totalPixels * 0.7));
        
        // Check if threshold reached
        if (scratchedPercentage >= revealThreshold && !prizeRevealed) {
            revealPrize();
        }
        
        // Update last position
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
    
    function stopScratching() {
        isDrawing = false;
    }
    
    function revealPrize() {
        prizeRevealed = true;
        
        // Hide scratch instructions
        scratchInstructions.classList.add('hidden');
        
        // Show the prize reveal
        prizeReveal.classList.remove('hidden');
        
        // Remove scratch event listeners
        canvas.removeEventListener('mousedown', startScratching);
        canvas.removeEventListener('mousemove', scratch);
        canvas.removeEventListener('mouseup', stopScratching);
        canvas.removeEventListener('mouseleave', stopScratching);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', stopScratching);
        
        // Add to history
        addHistoryEntry({
            date: new Date(),
            type: 'game',
            cardType: currentCardType,
            prize: prize ? prize.name : null
        });
        
        // Show appropriate modal
        setTimeout(() => {
            if (prize) {
                // Show win modal
                prizeName.textContent = prize.name;
                prizeCode.textContent = generateRandomCode();
                openModal(winPrizeModal);
            } else {
                // Show lose modal
                openModal(loseModal);
            }
        }, 1500);
    }
}