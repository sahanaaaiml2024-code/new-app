// SafeCampus Main Application
class SafeCampusApp {
    constructor() {
        this.currentDisaster = null;
        this.checklist = [];
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.setupGitHubLink();
    }

    attachEventListeners() {
        // Disaster selection buttons
        document.querySelectorAll('.disaster-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectDisaster(e.target.closest('.disaster-btn').dataset.disaster));
        });

        // Back button
        document.getElementById('backBtn').addEventListener('click', () => this.backToSelection());
    }

    setupGitHubLink() {
        const githubLink = document.getElementById('githubLink');
        // Update this with your GitHub repository URL after creation
        githubLink.href = '#';
        githubLink.textContent = 'View on GitHub';
    }

    selectDisaster(disasterType) {
        this.currentDisaster = disasterType;
        this.renderDisasterResponse(disasterType);
        this.hideWelcomeSection();
        this.showResponseSection();
    }

    renderDisasterResponse(disasterType) {
        const disaster = disasterData[disasterType];
        
        // Update title
        document.getElementById('disasterTitle').textContent = disaster.title;

        // Render safety actions
        this.renderSafetyActions(disaster.safetyActions);

        // Render checklist
        this.renderChecklist(disaster.checklist);

        // Render emergency contacts
        this.renderEmergencyContacts(disaster.emergencyContacts);

        // Update JSON output
        this.updateJSONOutput();
    }

    renderSafetyActions(actions) {
        const list = document.getElementById('safetyActionsList');
        list.innerHTML = '';
        
        actions.forEach(action => {
            const li = document.createElement('li');
            li.textContent = action;
            list.appendChild(li);
        });
    }

    renderChecklist(items) {
        const container = document.getElementById('checklistContainer');
        container.innerHTML = '';
        this.checklist = [];

        items.forEach((item, index) => {
            const id = `checkbox-${index}`;
            const div = document.createElement('div');
            div.className = 'checklist-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = id;
            checkbox.addEventListener('change', () => this.updateJSONOutput());
            
            const label = document.createElement('label');
            label.htmlFor = id;
            label.textContent = item;
            
            div.appendChild(checkbox);
            div.appendChild(label);
            container.appendChild(div);
            
            this.checklist.push({ id, label: item, checked: false });
        });
    }

    renderEmergencyContacts(contacts) {
        const list = document.getElementById('emergencyContactsList');
        list.innerHTML = '';
        
        contacts.forEach(contact => {
            const div = document.createElement('div');
            div.className = 'contact-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'name';
            nameSpan.textContent = contact.name;
            
            const phoneSpan = document.createElement('span');
            phoneSpan.className = 'phone';
            phoneSpan.textContent = contact.phone;
            
            div.appendChild(nameSpan);
            div.appendChild(phoneSpan);
            list.appendChild(div);
        });
    }

    updateJSONOutput() {
        const checkedItems = document.querySelectorAll('#checklistContainer input[type="checkbox"]:checked');
        const preparednessScore = Math.round((checkedItems.length / this.checklist.length) * 100);
        
        // Update score display
        document.getElementById('scoreDisplay').textContent = preparednessScore + '%';
        
        // Update status badge
        const statusInfo = getPreparednessStatus(preparednessScore);
        const statusBadge = document.getElementById('statusIndicator');
        statusBadge.className = `status-badge ${statusInfo.badgeClass}`;
        statusBadge.textContent = `✓ Status: ${statusInfo.status}`;

        // Generate and display JSON
        const checkedItemsArray = Array.from(checkedItems)
            .map(checkbox => {
                const label = checkbox.nextElementSibling;
                return label.textContent;
            });

        const jsonSchema = generateJSONSchema(this.currentDisaster, preparednessScore, checkedItemsArray);
        
        document.getElementById('jsonOutput').textContent = JSON.stringify(jsonSchema, null, 2);
        
        // Setup copy button
        document.getElementById('copyBtn').addEventListener('click', () => this.copyToClipboard(JSON.stringify(jsonSchema, null, 2)));
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.getElementById('copyBtn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy JSON to clipboard');
        });
    }

    hideWelcomeSection() {
        document.getElementById('welcomeSection').classList.add('hidden');
    }

    showResponseSection() {
        document.getElementById('responseSection').classList.remove('hidden');
    }

    backToSelection() {
        document.getElementById('responseSection').classList.add('hidden');
        document.getElementById('welcomeSection').classList.remove('hidden');
        this.currentDisaster = null;
        this.resetChecklist();
    }

    resetChecklist() {
        document.querySelectorAll('#checklistContainer input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SafeCampusApp();
});
