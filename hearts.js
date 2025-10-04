// Tworzy overlay i udostępnia window.Hearts.spawn(count)
// Wklej i załaduj przed lub obok main.js
(function(){
    // helper
    function randomInt(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }

    // utwórz overlay (pod main'em — kontrola z-index w CSS)
    let overlay = document.getElementById('hearts-layer');
    if(!overlay){
        overlay = document.createElement('div');
        overlay.id = 'hearts-layer';
        overlay.className = 'hearts-layer';
        document.body.prepend(overlay); // prepend - pod main (main powinien mieć wyższy z-index)
    }

    // główna funkcja spawn
    function spawnHearts(count = 8, opts = {}){
        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        // stagger: kumulowane opóźnienie
        let delayAccum = 0;
        for(let i=0;i<count;i++){
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = opts.char || '💖';

            // duże rozmiary losowe
            const size = randomInt(opts.minSize || 56, opts.maxSize || 120);
            heart.style.fontSize = size + 'px';
            heart.style.width = (size + 10) + 'px';
            heart.style.height = (size + 10) + 'px';
            heart.style.lineHeight = (size + 10) + 'px';
            heart.style.borderRadius = Math.max(18, size/2) + 'px';

            // losowy start X (cały ekran)
            const startX = randomInt(12, Math.max(40, vw - size - 20));

            // START ponad "górą strony" — tak żeby serca pochodziły dokładnie z górnej krawędzi dokumentu
            // jeśli użytkownik przewinął, używamy window.scrollY by ustawić punkt startu względem początku dokumentu
            const offsetTopMin = opts.minOffset || 60;
            const offsetTopMax = opts.maxOffset || 260;
            const startTop = -window.scrollY - randomInt(offsetTopMin, offsetTopMax);
            heart.style.left = startX + 'px';
            heart.style.top = startTop + 'px';

            // dodaj do overlay (overlay jest pod main, więc serca nie blokują UI)
            overlay.appendChild(heart);

            // powolny spadek: 6s - 12s (wolno)
            const fallDuration = randomInt(opts.minDuration || 6000, opts.maxDuration || 12000);
            const rot = randomInt(-30, 30);

            // losowy odstęp między kolejnymi spadkami (stagger)
            const gap = (i === 0) ? 0 : randomInt(opts.minGap || 600, opts.maxGap || 1800);
            delayAccum += gap;

            // uruchom animację po delayAccum
            setTimeout(()=>{
                // translateY tak, by wylądować poniżej widoku (uwzględniając startTop ujemny)
                const dy = (window.innerHeight + 300) - startTop;
                heart.style.transition = `transform ${fallDuration}ms linear, opacity ${Math.floor(fallDuration/6)}ms linear`;
                heart.style.transform = `translateY(${dy}px) rotate(${rot}deg)`;
                heart.style.opacity = '0.95';
            }, delayAccum);

            // usuń element po animacji (jeśli nadal istnieje)
            setTimeout(()=>{
                try{ if(heart && heart.parentNode) heart.parentNode.removeChild(heart); }catch(e){}
                // gdy overlay pusty — usuń
                if(overlay && overlay.children.length === 0 && overlay.parentNode){
                    // zostaw overlay by nie zmieniać DOM za często; opcjonalnie usuń
                    // overlay.parentNode.removeChild(overlay);
                }
            }, delayAccum + fallDuration + 800);
        }
    }

    // expose
    window.Hearts = {
        spawn: spawnHearts
    };
})();