// Personnages supplémentaires, dessinés dans le même style que ceux de la couverture.
// Chaque personnage est décrit par quelques réglages (couleur, oreilles, museau, accessoire)
// et devient un symbole SVG réutilisable : <use href="#c-chat"> par exemple.
// Les six personnages d'origine (fox, bear, owl, dragon, unicorn, penguin) sont dans index.html.
(function () {
  const K = "#1b1b3a", PINK = "#ffc2df";

  function perso(id, o) {
    const c = o.c, p = [];
    if (o.cape) p.push(`<path d="M14 140Q60 76 106 140z" fill="${o.cape}"/>`);
    p.push(`<ellipse cx="60" cy="132" rx="34" ry="28" fill="${o.body || c}"/>`);
    if (o.belly) p.push(`<ellipse cx="60" cy="138" rx="18" ry="18" fill="${o.belly}"/>`);
    if (o.back) p.push(o.back);
    const ec = o.earC || c, inn = o.in || PINK;
    if (o.ears === "round") p.push(`<circle cx="34" cy="46" r="12" fill="${ec}"/><circle cx="86" cy="46" r="12" fill="${ec}"/><circle cx="34" cy="46" r="6" fill="${inn}"/><circle cx="86" cy="46" r="6" fill="${inn}"/>`);
    if (o.ears === "big") p.push(`<circle cx="27" cy="44" r="19" fill="${ec}"/><circle cx="93" cy="44" r="19" fill="${ec}"/><circle cx="27" cy="44" r="11" fill="${inn}"/><circle cx="93" cy="44" r="11" fill="${inn}"/>`);
    if (o.ears === "pointy") p.push(`<polygon points="30,60 36,26 56,48" fill="${ec}"/><polygon points="90,60 84,26 64,48" fill="${ec}"/><polygon points="37,52 39,36 49,47" fill="${inn}"/><polygon points="83,52 81,36 71,47" fill="${inn}"/>`);
    if (o.ears === "long") p.push(`<ellipse cx="44" cy="28" rx="10" ry="27" fill="${ec}"/><ellipse cx="76" cy="28" rx="10" ry="27" fill="${ec}"/><ellipse cx="44" cy="28" rx="4.5" ry="19" fill="${inn}"/><ellipse cx="76" cy="28" rx="4.5" ry="19" fill="${inn}"/>`);
    if (o.ears === "floppy") p.push(`<ellipse cx="27" cy="72" rx="11" ry="23" fill="${ec}" transform="rotate(12 27 72)"/><ellipse cx="93" cy="72" rx="11" ry="23" fill="${ec}" transform="rotate(-12 93 72)"/>`);
    p.push(`<ellipse cx="60" cy="72" rx="${o.hw || 34}" ry="${o.hh || 30}" fill="${c}"/>`);
    if (o.front) p.push(o.front);
    if (o.muz) p.push(`<ellipse cx="60" cy="84" rx="${o.muzW || 16}" ry="11" fill="${o.muz}"/>`);
    if (o.eyes === "big") p.push(`<circle cx="46" cy="66" r="7" fill="#fff"/><circle cx="74" cy="66" r="7" fill="#fff"/><circle cx="47" cy="67" r="3.4" fill="${K}"/><circle cx="75" cy="67" r="3.4" fill="${K}"/>`);
    else if (o.eyes) p.push(o.eyes);
    else p.push(`<circle cx="47" cy="67" r="3.8" fill="${K}"/><circle cx="73" cy="67" r="3.8" fill="${K}"/>`);
    if (o.mood === "sad") p.push(`<path d="M40 61l10 -4M80 61l-10 -4" stroke="${o.ink || K}" stroke-width="2.4" stroke-linecap="round"/><path d="M42 74q-7 12 0 16q7 -4 0 -16z" fill="#4d9de0" stroke="#fff" stroke-width="1"/>`);
    if (!o.nocheek) p.push(`<circle cx="36" cy="80" r="5" fill="${o.cheek || "#ff7ac0"}" opacity=".55"/><circle cx="84" cy="80" r="5" fill="${o.cheek || "#ff7ac0"}" opacity=".55"/>`);
    p.push(o.nose === false ? "" : o.nose && o.nose[0] === "<" ? o.nose : `<ellipse cx="60" cy="79" rx="5" ry="3.8" fill="${o.nose || K}"/>`);
    if (o.mouth !== false) p.push(o.mood === "sad"
      ? `<path d="M53 92Q60 86 67 92" fill="none" stroke="${o.ink || K}" stroke-width="2.4" stroke-linecap="round"/>`
      : `<path d="M53 87Q60 93 67 87" fill="none" stroke="${o.ink || K}" stroke-width="2.4" stroke-linecap="round"/>`);
    if (o.top) p.push(o.top);
    if (o.scarf) p.push(`<rect x="34" y="98" width="52" height="12" rx="6" fill="${o.scarf}"/><rect x="68" y="104" width="10" height="22" rx="4" fill="${o.scarf}"/>`);
    return `<symbol id="c-${id}" viewBox="0 0 120 130">${p.join("")}</symbol>`;
  }

  const whiskers = (col) => `<path d="M28 82H42M28 88L42 86M92 82H78M92 88L78 86" stroke="${col}" stroke-width="1.6" stroke-linecap="round"/>`;
  const spikes = (() => { let pts = []; for (let i = 0; i < 26; i++) { const a = Math.PI * (0.95 + i / 25 * 1.1) * 1 , r = i % 2 ? 52 : 40; pts.push((60 + Math.cos(a) * r).toFixed(1) + "," + (74 + Math.sin(a) * r).toFixed(1)); } return `<polygon points="22,96 ${pts.join(" ")} 98,96" fill="#7a4d24"/>`; })();

  const DEFS = {
    cat: { c: "#3d4270", ears: "pointy", in: "#ff7ac0", eyes: "big", ink: "#fff", nose: `<polygon points="56,78 64,78 60,83" fill="#ff7ac0"/>`, front: whiskers("#fff"), scarf: "#ffd400" },
    rabbit: { c: "#f4ecff", ears: "long", muz: "#fff", nose: "#ff7ac0", scarf: "#19c6a7" },
    frog: { c: "#8bd450", belly: "#d8f5a8", back: `<circle cx="42" cy="46" r="14" fill="#8bd450"/><circle cx="78" cy="46" r="14" fill="#8bd450"/>`, eyes: `<circle cx="42" cy="46" r="8.5" fill="#fff"/><circle cx="78" cy="46" r="8.5" fill="#fff"/><circle cx="43" cy="47" r="4" fill="${K}"/><circle cx="79" cy="47" r="4" fill="${K}"/>`, nose: false, cape: "#ff3b2f" },
    panda: { c: "#fff", body: K, ears: "round", earC: K, in: K, front: `<ellipse cx="46" cy="66" rx="10" ry="12" fill="${K}" transform="rotate(14 46 66)"/><ellipse cx="74" cy="66" rx="10" ry="12" fill="${K}" transform="rotate(-14 74 66)"/>`, eyes: `<circle cx="47" cy="66" r="3.4" fill="#fff"/><circle cx="73" cy="66" r="3.4" fill="#fff"/>`, scarf: "#ff3b2f" },
    koala: { c: "#9aa3b8", ears: "big", in: "#e9ecf8", nose: `<ellipse cx="60" cy="78" rx="8" ry="11" fill="${K}"/>`, mouth: false, scarf: "#ff7ac0" },
    lion: { c: "#ffcf4a", back: `<circle cx="60" cy="70" r="46" fill="#ff8a3c"/><circle cx="22" cy="52" r="12" fill="#ff8a3c"/><circle cx="98" cy="52" r="12" fill="#ff8a3c"/><circle cx="60" cy="24" r="12" fill="#ff8a3c"/>`, ears: "round", in: "#ffe9a8", muz: "#fff4d6", nose: "#7a3d0c", cape: "#1d2fa8" },
    tiger: { c: "#ffa62b", ears: "round", in: "#fff4d6", front: `<path d="M60 44v11M49 46l3 10M71 46l-3 10M27 66h10M83 66h10M29 76h8M83 76h8" stroke="#3a2208" stroke-width="4" stroke-linecap="round"/>`, muz: "#fff", scarf: "#19c6a7" },
    pig: { c: "#ffb3d1", ears: "pointy", in: "#ff7ac0", cheek: "#ff3b2f", nose: `<ellipse cx="60" cy="80" rx="13" ry="9" fill="#ff7ac0"/><circle cx="55" cy="80" r="2.3" fill="#b8407d"/><circle cx="65" cy="80" r="2.3" fill="#b8407d"/>`, mouth: false, scarf: "#1d2fa8" },
    mouse: { c: "#c9cfe0", ears: "big", muz: "#fff", nose: "#ff7ac0", front: whiskers("#6b7392"), cape: "#ffd400" },
    elephant: { c: "#8fb4e8", back: `<ellipse cx="22" cy="72" rx="19" ry="27" fill="#7aa3dd"/><ellipse cx="98" cy="72" rx="19" ry="27" fill="#7aa3dd"/>`, nose: `<path d="M60 76Q62 100 49 106" fill="none" stroke="#7aa3dd" stroke-width="13" stroke-linecap="round"/>`, mouth: false, scarf: "#ff3b2f" },
    monkey: { c: "#8a5a3c", ears: "round", in: "#f6d3a8", front: `<ellipse cx="60" cy="77" rx="25" ry="22" fill="#f6d3a8"/>`, nose: "#8a5a3c", cape: "#19c6a7" },
    reindeer: { c: "#b07a4a", ears: "pointy", in: "#f1dcc0", muz: "#f1dcc0", nose: `<circle cx="60" cy="79" r="6.5" fill="#ff3b2f"/>`, top: `<path d="M42 46Q33 30 37 12M38 28L27 20M40 37L29 35M78 46Q87 30 83 12M82 28L93 20M80 37L91 35" fill="none" stroke="#7a4d24" stroke-width="5" stroke-linecap="round"/>`, scarf: "#3bb273" },
    hedgehog: { c: "#f1dcc0", body: "#7a4d24", back: spikes, ears: "round", in: "#f1dcc0", hw: 30, hh: 27, belly: "#f1dcc0", cape: "#ff7ac0" },
    seal: { c: "#aab4c8", belly: "#e9ecf8", eyes: "big", muz: "#fff", muzW: 20, front: whiskers("#6b7392"), scarf: "#ffd400" },
    chick: { c: "#ffe14a", cheek: "#ff8a3c", nose: `<polygon points="60,74 51,84 69,84" fill="#ff8a3c"/>`, mouth: false, top: `<path d="M60 44Q54 30 60 24Q62 34 66 28Q66 38 60 44z" fill="#ff8a3c"/>`, cape: "#b9a4ff" },
    dog: { c: "#e8c79a", ears: "floppy", earC: "#a8713c", front: `<circle cx="74" cy="66" r="13" fill="#a8713c"/>`, muz: "#fff", top: `<path d="M56 92q4 9 8 0z" fill="#ff7ac0"/>`, scarf: "#ff3b2f" },
    sheep: { c: "#3d3d52", body: "#fff", back: `<circle cx="34" cy="46" r="15" fill="#fff"/><circle cx="60" cy="38" r="17" fill="#fff"/><circle cx="86" cy="46" r="15" fill="#fff"/><circle cx="24" cy="70" r="13" fill="#fff"/><circle cx="96" cy="70" r="13" fill="#fff"/>`, hw: 28, hh: 27, eyes: "big", ink: "#fff", nose: "#ff7ac0", nocheek: true, scarf: "#1d2fa8" },
    snowman: { c: "#fff", nose: `<polygon points="60,74 84,79 60,83" fill="#ff8a3c"/>`, top: `<rect x="42" y="22" width="36" height="24" rx="3" fill="${K}"/><rect x="33" y="42" width="54" height="8" rx="4" fill="${K}"/><rect x="42" y="34" width="36" height="7" fill="#ff3b2f"/>`, scarf: "#ffd400" }
  };

  let out = "";
  for (const id in DEFS) out += perso(id, DEFS[id]) + perso(id + "-sad", Object.assign({}, DEFS[id], { mood: "sad" }));
  document.querySelector('svg[width="0"]').insertAdjacentHTML("beforeend", out);

  // Liste complète, dans l'ordre des 24 fenêtres : un personnage différent par jour.
  window.PERSOS = ["fox", "bear", "owl", "dragon", "unicorn", "penguin"].concat(Object.keys(DEFS));
})();
