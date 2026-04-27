// State Management
const appData = {
    donors: [
        { name: "Amal Silva", group: "O+" },
        { name: "Saman Perera", group: "A+" },
        { name: "Nimal Fernando", group: "B+" }
    ]
};

// 1. Navigation System
function navigate(pageId, element) {
    // Switch Icons
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    element.classList.add('active');

    // Switch Views
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(`${pageId}-view`).classList.remove('hidden');

    showToast(`Viewing ${pageId.charAt(0).toUpperCase() + pageId.slice(1)}`);
}

// 2. Donor Search Logic
function findDonors() {
    const selectedGroup = document.getElementById('bloodType').value;
    const results = document.getElementById('resultsList');
    
    results.innerHTML = '<p style="text-align:center">Searching...</p>';
    
    setTimeout(() => {
        const filtered = appData.donors.filter(d => d.group === selectedGroup);
        
        if (filtered.length > 0) {
            results.innerHTML = filtered.map(d => `
                <div class="card" style="border-left: 5px solid #e11d48">
                    <strong>${d.name}</strong> (${d.group}) <br>
                    <button onclick="showToast('Connecting...')" class="btn-primary" style="padding: 8px; margin-top:10px;">Contact Donor</button>
                </div>
            `).join('');
        } else {
            results.innerHTML = '<p style="text-align:center">No donors found for this group.</p>';
        }
    }, 1000);
}

// 3. Register Donor Logic
function saveDonor() {
    const name = document.getElementById('regName').value;
    const group = document.getElementById('regBlood').value;

    if (!name) return showToast("Please enter your name!");

    appData.donors.push({ name, group });
    showToast("Successfully Registered as a Donor!");
    
    // Auto return to home after 1.5 seconds
    setTimeout(() => {
        document.querySelector('.nav-item').click();
    }, 1500);
}

// Toast Notification
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2500);
}