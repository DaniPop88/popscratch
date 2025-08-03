// This script runs early to ensure styles are applied
(function() {
    // Check if external CSS loaded
    const cssLoaded = Array.from(document.styleSheets)
        .some(sheet => sheet.href && sheet.href.includes('style.css'));
    
    if (!cssLoaded) {
        console.log('External CSS failed to load, injecting inline styles');
        
        // Add inline styles to ensure the app looks correct
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --bg-color: #121212;
                --card-bg: #1e1e1e;
                --text-color: #ffffff;
                --text-secondary: #b0b0b0;
                --accent-color: #ff3a5e;
                --accent-light: rgba(255, 58, 94, 0.15);
                --border-radius: 12px;
                --button-radius: 8px;
                --header-height: 60px;
                --bottom-nav-height: 64px;
            }

            /* Essential styles to make the app functional */
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
            
            /* Rest of your essential styles here */
            .hidden {
                display: none !important;
            }
            
            /* Make bottom nav work properly */
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
            
            /* Other critical styles */
            .container {
                padding: 16px;
                max-width: 600px;
                margin: 0 auto;
            }
        `;
        document.head.appendChild(style);
    }
})();
