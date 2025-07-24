import React from 'react';

export const TicketIcon = ({ className, width = 24, height = 24 }) => (
  <svg 
    className={className} 
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Path data dari SVG Ticket.svg */}
    <path 
      d="M9 14H15M9 12H15M9 10H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21ZM17 21C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3M17 9H20M17 13H20M17 17H20M7 9H4M7 13H4M7 17H4" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default TicketIcon;