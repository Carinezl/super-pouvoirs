// Le calendrier des super-pouvoirs : logique de la page.
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const el = Jeux.el;

  // ---------- Progression (gardée dans le navigateur) ----------
  const KEY = "calendrier-heros-v1";
  let save = { done: [], unlockAll: false, hero: null };
  try { save = Object.assign(save, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) {} };

  // ---------- Date : les fenêtres s'ouvrent selon le jour, avec rattrapage ----------
  // Pour tester un jour précis : ajouter ?jour=10 à l'adresse.
  function todayNumber() {
    const q = new URLSearchParams(location.search).get("jour");
    if (q !== null && !isNaN(+q)) return Math.max(0, Math.min(24, +q));
    const d = new Date();
    if (d.getMonth() === 11) return Math.min(24, d.getDate()); // décembre
    return d.getMonth() === 10 ? 0 : 24; // novembre : tout fermé ; après Noël : tout ouvert
  }
  const today = todayNumber();
  // Le jour mis en avant (liseré, étiquette « Aujourd'hui », petit mouvement) : seulement du 1er au 24 décembre.
  const jourJ = (() => {
    const q = new URLSearchParams(location.search).get("jour");
    if (q !== null && !isNaN(+q)) return +q >= 1 && +q <= 24 ? +q : 0;
    const d = new Date();
    return d.getMonth() === 11 && d.getDate() <= 24 ? d.getDate() : 0;
  })();
  const isOpenDay = (n) => save.unlockAll || n <= today;

  // ---------- Le héros (étape 0) ----------
  const CAPES = ["#ff3b2f", "#ffd400", "#19c6a7", "#ff7ac0", "#b9a4ff", "#7fd3ff"];
  const COLOR_NAMES = { "#ff3b2f": "rouge", "#ffd400": "jaune", "#19c6a7": "turquoise", "#ff7ac0": "rose", "#b9a4ff": "lilas", "#7fd3ff": "bleu ciel", "#1d2fa8": "bleu foncé" };
  const MASKS = ["#1d2fa8", "#ff7ac0", "#ffd400", "#19c6a7", "#ff3b2f"];
  const ANIMALS = [["fox", "Le renard"], ["bear", "L'ours polaire"], ["owl", "La chouette"], ["dragon", "Le dragon"], ["unicorn", "La licorne"]];
  const DEFAULT_HERO = { name: "", animal: "fox", cape: CAPES[0], mask: MASKS[0] };
  if (save.hero && !save.hero.animal) save.hero = Object.assign({}, DEFAULT_HERO, { name: save.hero.name || "", animal: save.hero.comp || "fox", cape: save.hero.cape || CAPES[0], mask: save.hero.mask || MASKS[0] });
  const guide = () => (save.hero ? heroSVG(save.hero, "peek") : compSVG("fox"));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Le héros est un animal : pas de genre ni de couleur de peau à choisir.
  // La cape et le masque prennent les couleurs choisies (variables --cape et --mask lues par les symboles).
  const EXTRA_MASK = {
    bear: '<rect x="33" y="57" width="54" height="17" rx="8.5" style="fill:var(--mask,#1d2fa8)"/><circle cx="47" cy="66" r="5" fill="#fff"/><circle cx="73" cy="66" r="5" fill="#fff"/><circle cx="48" cy="66" r="2.4" fill="#1b1b3a"/><circle cx="74" cy="66" r="2.4" fill="#1b1b3a"/>',
    dragon: '<rect x="30" y="54" width="60" height="20" rx="10" style="fill:var(--mask,#1d2fa8)"/><circle cx="46" cy="64" r="6" fill="#fff"/><circle cx="74" cy="64" r="6" fill="#fff"/><circle cx="47" cy="65" r="3" fill="#1b1b3a"/><circle cx="75" cy="65" r="3" fill="#1b1b3a"/>'
  };
  function heroSVG(h, cls, place) {
    return `<svg class="${cls || ""}" ${place || ""} viewBox="0 0 120 130" role="img" aria-label="Ton personnage" style="--cape:${h.cape};--mask:${h.mask}">
      <path d="M2 136Q60 44 118 136z" style="fill:var(--cape)"/><use href="#c-${h.animal}"/>${EXTRA_MASK[h.animal] || ""}</svg>`;
  }
  const compSVG = (c, cls) => `<svg class="${cls || "peek"}" viewBox="0 0 120 130" aria-hidden="true"><use href="#c-${c}"/></svg>`;
  const thumbSVG = (c) => `<svg viewBox="0 0 120 130" aria-hidden="true"><use href="#c-${c}"/>${EXTRA_MASK[c] || ""}</svg>`; // vignette du choix du personnage, masque compris

  function renderHero() {
    const h = save.hero;
    $("heroSlot").className = h ? "hero-avatar" : "hero-slot";
    $("heroSlot").innerHTML = h ? heroSVG(h) : '<span class="ph-long">Choisis ton personnage à l\'étape 0</span><span class="ph-short" aria-hidden="true">?</span>';
    $("heroComp").style.display = h ? "none" : "";
    $("heroHello").textContent = h && h.name ? `Bienvenue, ${h.name}\u00a0!` : "Bienvenue\u00a0!";
    $("step0Btn").textContent = h ? "Changer mon personnage" : "Étape 0 : je choisis mon personnage";
  }

  // ---------- Les 24 fenêtres ----------
  const ORDER = [14,3,20,9,7,17, 1,22,11,5,16,2, 19,13,8,21,6,23, 10,4,24,15,12,18];
  const WINS = [
    ["#ffd400", "#1d2fa8", "rgba(255,255,255,.7)"], ["#ff7ac0", "#1d2fa8", "rgba(255,255,255,.6)"],
    ["#1d2fa8", "#ffd400", "#0f1a6b"], ["#ff3b2f", "#ffffff", "#a81f16"],
    ["#7fd3ff", "#1d2fa8", "rgba(255,255,255,.7)"], ["#b9a4ff", "#1d2fa8", "rgba(255,255,255,.6)"],
    ["#0e8b75", "#ffffff", "#075a4c"], ["#fff4d6", "#d81e5b", "rgba(255,255,255,.9)"]
  ];
  const SHAPES = ["sq", "arch", "sq", "round", "arch", "sq"];
  const SIZES = [[88, 84], [80, 94], [92, 76]];
  const CHARS = window.PERSOS; // 24 personnages, un par fenêtre
  const BADGE_COLS = ["#ff3b2f", "#1d2fa8", "#19c6a7", "#ff7ac0", "#ffd400", "#b9a4ff"];
  const CHECK = '<svg class="check" aria-hidden="true" width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#19c6a7" stroke="#fff" stroke-width="2"/><path d="M7 12.5l3 3 7-7" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // La couronne de la porte 24, la même que sur la page d'accueil.
  const WREATH = '<svg class="wreath" viewBox="558 722 84 92" aria-hidden="true"><circle cx="600" cy="772" r="30" fill="none" stroke="#0e8b75" stroke-width="15"/><circle cx="578" cy="756" r="4.5" fill="#ff3b2f"/><circle cx="624" cy="762" r="4.5" fill="#ff3b2f"/><circle cx="588" cy="798" r="4.5" fill="#ff3b2f"/><circle cx="620" cy="792" r="4.5" fill="#ffd400"/><circle cx="572" cy="778" r="4.5" fill="#ffd400"/><path d="M600 742q-18 -18 -24 -4q4 8 24 4q18 -18 24 -4q-4 8 -24 4z" fill="#ff3b2f"/></svg>';
  const doneCount = () => save.done.filter((n) => n >= 1 && n <= 24).length;

  function renderTiles() {
    $("welcome").innerHTML = today === 0 && !save.unlockAll
      ? "Le calendrier s'ouvre à partir du 1<sup>er</sup> décembre. En attendant, choisis ton personnage."
      : 'Chaque jour, ouvre une fenêtre, joue et gagne un nouveau <span class="nw">super-pouvoir</span>.';
    $("tiles").innerHTML = ORDER.map((n) => {
      const door = n === 24;
      const [bg, num, shade] = door ? ["#ff7ac0", "#1d2fa8", "rgba(255,255,255,.7)"] : WINS[(n * 3) % WINS.length];
      const shape = door ? "arch" : SHAPES[(n * 5) % SHAPES.length];
      const open = isOpenDay(n), done = open && save.done.includes(n), isToday = n === jourJ;
      const [w, h] = SIZES[n % SIZES.length];
      const size = door ? "width:92%;height:112%" : shape === "round" ? "" : shape === "arch" ? "width:78%;height:100%" : `width:${w}%;height:${h}%`;
      const cls = ["win", shape, door ? "door" : "", done ? "done" : "", open ? "" : "locked", isToday ? "today bobber" : ""].join(" ");
      const label = `${door ? "Porte" : "Fenêtre"} ${n}` + (open ? ` : ${DAYS[n - 1].t}` + (done ? ", réussie" : "") : `, s'ouvre le ${n === 1 ? "1er" : n} décembre`);
      const char = done ? `<svg class="peek p${(n % 4) + 1}" viewBox="0 0 120 130" preserveAspectRatio="xMidYMax meet"><use href="#c-${CHARS[n - 1]}"/></svg>` : "";
      return `<div class="cell"><button type="button" class="${cls}" data-day="${n}" aria-label="${label}" style="--bg:${bg};--num-c:${num};--shade:${shade};${size}">
        <span class="pane" aria-hidden="true">${char}${door ? WREATH : ""}</span>
        <span class="num">${n}</span><span class="sill" aria-hidden="true"></span>
        ${done ? CHECK : ""}${isToday ? '<span class="tag">Aujourd\'hui</span>' : ""}</button></div>`;
    }).join("");
    $("badges").innerHTML = DAYS.map((d, i) => {
      const on = save.done.includes(i + 1);
      // Le nom du pouvoir n'apparaît que pour les pouvoirs gagnés, au survol (ou au toucher sur écran tactile).
      return on
        ? `<span class="badge on" tabindex="0" role="img" aria-label="Pouvoir gagné : ${d.p}" data-p="${d.p}" style="background:${BADGE_COLS[i % BADGE_COLS.length]}"></span>`
        : `<span class="badge" aria-hidden="true"></span>`;
    }).join("");
    $("count").textContent = `${doneCount()} sur 24`;
  }

  $("tiles").addEventListener("click", (e) => {
    const b = e.target.closest(".win");
    if (!b) return;
    const n = +b.dataset.day;
    if (!isOpenDay(n)) {
      b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake");
      toast(`Patience ! Cette ${n === 24 ? "porte" : "fenêtre"} s'ouvre le ${n === 1 ? "1er" : n} décembre. Si vous voulez débloquer dès à présent toutes les fenêtres, cliquez sur « Réglages » dans le menu.`, 7000);
      return;
    }
    openDay(n);
  });

  // ---------- Réglages : débloquer toutes les fenêtres, réinitialiser ----------
  function setSettings(on) { $("settingsBar").hidden = !on; $("settingsBtn").setAttribute("aria-expanded", on); }
  $("settingsBtn").addEventListener("click", () => setSettings($("settingsBar").hidden));
  const showUnlock = () => { const u = $("unlockAll"); u.setAttribute("aria-pressed", save.unlockAll); u.textContent = save.unlockAll ? "Bloquer à nouveau les fenêtres" : "Débloquer toutes les fenêtres"; };
  $("unlockAll").addEventListener("click", () => {
    save.unlockAll = !save.unlockAll; persist(); renderTiles(); showUnlock();
    toast(save.unlockAll ? "Toutes les fenêtres sont débloquées." : "Les fenêtres s'ouvrent de nouveau, au fur et à mesure du calendrier.");
  });
  $("resetBtn").addEventListener("click", () => $("confirmDlg").showModal());
  $("confirmNo").addEventListener("click", () => $("confirmDlg").close());
  $("confirmYes").addEventListener("click", () => {
    $("confirmDlg").close();
    save.done = []; save.hero = null; save.unlockAll = false; persist(); renderTiles(); renderHero(); showUnlock();
    toast("Le jeu est réinitialisé.");
  });

  // ---------- Couverture : ouvrir et refermer la maison ----------
  function setOpen(open) {
    $("cover").hidden = open;
    $("intro").hidden = open; $("closeBtn").hidden = !open;
    $("settingsBtn").hidden = !open; $("writeBtn").hidden = !open; if (!open) setSettings(false); // l'introduction ne s'affiche que sur la couverture
    $("house").hidden = !open;
    if (open) { $("house").classList.remove("pop-in"); void $("house").offsetWidth; $("house").classList.add("pop-in"); window.scrollTo({ top: 0 }); }
  }
  $("coverBtn").addEventListener("click", () => setOpen(true));
  $("openBtn").addEventListener("click", () => setOpen(true));
  $("closeBtn").addEventListener("click", () => setOpen(false));
  // Une fois l'animation d'ouverture finie, on retire sa classe : la maison, très haute sur téléphone, n'est plus traitée
  // comme un calque animé (sur certains téléphones Android, des fenêtres pouvaient ne pas se dessiner).
  $("house").addEventListener("animationend", (e) => { if (e.target === $("house") && e.animationName === "popIn") $("house").classList.remove("pop-in"); });


  // ---------- Fenêtre d'une case ----------
  const dlg = $("dlg");
  let current = null, runId = 0;
  const STAR = '<svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2l4 10 10-4-4 10 10 4-10 4 4 10-10-4-4 10-4-10-10 4 4-10-10-4 10-4-4-10 10 4z" fill="#ffd400"/></svg>';

  function gameCtx() {
    const id = ++runId;
    return {
      hero: save.hero,
      say(text) { const s = $("sayText"); if (s) s.textContent = text; },
      prevTitle: current.n > 1 ? DAYS[current.n - 2].t : "", // titre de la veille, affiché pendant le « Petit rappel d'hier »
      pause: (text) => Math.min(6500, 1300 + text.length * 60),
      later(fn, ms) { setTimeout(() => { if (id === runId && dlg.open) fn(); }, ms); },
      markDone() { const n = current.n; if (!save.done.includes(n)) { save.done.push(n); persist(); justWon = n; } renderTiles(); const pt = $("powerText"); if (pt) pt.textContent = `Pouvoir gagné : ${current.day.p}`; },
      types: { creator: stageCreator, diploma: stageDiploma }
    };
  }

  function startGame(replay) {
    const { day, n } = current;
    const mount = $("gameMount"), ctx = gameCtx();
    mount.classList.remove("compact");
    const stages = n === 0
      ? [{ type: "creator" }, { type: "doit", btn: "Je l'ai dit !", steps: [
          { i: "💛", l: "« Mon corps est mon trésor ! »", say: "Mets ta main sur ton cœur et dis très fort :" },
          { i: "💪", l: "« C'est mon corps. C'est moi qui décide. »", say: "Et maintenant, encore plus fort :" }] }]
      : (!replay && RECALL[n] ? [Object.assign({ type: "recall", noSkip: n === 24 }, RECALL[n])] : []).concat(GAMES[n]);
    Jeux.run(stages, mount, ctx, () => {
      const first = !save.done.includes(n);
      if (first && n >= 1) justWon = n;
      if (first) { save.done.push(n); persist(); }
      renderTiles(); renderHero();
      if ($("powerText")) $("powerText").textContent = `Pouvoir gagné : ${day.p}`;
      const who = save.hero && save.hero.name ? " " + save.hero.name : "";
      const bravo = n === 0 ? `Bienvenue${who}\u00a0! C'est parti pour l'aventure\u00a0!` : `Bravo ! Tu as gagné le pouvoir : ${day.p} !`;
      mount.innerHTML = `<div class="win-screen">${n === 0 ? "" : `<div class="stars">${STAR}${STAR}${STAR}</div><strong>${first ? "Bravo !" : "Encore bravo !"}</strong>`}
        <div class="center"><button type="button" class="ghost" id="replayBtn">${n === 0 ? "Modifier mon personnage" : "Rejouer"}</button><button type="button" class="cta" id="backBtn">${n === 0 ? "Aller vers la maison" : "Retour à la maison"}</button></div></div>`;
      mount.classList.toggle("compact", n === 0); // pas de grand vide sous les deux boutons de l'étape 0
      ctx.say(bravo);
      $("replayBtn").onclick = () => startGame(true);
      $("backBtn").onclick = () => dlg.close();
    });
  }

  function showTab(tab) {
    runId++;
    $("tabKid").setAttribute("aria-selected", tab === "kid");
    $("tabAdult").setAttribute("aria-selected", tab === "adult");
    const d = current.day, done = save.done.includes(current.n);
    $("dlgPanel").classList.toggle("longread", tab === "adult");
    if (tab === "kid") {
      $("dlgPanel").innerHTML = `<div class="say">${guide()}<p class="bubble" id="sayText" aria-live="polite"></p></div>
        <div id="gameMount"></div>
        ${current.n === 0 || current.n === 24 ? "" : `<div class="power"><i class="badge on" aria-hidden="true" style="background:${BADGE_COLS[(current.n - 1) % BADGE_COLS.length]}"></i><span id="powerText">${done ? "Pouvoir gagné" : "Pouvoir à gagner"} : ${d.p}</span></div>`}`;
      startGame();
    } else {
      $("dlgPanel").innerHTML = `<div class="say adult">${compSVG("owl")}<div class="bubble owl"><h3>Objectif du jour</h3><p>${d.o}</p></div></div>
        <div><h3>Comment en parler</h3><ul>${d.parler.map((x) => `<li>${x}</li>`).join("")}</ul></div>
        ${d.eviter ? `<div><h3>À éviter</h3><p>${d.eviter}</p></div>` : ""}
        ${d.age ? `<div><h3>Selon son âge</h3><p>${d.age}</p></div>` : ""}
        ${d.jour ? `<div><h3>Au quotidien</h3><p>${d.jour}</p></div>` : ""}
        ${d.compris ? `<div><h3>Comment voir que c'est compris</h3><p>${d.compris}</p></div>` : ""}
        ${d.plus ? `<div><h3>Pour aller plus loin</h3><p>${d.plus}</p></div>` : ""}
        ${current.n === 24 ? "" : `<p class="note">Si votre enfant ne veut pas jouer, n'insistez pas : proposez-lui de regarder, ou revenez-y un autre jour. Refuser, c'est aussi s'exercer à dire non.</p>`}
        <div class="box119"><strong>Si votre enfant vous confie quelque chose</strong> : « Je te crois, ce n'est pas ta faute, je vais t'aider. » Laissez votre enfant parler librement, sans lui demander de répéter ni poser de questions fermées. Notez ses mots tels quels. Ne cherchez pas de preuves, et ne promettez rien sur la suite. Un doute ? Appelez le <strong>119</strong>, gratuit, 24h/24.</div>`;
    }
  }
  function openDay(n) {
    current = { day: n === 0 ? STEP0 : DAYS[n - 1], n };
    $("dlgNum").textContent = n; $("dlgNum").hidden = false;
    $("dlgKicker").textContent = n === 0 ? "Avant de commencer" : ""; $("dlgSub").textContent = (n >= 1 && DAYS[n - 1].e) || ""; $("dlgSub").hidden = false; $("dlgSub").className = "obj"; // sous le titre : l'objectif du jeu, avec des mots d'enfant
    $("dlgTitle").textContent = current.day.t;
    $("dlgTabs").hidden = n === 0; // pas de fiche adulte pour le choix du personnage
    dlg.classList.remove("reading");
    dlg.showModal();
    showTab("kid");
  }
  function openInfo(key) {
    const info = INFO[key];
    current = null; runId++;
    $("dlgNum").hidden = true;
    $("dlgKicker").textContent = info.kicker || ""; $("dlgSub").textContent = info.sub || ""; $("dlgSub").hidden = false; $("dlgSub").className = "";
    $("dlgTitle").textContent = info.title;
    $("dlgTabs").hidden = true;
    $("dlgPanel").innerHTML = info.html;
    $("dlgPanel").classList.add("longread"); dlg.classList.add("reading");
    document.querySelector(".dlg-body").scrollTop = 0;
    if (!dlg.open) dlg.showModal();
  }
  // Liens d'une rubrique vers une autre, à l'intérieur de la fenêtre
  $("dlgPanel").addEventListener("click", (e) => { const b = e.target.closest("[data-info]"); if (b) openInfo(b.dataset.info); });
  // Bouton « Copier l'adresse » de la page « Nous écrire ».
  $("dlgPanel").addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]"); if (!b) return;
    const txt = b.dataset.copy, ok = () => toast("Adresse copiée : " + txt), ko = () => toast("Copie impossible ici. L'adresse est : " + txt, 7000);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, ko); else ko();
  });
  $("tabKid").addEventListener("click", () => showTab("kid"));
  $("tabAdult").addEventListener("click", () => showTab("adult"));
  $("dlgClose").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => { runId++; if (justWon) { const n = justWon; justWon = 0; flyToBadge(n); } });

  // La pastille du pouvoir gagné s'envole jusqu'à sa place dans la frise.
  let justWon = 0;
  function flyToBadge(n) {
    const badge = $("badges").children[n - 1];
    if (!badge || $("house").hidden) return;
    const calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    badge.classList.add("wait");
    badge.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "center" });
    setTimeout(() => {
      const land = () => { badge.classList.remove("wait"); badge.classList.add("pop"); setTimeout(() => badge.classList.remove("pop"), 900); };
      if (calm || !badge.animate) return land();
      const r = badge.getBoundingClientRect(), size = 64;
      const fly = document.createElement("i");
      fly.className = "badge on fly"; fly.style.background = BADGE_COLS[(n - 1) % BADGE_COLS.length];
      fly.style.left = (innerWidth / 2 - size / 2) + "px"; fly.style.top = (innerHeight * 0.28) + "px";
      document.body.append(fly);
      const dx = r.left + r.width / 2 - innerWidth / 2, dy = r.top + r.height / 2 - (innerHeight * 0.28 + size / 2);
      fly.animate([
        { transform: "translate(0,0) scale(.2)", opacity: 0 },
        { transform: "translate(0,0) scale(1.15)", opacity: 1, offset: 0.25 },
        { transform: "translate(0,0) scale(1)", opacity: 1, offset: 0.4 },
        { transform: `translate(${dx}px,${dy}px) scale(${r.width / size})`, opacity: 1 }
      ], { duration: 1300, easing: "cubic-bezier(.5,0,.3,1)" }).onfinish = () => { fly.remove(); land(); };
    }, calm ? 0 : 550);
  }
  $("step0Btn").addEventListener("click", () => openDay(0));
  document.querySelectorAll("[data-info]").forEach((b) => b.addEventListener("click", () => openInfo(b.dataset.info)));

  // ---------- Étape 0 : le créateur de héros ----------
  function stageCreator(st, m, ctx, next) {
    const h = Object.assign({}, DEFAULT_HERO, save.hero || {});
    const sw = (key, list, label) => `<fieldset><legend>${label}</legend>${list.map((c) => `<button type="button" class="sw${h[key] === c ? " on" : ""}" data-k="${key}" data-v="${c}" style="background:${c}" aria-label="${label} : ${COLOR_NAMES[c] || "couleur " + (list.indexOf(c) + 1)}" aria-pressed="${h[key] === c}"></button>`).join("")}</fieldset>`;
    m.innerHTML = `<div class="creator">
      <div class="preview"><div id="heroPrev">${heroSVG(h)}</div></div>
      <div class="choices">
        <fieldset><legend>Mon personnage</legend>${ANIMALS.map(([c, l]) => `<button type="button" class="cp${h.animal === c ? " on" : ""}" data-k="animal" data-v="${c}" aria-label="${l}" aria-pressed="${h.animal === c}">${thumbSVG(c)}</button>`).join("")}</fieldset>
        ${sw("cape", CAPES, "Sa cape")}${sw("mask", MASKS, "Son masque")}
        <label class="name">Le nom de mon personnage (un adulte peut l'écrire)<input id="heroName" type="text" maxlength="16" autocomplete="off" placeholder="Super Étoile" value="${esc(h.name)}"></label>
      </div></div>
      <div class="center"><button type="button" class="cta" id="heroOk">C'est mon personnage !</button></div>`;
    ctx.say("Choisis ton personnage, puis sa cape et son masque !");
    m.querySelector(".creator").addEventListener("click", (e) => {
      const b = e.target.closest("[data-k]"); if (!b) return;
      h[b.dataset.k] = b.dataset.v;
      m.querySelectorAll(`[data-k="${b.dataset.k}"]`).forEach((x) => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
      $("heroPrev").innerHTML = heroSVG(h);
    });
    $("heroOk").onclick = () => {
      h.name = $("heroName").value.trim();
      save.hero = h; persist(); renderHero();
      const g = document.querySelector(".say svg"); if (g) g.outerHTML = guide();
      next();
    };
  }

  // ---------- Jour 24 : le diplôme ----------
  // Dessiné en SVG au format A4 paysage (1123 x 794) : le même dessin sert d'aperçu et de page à imprimer.
  function diplomaSVG() {
    const h = Object.assign({}, DEFAULT_HERO, save.hero || {});
    const friend = (c, x, y, w) => `<svg x="${x}" y="${y}" width="${w}" height="${w * 130 / 120}" viewBox="0 0 120 130"><use href="#c-${c}"/></svg>`;
    const spark = (x, y, s, f) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -16L4 -4L16 0L4 4L0 16L-4 4L-16 0L-4 -4z" fill="${f || "#ffd400"}"/>`;
    const tree = (x, y, s, f) => `<g transform="translate(${x} ${y}) scale(${s})"><polygon points="0,-90 26,-40 -26,-40" fill="${f}"/><polygon points="0,-56 38,0 -38,0" fill="${f}"/><polygon points="0,-90 9,-70 0,-74 -9,-70" fill="#fff"/></g>`;
    const name = h.name
      ? `<text x="700" y="322" text-anchor="middle" font-family="'Bagel Fat One', sans-serif" font-size="${h.name.length > 11 ? 56 : 72}" fill="#1d2fa8">${esc(h.name)}</text>`
      : `<path d="M480 318H920" stroke="#1d2fa8" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>`;
    return `<svg class="diploma-svg" viewBox="0 0 1123 794" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diplôme des super-pouvoirs" font-family="Nunito, sans-serif">
      <defs>
        <pattern id="d-snow" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="12" cy="14" r="3" fill="#fff"/><circle cx="42" cy="40" r="2" fill="#fff" opacity=".7"/></pattern>
        <pattern id="d-cane" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="20" height="20" fill="#fff"/><rect width="10" height="20" fill="#ff3b2f"/></pattern>
        <pattern id="d-dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="2" fill="#fff" opacity=".55"/></pattern>
        <pattern id="d-tiles" width="46" height="30" patternUnits="userSpaceOnUse"><path d="M0 0a23 23 0 0 0 46 0" fill="none" stroke="#e3271c" stroke-width="3"/></pattern>
        <clipPath id="d-panel"><rect x="57" y="57" width="1009" height="680" rx="32"/></clipPath>
        <clipPath id="d-arch"><path d="M124 566V340a116 116 0 0 1 232 0v226z"/></clipPath>
      </defs>
      <rect width="1123" height="794" fill="#1d2fa8"/><rect width="1123" height="794" fill="url(#d-snow)"/>
      <rect x="48" y="48" width="1027" height="698" rx="40" fill="#fffdf3" stroke="url(#d-cane)" stroke-width="18"/>
      <g clip-path="url(#d-panel)">
        <path d="M57 664Q300 622 560 652T1066 640V737H57z" fill="#dff0ff"/>
        ${tree(96, 668, 1, "#ff7ac0")}${tree(150, 690, .7, "#ffd400")}${tree(1040, 640, .8, "#19c6a7")}
      </g>
      <path d="M244 30H879a18 18 0 0 1 16 9L962 150H161L228 39a18 18 0 0 1 16 -9z" fill="#ff3b2f"/><path d="M244 30H879a18 18 0 0 1 16 9L962 150H161L228 39a18 18 0 0 1 16 -9z" fill="url(#d-tiles)"/>
      <rect x="143" y="138" width="837" height="24" rx="12" fill="#fff"/>
      <circle cx="300" cy="160" r="9" fill="#fff"/><circle cx="560" cy="162" r="10" fill="#fff"/><circle cx="820" cy="160" r="8" fill="#fff"/>
      <text x="561" y="112" text-anchor="middle" font-family="'Bricolage Grotesque', sans-serif" font-weight="800" font-size="46" letter-spacing="-1" fill="#fff">Diplôme des <tspan fill="#ffd400">super-pouvoirs</tspan></text>
      <svg x="252" y="-3" width="62" height="35" viewBox="0 0 78 44"><use href="#c-robin"/></svg>

      <path d="M108 566V340a132 132 0 0 1 264 0v226z" fill="#ffd400"/>
      <path d="M124 566V340a116 116 0 0 1 232 0v226z" fill="#1d2fa8"/><path d="M124 566V340a116 116 0 0 1 232 0v226z" fill="url(#d-dots)"/>
      <g clip-path="url(#d-arch)">${heroSVG(h, "", 'x="128" y="322" width="224" height="243"')}</g>
      <rect x="92" y="560" width="296" height="20" rx="10" fill="#ffd400"/><rect x="92" y="574" width="296" height="6" rx="3" fill="#e0b800"/>

      <text x="700" y="238" text-anchor="middle" font-size="26" font-weight="700" fill="#12206e">Ce diplôme est décerné à</text>
      ${name}
      <path d="M520 346q30 -16 60 0t60 0t60 0t60 0t60 0t60 0" fill="none" stroke="#ff7ac0" stroke-width="6" stroke-linecap="round"/>
      <text text-anchor="middle" font-size="23" font-weight="700" fill="#12206e"><tspan x="700" y="394">qui connaît son corps, sait dire oui et non,</tspan><tspan x="700" y="426">écoute son cœur et peut compter sur sa super-équipe.</tspan></text>
      <rect x="436" y="452" width="528" height="100" rx="26" fill="#ffd400"/><rect x="436" y="540" width="528" height="12" rx="6" fill="#e0b800" opacity=".6"/>
      <text text-anchor="middle" font-family="'Bricolage Grotesque', sans-serif" font-weight="800" font-size="26" fill="#2a1b00"><tspan x="700" y="494">Mon corps est mon trésor.</tspan><tspan x="700" y="530">C'est moi le/la chef·fe de mon corps !</tspan></text>

      <g transform="translate(0 16)"><path d="M968 262l-16 52 30-16 30 16-16-52z" fill="#ff7ac0"/><circle cx="982" cy="232" r="46" fill="#ffd400" stroke="#e0b800" stroke-width="5"/>${spark(982, 232, 1.6, "#fff")}</g>
      ${friend("fox", 436, 574, 96)}${friend("bear", 542, 580, 96)}${friend("owl", 648, 574, 96)}${friend("dragon", 754, 580, 96)}${friend("unicorn", 860, 572, 96)}
      <svg x="966" y="560" width="76" height="119" viewBox="0 0 84 132"><use href="#c-penguin"/></svg>
      ${spark(24, 120, 1)}${spark(1098, 300, .9)}${spark(26, 520, .8, "#ff7ac0")}${spark(1096, 600, 1.1)}${spark(120, 24, .8, "#ff7ac0")}${spark(1000, 24, 1)}${spark(420, 250, .7)}${spark(1012, 470, .6, "#ff7ac0")}
    </svg>`;
  }
  function printDiploma() {
    const w = window.open("", "_blank");
    if (!w) { toast("L'impression n'est pas possible ici. Autorisez les fenêtres pop-up, ou ouvrez le site dans un navigateur."); return; }
    const symbols = document.querySelector('svg[width="0"]').outerHTML;
    w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Diplôme des super-pouvoirs</title>
      <link rel="stylesheet" href="${new URL("fonts/fonts.css", location.href).href}">
      <style>@page{size:A4 landscape;margin:0}html,body{margin:0;height:100%;background:#141f7a}
      *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .page{height:100vh;display:flex;align-items:center;justify-content:center}
      .diploma-svg{display:block;width:100vw;height:100vh}
      .bar{position:fixed;top:12px;right:12px;display:flex;gap:8px}
      .bar button{min-height:48px;padding:0 22px;border:0;border-radius:999px;background:#ffd400;color:#2a1b00;font:800 17px Nunito,sans-serif;cursor:pointer;box-shadow:0 5px 0 #b38f00}
      @media print{.bar{display:none}html,body{height:auto;overflow:hidden}.page{display:block;height:auto;overflow:hidden;break-inside:avoid;page-break-inside:avoid}.diploma-svg{width:100%;height:auto;max-height:200mm}}</style></head>
      <body>${symbols}<div class="page">${diplomaSVG()}</div>
      <div class="bar"><button type="button" onclick="window.print()">Imprimer</button><button type="button" onclick="window.close()">Fermer</button></div></body></html>`);
    w.document.close();
    const go = () => setTimeout(() => { w.focus(); w.print(); }, 300);
    if (w.document.fonts && w.document.fonts.ready) w.document.fonts.ready.then(go); else w.onload = go;
  }
  // ---------- Diplôme en image (à enregistrer ou à partager) ----------
  // Le dessin est rendu autonome (personnages et polices inclus), puis converti en image PNG.
  const b64 = (buf) => { let s = ""; const u = new Uint8Array(buf); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
  let fontCss = null;
  async function embeddedFonts() {
    if (fontCss) return fontCss;
    const faces = [["Bagel Fat One", "400", "fonts/bagel-fat-one-latin-1.woff2"], ["Bricolage Grotesque", "200 800", "fonts/bricolage-grotesque-latin-1.woff2"], ["Nunito", "200 1000", "fonts/nunito-latin-1.woff2"]];
    const parts = await Promise.all(faces.map(async ([fam, w, url]) => `@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${b64(await (await fetch(url)).arrayBuffer())}) format('woff2')}`));
    return (fontCss = parts.join(""));
  }
  async function diplomaPNG() {
    const symbols = document.querySelector('svg[width="0"]').innerHTML;
    const svg = diplomaSVG().replace(/<svg class="diploma-svg"/, '<svg width="2246" height="1588"').replace("<defs>", `<defs><style>${await embeddedFonts()}</style>${symbols}`);
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    try {
      const img = new Image(); img.decoding = "sync";
      await new Promise((ok, ko) => { img.onload = ok; img.onerror = () => ko(new Error("image")); img.src = url; });
      await new Promise((r) => setTimeout(r, 120)); // laisse aux polices incluses le temps de s'appliquer (Safari)
      const c = document.createElement("canvas"); c.width = 2246; c.height = 1588;
      c.getContext("2d").drawImage(img, 0, 0, 2246, 1588);
      const blob = await new Promise((ok) => c.toBlob(ok, "image/png"));
      if (!blob) throw new Error("png");
      return new File([blob], "diplome-super-pouvoirs.png", { type: "image/png" });
    } finally { URL.revokeObjectURL(url); }
  }
  function stageDiploma(st, m, ctx) {
    m.innerHTML = `<div class="diploma-prev">${diplomaSVG()}</div>
      <div class="center dipl-actions"><button type="button" class="cta" id="printBtn">Imprimer mon diplôme</button><button type="button" class="cta alt" id="saveBtn">Enregistrer l'image</button><button type="button" class="cta alt" id="shareBtn" hidden>Partager</button></div>`;
    ctx.say("Bravo ! Tu as ouvert toutes les fenêtres. Voici ton diplôme des super-pouvoirs !");
    $("printBtn").onclick = () => { ctx.markDone(); printDiploma(); };
    // L'image est préparée dès l'affichage : au clic, l'enregistrement ou le partage partent sans attente.
    const ready = diplomaPNG(); ready.catch(() => {});
    const fail = () => toast("L'image n'a pas pu être créée sur cet appareil. Essayez l'impression.");
    $("saveBtn").onclick = async () => {
      ctx.markDone();
      try {
        const file = await ready, url = URL.createObjectURL(file), a = document.createElement("a");
        a.href = url; a.download = file.name; document.body.append(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        toast("Diplôme enregistré dans vos téléchargements.");
      } catch (e) { fail(); }
    };
    ready.then((file) => {
      const sb = $("shareBtn");
      if (!sb || !navigator.canShare || !navigator.canShare({ files: [file] })) return;
      sb.hidden = false;
      sb.onclick = async () => {
        ctx.markDone();
        try { await navigator.share({ files: [file], title: "Mon diplôme des super-pouvoirs" }); }
        catch (e) { if (e && e.name !== "AbortError") fail(); }
      };
    }).catch(() => {});
  }

  // ---------- Message court ----------
  let toastTimer;
  function toast(msg, ms) {
    const t = $("toast");
    (dlg.open ? dlg : document.body).appendChild(t); // reste visible au-dessus de la fenêtre ouverte
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), ms || 3200); // les messages longs restent plus longtemps
  }

  // ---------- Musique de Noël ----------
  // « Wintery loop » d'Emma_MA (opengameart.org), licence CC0 : domaine public, aucune mention obligatoire.
  // Jouée en boucle par Web Audio pour éviter le petit blanc entre deux tours.
  const MUSIC_SRC = "audio/wintery-loop.mp4";
  // La musique est activée par défaut. Les navigateurs interdisent de lancer du son avant un premier
  // geste : elle démarre donc au premier clic ou au premier appui sur la page (ouvrir la maison, par exemple).
  let ac = null, musicBuf = null, musicNode = null, musicGain = null, musicBusy = false;
  let musicOn = save.music !== false;
  function showMusic() { $("musicBtn").setAttribute("aria-pressed", musicOn); $("musicBtn").setAttribute("aria-label", musicOn ? "Musique activée" : "Musique coupée"); }
  async function startMusic() {
    if (musicNode || musicBusy) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) throw new Error("Web Audio indisponible");
    musicBusy = true;
    try {
      ac = ac || new AC();
      if (ac.state !== "running") ac.resume().catch(() => {}); // sans attendre : sur écran tactile, la reprise peut tarder
      if (!musicBuf) {
        const data = await (await fetch(MUSIC_SRC)).arrayBuffer();
        musicBuf = await new Promise((ok, ko) => ac.decodeAudioData(data, ok, ko));
      }
      if (!musicOn || musicNode) return; // coupée pendant le chargement
      musicGain = ac.createGain();
      musicGain.gain.setValueAtTime(0.0001, ac.currentTime);
      musicGain.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + 1.2); // entrée en douceur
      musicGain.connect(ac.destination);
      musicNode = ac.createBufferSource();
      musicNode.buffer = musicBuf; musicNode.loop = true;
      musicNode.loopStart = 0.05; musicNode.loopEnd = musicBuf.duration - 0.05; // saute le silence ajouté par la compression
      musicNode.connect(musicGain); musicNode.start(0, 0.05);
    } finally { musicBusy = false; }
  }
  function stopMusic() {
    if (!musicNode) return;
    const g = musicGain, n = musicNode; musicNode = null;
    g.gain.cancelScheduledValues(ac.currentTime);
    g.gain.setValueAtTime(Math.max(g.gain.value, 0.0001), ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.4);
    setTimeout(() => { try { n.stop(); } catch (e) {} }, 450);
  }
  const musicFail = () => { musicOn = false; showMusic(); };
  $("musicBtn").addEventListener("click", () => {
    // Bouton sur « oui » mais musique pas encore lancée (aucun geste avant ce clic) : ce clic la démarre, sans la couper.
    if (musicOn && !musicNode && !musicBusy) { startMusic().catch(() => { musicFail(); toast("La musique n'est pas disponible sur cet appareil."); }); return; }
    musicOn = !musicOn; save.music = musicOn; persist(); showMusic();
    if (!musicOn) return stopMusic();
    startMusic().catch(() => { musicFail(); toast("La musique n'est pas disponible sur cet appareil."); });
  });
  // Premier geste sur la page : on lance la musique si elle est activée.
  const GESTURES = ["click", "touchend", "keydown"];
  const firstGesture = (e) => {
    if (e.target.closest && e.target.closest("#musicBtn")) return; // le bouton gère lui-même
    GESTURES.forEach((ev) => document.removeEventListener(ev, firstGesture, true));
    if (musicOn) startMusic().catch(musicFail);
  };
  GESTURES.forEach((ev) => document.addEventListener(ev, firstGesture, true));
  // Retour sur la page après un passage par une autre appli ou un autre onglet : on relance le son.
  // En arrière-plan, on le met nous-mêmes en pause : l'état est alors connu au retour.
  function wakeMusic(gesture) {
    if (!musicOn || !ac) return;
    if (ac.state === "closed") return rebuildMusic();
    if (ac.state === "running") return;
    const p = ac.resume(); if (p && p.catch) p.catch(() => {});
    // Si le téléphone a coupé le son pour de bon, un geste permet de repartir sur une lecture neuve.
    if (gesture) setTimeout(() => { if (musicOn && ac && ac.state !== "running") rebuildMusic(); }, 1500);
  }
  function rebuildMusic() {
    if (musicBusy) return; // un chargement est en cours, on le laisse finir
    try { if (musicNode) musicNode.stop(); } catch (e) {}
    try { if (ac && ac.state !== "closed") ac.close(); } catch (e) {}
    musicNode = null; musicGain = null; ac = null; musicBuf = null;
    startMusic().catch(() => {});
  }
  document.addEventListener("visibilitychange", () => {
    if (!ac || ac.state === "closed") return;
    if (document.hidden) { if (ac.state === "running") ac.suspend().catch(() => {}); }
    else wakeMusic(false);
  });
  window.addEventListener("pageshow", () => wakeMusic(false));
  window.addEventListener("focus", () => wakeMusic(false));
  ["click", "touchend"].forEach((ev) => document.addEventListener(ev, () => wakeMusic(true), true));
  showMusic();

  renderTiles(); renderHero(); showUnlock();

  // ---------- Ponctuation française ----------
  // Une espace insécable avant : ; ! ? » et après « : ces signes ne se retrouvent jamais seuls en début de ligne.
  // La passe s'applique à tout texte affiché, y compris celui que les jeux ajoutent ensuite.
  const typo = () => {
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let t = walk.nextNode(); t; t = walk.nextNode()) {
      const v = t.nodeValue;
      if (v.indexOf(" ") < 0 || /^(SCRIPT|STYLE|TEXTAREA)$/.test(t.parentNode.nodeName)) continue;
      const f = v.replace(/ ([:;!?»])/g, "\u00a0$1").replace(/« /g, "«\u00a0");
      if (f !== v) t.nodeValue = f;
    }
  };
  let typoWait = 0;
  new MutationObserver(() => { if (!typoWait) typoWait = requestAnimationFrame(() => { typoWait = 0; typo(); }); })
    .observe(document.body, { childList: true, subtree: true, characterData: true });
  typo();

  // ---------- Utilisation sans connexion ----------
  // Fonctionne seulement sur un site en HTTPS (ou en local pour les essais).
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
