const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const previewImg = document.getElementById('previewImg');
const wowBadge = document.getElementById('wowBadge');
const controls = document.getElementById('controls');
const speakBtn = document.getElementById('speakBtn');
const clearBtn = document.getElementById('clearBtn');

const langSelect = document.getElementById('langSelect');
const dropZoneText = document.getElementById('dropZoneText');
const commentsHeading = document.getElementById('commentsHeading');
const commentsContainer = document.getElementById('commentsContainer');
const footerText = document.getElementById('footerText');

let currentLang = 'pl';
let _explodedOnce = false;
let lastInteraction = Date.now();

const i18n = {
    pl: {
        dropZoneText: 'Upuść zdjęcie tutaj lub kliknij, aby wybrać',
        speakBtn: 'Odtwórz głosem',
        clearBtn: 'Usuń',
        commentsHeading: 'Komentarze od użytkowników',
        commentsLoading: 'Ładowanie komentarzy…',
        footerText: 'Gotowe do wrzucenia na GitHub Pages.',
        fileTypeAlert: 'Wybierz plik obrazka.',
        noComments: 'Brak komentarzy.',
        wowBadgeHtml: 'WOWWW<br>ALE ŚWIETNIE WYGLĄDASZ',
        speechText: 'Wow, ale świetnie wyglądasz!',
        speechLang: 'pl-PL',
    },
    en: {
        dropZoneText: 'Drop a photo here or click to choose',
        speakBtn: 'Speak',
        clearBtn: 'Clear',
        commentsHeading: 'User comments',
        commentsLoading: 'Loading comments…',
        footerText: 'Ready to publish on GitHub Pages.',
        fileTypeAlert: 'Please select an image file.',
        noComments: 'No comments.',
        wowBadgeHtml: 'WOWWW<br>YOU LOOK AMAZING',
        speechText: 'Wow, you look amazing!',
        speechLang: 'en-US',
    }
};

// Zastąp istniejącą zmienną commentsData poniższym, aby mieć dużo losowych komentarzy i imion.
const commentsData = {
    pl: [
        { name: "Sakura", comment: "Ślicznie! 😍" },
        { name: "Yuki", comment: "Niesamowite światło ✨" },
        { name: "Haruto", comment: "Super, wow!" },
        { name: "Yui", comment: "Piękna kompozycja ❤️" },
        { name: "Riku", comment: "Mega!" },
        { name: "Aoi", comment: "To wygląda jak z filmu 🎬" },
        { name: "Kaito", comment: "🔥🔥🔥" },
        { name: "Mina", comment: "Cudo!" },
        { name: "Sora", comment: "Ale kolory! 🎨" },
        { name: "Hinata", comment: "Perfect 😎" },
        { name: "Ren", comment: "Bosko, brawo!" },
        { name: "Akari", comment: "Zajebiste ujęcie!" },
        { name: "Takumi", comment: "Chcę więcej takich zdjęć." },
        { name: "Mei", comment: "Atmosfera na 10/10" },
        { name: "Ichiro", comment: "Super kadrowanie." },
        { name: "Naoki", comment: "Kolory idealne." },
        { name: "Emi", comment: "Uwielbiam to!" },
        { name: "Rina", comment: "Szał!" },
        { name: "Kenji", comment: "Wow, serio świetne." },
        { name: "Natsuki", comment: "Przepiękne światło." },
        { name: "Yuna", comment: "Jak z okładki magazynu." },
        { name: "Sho", comment: "Zabieram na tapetę 😍" },
        { name: "Ayumi", comment: "Mega estetyka." },
        { name: "Daiki", comment: "Polecam wszystkim!" },
        { name: "Masato", comment: "Niesamowite detale." },
        { name: "Ryo", comment: "Naprawdę ładne!" },
        { name: "Sayaka", comment: "To trafia w moje serce 💖" },
        { name: "Tomo", comment: "Chcę więcej takich kadrów." },
        { name: "Yuji", comment: "Sztos!" },
        { name: "Kana", comment: "No po prostu wow!" },
        { name: "Satoshi", comment: "Inspirujące." },
        { name: "Eri", comment: "Jak z filmu anime." },
        { name: "Mariko", comment: "Przepiękne barwy." },
        { name: "Hiro", comment: "To jest magia." },
        { name: "Kazu", comment: "Atmosfera bomba." },
        { name: "Shun", comment: "Perfekcja." },
        { name: "Yoko", comment: "Serce!" },
        { name: "Mio", comment: "Świetne tło i ostrość." },
        { name: "Kenta", comment: "Zasługujesz na like'ów!" },
        { name: "Rei", comment: "Wowww ale pięknie!" }
    ],
    en: [
        { name: "Sakura", comment: "So cute! 😍" },
        { name: "Yuki", comment: "Lovely lighting ✨" },
        { name: "Haruto", comment: "Amazing shot!" },
        { name: "Yui", comment: "Beautiful composition ❤️" },
        { name: "Riku", comment: "Wow, love it!" },
        { name: "Aoi", comment: "Looks like a movie still 🎬" },
        { name: "Kaito", comment: "🔥🔥🔥" },
        { name: "Mina", comment: "Stunning!" },
        { name: "Sora", comment: "Those colors 🎨" },
        { name: "Hinata", comment: "Perfect 😎" },
        { name: "Ren", comment: "Insane shot!" },
        { name: "Akari", comment: "This is gorgeous." },
        { name: "Takumi", comment: "I want more like this." },
        { name: "Mei", comment: "Mood on point." },
        { name: "Ichiro", comment: "Great framing." },
        { name: "Naoki", comment: "Colors are perfect." },
        { name: "Emi", comment: "I love this!" },
        { name: "Rina", comment: "So fresh." },
        { name: "Kenji", comment: "Seriously impressive." },
        { name: "Natsuki", comment: "Beautiful light." },
        { name: "Yuna", comment: "Magazine cover vibes." },
        { name: "Sho", comment: "Saving this as wallpaper 😍" },
        { name: "Ayumi", comment: "Aesthetic overload." },
        { name: "Daiki", comment: "Highly recommend!" },
        { name: "Masato", comment: "Lovely details." },
        { name: "Ryo", comment: "Truly nice!" },
        { name: "Sayaka", comment: "This hits my heart 💖" },
        { name: "Tomo", comment: "More of this, please." },
        { name: "Yuji", comment: "Absolutely sick!" },
        { name: "Kana", comment: "Just wow!" },
        { name: "Satoshi", comment: "Inspiring." },
        { name: "Eri", comment: "Like an anime scene." },
        { name: "Mariko", comment: "Gorgeous tones." },
        { name: "Hiro", comment: "This is magic." },
        { name: "Kazu", comment: "Vibe is immaculate." },
        { name: "Shun", comment: "Perfection." },
        { name: "Yoko", comment: "Heart eyes!" },
        { name: "Mio", comment: "Sharp and clean." },
        { name: "Kenta", comment: "You deserve the likes!" },
        { name: "Rei", comment: "Wowww you look amazing!" },
        { name: "Paul", comment: "You definitely deserve lots of likes!" },
        { name: "Mando", comment: "Well cute I like it so much tbh" },
        { name: "mando", comment: "hehe let me fuck you" }
    ]
};

const emojiPool = ['😍','🔥','👏','🤩','✨','😎','👍','😃','💥','💖','🤗','🎉','💫'];

// pomocnicze
function randomInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function escapeHtml(str){ if(!str) return ''; return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function touchInteraction(){ lastInteraction = Date.now(); showOverlaysIfHidden(); }

// tłumaczenia
function applyTranslations(lang){
    const t = i18n[lang] || i18n.pl;
    if(dropZoneText) dropZoneText.textContent = t.dropZoneText;
    if(speakBtn) speakBtn.textContent = t.speakBtn;
    if(clearBtn) clearBtn.textContent = t.clearBtn;
    if(commentsHeading) commentsHeading.textContent = t.commentsHeading;
    if(footerText) footerText.textContent = t.footerText;
    if(commentsContainer) commentsContainer.textContent = t.commentsLoading;
    if(wowBadge) wowBadge.innerHTML = t.wowBadgeHtml;
}

// pokaz podglądu i uruchom "wysyp"
function showPreview(file){
    if(!previewImg || !previewContainer || !controls) return;
    const url = URL.createObjectURL(file);
    previewImg.src = url;
    previewContainer.classList.remove('hidden');
    controls.classList.remove('hidden');
    wowBadge.classList.add('hidden');
    touchInteraction();

    // reset flagi, by przy każdym nowym zdjęciu pojawiły się animacje komentarzy
    _explodedOnce = false;
    // uruchomienie "wysypu" komentarzy (funkcja explodeCommentsHeavy pozostaje w main.js)
    setTimeout(()=> {
        if(!_explodedOnce){
            _explodedOnce = true;
            explodeCommentsHeavy();
            // UWAGA: usunięto wywołanie spawnHearts z main.js
            // jeśli chcesz uruchomić serca, użyj Hearts.spawn(...) z js/hearts.js
        }
    }, 200);
}

// obsługa input/drop (upewnij się, że ten fragment jest podłączony)
if(dropZone && fileInput){
    dropZone.addEventListener('click',(e)=>{
        const target = e.target;
        if(target && (target.tagName === 'A' || target.closest && target.closest('.no-file'))) return;
        try{ fileInput.click(); }catch(e){}
    });
}
if(fileInput){
    fileInput.addEventListener('change', e=>{
        const f = e.target.files && e.target.files[0];
        if(!f) return;
        if(!f.type || !f.type.startsWith('image/')) return alert(i18n[currentLang].fileTypeAlert);
        showPreview(f);
    });
}
['dragenter','dragover'].forEach(ev=>{
    dropZone && dropZone.addEventListener(ev, e=>{ e.preventDefault(); e.stopPropagation(); dropZone.classList.add('dragover'); });
});
['dragleave','drop'].forEach(ev=>{
    dropZone && dropZone.addEventListener(ev, e=>{ e.preventDefault(); e.stopPropagation(); dropZone.classList.remove('dragover'); });
});
dropZone && dropZone.addEventListener('drop', e=>{
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if(!f) return;
    if(!f.type || !f.type.startsWith('image/')) return alert(i18n[currentLang].fileTypeAlert);
    if(fileInput) fileInput.files = e.dataTransfer.files;
    showPreview(f);
});

// speak, clear
speakBtn && speakBtn.addEventListener('click', ()=> {
    const text = i18n[currentLang].speechText;
    if('speechSynthesis' in window){
        const u = new SpeechSynthesisUtterance(text);
        u.lang = i18n[currentLang].speechLang;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
    } else alert(text);
});

clearBtn && clearBtn.addEventListener('click', ()=>{
    if(previewImg) previewImg.src = '';
    previewContainer && previewContainer.classList.add('hidden');
    controls && controls.classList.add('hidden');
    wowBadge && wowBadge.classList.add('hidden');
    if(fileInput) fileInput.value = '';
    // usuń overlayy i reset
    const ov = document.getElementById('floating-comments-overlay'); if(ov) ov.remove();
    const hov = document.getElementById('hearts-overlay'); if(hov) hov.remove();
    _explodedOnce = false;
    touchInteraction();
});

// RENDER (zostawiamy prostą listę w sekcji komentarzy, ale animacje "wysypu" będą na całej stronie)
function renderCommentsList(comments){
    if(!commentsContainer) return;
    commentsContainer.innerHTML = '';
    if(!comments || comments.length === 0){ commentsContainer.textContent = i18n[currentLang].noComments; return; }
    comments.forEach(c=>{
        const row = document.createElement('div');
        row.className = 'comment-item';
        row.innerHTML = `<div class="comment-avatar">${escapeHtml((c.name||'')[0]||'?')}</div>
                         <div class="comment-body"><div class="comment-name">${escapeHtml(c.name)}</div>
                         <div class="comment-text">${escapeHtml(c.comment)}</div></div>`;
        commentsContainer.appendChild(row);
        setTimeout(()=> row.classList.add('visible'), 40);
    });
}

// HEAVY explode: dużo pływających komentarzy + drobne emotki + ścieżka znikania
function explodeCommentsHeavy(){
    touchInteraction();
    const list = (commentsData[currentLang] || []).slice();
    if(list.length === 0) return;
    const overlayId = 'floating-comments-overlay';
    let overlay = document.getElementById(overlayId);
    if(overlay) overlay.remove();
    overlay = document.createElement('div'); overlay.id = overlayId; overlay.className = 'floating-comments-overlay';
    document.body.appendChild(overlay);

    // shuffle and pick many
    for(let i = list.length - 1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [list[i], list[j]]=[list[j],list[i]]; }
    const count = Math.min(20, Math.max(6, list.length + 2));
    for(let idx=0; idx<count; idx++){
        const c = list[idx % list.length];
        const el = document.createElement('div');
        el.className = 'floating-comment big';
        const emoji = pick(emojiPool);
        el.innerHTML = `<div class="fc-emoji">${emoji}</div>
                        <div class="fc-body"><div class="fc-name">${escapeHtml(c.name)}</div>
                        <div class="fc-text">${escapeHtml(c.comment)}</div></div>`;
        // random pos across viewport
        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth||0);
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight||0);
        const left = randomInt(10, Math.max(80, vw - 220));
        const top = randomInt(60, Math.max(140, vh - 120));
        el.style.left = left + 'px';
        el.style.top = top + 'px';
        const rot = randomInt(-22,22);
        const scale = (Math.random()*0.5)+0.9;
        const delay = idx * 60 + randomInt(0,160);
        el.style.transform = `translateY(18px) rotate(${rot}deg) scale(${scale})`;
        el.style.opacity = '0';
        el.style.transition = `transform 700ms cubic-bezier(.2,.9,.3,1) ${delay}ms, opacity 520ms ${delay}ms`;
        overlay.appendChild(el);
        requestAnimationFrame(()=>{ el.style.transform = `translateY(0) rotate(${rot}deg) scale(${scale})`; el.style.opacity = '1'; });

        // float then disperse
        const floatDelay = 900 + randomInt(0,2200);
        setTimeout(()=>{
            el.style.transition = `transform 2200ms ease, opacity 900ms ease`;
            const dx = randomInt(-160,160);
            const dy = -randomInt(80,320);
            const r2 = randomInt(-40,40);
            el.style.transform = `translate(${dx}px, ${dy}px) rotate(${r2}deg) scale(${scale})`;
            el.style.opacity = `${Math.random()*0.18 + 0.02}`;
        }, floatDelay);

        // remove later
        setTimeout(()=> { if(el && el.parentNode) el.parentNode.removeChild(el); if(overlay && overlay.children.length === 0 && overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 6000 + randomInt(0,3000));
    }

    // uzupełnij listę w dolnej sekcji
    renderCommentsList(commentsData[currentLang]);
}

// *************** USUNIĘTE: wszystkie ustawienia/implementacje serc ***************
// Funkcje spawnHearts, makeDraggable, window.testHearts i powiązane implementacje
// zostały usunięte z main.js, aby nie mieszały się z osobnym plikiem js/hearts.js.
// Jeśli chcesz użyć serc, wywołaj Hearts.spawn(...) z konsoli lub z main.js po stronie, 
// ale sama implementacja serc musi być tylko w js/hearts.js.
// *************** KONIEC USUNIĘTYCH FRAGMENTÓW ***************

// helper do testów z konsoli
window.testHearts = function(count = 5){
    console.log('testHearts ->', count);
    spawnHearts(count);
};

// drag helper (pointer events)
function makeDraggable(el){
    let dragging = false;
    let startX=0, startY=0, baseX=0, baseY=0;
    function onPointerDown(e){
        e.preventDefault();
        dragging = true;
        el.dataset.pinned = '1'; // mark as interacted
        lastInteraction = Date.now();
        const rect = el.getBoundingClientRect();
        baseX = rect.left;
        baseY = rect.top;
        startX = e.clientX;
        startY = e.clientY;
        el.style.transition = 'none';
        el.setPointerCapture && el.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e){
        if(!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        el.style.left = (baseX + dx) + 'px';
        el.style.top = (baseY + dy) + 'px';
    }
    function onPointerUp(e){
        dragging = false;
        lastInteraction = Date.now();
        el.style.transition = 'transform 300ms ease';
        try{ el.releasePointerCapture && el.releasePointerCapture(e.pointerId); }catch(e){}
    }
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    // also allow touchstart fallback
    el.addEventListener('touchstart', (ev)=> { lastInteraction = Date.now(); el.dataset.pinned = '1'; }, {passive:true});
}

// overlay visibility control + inactivity hide
function hideOverlays(){
    const ov = document.getElementById('floating-comments-overlay');
    const hov = document.getElementById('hearts-overlay');
    [ov, hov].forEach(node=>{ if(node){ node.style.transition = 'opacity 420ms ease'; node.style.opacity = '0'; setTimeout(()=>{ if(node && node.parentNode) node.parentNode.removeChild(node); }, 520); }});
}
function showOverlaysIfHidden(){
    // nothing to "restore" to recreate — overlays created on showPreview. we just update lastInteraction.
    lastInteraction = Date.now();
}

// global interaction listeners to reset timer
['mousemove','mousedown','touchstart','pointerdown','keydown'].forEach(ev=>{
    window.addEventListener(ev, ()=> lastInteraction = Date.now(), {passive:true});
});

// inactivity checker — usuwa pływające elementy po 5s braku interakcji
setInterval(()=>{
    if(Date.now() - lastInteraction > 5000){
        hideOverlays();
    }
}, 800);

// render list initially empty (comments show only after image)
function loadComments(){ if(commentsContainer) commentsContainer.innerHTML = ''; }

// language change
langSelect && langSelect.addEventListener('change', e=>{
    currentLang = e.target.value || 'pl';
    applyTranslations(currentLang);
});

// init
(function init(){
    currentLang = navigator.language && navigator.language.startsWith('en') ? 'en' : 'pl';
    if(langSelect) langSelect.value = currentLang;
    applyTranslations(currentLang);
    // render empty comments area until image provided
    if(commentsContainer) commentsContainer.innerHTML = '';
})();