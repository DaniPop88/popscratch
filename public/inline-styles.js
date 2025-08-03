(function() {
  // Check if external CSS loaded
  const cssLoaded = Array.from(document.styleSheets)
    .some(sheet => sheet.href && sheet.href.includes('style.css'));
  
  if (!cssLoaded) {
    console.log('External CSS failed to load, injecting inline styles');
    
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --bg-color: #121212;
        --card-bg: #1e1e1e;
        --text-color: #ffffff;
        --text-secondary: #b0b0b0;
        --accent-color: #ff3a5e; /* Neon red - Change to #33ff8a for green theme */
        --accent-light: rgba(255, 58, 94, 0.15); /* For glows - Change for green theme */
        --border-radius: 12px;
        --button-radius: 8px;
        --header-height: 60px;
        --bottom-nav-height: 64px;
      }

      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }

      body {
          font-family: 'Inter', sans-serif;
          background-color: var(--bg-color);
          color: var(--text-color);
          line-height: 1.6;
          padding-bottom: var(--bottom-nav-height);
      }

      /* Header */
      .app-header {
          height: var(--header-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          background-color: var(--bg-color);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .logo {
          display: flex;
          align-items: center;
      }

      .auth-buttons {
          display: flex;
          gap: 8px;
      }

      .btn-login, .btn-register {
          padding: 8px 16px;
          border-radius: var(--button-radius);
          font-weight: 600;
          font-size: 14px;
          border: none;
          cursor: pointer;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
      }

      .btn-login {
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--text-color);
      }

      .btn-register {
          background-color: var(--accent-color);
          color: white;
          box-shadow: 0 0 15px var(--accent-light);
      }

      /* Container */
      .container {
          padding: 16px;
          max-width: 600px;
          margin: 0 auto;
      }

      /* Main Banner */
      .main-banner {
          margin-bottom: 16px;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .main-banner img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: var(--border-radius);
      }

      /* Winners Carousel */
      .winners-carousel {
          background: linear-gradient(90deg, rgba(255, 58, 94, 0.1), rgba(255, 58, 94, 0.2));
          border-radius: var(--border-radius);
          height: 40px;
          overflow: hidden;
          margin-bottom: 24px;
          position: relative;
      }

      .carousel-container {
          display: flex;
          animation: carousel 20s linear infinite;
      }

      .carousel-item {
          display: flex;
          align-items: center;
          padding: 0 16px;
          min-width: 200px;
          white-space: nowrap;
      }

      .winner-icon {
          margin-right: 8px;
          font-size: 18px;
      }

      .winner-text {
          font-size: 14px;
      }

      @keyframes carousel {
          0% {
              transform: translateX(100%);
          }
          100% {
              transform: translateX(-100%);
          }
      }

      /* Section Header */
      .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
      }

      .section-title {
          font-size: 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
      }

      .section-title i {
          margin-right: 8px;
          color: var(--accent-color);
      }

      .section-link {
          color: var(--accent-color);
          text-decoration: none;
          font-size: 14px;
          display: flex;
          align-items: center;
      }

      .section-link i {
          margin-left: 4px;
          font-size: 12px;
      }

      /* Game Cards */
      .game-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
      }

      .game-card {
          background-color: var(--card-bg);
          border-radius: var(--border-radius);
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          height: 120px;
      }

      .card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: var(--accent-color);
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          box-shadow: 0 0 10px var(--accent-light);
      }

      .card-content {
          padding: 16px;
          height: 100%;
          display: flex;
          flex-direction: column;
      }

      .card-content h3 {
          font-size: 18px;
          margin-bottom: 4px;
          margin-top: 16px;
      }

      .card-content p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: auto;
      }

      .card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
      }

      .btn-play {
          background-color: var(--accent-color);
          color: white;
          border: none;
          border-radius: var(--button-radius);
          padding: 8px 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 14px;
          box-shadow: 0 0 10px var(--accent-light);
          position: relative;
      }

      .ticket-price {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          padding: 2px 6px;
          margin-left: 8px;
          font-size: 12px;
      }

      .btn-prizes {
          background: transparent;
          color: var(--accent-color);
          border: none;
          font-size: 14px;
          cursor: pointer;
          padding: 8px;
      }

      /* Bottom Navigation */
      .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: var(--bottom-nav-height);
          background-color: var(--card-bg);
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 1000;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
      }

      .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 12px;
          flex: 1;
          padding: 8px 0;
      }

      .nav-item i {
          font-size: 20px;
          margin-bottom: 4px;
      }

      .nav-item.active {
          color: var(--accent-color);
      }

      .nav-item.main-action {
          margin-top: -20px;
      }

      .action-button {
          width: 50px;
          height: 50px;
          background-color: var(--accent-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px var(--accent-light);
          margin-bottom: 4px;
      }

      .action-button i {
          font-size: 24px;
          margin: 0;
      }

      .bottom-spacing {
          height: 20px;
      }

      /* Modal */
      .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 2000;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.2s;
      }

      .modal.show {
          display: flex;
      }

      @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
      }

      .modal-content {
          background-color: var(--card-bg);
          border-radius: var(--border-radius);
          width: 90%;
          max-width: 400px;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s;
      }

      @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
      }

      .modal-header {
          padding: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
      }

      .modal-header h3 {
          font-size: 18px;
      }

      .close-modal {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 24px;
          cursor: pointer;
      }

      .modal-body {
          padding: 16px;
      }

      /* Forms */
      .form-group {
          margin-bottom: 16px;
      }

      .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          color: var(--text-secondary);
      }

      .form-group input,
      .form-group select {
          width: 100%;
          padding: 12px;
          border-radius: var(--button-radius);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-color);
          font-size: 16px;
      }

      .form-group input:focus,
      .form-group select:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 0 2px var(--accent-light);
      }

      .btn-submit {
          width: 100%;
          padding: 12px;
          background-color: var(--accent-color);
          color: white;
          border: none;
          border-radius: var(--button-radius);
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 0 10px var(--accent-light);
      }

      /* Claim Options */
      .claim-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
      }

      .claim-option {
          position: relative;
      }

      .claim-option input {
          position: absolute;
          opacity: 0;
      }

      .claim-option label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--button-radius);
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
      }

      .claim-option input:checked + label {
          background-color: var(--accent-light);
          border-color: var(--accent-color);
      }

      .claim-option i {
          font-size: 24px;
          margin-bottom: 8px;
          color: var(--accent-color);
      }

      /* Scratch Card */
      .fullscreen-modal .modal-content {
          width: 100%;
          height: 100%;
          max-width: none;
          max-height: none;
          border-radius: 0;
          display: flex;
          flex-direction: column;
      }

      .scratch-content {
          display: flex;
          flex-direction: column;
          height: 100%;
      }

      .scratch-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
      }

      .scratch-card-container {
          position: relative;
          width: 300px;
          height: 300px;
          margin-bottom: 24px;
      }

      #scratchCard {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: var(--border-radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      }

      #prize-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          color: var(--text-color);
          text-align: center;
          padding: 20px;
          z-index: -1;
          border-radius: var(--border-radius);
          background-color: var(--card-bg);
      }

      .scratch-instructions {
          text-align: center;
          color: var(--text-secondary);
          font-size: 14px;
      }

      /* Win Modal */
      .win-content {
          text-align: center;
      }

      .win-header {
          background-color: var(--accent-color);
          color: white;
      }

      .win-animation {
          margin: 24px 0;
      }

      .win-icon {
          font-size: 72px;
          color: var(--accent-color);
          animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
      }

      .win-prize {
          font-size: 28px;
          margin-bottom: 24px;
      }

      .win-details {
          background-color: rgba(255, 255, 255, 0.05);
          padding: 16px;
          border-radius: var(--button-radius);
          margin-bottom: 24px;
      }

      .win-code {
          font-family: monospace;
          font-size: 18px;
          background-color: rgba(255, 255, 255, 0.1);
          padding: 8px;
          border-radius: 4px;
          margin: 8px 0;
      }

      .win-status {
          font-weight: 600;
          color: var(--accent-color);
      }

      .win-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
      }

      .btn-claim {
          padding: 12px;
          background-color: var(--accent-color);
          color: white;
          border: none;
          border-radius: var(--button-radius);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px var(--accent-light);
      }

      .btn-claim i {
          margin-right: 8px;
      }

      .btn-home {
          padding: 12px;
          background-color: transparent;
          color: var(--text-color);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--button-radius);
          font-weight: 600;
          cursor: pointer;
      }

      /* Telegram Login */
      .telegram-login {
          display: flex;
          justify-content: center;
          margin: 24px 0;
      }

      .telegram-login-button {
          background-color: #2AABEE;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: var(--button-radius);
          font-weight: 600;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(42, 171, 238, 0.3);
      }

      .telegram-login-button i {
          margin-right: 8px;
          font-size: 20px;
      }

      /* Media Queries */
      @media (min-width: 600px) {
          .claim-options {
              grid-template-columns: repeat(4, 1fr);
          }
      }

      @media (min-width: 768px) {
          .container {
              padding: 24px;
          }
          
          .app-header {
              padding: 0 24px;
          }
          
          .game-cards {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
          }
      }
    `;
    document.head.appendChild(style);
  }
})();
