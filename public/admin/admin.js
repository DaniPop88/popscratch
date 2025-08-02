document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const adminInfo = document.getElementById('adminInfo');
    const adminName = document.getElementById('adminName');
    const loginPrompt = document.getElementById('loginPrompt');
    const loginRequired = document.getElementById('loginRequired');
    const adminContent = document.getElementById('adminContent');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Tab elements
    const tabButtons = document.querySelectorAll('.admin-tab');
    const tabPanels = document.querySelectorAll('.admin-panel');
    
    // Dashboard elements
    const totalUsers = document.getElementById('totalUsers');
    const ticketsApproved = document.getElementById('ticketsApproved');
    const pendingTickets = document.getElementById('pendingTickets');
    const pendingClaims = document.getElementById('pendingClaims');
    
    // Tables
    const ticketRequestsTable = document.getElementById('ticketRequestsTable');
    const prizesTable = document.getElementById('prizesTable');
    const claimsTable = document.getElementById('claimsTable');
    
    // Check if user is admin
    checkAdminStatus();
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active', 'border-blue-500', 'text-blue-600'));
            tabPanels.forEach(panel => panel.classList.add('hidden'));
            
            // Add active class to clicked tab
            button.classList.add('active', 'border-blue-500', 'text-blue-600');
            
            // Show corresponding panel
            const targetPanelId = button.getAttribute('data-target');
            document.getElementById(targetPanelId).classList.remove('hidden');
            
            // Load data for the tab
            if (targetPanelId === 'ticketsPanel') {
                loadTicketRequests();
            } else if (targetPanelId === 'prizesPanel') {
                loadPrizes();
            } else if (targetPanelId === 'claimsPanel') {
                loadClaims();
            } else if (targetPanelId === 'dashboardPanel') {
                loadDashboardStats();
            }
        });
    });
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Check if user is admin
    function checkAdminStatus() {
        fetch('/api/auth/check-session')
            .then(response => response.json())
            .then(data => {
                if (data.success && data.isLoggedIn && data.user.isAdmin) {
                    // User is admin
                    adminInfo.classList.remove('hidden');
                    loginPrompt.classList.add('hidden');
                    loginRequired.classList.add('hidden');
                    adminContent.classList.remove('hidden');
                    
                    // Set admin name
                    adminName.textContent = data.user.firstName;
                    
                    // Load dashboard data
                    loadDashboardStats();
                } else {
                    // User is not admin
                    adminInfo.classList.add('hidden');
                    loginPrompt.classList.remove('hidden');
                    loginRequired.classList.remove('hidden');
                    adminContent.classList.add('hidden');
                }
            })
            .catch(error => {
                console.error('Error checking admin status:', error);
                // Handle error - show error message
            });
    }
    
    // Load dashboard stats
    function loadDashboardStats() {
        fetch('/api/admin/stats')
            .then(response => response.json())
            .then(data => {
                totalUsers.textContent = data.totalUsers;
                ticketsApproved.textContent = data.totalTicketsApproved;
                pendingTickets.textContent = data.pendingTicketRequests;
                pendingClaims.textContent = data.pendingPrizeClaims;
            })
            .catch(error => {
                console.error('Error loading dashboard stats:', error);
                // Handle error
            });
    }
    
    // Load ticket requests
    function loadTicketRequests() {
        fetch('/api/admin/ticket-requests')
            .then(response => response.json())
            .then(requests => {
                // Clear table
                ticketRequestsTable.innerHTML = '';
                
                if (requests.length === 0) {
                    ticketRequestsTable.innerHTML = '<tr><td colspan="7" class="py-4 text-center">No ticket requests found</td></tr>';
                    return;
                }
                
                // Add rows
                requests.forEach(request => {
                    const row = document.createElement('tr');
                    
                    // Format date
                    const date = new Date(request.createdAt);
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                    
                    // Status class
                    let statusClass = '';
                    if (request.status === 'approved') {
                        statusClass = 'bg-green-100 text-green-800';
                    } else if (request.status === 'rejected') {
                        statusClass = 'bg-red-100 text-red-800';
                    } else {
                        statusClass = 'bg-yellow-100 text-yellow-800';
                    }
                    
                    row.innerHTML = `
                        <td class="py-2 px-4 border-b">${formattedDate}</td>
                        <td class="py-2 px-4 border-b">${request.telegramId}</td>
                        <td class="py-2 px-4 border-b">${request.platform}</td>
                        <td class="py-2 px-4 border-b">${request.requestType}</td>
                        <td class="py-2 px-4 border-b">${request.ticketsRequested}</td>
                        <td class="py-2 px-4 border-b"><span class="px-2 py-1 rounded-full text-xs font-medium ${statusClass}">${request.status}</span></td>
                        <td class="py-2 px-4 border-b">
                            ${request.status === 'pending' ? `
                                <button class="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded mr-2 approve-btn" data-id="${request._id}">
                                    Approve
                                </button>
                                <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded reject-btn" data-id="${request._id}">
                                    Reject
                                </button>
                            ` : 'Already processed'}
                        </td>
                    `;
                    
                    ticketRequestsTable.appendChild(row);
                });
                
                // Add event listeners for approve/reject buttons
                document.querySelectorAll('.approve-btn').forEach(button => {
                    button.addEventListener('click', () => handleApproveTicket(button.getAttribute('data-id')));
                });
                
                document.querySelectorAll('.reject-btn').forEach(button => {
                    button.addEventListener('click', () => handleRejectTicket(button.getAttribute('data-id')));
                });
            })
            .catch(error => {
                console.error('Error loading ticket requests:', error);
                // Handle error
            });
    }
    
    // More functions for handling admin actions would go here
    
    // Logout function
    function handleLogout() {
        fetch('/api/auth/logout', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    }
});