/**
 * QUANTUM AI - Main Application Logic (V7 - Final Refinement)
 * Premium Modular System with Categorized Google Apps & Full Module Restoration
 */

const state = {
    currentModule: 'dashboard',
    user: {
        name: 'Quantum'
    },
    appComponents: [],
    requests: [
        { id: '#1024', topic: 'Kuantum API Analizi', date: '28.01', status: 'warning', statusText: 'İşleniyor' },
        { id: '#1023', topic: 'Neon Tema Entegrasyonu', date: '28.01', status: 'success', statusText: 'Tamamlandı' }
    ],
    googleApps: {
        ai_tools: [
            { name: 'Google AI Studio', icon: 'fas fa-magic', desc: 'AI prototipleri için merkezi durak.', url: 'https://aistudio.google.com/' },
            { name: 'Gemini AI', icon: 'fas fa-brain', desc: 'Google\'ın en güçlü yapay zeka modeli.', url: 'https://gemini.google.com/' },
            { name: 'Quantum Drive Projesi', icon: 'fas fa-hdd', desc: 'Özel AI Studio projesi ve veri havuzu.', url: 'https://ai.studio/apps/drive/17Wed7VzsDxr80UOuUtsgNtgvwtRHBi7r' },
            { name: 'Vertex AI', icon: 'fas fa-cloud', desc: 'Kurumsal seviye ML platformu.', url: 'https://cloud.google.com/vertex-ai' },
            { name: 'Colab Research', icon: 'fas fa-code', desc: 'Bulut tabanlı Python geliştirme.', url: 'https://colab.research.google.com/' }
        ],
        cloud_services: [
            { name: 'Cloud Console', icon: 'fas fa-server', desc: 'Altyapı yönetimi ve bulut kontrolü.', url: 'https://console.cloud.google.com/' },
            { name: 'Firebase', icon: 'fas fa-fire', desc: 'Uygulama geliştirme platformu.', url: 'https://firebase.google.com/' },
            { name: 'Search Console', icon: 'fas fa-search', desc: 'SEO ve arama performansı.', url: 'https://search.google.com/search-console' },
            { name: 'Analytics 4', icon: 'fas fa-chart-line', desc: 'Kullanıcı davranışı analitiği.', url: 'https://analytics.google.com/' }
        ],
        workspace: [
            { name: 'Workspace Admin', icon: 'fas fa-user-shield', desc: 'Organizasyonel kontrol paneli.', url: 'https://admin.google.com/' },
            { name: 'Drive Business', icon: 'fab fa-google-drive', desc: 'Bulut depolama ve iş birliği.', url: 'https://drive.google.com/' }
        ]
    }
};

const moduleTitles = {
    'dashboard': 'Kuantum Paneli',
    'ai-assistant': 'Yapay Zeka Merkezi',
    'google-apps': 'Google Ekosistemi & AI Studio',
    'app-builder': 'Uygulama Geliştirme',
    'site-designer': 'Dinamik Tasarım',
    'crypto-bot': 'Kripto Algoritma Motoru',
    'media': 'Multimedya İşleme',
    'requests': 'Görev ve İstek Yönetimi'
};

function escapeHTML(str) {
    if (!str) return "";
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAIChat();
    switchModule('dashboard');
});

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const module = item.getAttribute('data-module');
            switchModule(module);
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function switchModule(moduleName) {
    state.currentModule = moduleName;
    const titleElement = document.getElementById('current-module-title');
    if (titleElement) titleElement.innerText = moduleTitles[moduleName];

    const container = document.getElementById('module-container');
    container.innerHTML = `<div class="loading-container"><div class="loading-spinner"></div><span>Kuantum Katmanı Yükleniyor...</span></div>`;

    setTimeout(() => {
        renderModule(moduleName, container);
    }, 450);
}

function renderModule(moduleName, container) {
    let html = '';
    switch (moduleName) {
        case 'dashboard':
            html = `
                <div class="stats-grid">
                    <div class="glass stat-card">
                        <div class="stat-icon"><i class="fas fa-atom"></i></div>
                        <div class="stat-info"><span class="stat-label">Sistem Yükü</span><span class="stat-value">Neon Aktif</span></div>
                    </div>
                    <div class="glass stat-card">
                        <div class="stat-icon"><i class="fas fa-microchip"></i></div>
                        <div class="stat-info"><span class="stat-label">AI İşlemci</span><span class="stat-value">99.9% Kapasite</span></div>
                    </div>
                </div>
                <div class="dashboard-main-grid">
                    <div class="glass card">
                        <h3><i class="fas fa-history"></i> Son Aktiviteler</h3>
                        <div class="activity-list">
                            <div class="activity-item"><span class="time">Şimdi</span><span class="desc">Arayüz Quantum Neon formatına güncellendi.</span></div>
                            <div class="activity-item"><span class="time">10 dk</span><span class="desc">Google AI Studio araçları kategorize edildi.</span></div>
                            <div class="activity-item"><span class="time">Az önce</span><span class="desc">Sistem çekirdeği optimize edildi.</span></div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'google-apps':
            html = `<div class="google-apps-container">`;
            for (const [category, apps] of Object.entries(state.googleApps)) {
                const categoryTitle = category.replace('_', ' ').toUpperCase();
                html += `
                    <h2 style="margin: 2rem 0 1.5rem; color: var(--accent); font-size: 1rem; letter-spacing: 2px;">${categoryTitle}</h2>
                    <div class="google-apps-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
                        ${apps.map(app => `
                            <div class="glass card app-card" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; transition: var(--transition); cursor: pointer;" onclick="window.open('${app.url}', '_blank')">
                                <div style="display: flex; align-items: center; gap: 1.2rem;">
                                    <div class="stat-icon" style="width: 50px; height: 50px; border-radius: 12px; font-size: 1.3rem;">
                                        <i class="${app.icon}"></i>
                                    </div>
                                    <h3 style="font-size: 1.1rem; margin: 0; font-weight: 700;">${app.name}</h3>
                                </div>
                                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; flex: 1;">${app.desc}</p>
                                <div style="display: flex; justify-content: flex-end; opacity: 0.5;">
                                    <i class="fas fa-external-link-alt"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            html += `</div>`;
            break;
        case 'app-builder':
            html = `
                <div class="builder-layout" style="display: grid; grid-template-columns: 240px 1fr; gap: 1.5rem;">
                    <div class="glass builder-sidebar" style="padding: 1rem;">
                        <h3>Bileşenler</h3>
                        <div class="component-list" style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
                            <button class="nav-item" onclick="addComponent('Buton')"><i class="fas fa-square"></i> Buton</button>
                            <button class="nav-item" onclick="addComponent('Metin Alanı')"><i class="fas fa-font"></i> Metin Alanı</button>
                            <button class="nav-item" onclick="addComponent('Resim')"><i class="fas fa-image"></i> Resim</button>
                        </div>
                    </div>
                    <div class="glass canvas" style="min-height: 400px; display: flex; flex-direction: column;">
                        <div class="canvas-header" style="padding: 1rem; border-bottom: 1px solid var(--glass-border); display: flex; justify-content: space-between;">
                            <span>Önizleme</span>
                            <button class="btn btn-outline btn-sm" onclick="clearCanvas()">Temizle</button>
                        </div>
                        <div class="canvas-body" id="builder-canvas" style="flex: 1; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                            ${state.appComponents.length === 0 ? '<p style="color: var(--text-secondary); text-align: center;">Bileşenleri buraya ekleyin</p>' : renderCanvas()}
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'crypto-bot':
            html = `
                <div class="crypto-layout" style="display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem;">
                    <div class="crypto-main glass" style="padding: 1.5rem;">
                         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <h3>Kripto Bot Motoru</h3>
                            <span class="badge success">Aktif</span>
                         </div>
                         <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            ${["SMA", "EMA", "RSI", "MACD", "VWAP", "TEMA"].map(ind => `<div><input type="checkbox"> ${ind} <i class="fas fa-cog"></i></div>`).join('')}
                         </div>
                         <div class="terminal-container glass" style="margin-top: 2rem; background: #000 !important; padding: 1rem; height: 150px; overflow-y: auto;">
                            <div id="crypto-logs" style="font-family: monospace; font-size: 0.8rem; color: #00f2ff;">
                                <div>[${new Date().toLocaleTimeString()}] Quantum ağları senkronize edildi...</div>
                                <div>[${new Date().toLocaleTimeString()}] Algoritmik veri setleri yüklendi.</div>
                            </div>
                         </div>
                    </div>
                    <div class="glass card">
                        <h3>Kontrol Paneli</h3>
                        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem;">Stratejinizi seçin ve motoru başlatın.</p>
                        <button class="btn btn-primary btn-block" onclick="startBotSimulation()">Stratejiyi Başlat</button>
                    </div>
                </div>
            `;
            break;
        case 'requests':
            html = `
                <div class="glass card">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
                        <h2>İstek Yönetimi</h2>
                        <button class="btn btn-primary" onclick="window.toggleModal()">Yeni İstek</button>
                    </div>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead><tr style="text-align: left; color: var(--text-secondary);"><th style="padding: 0.5rem;">No</th><th>Konu</th><th>Durum</th></tr></thead>
                        <tbody>
                            ${state.requests.map(r => `
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1rem;">${escapeHTML(r.id)}</td>
                                    <td>${escapeHTML(r.topic)}</td>
                                    <td><span class="badge ${r.status}">${r.statusText}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'ai-assistant':
            html = `
                <div class="glass card" style="height: 600px; display: flex; flex-direction: column;">
                    <div style="padding: 3rem; text-align: center;">
                        <i class="fas fa-bolt" style="font-size: 4rem; color: var(--accent); margin-bottom: 1.5rem; filter: drop-shadow(0 0 15px var(--accent-glow));"></i>
                        <h2>Quantum Command</h2>
                        <p>Sistem arayüzü ve Google ekosistemi üzerinde tam kontrole sahibim.</p>
                    </div>
                    <div class="chat-messages" id="module-chat-messages" style="flex: 1; border-top: 1px solid var(--glass-border); padding: 1.5rem; overflow-y: auto;">
                         <div class="message ai-message">Quantum Neon sistemine geçiş yapıldı. Komutlarınızı bekliyorum.</div>
                    </div>
                </div>
            `;
            break;
        case 'media':
            html = `
                <div class="glass card" style="padding: 3rem; text-align: center;">
                    <i class="fas fa-icons" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
                    <h2>Medya İşleme</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">Görsel, video ve ses dosyalarınızı AI ile optimize edin.</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div class="glass" style="padding: 1.5rem; border-radius: 15px;"><i class="fas fa-image"></i><br>Görsel</div>
                        <div class="glass" style="padding: 1.5rem; border-radius: 15px;"><i class="fas fa-video"></i><br>Video</div>
                        <div class="glass" style="padding: 1.5rem; border-radius: 15px;"><i class="fas fa-microphone"></i><br>Ses</div>
                    </div>
                </div>`;
            break;
        case 'site-designer':
            html = `
                <div class="glass card" style="padding: 3rem; text-align: center;">
                    <i class="fas fa-paint-brush" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
                    <h2>Site Tasarımı</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">AI destekli tasarım motoru ile anında modern web siteleri oluşturun.</p>
                    <button class="btn btn-primary"><i class="fas fa-plus"></i> Yeni Proje Başlat</button>
                </div>`;
            break;
    }
    container.innerHTML = html;
}

/**
 * AI Logic
 */
function toggleAIChat() {
    const chat = document.getElementById('floating-chat');
    const trigger = document.getElementById('ai-trigger');
    chat.classList.toggle('hidden');
    if (chat.classList.contains('hidden')) {
        trigger.classList.remove('hidden');
    } else {
        trigger.classList.add('hidden');
    }
}

function initAIChat() {
    const input = document.getElementById('ai-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}

async function sendMessage() {
    const input = document.getElementById('ai-input');
    const text = input.value.trim();
    if (!text) return;

    addChatMessage(text, 'user');
    input.value = '';

    showTypingIndicator();
    const response = await processAICommand(text);

    setTimeout(() => {
        removeTypingIndicator();
        addChatMessage(response, 'ai');
    }, 850);
}

async function processAICommand(text) {
    const lowerText = text.toLowerCase();

    // Virtual Execution Simulation
    const showExecution = async (steps) => {
        for (const step of steps) {
            addChatMessage(`> [Sistem]: ${step}`, 'ai');
            await new Promise(r => setTimeout(r, 600));
        }
    };

    // Advanced "Everything" Access Simulation
    if (lowerText.includes('değiştir') || lowerText.includes('ekle') || lowerText.includes('oluştur') || lowerText.includes('yap')) {
        await showExecution([
            "Komut Quantum çekirdeğine iletildi.",
            "Dosya sistemi yetkilendirmesi kontrol ediliyor...",
            "Süper kullanıcı (Root) erişimi onaylandı.",
            "DOM ağacı manipüle ediliyor...",
            "Değişiklikler sisteme başarıyla uygulandı."
        ]);

        if (lowerText.includes('menü') || lowerText.includes('sayfa')) {
            const nav = document.querySelector('.sidebar-nav');
            const newBtn = document.createElement('button');
            newBtn.className = 'nav-item';
            newBtn.innerHTML = '<i class="fas fa-plus-circle"></i> <span>Yeni Modül</span>';
            nav.appendChild(newBtn);
            return "İstediğiniz yeni modül yan menüye eklendi ve tüm yetkiler tanımlandı.";
        }

        if (lowerText.includes('renk') || lowerText.includes('arka plan')) {
            document.body.style.filter = 'hue-rotate(90deg)';
            return "Sistem görsel spektrumu anlık olarak değiştirildi. Tüm arayüz yeni konfigürasyonda.";
        }

        return "Quantum çekirdeği isteğinizi yerine getirdi. Dosya sisteminde ve arayüzde gerekli değişiklikler yapıldı.";
    }

    // Knowledge / Universal Access
    if (lowerText.includes('kimsin') || lowerText.includes('yetkin')) {
        return "Ben Quantum AI platformunun Süper Kullanıcı asistanıyım. Bu sistemdeki tüm dosyalara, modüllere ve çekirdek ayarlara erişim iznim var. İstediğiniz her şeyi yapabilirim.";
    }

    // Fallback to enhanced conversation
    if (lowerText.includes('merhaba') || lowerText.includes('selam')) {
        return "Merhaba Efendim. Tam yetkili Quantum asistanı hizmetinizde. Ne yapmamı istersiniz?";
    }

    return `Anlaşıldı. Komut "Süper Kullanıcı" modunda işlendi. "${text}" isteğiniz doğrultusunda sistem optimize edildi.`;
}

function addChatMessage(text, side) {
    const containers = [document.getElementById('chat-messages'), document.getElementById('module-chat-messages')];
    containers.forEach(container => {
        if (!container) return;
        const msg = document.createElement('div');
        msg.className = `message ${side}-message`;
        msg.textContent = text;
        container.appendChild(msg);

        // Ensure scrolling to bottom
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 50);
    });
}

function showTypingIndicator() {
    const containers = [document.getElementById('chat-messages'), document.getElementById('module-chat-messages')];
    containers.forEach(container => {
        if (!container || container.querySelector('.typing-indicator')) return;
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<span style="font-size: 0.75rem; opacity: 0.6;">Düşünüyor...</span>';
        container.appendChild(indicator);
        container.scrollTop = container.scrollHeight;
    });
}

function removeTypingIndicator() {
    const indicators = document.querySelectorAll('.typing-indicator');
    indicators.forEach(el => el.remove());
}

/**
 * Module Handlers
 */
function addComponent(type) {
    if (type) state.appComponents.push(type);
    const canvas = document.getElementById('builder-canvas');
    if (canvas) canvas.innerHTML = renderCanvas();
}

function clearCanvas() {
    state.appComponents = [];
    const canvas = document.getElementById('builder-canvas');
    if (canvas) canvas.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Bileşenleri buraya ekleyin</p>';
}

function removeComponent(idx) {
    state.appComponents.splice(idx, 1);
    const canvas = document.getElementById('builder-canvas');
    if (canvas) canvas.innerHTML = renderCanvas() || '<p style="color: var(--text-secondary); text-align: center;">Bileşenleri buraya ekleyin</p>';
}

function renderCanvas() {
    return state.appComponents.map((comp, idx) => `
        <div class="glass" style="padding: 1rem; display: flex; justify-content: space-between; align-items: center;">
            <span>${escapeHTML(comp)} Bileşeni</span>
            <i class="fas fa-trash" style="cursor: pointer; color: #ff0055;" onclick="removeComponent(${idx})"></i>
        </div>
    `).join('');
}

function startBotSimulation() {
    const logs = document.getElementById('crypto-logs');
    if (!logs) return;
    const line = document.createElement('div');
    line.innerHTML = `<span>[${new Date().toLocaleTimeString()}]</span> <span style="color: var(--accent);">Piyasa dalgalanmaları analiz ediliyor...</span>`;
    logs.appendChild(line);
    logs.scrollTop = logs.scrollHeight;
}

window.toggleAIChat = toggleAIChat;
window.sendMessage = sendMessage;
window.toggleModal = () => document.getElementById('request-modal').classList.toggle('hidden');
window.submitRequest = () => {
    const topic = document.querySelector('#request-form input').value;
    state.requests.unshift({ id: '#' + Math.floor(Math.random() * 9000 + 1000), topic, date: 'Şimdi', status: 'warning', statusText: 'İşleniyor' });
    window.toggleModal();
    if (state.currentModule === 'requests') switchModule('requests');
};
window.addComponent = addComponent;
window.removeComponent = removeComponent;
window.clearCanvas = clearCanvas;
window.startBotSimulation = startBotSimulation;
