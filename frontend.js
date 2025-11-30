// -------------------------------
// REQUIRE LOGIN WHEN CLICKING THE MAIN "GET STARTED" BUTTON
// -------------------------------
// specifically target the home Get Started button so other gradient buttons (like contact submit) are unaffected
const getStartedBtn = document.getElementById('getStartedBtn');
if(getStartedBtn){
    getStartedBtn.addEventListener('click', function(e){
        const user = localStorage.getItem('currentUser');
        if(!user){
            e.preventDefault();
            showNotify('Please login first to get started!', 'Login Required');
            loginModal.style.display='flex';
            document.getElementById('modalContent').classList.add('show');
            // set modal to login mode and focus email
            isLogin = true;
            modalTitle.textContent = 'Login';
            authBtn.textContent = 'Login';
            toggleAuth.textContent = "Don't have an account? Register";
            emailInput.focus();
            return false;
        }
        // if logged in, proceed to services section
        smoothScrollTo('#services');
    });
}
// -------------------------------
// NAV, AUTH, CHATBOT, UI Scripts
// -------------------------------

// Elements
// loginBtn and logoutBtn removed from navbar
// Instead, login modal will show automatically if not logged in
const loginModal = document.getElementById('loginModal'),
      closeModal = document.getElementById('closeModal'),
      modalTitle = document.getElementById('modalTitle'),
      toggleAuth = document.getElementById('toggleAuth'),
      authBtn = document.getElementById('authBtn'),
      authMessage = document.getElementById('authMessage'),
      emailInput = document.getElementById('emailInput'),
      passwordInput = document.getElementById('passwordInput');

// Notification modal elements
const notifyModal = document.getElementById('notifyModal'),
      notifyContent = document.getElementById('notifyContent'),
      notifyTitle = document.getElementById('notifyTitle'),
      notifyMessage = document.getElementById('notifyMessage'),
      notifyOkBtn = document.getElementById('notifyOkBtn');

// Service modal elements
const serviceModal = document.getElementById('serviceModal'),
      serviceModalContent = document.getElementById('serviceModalContent'),
      serviceModalTitle = document.getElementById('serviceModalTitle'),
      serviceModalBody = document.getElementById('serviceModalBody'),
      serviceModalImage = document.getElementById('serviceModalImage'),
      serviceModalAction = document.getElementById('serviceModalAction'),
      closeServiceModal = document.getElementById('closeServiceModal');

// Image lightbox modal elements
const imageModal = document.getElementById('imageModal'),
      imageModalContent = document.getElementById('imageModalContent'),
      imageModalImg = document.getElementById('imageModalImg'),
      closeImageModal = document.getElementById('closeImageModal');

function showNotify(message, title='Notification'){
    if(!notifyModal) return; // safe-guard
    notifyTitle.textContent = title || 'Notification';
    notifyMessage.textContent = message || '';
    notifyModal.style.display = 'flex';
    notifyContent.classList.add('show');
}

// notify modal close
if(notifyOkBtn) notifyOkBtn.addEventListener('click', ()=>{ notifyModal.style.display='none'; notifyContent.classList.remove('show'); });
window.addEventListener('click', e=>{ if(e.target==notifyModal){ notifyModal.style.display='none'; notifyContent.classList.remove('show'); } });

    // Close on ESC for accessibility
    document.addEventListener('keydown', (e)=>{
        if(e.key === 'Escape'){
            if(loginModal && loginModal.style.display === 'flex'){
                loginModal.style.display='none';
                document.getElementById('modalContent').classList.remove('show');
            }
            if(notifyModal && notifyModal.style.display === 'flex'){
                notifyModal.style.display='none';
                notifyContent.classList.remove('show');
            }
            if(profilePanel && profilePanel.style.display === 'block'){
                profilePanel.style.display = 'none';
            }
            if(serviceModal && serviceModal.style.display === 'flex'){
                serviceModal.style.display = 'none';
                serviceModalContent.classList.remove('show');
            }
            if(imageModal && imageModal.style.display === 'flex'){
                imageModal.style.display = 'none';
                imageModalContent.classList.remove('show');
                imageModalImg.src='';
            }
            if(chatbotPanel && chatbotPanel.classList.contains('open')){
                chatbotPanel.classList.remove('open');
                chatbotLogo.classList.remove('active');
                chatbotPanel.setAttribute('aria-hidden','true');
            }
        }
    });

const navbar = document.getElementById('navbar'),
      navLinks = document.querySelectorAll('nav ul li a.nav-link'),
      menuToggle = document.querySelector('.menu-toggle'),
      servicesBtn = document.querySelector('li.nav-item a[href="#services"]'),
      homeBtn = document.querySelector('li.nav-item a[href="#home"]'),
      contactBtn = document.querySelector('li.nav-item a[href="#contact"]'),
      portfolioBtn = document.querySelector('li.nav-item a[href="#portfolio"]'),
      aboutBtn = document.querySelector('li.nav-item a[href="#about"]');

// logo click handler: make sure clicking the logo goes to #home
const siteLogo = document.querySelector('nav .logo');
if(siteLogo){ siteLogo.addEventListener('click', (e)=>{ e.preventDefault(); smoothScrollTo('#home'); }); }

const chatbotLogo = document.getElementById('chatbotLogo'),
      chatbotPanel = document.getElementById('chatbotPanel'),
      chatMessages = document.getElementById('chatMessages'),
      chatInput = document.getElementById('chatInput'),
      typingIndicator = document.getElementById('typingIndicator'),
      sendChatBtn = document.getElementById('sendChatBtn'),
      minimizeChat = document.getElementById('minimizeChat'),
      closeChat = document.getElementById('closeChat');

let unreadCount = 0;
let typingBubbleElem = null;

// Account/profile elements
const accountNav = document.getElementById('accountNav'),
      accountLink = document.getElementById('accountLink'),
      profilePanel = document.getElementById('profilePanel'),
      profileEmail = document.getElementById('profileEmail'),
      logoutBtn = document.getElementById('logoutBtn'),
      viewProfileBtn = document.getElementById('viewProfileBtn');

// Profile modal elements
const profileModal = document.getElementById('profileModal'),
      profileModalContent = document.getElementById('profileModalContent'),
      profileDetails = document.getElementById('profileDetails'),
      closeProfileModal = document.getElementById('closeProfileModal'),
      closeProfileBtn = document.getElementById('closeProfileBtn');

let isLogin = true;

// Small utility: smooth scroll to selector
function smoothScrollTo(selector){
    const el = document.querySelector(selector);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth', block:'start'});
}

// Account UI update based on login state
function refreshAccountUI(){
    const user = localStorage.getItem('currentUser');
    if(user){
        accountLink.textContent = user.split('@')[0]; // show just username part
        accountLink.setAttribute('title', user);
        if(profileEmail) profileEmail.textContent = user;
    } else {
        accountLink.textContent = 'Login';
        accountLink.setAttribute('title', 'Click to login');
        if(profilePanel) profilePanel.style.display = 'none';
    }
}

// toggle profile panel
if(accountLink){
    accountLink.addEventListener('click', (e)=>{
        e.preventDefault();
        const user = localStorage.getItem('currentUser');
        if(!user){
            // show login modal
            loginModal.style.display='flex';
            document.getElementById('modalContent').classList.add('show');
            isLogin = true; modalTitle.textContent = 'Login'; authBtn.textContent='Login'; toggleAuth.textContent = "Don't have an account? Register";
            emailInput.focus();
            return;
        }
        // toggle the panel
        if(profilePanel) profilePanel.style.display = profilePanel.style.display === 'block' ? 'none' : 'block';
    });
}

// logout handling
if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
        updateLoginState(null);
        // hide profile UI
        if(profilePanel) profilePanel.style.display='none';
        showNotify('Logged out successfully.', 'Logout');
    });
}

// profile view example
if(viewProfileBtn){
    viewProfileBtn.addEventListener('click', async ()=>{
        const user = localStorage.getItem('currentUser');
        if(!user){
            loginModal.style.display='flex'; document.getElementById('modalContent').classList.add('show'); emailInput.focus(); return;
        }
        // Fetch profile from backend
        try {
            const res = await fetch('http://127.0.0.1:5000/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user })
            });
            // If the response isn't OK, try to parse JSON error or show an informative message
            if(!res.ok){
                const contentType = res.headers.get('content-type') || '';
                if(contentType.includes('application/json')){
                    const errData = await res.json();
                    showNotify(errData.message || 'Profile retrieval failed', 'Profile Error');
                } else {
                    showNotify(`Server error: ${res.status} ${res.statusText}`, 'Profile Error');
                }
                return;
            }
            const contentType = res.headers.get('content-type') || '';
            if(!contentType.includes('application/json')){
                showNotify(`Server error: ${res.status} ${res.statusText}`, 'Profile Error');
                return;
            }
            const data = await res.json();
            if(data.success && data.profile){
                // Show modal with profile details
                let html = `<strong>Email:</strong> ${data.profile.email}<br>`;
                if(data.profile.name) html += `<strong>Name:</strong> ${data.profile.name}<br>`;
                if(data.profile.id) html += `<strong>User ID:</strong> ${data.profile.id}<br>`;
                profileDetails.innerHTML = html;
                profileModal.style.display = 'flex';
                profileModalContent.classList.add('show');
            } else {
                showNotify(data.message || 'Profile not found', 'Profile Error');
            }
        } catch (err) {
            showNotify('Could not fetch profile. Backend may be offline.', 'Profile Error');
        }
    });
}
// Close profile modal handlers
if(closeProfileModal){
    closeProfileModal.addEventListener('click', ()=>{
        profileModal.style.display = 'none';
        profileModalContent.classList.remove('show');
    });
}
if(closeProfileBtn){
    closeProfileBtn.addEventListener('click', ()=>{
        profileModal.style.display = 'none';
        profileModalContent.classList.remove('show');
    });
}
window.addEventListener('click', e=>{
    if(e.target==profileModal){
        profileModal.style.display='none';
        profileModalContent.classList.remove('show');
    }
});

// auth view will be enforced on page load (below)

// -------------------------------
// AUTH VIEW: show only home if not logged in
// -------------------------------
function applyAuthView(){
    const user = localStorage.getItem('currentUser');
    sections.forEach(sec => {
        if(!user && sec.id !== 'home'){
            sec.style.display = 'none';
            sec.setAttribute('aria-hidden', 'true');
        } else {
            sec.style.display = '';
            sec.removeAttribute('aria-hidden');
        }
    });

    // nav links: disable non-home links when not logged
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if(!user && href && !href.startsWith('#home')){
            link.classList.add('disabled');
            link.setAttribute('aria-disabled', 'true');
            // keep pointer events on if you want click to open login modal - we'll intercept in handlers
        } else {
            link.classList.remove('disabled');
            link.removeAttribute('aria-disabled');
        }
    });
}

// run on initial load
window.addEventListener('load', applyAuthView);
window.addEventListener('load', refreshAccountUI);

// -------------------------------
// NAV UNDERLINE & ACTIVE LINK
// -------------------------------
// underline removed — keep this function removed

function clearActiveLinks(){
    navLinks.forEach(l=>l.classList.remove('active'));
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const user = localStorage.getItem('currentUser');
        const href = link.getAttribute('href');
        if(!user && href && !href.startsWith('#home')){
            e.preventDefault();
            // Show modal for login and stop navigation
            showNotify('Please login to access this section.', 'Login Required');
            loginModal.style.display='flex';
            document.getElementById('modalContent').classList.add('show');
            isLogin = true; modalTitle.textContent = 'Login'; authBtn.textContent='Login'; toggleAuth.textContent = "Don't have an account? Register";
            emailInput.focus();
            return;
        }
        // On mobile, close menu
        const ul = document.querySelector('nav ul');
        if(ul.classList.contains('active')) { ul.classList.remove('active'); menuToggle.classList.remove('open'); }
        // set active state
        clearActiveLinks();
        link.classList.add('active');
        // default anchor scroll is okay, but ensure smooth (re-use href from above)
        if(href && href.startsWith('#')){
            e.preventDefault();
            smoothScrollTo(href);
        }
    });
});

// reposition underline on load/resize
// no underline: nothing to reposition on load/resize

// Set active on scroll based on section in view
const sections = document.querySelectorAll('section');
function onScrollUpdate(){
    const scrollPos = window.scrollY + (window.innerHeight/2);
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const id = sec.getAttribute('id');
        if(scrollPos >= top && scrollPos < top + sec.offsetHeight){
            clearActiveLinks();
            const link = document.querySelector(`nav ul li a.nav-link[href="#${id}"]`);
            if(link){ link.classList.add('active'); }
        }
    });
}
window.addEventListener('scroll', onScrollUpdate);

// -------------------------------
// MOBILE MENU TOGGLE
// -------------------------------
menuToggle.addEventListener('click', ()=>{
    const ul = document.querySelector('nav ul');
    ul.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

// Close mobile menu on click outside
document.addEventListener('click', (e)=>{
    const ul = document.querySelector('nav ul');
    if(!navbar.contains(e.target) && ul.classList.contains('active')){
        ul.classList.remove('active'); menuToggle.classList.remove('open');
    }
});

// Close chat if clicking outside of it and not on the logo
document.addEventListener('click', (e)=>{
    if(chatbotPanel && chatbotPanel.classList.contains('open')){
        if(!chatbotPanel.contains(e.target) && e.target !== chatbotLogo){
            chatbotPanel.classList.remove('open'); chatbotLogo.classList.remove('active'); chatbotPanel.setAttribute('aria-hidden', 'true');
        }
    }
});

// -------------------------------
// NAV-DROPDOWN ACTIONS (buttons inside dropdown)
// -------------------------------
document.querySelectorAll('.nav-content button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const text = btn.textContent.trim().toLowerCase();
        if(text.includes('get started')){
            const user = localStorage.getItem('currentUser');
            if(!user){
                showNotify('Please login first to get started!', 'Login Required');
                loginModal.style.display='flex';
                document.getElementById('modalContent').classList.add('show');
                isLogin = true; modalTitle.textContent = 'Login'; authBtn.textContent = 'Login'; toggleAuth.textContent = "Don't have an account? Register";
                emailInput.focus();
                return;
            }
            smoothScrollTo('#home');
        }
        if(text.includes('learn more')){
            const user = localStorage.getItem('currentUser');
            if(!user){ showNotify('Please login to view services', 'Login Required'); loginModal.style.display='flex'; document.getElementById('modalContent').classList.add('show'); emailInput.focus(); return; }
            smoothScrollTo('#services');
        }
        if(text.includes('contact')){
            const user = localStorage.getItem('currentUser');
            if(!user){ showNotify('Please login to view contact', 'Login Required'); loginModal.style.display='flex'; document.getElementById('modalContent').classList.add('show'); emailInput.focus(); return; }
            smoothScrollTo('#contact');
        }
        if(text.includes('portfolio')){
            const user = localStorage.getItem('currentUser');
            if(!user){ showNotify('Please login to view portfolio', 'Login Required'); loginModal.style.display='flex'; document.getElementById('modalContent').classList.add('show'); emailInput.focus(); return; }
            smoothScrollTo('#portfolio');
        }
    });
});

// -------------------------------
// SECTION REVEAL ON SCROLL
// -------------------------------
function onRevealCheck(){
    sections.forEach(s=>{
        const rect = s.getBoundingClientRect();
        if(rect.top <= window.innerHeight - 150) s.classList.add('visible');
    });
}
window.addEventListener('scroll', onRevealCheck);
window.addEventListener('load', onRevealCheck);
// Initialize portfolio image click-to-preview behavior
function initImageLightbox(){
    // Portfolio image details mapping
    // Details: name, role, who inserted
    const photoDetails = {
        'akols.jpg': { name: 'Jay Vee Cabellero', role: 'Senior Developer', personality: 'Passionate about clean code and loves hiking.' },
        'kirbs.jpg': { name: 'Kirby Protacio Rizal Mercado y Alonso Realonda', role: 'UI/UX Designer', personality: 'Creative thinker, enjoys painting and coffee.' },
        'noms.jpg': { name: 'Jared Nombra', role: 'Project Manager', personality: 'Organized, team motivator, and a foodie.' },
        'lara.jpg': { name: 'Jerome Lara AI', role: 'Train AI', personality: 'Detail-oriented, gamer, and loves puzzles.' }
    };
    document.querySelectorAll('.portfolio-item img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            const src = img.dataset.full || img.src;
            if(imageModal && imageModalImg){
                imageModalImg.src = src;
                imageModalImg.alt = img.alt || '';
                imageModal.style.display = 'flex';
                imageModalContent.classList.add('show');
                // Show details
                const detailsDiv = document.getElementById('imageModalDetails');
                const filename = img.src.split('/').pop();
                const details = photoDetails[filename];
                if(details){
                    detailsDiv.innerHTML = `<strong>${details.name}</strong> <br>${details.role}<br><span style='font-size:0.98em;color:#666;'>${details.personality}</span>`;
                }else{
                    detailsDiv.textContent = 'No details available.';
                }
            }
        });
    });
}
window.addEventListener('load', initImageLightbox);

// -------------------------------
// SERVICE CARDS: show details modal
// -------------------------------
const serviceDetails = {
    'Web Design': {
        title: 'Web Design',
        body: 'Stunning, responsive web designs tailored for conversions, accessibility, and performance. We craft modern UI with clean code and attention to brand tone.',
        img: 'https://via.placeholder.com/350x180?text=Web+Design',
        actionLabel: 'Contact about Web Design'
    },
    'App Development': {
        title: 'App Development',
        body: 'End-to-end mobile and web apps built with best practices: fast, secure, and built to scale with your business goals.',
        img: 'https://via.placeholder.com/350x180?text=App+Development',
        actionLabel: 'Contact about App Development'
    },
    'SEO Optimization': {
        title: 'SEO Optimization',
        body: 'Improve search visibility and organic traffic with technical and content-focused SEO audits and ongoing optimization strategies.',
        img: 'https://via.placeholder.com/350x180?text=SEO+Optimization',
        actionLabel: 'Contact about SEO'
    },
    'AI Integration': {
        title: 'AI Integration',
        body: 'Implement AI features like chatbots, recommendations, and automation to enhance user experience and reduce operational friction.',
        img: 'https://via.placeholder.com/350x180?text=AI+Integration',
        actionLabel: 'Contact about AI Integration'
    }
};

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const serviceName = card.textContent.trim();
        const details = serviceDetails[serviceName] || { title: serviceName, body: '', img: '', actionLabel: 'Contact Us' };
        const user = localStorage.getItem('currentUser');
        // if not logged in AND the services section is hidden by auth view, prompt login
        if(!user && document.getElementById('services') && document.getElementById('services').style.display === 'none'){
            showNotify('Please login to view this service details.', 'Login Required');
            loginModal.style.display='flex'; document.getElementById('modalContent').classList.add('show'); emailInput.focus();
            return;
        }
        // populate modal content
        if(serviceModalTitle) serviceModalTitle.textContent = details.title;
        if(serviceModalBody) serviceModalBody.textContent = details.body;
        if(serviceModalImage){
            if(details.img){ serviceModalImage.src = details.img; serviceModalImage.style.display='block'; } else { serviceModalImage.style.display='none'; }
        }
        if(serviceModalAction) serviceModalAction.textContent = details.actionLabel || 'Contact Us';
        // show modal
        if(serviceModal){ serviceModal.style.display='flex'; serviceModalContent.classList.add('show'); }

        // action: contact us (prefills the contact message and scrolls to contact)
        if(serviceModalAction){
            serviceModalAction.onclick = () => {
                const user2 = localStorage.getItem('currentUser');
                if(!user2){
                    showNotify('Please login to contact us.', 'Login Required');
                    loginModal.style.display='flex'; document.getElementById('modalContent').classList.add('show'); emailInput.focus();
                    return;
                }
                smoothScrollTo('#contact');
                const msgEl = document.getElementById('contactMessage');
                if(msgEl) msgEl.value = `Hello, I'm interested in your ${details.title} service. Please tell me more about how we can get started.`;
                if(serviceModal){ serviceModal.style.display='none'; serviceModalContent.classList.remove('show'); }
            };
        }
    });
});

// close service modal
if(closeServiceModal) closeServiceModal.addEventListener('click', ()=>{ if(serviceModal){ serviceModal.style.display='none'; serviceModalContent.classList.remove('show'); } });
// close when clicking outside is handled by window click handler below

// Image modal close handler
if(closeImageModal) closeImageModal.addEventListener('click', ()=>{ if(imageModal){ imageModal.style.display='none'; imageModalContent.classList.remove('show'); imageModalImg.src=''; } });

// -------------------------------
// DARK MODE (persisted)
// -------------------------------
const darkToggle = document.getElementById('darkModeToggle');
function injectDarkStyles(){
    if(document.getElementById('generated-dark-style')) return;
    const style = document.createElement('style');
    style.id = 'generated-dark-style';
    style.textContent = `
        body.dark { background:#0e1116 !important; color:#ddd; }
        body.dark nav { background: rgba(10,10,12,0.95) !important; }
        body.dark nav .logo { color: #ffb0b0 !important; }
        body.dark nav ul li a { color: #ddd !important; }
        body.dark .service-card, body.dark .modal-content { background:#0f1724; color:#ddd; }
        body.dark footer { background:#0b1220; color:#ccc; }
    `;
    document.head.appendChild(style);
}
injectDarkStyles();
function setDarkMode(value){
    if(value) document.body.classList.add('dark'); else document.body.classList.remove('dark');
    localStorage.setItem('darkMode', value? '1':'0');
}

darkToggle.addEventListener('click', (e)=>{
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark? '1':'0');
    darkToggle.textContent = isDark? '☀️':'🌙';
});

// initialize dark mode from storage
if(localStorage.getItem('darkMode') === '1'){ setDarkMode(true); darkToggle.textContent = '☀️'; }

// -------------------------------
// CHATBOT
// -------------------------------
// Toggle chat panel (smooth open/close using CSS transitions)
chatbotLogo.addEventListener('click', ()=>{
    const isOpen = chatbotPanel.classList.toggle('open');
    chatbotLogo.classList.toggle('active', isOpen);
    chatbotPanel.setAttribute('aria-hidden', String(!isOpen));
    if(isOpen){
        setTimeout(()=>{ chatInput.focus(); }, 220); // small delay to let animation finish
        // show a friendly opener if chat is empty
        if(chatMessages && chatMessages.children.length === 0){
            setTimeout(()=>{
                replyWithTyping('Hello! I can show you our services or help you contact us. Try "services" or "contact".');
            }, 250);
        }
        // clear unread when opened
        clearUnread();
    }
});

function appendChatBubble(message, who='bot'){
    const el = document.createElement('div');
    el.className = `chat-bubble ${who}`;
    // bubble content with timestamp
    const text = document.createElement('div');
    text.className = 'bubble-text';
    text.textContent = message;
    const time = document.createElement('span');
    time.className = 'ts';
    const d = new Date();
    time.textContent = d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    el.appendChild(text);
    el.appendChild(time);
    // add an enter class for lively animation; small delay for bot messages
    el.classList.add('enter');
    if(who === 'bot') el.style.animationDelay = '120ms';
    chatMessages.appendChild(el);
    // fade-in and smooth scroll
    setTimeout(()=>{ chatMessages.scrollTop = chatMessages.scrollHeight; }, 40);
}

function sendMessage(){
    const val = chatInput.value.trim();
    if(!val) return;
    appendChatBubble(val, 'user');
    chatInput.value='';
    // send button pop animation
    if(sendChatBtn){ sendChatBtn.classList.add('chat-send-anim'); sendChatBtn.addEventListener('animationend', ()=>{ sendChatBtn.classList.remove('chat-send-anim'); }, {once:true}); }
    // demonstrate typing indicator and delayed bot response
    const reply = generateBotReply(val);
    replyWithTyping(reply, {approxChars: val.length});
}
window.sendMessage = sendMessage; // expose globally for inline onclick

// Wire the send button and keyboard enter
if(sendChatBtn){ sendChatBtn.addEventListener('click', sendMessage); }
if(chatInput){
    chatInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); } });
}

// Minimize and close controls
if(minimizeChat){ minimizeChat.addEventListener('click', ()=>{ chatbotPanel.classList.toggle('open'); chatbotLogo.classList.toggle('active'); chatbotPanel.setAttribute('aria-hidden', String(!chatbotPanel.classList.contains('open'))); }); }
if(closeChat){ closeChat.addEventListener('click', ()=>{ chatbotPanel.classList.remove('open'); chatbotLogo.classList.remove('active'); chatbotPanel.setAttribute('aria-hidden', 'true'); }); }

// Typing indicator helpers
function showTyping(){ if(typingIndicator){ typingIndicator.style.display='flex'; typingIndicator.setAttribute('aria-hidden', 'false'); } }
function hideTyping(){ if(typingIndicator){ typingIndicator.style.display='none'; typingIndicator.setAttribute('aria-hidden', 'true'); } }

// Typing bubble visual (inside chat message area)
function createTypingBubble(){
    const el = document.createElement('div');
    el.className = 'chat-bubble bot typing-bubble typing';
    el.style.alignSelf = 'flex-start';
    const dotWrap = document.createElement('div');
    dotWrap.style.display = 'inline-flex';
    dotWrap.style.gap = '6px';
    for(let i=0;i<3;i++){ const dot = document.createElement('div'); dot.className='dot'; dotWrap.appendChild(dot); }
    el.appendChild(dotWrap);
    return el;
}

function showTypingBubble(){
    if(typingBubbleElem) return;
    typingBubbleElem = createTypingBubble();
    chatMessages.appendChild(typingBubbleElem);
    setTimeout(()=>{ chatMessages.scrollTop = chatMessages.scrollHeight; }, 40);
}

function hideTypingBubble(){
    if(!typingBubbleElem) return;
    typingBubbleElem.remove();
    typingBubbleElem = null;
    setTimeout(()=>{ chatMessages.scrollTop = chatMessages.scrollHeight; }, 40);
}

// Unread badge helpers
function ensureBadge(){
    if(!chatbotLogo.querySelector('.badge')){
        const b = document.createElement('span');
        b.className = 'badge';
        b.textContent = '0';
        chatbotLogo.appendChild(b);
    }
}
function incrementUnread(){
    ensureBadge();
    unreadCount += 1;
    const b = chatbotLogo.querySelector('.badge');
    if(b) b.textContent = unreadCount > 99? '99+': String(unreadCount);
    chatbotLogo.classList.add('pulse');
}
function clearUnread(){
    unreadCount = 0;
    const b = chatbotLogo.querySelector('.badge');
    if(b) b.remove();
    chatbotLogo.classList.remove('pulse');
}

// reply with typing simulation and staggered animation
function replyWithTyping(message, options={approxChars: 30}){
    const isOpen = chatbotPanel.classList.contains('open');
    if(!isOpen){ incrementUnread(); }
    // break message into sentences or lines to create staggered bubbles
    const parts = message.split(/\n|\.\s+/).map(p => p.trim()).filter(Boolean);
    let idx = 0;
    const nextPart = ()=>{
        if(idx >= parts.length) return;
        const part = parts[idx++];
        const partDelay = Math.max(420, Math.min(1200, part.length * 22));
        showTyping(); showTypingBubble();
        setTimeout(()=>{
            hideTyping(); hideTypingBubble();
            appendChatBubble(part, 'bot');
            if(idx < parts.length){
                // small pause before typing next part
                setTimeout(nextPart, 350);
            }
        }, partDelay);
    };
    // launch the first part
    nextPart();
}

// Simple demo auto-responder to keep it local
function generateBotReply(userText){
    const text = userText.toLowerCase();
    if(text.includes('service') || text.includes('services')) return 'We provide Web Design, App Development, SEO, and AI Integration. Which would you like to know more about?';
    if(text.includes('contact')) return 'You can use the contact form or email us at hello@shootsize.com. Would you like me to prefill the form?';
    if(text.includes('help') || text.includes('commands')) return 'Try: "services", "contact", "pricing", or "help".';
    return 'Thanks for your message — our team will reply shortly!';
}
window.sendMessage = sendMessage; // expose globally for inline onclick

// -------------------------------
// LOGIN / REGISTER (with fallback to localStorage when backend not found)
// -------------------------------
closeModal.addEventListener('click', ()=>{
    loginModal.style.display='none';
    document.getElementById('modalContent').classList.remove('show'); 
});
window.addEventListener('click', e=>{
    if(e.target==loginModal){
        loginModal.style.display='none';
        document.getElementById('modalContent').classList.remove('show');
    }
    if(e.target==serviceModal){
        serviceModal.style.display='none';
        serviceModalContent.classList.remove('show');
    }
    if(e.target==imageModal){
        imageModal.style.display='none';
        imageModalContent.classList.remove('show');
        imageModalImg.src='';
    }
    // close profile panel if clicking outside of it (and not on accountLink)
    if(profilePanel && profilePanel.style.display === 'block' && !profilePanel.contains(e.target) && e.target !== accountLink){
        profilePanel.style.display = 'none';
    }
});

toggleAuth.addEventListener('click', ()=>{ 
    isLogin=!isLogin; 
    modalTitle.textContent=isLogin?'Login':'Register'; 
    authBtn.textContent=isLogin?'Login':'Register'; 
    toggleAuth.textContent=isLogin?"Don't have an account? Register":"Already have an account? Login"; 
    authMessage.textContent=''; 
});

function updateLoginState(email){
    if(email){
        localStorage.setItem('currentUser', email);
        loginModal.style.display='none';
        document.getElementById('modalContent').classList.remove('show');
        applyAuthView();
        // update account ui
        refreshAccountUI();
    } else {
        localStorage.removeItem('currentUser');
        applyAuthView();
        refreshAccountUI();
    }
}

// Attempt backend call first, if it fails use local fallback
async function callAuthBackend(url, body){
    try{
        const res = await fetch(url, {
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        return data;
    } catch(err){
        // fallback to local storage user handling
        const users = JSON.parse(localStorage.getItem('localUsers') || '{}');
        if(url.endsWith('/register')){
            if(users[body.email]) return { success:false, message:'User already exists (local)' };
            users[body.email] = body.password;
            localStorage.setItem('localUsers', JSON.stringify(users));
            return { success:true, message:'Registered locally' };
        }
        if(url.endsWith('/login')){
            if(users[body.email] && users[body.email] === body.password) return { success:true, message:'Logged in locally' };
            return { success:false, message:'User or password invalid (local)' };
        }
        return { success:false, message: 'Unknown error' };
    }
}

authBtn.addEventListener('click', async ()=>{
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if(!email || !password){ showNotify('Fill all fields!', 'Auth'); authMessage.style.color='red'; authMessage.textContent='Fill all fields!'; return; }

    const base = 'http://127.0.0.1:5000';
    const url = isLogin ? `${base}/login` : `${base}/register`;
    const data = await callAuthBackend(url, { email, password });
    authMessage.style.color = data.success ? 'green' : 'red';
    authMessage.textContent = data.message;

    if(data.success){
        // Show a notification modal to indicate success for login or registration
        const actionTitle = isLogin ? 'Login Successful' : 'Registered Successfully';
        // Use the backend message if available, otherwise a generic one
        showNotify(data.message || actionTitle, actionTitle);

        updateLoginState(email);
        setTimeout(()=>{ loginModal.style.display='none'; document.getElementById('modalContent').classList.remove('show'); smoothScrollTo('#services'); }, 800);
    } else {
        // if failure, also show the notify modal as an additional visual cue (optional)
        // This mirrors other UI notifications on the page to keep UX consistent
        showNotify(data.message || 'Authentication failed', 'Auth Error');
    }
});



// Do not show login modal automatically; only show when Get Started is clicked and not logged in

// CONTACT FORM
async function sendContact(){
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    // Try backend first, otherwise show success locally
    try{
        const res = await fetch('http://127.0.0.1:5000/contact', {
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({name, email, message})
        });
        const data = await res.json();
          showNotify(data.message || 'Message sent.', 'Contact');
    } catch(err){
        // local simulation
        const messages = JSON.parse(localStorage.getItem('sentContacts') || '[]');
        messages.push({ name, email, message, ts: Date.now() });
        localStorage.setItem('sentContacts', JSON.stringify(messages));
          showNotify('Message saved locally (no backend).', 'Contact');
        // clear fields
        document.getElementById('contactName').value='';
        document.getElementById('contactEmail').value='';
        document.getElementById('contactMessage').value='';
    }
}
