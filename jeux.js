// Mini-jeux du calendrier.
// Chaque jour est une suite d'étapes. Les types d'étapes (moteurs) sont en bas du fichier.
// Aucun jeu ne demande de photo ni d'information personnelle : les situations sont génériques,
// et la fiche adulte propose de les transposer à la vraie vie de l'enfant, à l'oral ou sur papier.
// i : pictogramme (emoji provisoire, à remplacer par une illustration), l : texte lu à voix haute.

const OUI = { i: "👍", l: "Oui" }, NON = { i: "👎", l: "Non" };

// Jeu 17 : le parc enneigé. Chaque personnage est un groupe cliquable (data-id).
function parcScene() {
  const N = (c, x, y, w) => `<svg x="${x}" y="${y}" width="${w}" height="${(w * 130 / 120).toFixed(0)}" viewBox="0 0 120 130"><use href="#c-${c}"/></svg>`;
  const G = (id, label, inner) => `<g data-id="${id}" role="button" tabindex="0" aria-label="${label}">${inner}</g>`;
  const tree = (x, y, s, f) => `<g transform="translate(${x} ${y}) scale(${s})"><polygon points="0,-96 28,-44 -28,-44" fill="${f}"/><polygon points="0,-60 40,0 -40,0" fill="${f}"/><polygon points="0,-96 10,-76 0,-80 -10,-76" fill="#fff"/><rect x="-5" y="0" width="10" height="10" fill="#7a4d24"/></g>`;
  const heart = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 6C-10 -6 -22 6 0 20C22 6 10 -6 0 6z" fill="#ff3b2f"/>`;
  let n = 0; const D = (c, x, y, w) => G("d" + (++n), "Un personnage du parc", N(c, x, y, w));
  return `<svg viewBox="0 0 800 460" role="group" aria-label="Le parc enneigé">
    <rect width="800" height="460" fill="#bfe6ff"/>
    <circle cx="70" cy="50" r="30" fill="#ffe680"/><ellipse cx="300" cy="46" rx="56" ry="16" fill="#fff"/><ellipse cx="520" cy="30" rx="44" ry="13" fill="#fff"/>
    <path d="M0 150Q200 96 400 140T800 122V460H0z" fill="#e4f3ff"/>
    <path d="M0 236Q250 196 500 230T800 218V460H0z" fill="#fff"/>
    <path d="M662 200Q640 300 700 460" fill="none" stroke="#f3ead0" stroke-width="26" stroke-linecap="round"/>
    ${tree(56, 152, .7, "#19c6a7")}${tree(150, 146, .55, "#ff7ac0")}${tree(404, 138, .5, "#1d2fa8")}${tree(770, 156, .8, "#19c6a7")}
    <polygon points="586,116 660,56 734,116" fill="#ff3b2f"/><rect x="600" y="112" width="120" height="90" fill="#ff7ac0"/><rect x="578" y="108" width="164" height="12" rx="6" fill="#fff"/>
    <rect x="646" y="150" width="30" height="52" rx="15" fill="#1d2fa8"/><rect x="612" y="134" width="24" height="24" rx="5" fill="#ffd400"/><rect x="686" y="134" width="24" height="24" rx="5" fill="#ffd400"/>
    ${D("reindeer", 6, 92, 44)}${D("chick", 330, 104, 42)}${D("frog", 470, 98, 44)}${D("cat", 684, 148, 46)}
    <g data-id="d0" role="button" tabindex="0" aria-label="Un personnage du parc"><svg x="548" y="146" width="36" height="56" viewBox="0 0 84 132"><use href="#c-penguin"/></svg></g>
    ${tree(520, 196, .75, "#ffd400")}
    <ellipse cx="258" cy="300" rx="150" ry="44" fill="#a9dcf7"/><path d="M170 290q30 -12 60 0M270 312q30 -10 56 0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    ${D("sheep", 14, 196, 56)}
    ${G("cache", "Un personnage caché derrière un sapin", N("fox", 88, 212, 58))}${tree(150, 306, 1.1, "#19c6a7")}
    ${D("lion", 214, 236, 58)}${D("snowman", 326, 196, 56)}
    ${G("stop", "Un personnage qui dit stop", N("tiger", 418, 206, 58) + `<path d="M486 262V236" stroke="#7a4d24" stroke-width="5" stroke-linecap="round"/><circle cx="486" cy="226" r="15" fill="#ff3b2f" stroke="#fff" stroke-width="3"/><rect x="477" y="223" width="18" height="6" rx="3" fill="#fff"/>`)}
    ${D("elephant", 536, 214, 60)}${D("panda", 728, 226, 58)}
    <rect x="296" y="398" width="96" height="10" rx="5" fill="#7a4d24"/><rect x="304" y="408" width="8" height="18" fill="#7a4d24"/><rect x="376" y="408" width="8" height="18" fill="#7a4d24"/>
    ${G("bisou", "Un personnage qui envoie des bisous", N("pig", 60, 330, 66) + heart(140, 336, .7) + heart(164, 314, .5) + heart(182, 330, .4))}
    ${G("triste", "Un personnage triste", N("rabbit-sad", 232, 346, 64))}
    ${D("mouse", 388, 350, 54)}
    ${G("calin", "Deux ami·es qui se font un câlin", N("dog", 462, 338, 66) + N("monkey", 506, 338, 66) + heart(518, 322, .7))}
    ${G("bulle", "Un personnage dans sa bulle", `<circle cx="652" cy="372" r="50" fill="rgba(127,211,255,.3)" stroke="#4d9de0" stroke-width="4"/>` + N("koala", 620, 336, 64))}
    ${D("seal", 336, 272, 50)}${D("hedgehog", 150, 396, 50)}
    ${tree(16, 468, 1.15, "#ff7ac0")}${tree(792, 470, 1.1, "#ffd400")}
  </svg>`;
}

const GAMES = {
  1: [{ type: "figure", suit: "#19c6a7", prompts: [
    { q: "Voici Bonhomme. Touche sa tête !", zone: "tete", fb: "Oui, c'est la tête !" },
    { q: "Touche ses bras !", zone: "bras", fb: "Bravo, les bras !" },
    { q: "Où sont ses mains ?", zone: "mains", fb: "Oui, les mains !" },
    { q: "Touche son ventre !", zone: "ventre", fb: "C'est le ventre !" },
    { q: "Où sont ses jambes ?", zone: "jambes", fb: "Bravo, les jambes !" },
    { q: "Et ses pieds ?", zone: "pieds", fb: "Oui, les pieds ! Toi aussi, tu as tout ça. Tu connais ton corps." }] }],

  2: [{ type: "figure", suit: "#1d2fa8", stripes: true, prompts: [
      { q: "Bonhomme est en slip de bain. Touche ce qui est caché sous son slip de bain.", zone: "maillot", fb: "Oui ! Les parties intimes, ce sont les parties du corps que cachent les sous-vêtements et le maillot de bain : les fesses, le sexe, et aussi la poitrine. Elles sont à toi." }] },
    { type: "doit", btn: "Je l'ai dit !", steps: [
      { i: "🗣️", l: "Les fesses", say: "Les fesses. Tout le monde en a !" },
      { i: "🗣️", l: "La poitrine", say: "La poitrine. Tout le monde en a une !" },
      { i: "🗣️", l: "La vulve", say: "La vulve. C'est le mot exact pour les filles." },
      { i: "🗣️", l: "Le pénis et les testicules", say: "Le pénis et les testicules. Ce sont les mots exacts pour les garçons." }] },
    { type: "quiz", rounds: [{ q: "Qui utilise ces mots exacts ?", fb: "Oui ! Les docteurs, et toi aussi maintenant.", opts: [
      { i: "🩺", l: "Les docteurs, et moi aussi", ok: true }, { i: "🤫", l: "Personne, c'est interdit", fb: "Ce ne sont pas des gros mots. Essaie encore !" }] }] }],

  3: [{ type: "order", q: "C'est l'heure du bain ! Touche les images dans le bon ordre.", items: [
      { i: "🧦", l: "J'enlève mes habits" }, { i: "💧", l: "Je me mouille" }, { i: "🧼", l: "Je savonne tout mon corps" }, { i: "🚿", l: "Je me rince" }, { i: "👕", l: "Je m'essuie et je m'habille" }] },
    { type: "quiz", rounds: [
      { q: "Qui peut laver tes parties intimes, quand tu sais le faire ?", fb: "Oui, c'est toi !", opts: [
        { i: "🙋", l: "Moi", ok: true }, { i: "👥", l: "N'importe qui", fb: "Non, pas n'importe qui. Regarde l'autre réponse." }] },
      { q: "Qu'est-ce qui fait du bien à ton corps ?", fb: "Oui ! Ton corps est ton trésor, tu en prends soin.", opts: [
        { i: "🥛", l: "Boire de l'eau et bien dormir", ok: true }, { i: "🍭", l: "Manger des bonbons toute la journée", fb: "Miam, mais pas toute la journée ! Choisis l'autre réponse." }] }] }],

  4: [{ type: "quiz", rounds: [
      { q: "Tu veux entrer dans la salle de bain, mais la porte est fermée. Que fais-tu ?", fb: "Toc toc ! Tu frappes et tu attends qu'on te réponde.", opts: [
        { i: "✊", l: "Je frappe et j'attends", ok: true }, { i: "🚪", l: "J'entre sans demander", fb: "Oh non, il y a quelqu'un ! Et l'autre réponse, qu'en penses-tu ?" }] },
      { q: "Tu es dans ton bain. Quelqu'un frappe. Tu n'as pas envie qu'on entre. Que peux-tu dire ?", fb: "Oui ! Tu peux dire : « Attends, je veux être tranquille. »", opts: [
        { i: "🙅", l: "Attends, je veux être tranquille", ok: true }, { i: "😶", l: "Rien, je n'ai pas le choix", fb: "Si, tu as le droit de le dire ! Essaie encore !" }] }] },
    { type: "sort", q: "Est-ce que tu peux être sans vêtements ici ?", bins: [{ i: "👍", l: "Oui" }, { i: "🤔", l: "Ça dépend" }, { i: "👎", l: "Non" }], cards: [
      { i: "🛁", l: "Dans la salle de bain, quand je me lave", bin: 0, fb: "Oui. Et c'est toi qui dis si tu veux être tranquille." },
      { i: "🏫", l: "Dans la cour de l'école", bin: 2, fb: "Non, là il y a tout le monde. On garde ses vêtements." },
      { i: "🛏️", l: "Dans ma chambre", bin: 1, fb: "Ça dépend ! Oui, quand je me change tranquille. Si des invités sont là, je ferme la porte pour me changer et m'habiller tranquillement." },
      { i: "🏖️", l: "À la piscine ou à la plage", bin: 1, fb: "Ça dépend ! Dans la cabine, je me change. Au bord de l'eau, je garde mon maillot." }] }],

  5: [{ type: "taps", q: "Voici l'équipe des super héros et héroïnes. Touche chaque personnage pour découvrir comment il est !", items: [
      { i: "<svg class='ico' viewBox='0 0 120 130' aria-hidden='true'><use href='#c-fox'/></svg>", say: "Moi, j'ai de grandes oreilles et une queue toute douce." },
      { i: "<svg class='ico' viewBox='0 0 120 130' aria-hidden='true'><use href='#c-bear'/></svg>", say: "Moi, je suis très grand, avec un gros ventre tout rond." },
      { i: "<svg class='ico' viewBox='0 0 120 130' aria-hidden='true'><use href='#c-owl'/></svg>", say: "Moi, je suis toute petite, avec de très grands yeux." },
      { i: "<svg class='ico' viewBox='0 0 120 130' aria-hidden='true'><use href='#c-dragon'/></svg>", say: "Moi, j'ai la peau verte et deux petites cornes." },
      { i: "<svg class='ico' viewBox='0 0 120 130' aria-hidden='true'><use href='#c-unicorn'/></svg>", say: "Moi, j'ai une crinière de toutes les couleurs." },
      { i: "<svg class='ico' viewBox='0 0 84 132' aria-hidden='true'><use href='#c-penguin'/></svg>", say: "Moi, j'ai de petites ailes et je marche en me dandinant." }] },
    { type: "quiz", rounds: [
      { q: "Est-ce que tous les personnages ont le même corps ?", fb: "Non ! Chaque corps est unique, et c'est très bien comme ça.", opts: [
        { i: "🌈", l: "Non, tous différents", ok: true }, { i: "👯", l: "Oui, tous pareils", fb: "Regarde bien, ils sont tous différents ! Regarde l'autre réponse." }] },
      { q: "Et toi, ton corps ressemble-t-il exactement à celui d'un autre enfant ?", fb: "Non ! Ton corps est unique, lui aussi.", opts: [
        { i: "⭐", l: "Non, mon corps est unique", ok: true }, { i: "👯", l: "Oui, exactement pareil", fb: "Regarde tes mains, tes yeux, tes cheveux : tu es unique ! Choisis l'autre réponse." }] },
      { q: "Est-ce qu'on se moque du corps de quelqu'un ?", fb: "Jamais ! Bravo.", opts: [
        { i: "🙅", l: "Non, jamais", ok: true }, { i: "😜", l: "Oui, c'est rigolo", fb: "Ça fait de la peine. Essaie encore !" }] }] }],

  6: [{ type: "order", q: "Tu as un bobo. Un adulte qui s'occupe de toi veut te mettre de la crème. Que se passe-t-il d'abord ? Touche les images dans le bon ordre.", items: [
      { i: "💬", l: "On m'explique" }, { i: "🙋", l: "On me demande si je suis d'accord" }, { i: "🩹", l: "On me met la crème" }] },
    { type: "quiz", rounds: [
      { q: "Tu as compris. Mais tu préfères mettre la crème toi-même. Est-ce que tu peux le dire ?", fb: "Oui ! Tu peux dire : « Je préfère le faire moi-même. »", opts: [
        { i: "🙋", l: "Oui, je peux le dire", ok: true }, { i: "🙊", l: "Non, je dois me taire", fb: "Tu as le droit de dire ce que tu préfères. Choisis l'autre réponse." }] },
      { q: "Chez le docteur. Le docteur doit regarder là où tu as mal. Qu'est-ce qui t'aide à te sentir bien ?", fb: "Oui ! Un adulte de confiance est à côté de toi, et le docteur explique ce qu'il fait.", opts: [
        { i: "🩺", l: "On m'explique, et un adulte de confiance est à côté", ok: true }, { i: "😟", l: "Personne n'est avec moi et on ne me dit rien", fb: "Ça, ça met un nuage. Et l'autre réponse, qu'en penses-tu ?" }] },
      { q: "Pendant un soin, tu sens un nuage : ça te gêne. Que peux-tu faire ?", fb: "Tu peux dire : « Stop, ça me gêne, explique-moi. » Même à quelqu'un que tu aimes, même au docteur.", opts: [
        { i: "✋", l: "Dire : stop, ça me gêne", ok: true }, { i: "🤐", l: "Ne rien dire", fb: "Ce que tu ressens est important. Essaie encore !" }] },
      { q: "Quelqu'un veut t'aider à te laver. Mais tu sais le faire, et tu n'as pas envie. Que peux-tu dire ?", fb: "Non merci, je sais le faire !", opts: [
        { i: "💪", l: "Non merci, je le fais moi-même", ok: true }, { i: "😣", l: "Je laisse faire, même si je n'ai pas envie", fb: "Tu as le droit de dire non merci. Regarde l'autre réponse." }] },
      { q: "Alors, un soin, c'est toujours d'accord ?", fb: "Ça dépend ! Est-ce qu'on m'explique ? Est-ce qu'on m'écoute ? Est-ce que je me sens bien ? Si j'ai un nuage, j'en parle.", opts: [
        { i: "🤔", l: "Ça dépend : on m'explique, on m'écoute, je me sens bien", ok: true }, { i: "👍", l: "Oui, toujours", fb: "Pas toujours. Écoute bien ce que tu ressens. Choisis l'autre réponse." }] }] }],

  7: [{ type: "doit", btn: "J'ai compris !", steps: [
      { i: "<b class='bulle g'></b>", l: "Ma bulle", say: "Imagine une bulle magique tout autour de toi. C'est ta place à toi : la place qu'il te faut pour te sentir bien." },
      { i: "🤸", l: "Je tourne", say: "Tends tes bras et tourne sur toi-même : voilà ta bulle ! Personne n'y entre sans ton accord." },
      { i: "<b class='bulle g'></b>", l: "Grande bulle", say: "Quand tu veux être tranquille, ta bulle est grande : les autres restent un peu plus loin." },
      { i: "<b class='bulle p'></b>", l: "Petite bulle", say: "Quand tu as envie d'un câlin, ta bulle devient petite : on peut s'approcher tout près." }] },
    { type: "quiz", rounds: [
      { q: "Tu veux être tranquille. Ta bulle est comment ?", any: true, opts: [
        { i: "<b class='bulle g'></b>", l: "Grande", fb: "Une grande bulle : tu as besoin de place et d'être seul·e pour un moment." },
        { i: "<b class='bulle p'></b>", l: "Petite", fb: "Une petite bulle : tu es d'accord pour qu'on reste près de toi, mais tu ne veux pas être dérangé·e." }] },
      { q: "Tu as très envie d'un câlin avec quelqu'un que tu aimes. Ta bulle est comment ?", any: true, opts: [
        { i: "<b class='bulle g'></b>", l: "Grande", fb: "Une grande bulle, même pour un câlin : alors ce sera un câlin de loin, ou un bisou qui vole !" },
        { i: "<b class='bulle p'></b>", l: "Petite", fb: "Une petite bulle : tu as envie que l'on s'approche tout près." }] },
      { q: "Un·e ami·e veut jouer à la bagarre. Tu n'as pas envie. Ta bulle est comment ?", any: true, opts: [
        { i: "<b class='bulle g'></b>", l: "Grande", fb: "Une grande bulle. Tu peux dire : « Pas maintenant ! »" },
        { i: "<b class='bulle p'></b>", l: "Petite", fb: "Une petite bulle : ton ami·e peut rester près de toi, mais sans bagarre. Tu peux le lui dire." }] },
      { q: "Et là, maintenant, en vrai, ta bulle est comment ?", any: true, fb: "C'est toi qui sais ! Ta bulle change selon les moments.", opts: [
        { i: "<b class='bulle g'></b>", l: "Grande" }, { i: "<b class='bulle p'></b>", l: "Petite" }] }] }],

  8: [{ type: "quiz", rounds: [
      { q: "Quelqu'un que tu aimes beaucoup arrive ! Comment veux-tu lui dire bonjour ?", any: true, fb: "Super choix ! C'est toi qui choisis.", opts: [
        { i: "😘", l: "Un bisou" }, { i: "🤗", l: "Un câlin" }, { i: "🙌", l: "Un check" }, { i: "👋", l: "Un coucou" }, { i: "😙", l: "Un bisou qui vole" }] },
      { q: "Voici une personne que tu ne connais pas bien. Comment dis-tu bonjour ?", any: true, fb: "Très bien ! Toutes les façons de dire bonjour sont polies.", opts: [
        { i: "👋", l: "Un coucou" }, { i: "🙂", l: "Un sourire" }, { i: "🙌", l: "Un check" }, { i: "😙", l: "Un bisou qui vole" }] },
      { q: "Quelqu'un veut un bisou, mais tu n'as pas envie. Que peux-tu faire ?", fb: "Oui ! Il y a plein d'autres façons de dire bonjour. Personne ne peut t'obliger à faire un bisou.", opts: [
        { i: "😙", l: "Envoyer un bisou qui vole", ok: true }, { i: "👋", l: "Faire coucou de la main", ok: true }, { i: "🙂", l: "Faire un sourire", ok: true },
        { i: "😣", l: "Faire le bisou quand même", fb: "Personne ne peut t'obliger. Choisis une autre façon de dire bonjour !" }] },
      { q: "Et maintenant, à toi de jouer ! Choisis comment tu veux dire bonjour à l'adulte qui est avec toi.", any: true, fb: "Super choix ! C'est toi qui choisis.", opts: [
        { i: "😘", l: "Un bisou" }, { i: "🤗", l: "Un câlin" }, { i: "🙌", l: "Un check" }, { i: "👋", l: "Un coucou" }, { i: "😙", l: "Un bisou qui vole" }] }] },
    { type: "doit", btn: "On l'a fait !", steps: [{ i: "👋", l: "On se dit bonjour en vrai !", say: "Faites-le en vrai, tous les deux !" }] }],

  9: [{ type: "sort", q: "Cette personne veut te faire un câlin. Doit-elle d'abord s'assurer que tu es d'accord ?", q2: "Et cette personne ?", bins: [{ i: "👍", l: "Oui" }, { i: "👎", l: "Non" }], cards: [
      { i: "🏠", l: "Un adulte qui s'occupe de moi tous les jours", q: "Cette personne veut te faire un câlin. Doit-elle d'abord s'assurer que tu es d'accord ?", bin: 0, fb: "Oui. Même les adultes qui s'occupent de toi. Et tu peux dire non." },
      { i: "👪", l: "Quelqu'un de ma famille", q: "Cette personne veut te faire un bisou. Doit-elle d'abord s'assurer que tu es d'accord ?", bin: 0, fb: "Oui. Dans la famille aussi, un bisou, ça se demande." },
      { i: "😘", l: "Quelqu'un de ma famille", q: "Cette personne veut que ce soit toi qui lui fasses un bisou. Dois-tu le faire si tu n'as pas envie ?", bin: 1, fb: "Non. Personne ne peut t'obliger à faire un bisou, même dans la famille." },
      { i: "🧑‍🏫", l: "Un adulte de l'école", q: "Cette personne veut te prendre sur ses genoux. Doit-elle d'abord s'assurer que tu es d'accord ?", bin: 0, fb: "Oui. À l'école aussi, on te demande d'abord." },
      { i: "🚶", l: "Quelqu'un que je n'ai jamais vu", q: "Cette personne veut te toucher les cheveux. Doit-elle d'abord s'assurer que tu es d'accord ?", bin: 0, fb: "Oui. Et tu peux dire non, bien sûr." },
      { i: "🧒", l: "Un·e autre enfant", q: "Cette personne veut te faire des chatouilles. Doit-elle d'abord s'assurer que tu es d'accord ?", bin: 0, fb: "Oui. Les autres enfants aussi. Et toi aussi, tu demandes." },
      { i: "🪑", l: "Un adulte que je connais", q: "Cette personne veut que tu viennes sur ses genoux pour lui faire un câlin. Dois-tu le faire si tu n'as pas envie ?", bin: 1, fb: "Non. Tu as le droit de dire non, même à un adulte." }] },
    { type: "quiz", rounds: [
      { q: "Tu dis non à quelqu'un que tu aimes très fort. Doit-il/elle s'arrêter ?", fb: "Oui. Tu as le droit de dire non, même à quelqu'un que tu aimes.", opts: [
        { i: "🛑", l: "Oui, il/elle s'arrête", ok: true }, { i: "🤷", l: "Non, pas quand on s'aime", fb: "Si ! Même quand on s'aime, non c'est non. Et l'autre réponse, qu'en penses-tu ?" }] },
      { q: "Alors, les règles changent-elles selon la personne ?", fb: "Non ! C'est ton corps. On te demande avant de te toucher, et personne ne peut t'obliger à toucher quelqu'un.", opts: [
        { i: "🌍", l: "Non, les mêmes pour tout le monde", ok: true }, { i: "🔀", l: "Oui, ça dépend de la personne", fb: "Les règles sont les mêmes pour tout le monde. Essaie encore !" }] }] }],

  10: [{ type: "quiz", rounds: [
      { q: "Tu veux t'asseoir tout près de ton ami·e. Que peux-tu dire ?", fb: "Oui ! « Est-ce que je peux m'asseoir à côté de toi ? »", opts: [
        { i: "🙋", l: "« Je peux m'asseoir à côté de toi ? »", ok: true }, { i: "🫸", l: "Je pousse pour avoir la place", fb: "Aïe ! On demande d'abord. Regarde l'autre réponse." }] },
      { q: "Ton ami·e joue avec un jouet qui te fait envie. Que fais-tu ?", fb: "Tu demandes : « Tu me le prêtes ? » Et tu écoutes sa réponse.", opts: [
        { i: "🧸", l: "Je le prends dans ses mains", fb: "Il/elle joue avec ! On demande d'abord. Choisis l'autre réponse." }, { i: "🙋", l: "Je demande : « Tu me le prêtes ? »", ok: true }] },
      { q: "Tu veux faire un câlin à ton ami·e. Que fais-tu d'abord ?", fb: "Tu demandes : « Tu es d'accord ? »", opts: [
        { i: "🙋", l: "Je demande : « Tu es d'accord ? »", ok: true }, { i: "🤗", l: "Je fais le câlin tout de suite", fb: "Attends ! D'abord, on demande. Et l'autre réponse, qu'en penses-tu ?" }] },
      { q: "Regarde la tête de ton ami·e. Est-ce qu'il/elle a envie du câlin ?", pic: "😀", cap: "Ton ami·e sourit et ouvre les bras.", fb: "Oui, il/elle sourit et ouvre les bras !", opts: [
        { i: "👍", l: "Oui, il/elle a envie", ok: true }, { i: "👎", l: "Non, il/elle n'a pas envie", fb: "Regarde son sourire ! Essaie encore !" }] },
      { q: "Regarde bien maintenant. Est-ce qu'il/elle a envie du câlin ?", pic: "😠", cap: "Ton ami·e recule et fronce les sourcils.", fb: "Non. Son corps dit non, alors on ne fait pas de câlin.", opts: [
        { i: "👍", l: "Oui, il/elle a envie", fb: "Regarde bien : il/elle recule. Regarde l'autre réponse." }, { i: "👎", l: "Non, il/elle n'a pas envie", ok: true }] },
      { q: "Et là ? Que fais-tu ?", pic: "🫣", cap: "Ton ami·e ne dit rien et se cache.", fb: "Oui ! Quand on ne sait pas, on demande, et on attend.", opts: [
        { i: "🙋", l: "J'attends et je demande", ok: true }, { i: "🤗", l: "Je fais le câlin", fb: "Il/elle n'a pas dit oui. Choisis l'autre réponse." }] }] }],
  11: [{ type: "quiz", rounds: [
      { q: "Tu ris aux chatouilles. Puis tu en as assez et tu dis : « Stop ! » Que fait ton ami·e ?", fb: "Il/elle arrête tout de suite. Bravo !", opts: [
        { i: "🛑", l: "Il/elle arrête tout de suite", ok: true }, { i: "😆", l: "Il/elle continue, c'est rigolo", fb: "Tu as dit stop ! Et l'autre réponse, qu'en penses-tu ?" }] },
      { q: "Tu as dit oui pour jouer. Maintenant tu n'as plus envie. As-tu le droit de changer d'avis ?", fb: "Oui ! Oui tout à l'heure, non maintenant, c'est permis.", opts: [
        { i: "👍", l: "Oui, j'ai le droit", ok: true }, { i: "👎", l: "Non, trop tard", fb: "Si, tu peux changer d'avis ! Essaie encore !" }] },
      { q: "Hier, ton ami·e voulait bien être pris·e en photo. Aujourd'hui, il/elle dit non. Que fais-tu ?", fb: "Tu respectes son non. Oui hier, non aujourd'hui, c'est permis.", opts: [
        { i: "🙂", l: "Je range l'appareil", ok: true }, { i: "📷", l: "Je prends la photo quand même", fb: "Il/elle a dit non aujourd'hui. Regarde l'autre réponse." }] },
      { q: "Ton ami·e te dit : « Stop, je ne veux plus jouer. » Que fais-tu ?", fb: "Tu arrêtes. Tu es un·e champion·ne du respect !", opts: [
        { i: "🛑", l: "J'arrête", ok: true }, { i: "🙉", l: "Je fais comme si je n'entendais pas", fb: "Il/elle a dit stop. Choisis l'autre réponse." }] }] }],

  12: [{ type: "doit", btn: "C'est fait !", steps: [
      { i: "🧍", l: "Debout !", say: "Mets-toi debout, les pieds bien plantés dans le sol." },
      { i: "👀", l: "Bien droit", say: "Tiens-toi bien droit et regarde devant toi." },
      { i: "✋", l: "Main levée", say: "Lève ta main devant toi, comme un bouclier." },
      { i: "📣", l: "« Arrête ! J'aime pas ça ! »", say: "Maintenant, dis avec ta grosse voix :" },
      { i: "🦁", l: "« Non ! Je veux pas ! »", say: "Encore plus fort, comme un lion :" }] }],
  13: [{ type: "memory", q: "Retourne les cartes et retrouve les deux visages qui ressentent la même chose.", pairs: [
      { i: "😀", l: "La joie" }, { i: "😠", l: "La colère" }, { i: "😨", l: "La peur" }, { i: "😢", l: "La tristesse" }] },
    { type: "quiz", rounds: [{ q: "Qui a le droit de pleurer, d'avoir peur ou d'être en colère ?", fb: "Tout le monde ! Les filles, les garçons, et les grandes personnes aussi.", opts: [
      { i: "🌈", l: "Tout le monde", ok: true }, { i: "👶", l: "Seulement les bébés", fb: "Les grands aussi ont des émotions ! Et l'autre réponse, qu'en penses-tu ?" }] }] }],

  14: [{ type: "multi", rounds: [
      { q: "Quand tu as peur, que fait ton corps ? Touche tout ce que tu reconnais.", fb: "Chaque corps a sa façon de dire : j'ai peur.", items: [
        { i: "💓", l: "Mon cœur bat vite" }, { i: "🌀", l: "Mon ventre se serre" }, { i: "🫣", l: "J'ai envie de me cacher" }, { i: "🥶", l: "Je tremble" }] },
      { q: "Et quand tu es en colère ?", fb: "La colère, ça se sent fort dans le corps. Tout le monde a le droit d'être en colère.", items: [
        { i: "✊", l: "Je serre les poings" }, { i: "🥵", l: "J'ai chaud, je deviens rouge" }, { i: "📣", l: "J'ai envie de crier" }, { i: "🦶", l: "Je tape des pieds" }] },
      { q: "Et quand tu es triste ?", fb: "La tristesse aussi parle dans le corps. On a le droit de pleurer.", items: [
        { i: "😢", l: "Mes yeux pleurent" }, { i: "🪨", l: "Ma gorge se serre" }, { i: "🛌", l: "J'ai envie de me mettre en boule" }, { i: "🤗", l: "J'ai envie d'un câlin" }] },
      { q: "Et quand tu es dans la joie ?", fb: "Ton corps te parle tout le temps. Bravo de l'écouter !", items: [
        { i: "😀", l: "Je souris" }, { i: "🤸", l: "Je saute partout" }, { i: "🎶", l: "J'ai envie de chanter" }, { i: "🎈", l: "Mon corps est tout léger" }] }] }],

  15: [{ type: "sort", q: "Est-ce que ça met du soleil ou un nuage dans ton cœur ?", q2: "Et là : soleil ou nuage ?", bins: [{ i: "☀️", l: "Soleil" }, { i: "☁️", l: "Nuage" }], cards: [
      { i: "🤗", l: "Un câlin, et j'en ai très envie", bin: 0, fb: "Soleil !" },
      { i: "🙅", l: "Le même câlin, mais là je n'ai pas envie", bin: 1, fb: "Nuage. Le même geste, mais pas la même envie." },
      { i: "😂", l: "Des chatouilles, et on rit tous les deux", bin: 0, fb: "Soleil !" },
      { i: "😖", l: "Les mêmes chatouilles, mais j'ai dit stop et ça continue", bin: 1, fb: "Nuage. Stop, ça veut dire stop." },
      { i: "🫂", l: "Je fais un câlin à quelqu'un, parce que j'en ai envie", bin: 0, fb: "Soleil !" },
      { i: "😣", l: "On me demande de faire un câlin à quelqu'un, et je n'ai pas envie", bin: 1, fb: "Nuage. Personne ne peut m'obliger." }] },
    { type: "quiz", rounds: [
      { q: "Le même geste peut mettre du soleil un jour, et un nuage un autre jour. Qui sait ce que tu ressens ?", fb: "Toi ! C'est toi qui sais ce que tu ressens.", opts: [
        { i: "🙋", l: "Moi", ok: true }, { i: "👥", l: "Les autres", fb: "C'est toi qui le sens dans ton corps. Essaie encore !" }] },
      { q: "Et quand tu sens un nuage, que peux-tu faire ?", fb: "Oui ! Tu peux le dire, et en parler.", opts: [
        { i: "✋", l: "Je dis non et j'en parle", ok: true }, { i: "🤐", l: "Je ne dis rien", fb: "Tu peux le dire ! Regarde l'autre réponse." }] }] }],

  16: [{ type: "taps", q: "Il y a quatre règles d'or, que tout le monde doit respecter : c'est la loi, et elle protège tous les enfants. Si quelqu'un ne les respecte pas, une alarme se déclenche dans ton corps et fait : « Oh oh ! » Découvrons ensemble ces règles : touche chaque image.", items: [
      { i: "🖐️", say: "Personne ne touche mes parties intimes." }, { i: "👀", say: "Personne ne regarde mes parties intimes." },
      { i: "👄", say: "Personne ne met sa bouche sur mes parties intimes." }, { i: "📷", say: "Personne ne prend mes parties intimes en photo." }] },
    { type: "quiz", rounds: [
      { q: "Quelqu'un dit : « C'est juste un jeu ! » Est-ce que la règle change ?", fb: "Non. Même si c'est un jeu, la règle reste la même.", opts: [
        { i: "🛑", l: "Non, la règle reste la même", ok: true }, { i: "🎲", l: "Oui, si c'est un jeu", fb: "Oh oh ! L'alarme sonne. Choisis l'autre réponse." }] },
      { q: "Quelqu'un te demande de toucher ou de regarder ses parties intimes, ou te montre des images de parties intimes. Que dit la règle ?", fb: "C'est non aussi. Tu as le droit de refuser, même si on insiste, même si c'est quelqu'un que tu aimes.", opts: [
        { i: "🛑", l: "C'est non aussi", ok: true }, { i: "🤷", l: "Là, c'est permis", fb: "Oh oh ! L'alarme sonne. Et l'autre réponse, qu'en penses-tu ?" }] },
      { q: "Et toi, peux-tu toucher les parties intimes d'un·e autre enfant ?", fb: "Non. La règle est la même pour tout le monde, pour toi aussi.", opts: [
        { i: "🛑", l: "Non, la règle est la même pour moi", ok: true }, { i: "🤷", l: "Oui, si c'est pour rire", fb: "Même pour rire, c'est non. Essaie encore !" }] },
      { q: "Et si c'est quelqu'un que tu aimes beaucoup ?", fb: "La règle reste la même, pour tout le monde.", opts: [
        { i: "🛑", l: "La règle reste la même", ok: true }, { i: "🤷", l: "Alors c'est permis", fb: "Oh oh ! L'alarme sonne. Regarde l'autre réponse." }] },
      { q: "Et pour un soin, quand on t'aide à te laver ou chez le docteur ?", fb: "Un soin, ce n'est pas un jeu : on t'explique pourquoi, et tu peux toujours dire si ça te gêne.", opts: [
        { i: "💬", l: "On m'explique, et je peux dire si ça me gêne", ok: true }, { i: "🎲", l: "C'est comme un jeu", fb: "Non, un soin s'explique. Choisis l'autre réponse." }] },
      { q: "Ton alarme fait : « Oh oh, il y a quelque chose de bizarre. » Que fais-tu ?", fb: "Oui ! Tu en parles à un adulte de confiance.", opts: [
        { i: "🗣️", l: "J'en parle à un adulte de confiance", ok: true }, { i: "🤐", l: "Je garde ça pour moi", fb: "Tu peux en parler. Et l'autre réponse, qu'en penses-tu ?" }] }] }],

  17: [{ type: "find", build: parcScene, prompts: [
      { q: "Regarde bien le parc. Quelqu'un est triste et a une larme. Trouve ce personnage.", id: "triste", fb: "Oui. On pourrait lui demander : « Ça va ? »" },
      { q: "Trouve le personnage qui veut être tranquille dans sa bulle.", id: "bulle", fb: "Oui ! On respecte sa bulle." },
      { q: "Trouve le personnage qui dit « Stop ! » avec son panneau.", id: "stop", fb: "Oui ! Quand quelqu'un dit stop, on s'arrête." },
      { q: "Trouve le personnage qui envoie des bisous qui volent.", id: "bisou", fb: "Bravo ! Une jolie façon de dire bonjour." },
      { q: "Trouve les deux ami·es qui se font un câlin, parce qu'ils/elles en ont envie tous les deux.", id: "calin", fb: "Oui ! Un câlin voulu par les deux, ça met du soleil." },
      { q: "Et qui se cache derrière un sapin ?", id: "cache", fb: "Bien vu ! Quel œil de lynx." }] }],

  18: [{ type: "breathe", cycles: 3 }],

  19: [{ type: "order", q: "Quelque chose ne va pas. Que fais-tu ? Touche les images dans le bon ordre.", items: [
      { i: "✋", l: "Je dis non" }, { i: "🏃", l: "Je m'en vais" }, { i: "🗣️", l: "J'en parle à un adulte de confiance" }] },
    { type: "quiz", rounds: [{ q: "Et si je n'ai pas réussi à dire non, ou à partir ?", fb: "Ce n'est jamais ta faute. Te protéger, c'est le travail des adultes. Toi, tu peux les aider en parlant aux adultes en qui tu as confiance.", opts: [
      { i: "💛", l: "Ce n'est pas ma faute, et j'en parle", ok: true }, { i: "😔", l: "C'est ma faute", fb: "Non, ce n'est jamais la faute de l'enfant. Essaie encore !" }] }] }],

  20: [{ type: "doit", btn: "J'ai compris !", steps: [
      { i: "☀️", l: "Le secret soleil", say: "Un secret soleil, c'est une surprise. Il rend joyeux, et bientôt tout le monde le saura. Comme un cadeau bien caché !" },
      { i: "☁️", l: "Le secret nuage", say: "Un secret nuage, c'est un secret qui pèse. Il rend triste, il fait peur ou il serre le ventre, et on te demande de ne jamais le dire." },
      { i: "🗣️", l: "Un secret nuage, je le raconte", say: "Un secret soleil, tu peux le garder un petit moment. Un secret nuage, tu le racontes à un adulte de confiance." }] },
    { type: "sort", q: "À ton tour ! Est-ce un secret soleil, ou un secret nuage ?", q2: "Et celui-ci : soleil ou nuage ?", bins: [{ i: "☀️", l: "Soleil : je garde la surprise" }, { i: "☁️", l: "Nuage : je le raconte" }], cards: [
      { i: "🎁", l: "Un cadeau surprise pour Noël", bin: 0, fb: "Soleil ! Une surprise, on la garde un petit moment." },
      { i: "😟", l: "Un secret qui me rend triste", bin: 1, fb: "Nuage. Ce secret-là, je le raconte." },
      { i: "🎂", l: "Un gâteau d'anniversaire caché", bin: 0, fb: "Soleil ! Bientôt, tout le monde le saura." },
      { i: "😨", l: "Un secret qui me fait peur", bin: 1, fb: "Nuage. Ce secret-là, je le raconte." },
      { i: "🤫", l: "Quelqu'un me dit : « Ne le dis à personne, sinon gare à toi ! »", bin: 1, fb: "Nuage. Quand on me fait peur pour que je me taise, je le raconte." },
      { i: "💝", l: "Un adulte me dit : « C'est notre secret pour toujours, parce que je t'aime très fort »", bin: 1, fb: "Nuage. Même dit gentiment, un secret qu'on ne doit jamais raconter, je le raconte." }] },
    { type: "quiz", rounds: [{ q: "Quelqu'un ne respecte pas mon corps, et me dit que c'est un secret. Qu'est-ce que je fais ?", fb: "Oui ! Tu as le droit de désobéir et de le dire.", opts: [
      { i: "🗣️", l: "Je le raconte à un adulte de confiance", ok: true }, { i: "🤐", l: "Je garde le secret", fb: "Un secret nuage, on le raconte. Regarde l'autre réponse." }] },
      { q: "Comment reconnaître un secret soleil ?", fb: "Oui ! Il rend joyeux, et bientôt tout le monde le saura.", opts: [
        { i: "🎉", l: "Il me rend joyeux, et bientôt tout le monde le saura", ok: true }, { i: "😟", l: "Il me serre le ventre, et il ne doit jamais se savoir", fb: "Ça, c'est un secret nuage. Choisis l'autre réponse." }] },
      { q: "J'ai promis de ne rien dire, mais ce secret me serre le ventre. Que faire ?", fb: "Oui ! Même si j'ai promis, un secret nuage, je le raconte.", opts: [
        { i: "🗣️", l: "J'en parle quand même à un adulte de confiance", ok: true }, { i: "🤐", l: "Je me tais, puisque j'ai promis", fb: "Même promis, un secret nuage se raconte. Et l'autre réponse, qu'en penses-tu ?" }] },
      { q: "Je ne sais pas si mon secret est soleil ou nuage. Que faire ?", fb: "Quand je ne sais pas, j'en parle à un adulte de confiance.", opts: [
        { i: "🗣️", l: "J'en parle à un adulte de confiance", ok: true }, { i: "🤐", l: "Je le garde pour moi", fb: "Quand on doute, on en parle. Essaie encore !" }] }] }],

  21: [{ type: "doit", btn: "J'ai dit un prénom !", hand: true, steps: [
      { i: "👍", l: "Le pouce", say: "Lève ton pouce. Dis le nom d'un adulte qui s'occupe de toi et avec qui tu te sens bien." },
      { i: "☝️", l: "Le deuxième doigt", say: "Dis le nom d'un autre adulte que tu aimes et qui te fait sourire." },
      { i: "✌️", l: "Le troisième doigt", say: "Dis le nom d'un adulte de l'école ou de la crèche avec qui tu te sens bien." },
      { i: "🤟", l: "Le quatrième doigt", say: "Dis le nom d'un autre adulte qui t'aide quand tu as un souci." },
      { i: "🖐️", l: "Le petit doigt", say: "Encore un adulte avec qui tu te sens toujours bien." }] },
    { type: "quiz", rounds: [{ q: "Un adulte de confiance, c'est quelqu'un...", fb: "Oui ! Et cette personne respecte ta bulle. Ces adultes sont là pour te protéger.", opts: [
      { i: "😊", l: "avec qui je me sens bien et qui m'aide", ok: true }, { i: "😬", l: "qui me fait un peu peur", fb: "Non, avec un adulte de confiance, on se sent bien. Regarde l'autre réponse." }] },
      { q: "Et si un adulte de ma main ne respecte pas les règles ?", fb: "Oui ! Tu en parles à un autre adulte de ta main. C'est pour ça qu'elle a cinq doigts.", opts: [
        { i: "🗣️", l: "J'en parle à un autre adulte de ma main", ok: true }, { i: "🤐", l: "Je ne dis rien, puisque c'est un adulte de ma main", fb: "Même un adulte de ta main doit respecter les règles. Regarde l'autre réponse." }] }] }],

  22: [{ type: "quiz", path: true, rounds: [
      { q: "Tu as un souci. Tu vas voir un adulte de confiance. Mais l'adulte est occupé et n'écoute pas. Que fais-tu ?", fb: "Oui ! Tu vas voir un autre adulte.", opts: [
        { i: "🚶", l: "Je vais voir un autre adulte", ok: true }, { i: "😶", l: "Je garde mon souci pour moi", fb: "Ton souci est important. Choisis l'autre réponse." }] },
      { q: "Le deuxième adulte dit : « Plus tard, plus tard. » Que fais-tu ?", fb: "Tu continues ! Quand c'est important, on n'abandonne pas.", opts: [
        { i: "😞", l: "J'abandonne", fb: "Non, tu continues jusqu'à ce qu'on t'écoute. Et l'autre réponse, qu'en penses-tu ?" }, { i: "💪", l: "Je vais voir encore un autre adulte", ok: true }] },
      { q: "Tu n'oses pas encore en parler à un adulte. À qui d'autre peux-tu le dire ?", fb: "Oui ! Un·e ami·e en qui tu as confiance peut t'aider à en parler à un adulte.", opts: [
        { i: "🧑‍🤝‍🧑", l: "À un·e ami·e en qui j'ai confiance", ok: true }, { i: "🤐", l: "À personne", fb: "Tu n'as pas à rester sans aide. Essaie encore !" }] },
      { q: "Le troisième adulte t'écoute et dit : « Je te crois, je vais t'aider. » Comment te sens-tu ?", any: true, fb: "C'est normal. L'important, c'est qu'on t'a écouté·e. Ce n'est pas à toi de régler ton souci sans aide : les adultes doivent t'aider.", opts: [
        { i: "😌", l: "Soulagé·e", fb: "Ouf ! Être écouté·e, ça fait du bien. Tu as bien fait d'en parler : maintenant, c'est aux adultes de t'aider." },
        { i: "😢", l: "Encore un peu triste", fb: "C'est normal d'être encore triste. Tu as bien fait d'en parler : ce n'est pas à toi de régler ton souci sans aide, c'est aux adultes de t'aider." },
        { i: "😴", l: "Fatigué·e", fb: "C'est normal : chercher de l'aide, ça demande beaucoup d'énergie. Tu as persévéré, et maintenant c'est aux adultes de t'aider." }, { i: "💭", l: "Autre chose", fb: "Tu peux le dire avec tes mots. L'important, c'est qu'on t'a écouté·e : les adultes doivent t'aider." }] }] }],

  23: [{ type: "quiz", rounds: [
      { q: "Le grand quiz des super-pouvoirs ! À qui est ton corps ?", fb: "À toi ! C'est ton corps. C'est toi qui décides.", opts: [{ i: "🙋", l: "À moi", ok: true }, { i: "👥", l: "Aux autres", fb: "Non, il est à toi ! Regarde l'autre réponse." }] },
      { q: "Quand fais-tu un bisou ?", fb: "Oui ! Seulement quand tu en as envie.", opts: [{ i: "😣", l: "Chaque fois qu'on me le demande", fb: "Seulement si tu en as envie. Choisis l'autre réponse." }, { i: "😊", l: "Seulement quand j'en ai envie", ok: true }] },
      { q: "Un geste met un nuage dans ton cœur. Que fais-tu ?", fb: "Tu dis non, tu t'en vas, tu en parles.", opts: [{ i: "✋", l: "Je dis non et j'en parle", ok: true }, { i: "🤐", l: "Je ne dis rien", fb: "Tu as le droit de le dire. Regarde l'autre réponse." }] },
      { q: "Un secret qui fait peur, c'est un secret nuage. Qu'en fais-tu ?", fb: "Tu le racontes !", opts: [{ i: "🤐", l: "Je le garde", fb: "Un secret nuage, on le raconte. Choisis l'autre réponse." }, { i: "🗣️", l: "Je le raconte", ok: true }] },
      { q: "Si quelqu'un fait du mal à un enfant, est-ce la faute de l'enfant ?", fb: "Jamais. Ce n'est jamais la faute de l'enfant.", opts: [{ i: "💛", l: "Non, jamais", ok: true }, { i: "😔", l: "Oui", fb: "Non, jamais ! Regarde l'autre réponse." }] },
      { q: "Les enfants ont-ils le droit d'être protégés ?", fb: "Oui ! Tous les enfants du monde ont ce droit.", opts: [{ i: "🛡️", l: "Oui, tous les enfants", ok: true }, { i: "🤷", l: "Seulement certains", fb: "Tous les enfants ! Choisis l'autre réponse." }] },
      { q: "Quelqu'un te demande de le toucher, et tu n'as pas envie. As-tu le droit de dire non ?", fb: "Oui, toujours. Personne ne peut t'obliger à toucher quelqu'un.", opts: [{ i: "👍", l: "Oui, toujours", ok: true }, { i: "😔", l: "Non, il faut obéir", fb: "Tu as le droit de dire non. Et l'autre réponse, qu'en penses-tu ?" }] },
      { q: "Et qui doit protéger les enfants ?", fb: "Les adultes ! C'est leur rôle. Toi, tu peux les aider en parlant aux adultes en qui tu as confiance.", opts: [{ i: "🧑‍🤝‍🧑", l: "Les adultes", ok: true }, { i: "🧒", l: "Les enfants, sans aide", fb: "Non, ce n'est pas à toi de te débrouiller. Essaie encore !" }] }] }],

  24: [{ type: "diploma" }]
};

// Petit rappel de la veille : une seule question, que l'on peut passer.
const RECALL = {
  2: { q: "Avec quoi marches-tu ?", fb: "Oui, avec tes pieds ! Tu connais ton corps.", opts: [{ i: "🦶", l: "Avec mes pieds", ok: true }, { i: "👂", l: "Avec mes oreilles" }] },
  3: { q: "Où sont les parties intimes ?", fb: "Oui ! Sous la culotte ou le slip.", opts: [{ i: "🎩", l: "Sous le chapeau" }, { i: "🩲", l: "Sous la culotte ou le slip", ok: true }] },
  4: { q: "Ton corps, c'est ton...", fb: "Oui, ton trésor ! Tu en prends soin.", opts: [{ i: "💎", l: "Trésor", ok: true }, { i: "🧦", l: "Chaussette" }] },
  5: { q: "Avant d'entrer dans la salle de bain, que fais-tu ?", fb: "Toc toc ! Tu frappes d'abord.", opts: [{ i: "🏃", l: "J'entre en courant" }, { i: "✊", l: "Je frappe", ok: true }] },
  6: { q: "Tous les corps sont...", fb: "Oui, tous différents, et c'est très bien.", opts: [{ i: "🌈", l: "Différents", ok: true }, { i: "👯", l: "Pareils" }] },
  7: { q: "Avant un soin, que doit faire l'adulte ?", fb: "Oui ! Un soin, ça s'explique.", opts: [{ i: "🤐", l: "Ne rien dire" }, { i: "💬", l: "M'expliquer et me demander", ok: true }] },
  8: { q: "Qui décide de la taille de ta bulle ?", fb: "C'est toi qui sais !", opts: [{ i: "🙋", l: "Moi", ok: true }, { i: "👥", l: "Les autres" }] },
  9: { q: "Si tu n'as pas envie d'un bisou, que peux-tu faire ?", fb: "Oui ! Un coucou, un sourire, un bisou qui vole...", opts: [{ i: "😣", l: "Le faire quand même" }, { i: "👋", l: "Dire bonjour autrement", ok: true }] },
  10: { q: "Même avec quelqu'un que tu connais très bien, peux-tu dire non à un câlin ?", fb: "Oui, toujours.", opts: [{ i: "👍", l: "Oui", ok: true }, { i: "👎", l: "Non" }] },
  11: { q: "Avant de faire un câlin à ton ami·e, que fais-tu ?", fb: "Oui ! Tu demandes d'abord.", opts: [{ i: "🤗", l: "Je fonce" }, { i: "🙋", l: "Je demande", ok: true }] },
  12: { q: "As-tu le droit de changer d'avis ?", fb: "Oui ! Oui tout à l'heure, non maintenant, c'est permis.", opts: [{ i: "👍", l: "Oui", ok: true }, { i: "👎", l: "Non" }] },
  13: { q: "Pour dire non, comment te tiens-tu ?", fb: "Oui ! Bien droit·e, et avec ta grosse voix.", opts: [{ i: "🐌", l: "En boule, comme un escargot" }, { i: "🧍", l: "Bien droit·e, comme un arbre", ok: true }] },
  14: { q: "Quand tu souris et que tu sautes partout, c'est...", fb: "La joie !", opts: [{ i: "😀", l: "La joie", ok: true }, { i: "😢", l: "La tristesse" }] },
  15: { q: "Qui t'envoie des messages quand tu ressens une émotion ?", fb: "Ton corps ! Écoute-le bien.", opts: [{ i: "👟", l: "Mes chaussures" }, { i: "💓", l: "Mon corps", ok: true }] },
  16: { q: "Un câlin dont tu n'as pas envie, ça met...", fb: "Un nuage. Ton non compte.", opts: [{ i: "☁️", l: "Un nuage", ok: true }, { i: "☀️", l: "Du soleil" }] },
  17: { q: "Si ton alarme fait « Oh oh ! », que fais-tu ?", fb: "Oui ! Tu en parles à un adulte de confiance.", opts: [{ i: "🤐", l: "Je ne dis rien" }, { i: "🗣️", l: "J'en parle", ok: true }] },
  18: { q: "Quelqu'un veut être tranquille dans sa bulle. Que fais-tu ?", fb: "Oui, tu respectes sa bulle.", opts: [{ i: "🙂", l: "Je lui laisse de la place", ok: true }, { i: "🤪", l: "Je le chatouille" }] },
  19: { q: "Pour retrouver ton calme, que peux-tu faire ?", fb: "Oui ! Tu sens, puis tu souffles.", opts: [{ i: "😤", l: "Se rouler par terre et taper du poing" }, { i: "🌸", l: "Sentir la fleur et souffler", ok: true }] },
  20: { q: "Quand quelque chose ne va pas, tu dis non, tu t'en vas, et ensuite ?", fb: "Oui ! Tu en parles à un adulte de confiance.", opts: [{ i: "🗣️", l: "J'en parle", ok: true }, { i: "🙈", l: "Je me cache" }] },
  21: { q: "Un secret qui serre le ventre, qu'en fais-tu ?", fb: "Oui ! Un secret nuage, on le raconte.", opts: [{ i: "🤐", l: "Je le garde" }, { i: "🗣️", l: "Je le raconte", ok: true }] },
  22: { q: "À quoi sert ta main de confiance ?", fb: "Oui ! À savoir à qui parler quand quelque chose ne va pas.", opts: [{ i: "🗣️", l: "À savoir à qui parler", ok: true }, { i: "🧤", l: "À mettre des gants" }] },
  23: { q: "Si un adulte ne t'écoute pas, que fais-tu ?", fb: "Oui ! Tu continues jusqu'à ce qu'on t'écoute.", opts: [{ i: "😞", l: "J'abandonne" }, { i: "🚶", l: "J'en parle à un autre", ok: true }] },
  24: { q: "À qui est ton corps ?", fb: "À toi ! C'est ton corps, c'est toi qui décides.", opts: [{ i: "🙋", l: "À moi", ok: true }, { i: "👥", l: "Aux autres" }] },
};

// ---------- Moteurs ----------
const Jeux = (function () {
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (tag === "button") e.type = "button"; return e; };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const shake = (b) => { b.classList.remove("no"); void b.offsetWidth; b.classList.add("no"); };
  // Cercles de progression. Avec « go », les questions déjà vues (en vert) sont des boutons : on peut y revenir,
  // puis reprendre là où l'on s'était arrêté (max = la question la plus avancée atteinte).
  const dots = (i, n, max, go) => {
    const far = Math.max(i, max || 0);
    const d = el("div", "dots", Array.from({ length: n }, (_, k) => {
      const cls = k === i ? "cur" : k < far ? "on" : k === far ? "next" : "";
      return go && k !== i && k <= far ? `<button type="button" class="${cls}" data-k="${k}" aria-label="${k < far ? "Revoir la question " + (k + 1) : "Reprendre à la question " + (k + 1)}"></button>` : `<i class="${cls}"></i>`;
    }).join(""));
    if (go) d.addEventListener("click", (e) => { const b = e.target.closest("button[data-k]"); if (b) go(+b.dataset.k); });
    else d.setAttribute("aria-hidden", "true");
    return d;
  };
  const opt = (o) => el("button", "opt", `<span class="pic" aria-hidden="true">${o.i}</span><span>${o.l}</span>`);

  const T = {};

  // Place de la bonne réponse : tirée au sort à chaque affichage, sans jamais rester plus de deux fois de suite du même côté.
  // Ne concerne que les questions à deux réponses dont une seule est juste ; les autres listes gardent leur ordre.
  const sides = [];
  const mix = (opts) => {
    if (opts.length !== 2 || opts.filter((o) => o.ok).length !== 1) return opts;
    let left = Math.random() < 0.5;
    const n = sides.length;
    if (n >= 2 && sides[n - 1] === sides[n - 2]) left = !sides[n - 1];
    sides.push(left);
    const good = opts.find((o) => o.ok), other = opts.find((o) => !o.ok);
    return left ? [good, other] : [other, good];
  };

  T.quiz = (st, m, ctx, next) => {
    let r = 0, max = 0, tok = 0;
    (function show() {
      if (r >= st.rounds.length) return next();
      const R = st.rounds[r]; let lock = false; const my = ++tok; max = Math.max(max, r);
      m.innerHTML = ""; if (st.rounds.length > 1) m.append(dots(r, st.rounds.length, max, (k) => { r = k; show(); }));
      if (R.pic) m.append(el("div", "bigcard", `<span class="pic" aria-hidden="true">${R.pic}</span><span>${R.cap || ""}</span>`));
      const box = el("div", "opts"); ctx.say(R.q);
      (R.any ? R.opts : mix(R.opts)).forEach((o) => { const b = opt(o); box.append(b); b.onclick = () => {
        if (lock) return;
        if (R.any || o.ok) { lock = true; b.classList.add("ok"); const fb = o.fb || R.fb || "Bravo !"; ctx.say(fb); ctx.later(() => { if (my !== tok) return; r++; show(); }, ctx.pause(fb)); }
        else { shake(b); ctx.say(o.fb || "Essaie encore !"); }
      }; });
      m.append(box);
    })();
  };

  // Une question de rappel, légère : un bouton permet de passer directement au jeu du jour.
  T.recall = (st, m, ctx, next) => {
    m.innerHTML = ""; let lock = false;
    // L'étiquette se place au-dessus de la bulle qui pose la question, puis disparaît avec le rappel.
    const tag = el("div", "recall-tag", "Petit rappel d'hier");
    // La mention et la bulle forment une colonne à côté du personnage, pour rester proches l'une de l'autre.
    const bubble = m.parentNode && m.parentNode.querySelector(".say .bubble");
    const col = el("div", "say-col");
    if (bubble) { bubble.before(col); col.append(tag, bubble); } else m.append(tag);
    // La vignette du pouvoir concerne le jeu du jour : on la masque pendant le rappel.
    const power = m.parentNode && m.parentNode.querySelector(".power");
    if (power) power.style.display = "none";
    // Les onglets « Le jeu / Fiche adulte » concernent eux aussi le jeu du jour.
    const tabs = document.getElementById("dlgTabs");
    if (tabs) tabs.hidden = true;
    const end = () => { m.classList.remove("compact"); if (bubble && col.parentNode) col.replaceWith(bubble); tag.remove(); if (power) power.style.display = ""; if (tabs) tabs.hidden = false; next(); };
    const box = el("div", "opts"); ctx.say("Tu te souviens ? " + st.q);
    mix(st.opts).forEach((o) => { const b = opt(o); box.append(b); b.onclick = () => {
      if (lock) return;
      if (o.ok) { lock = true; b.classList.add("ok"); ctx.say(st.fb); ctx.later(end, ctx.pause(st.fb)); }
      else { shake(b); ctx.say("Presque ! Essaie encore."); }
    }; });
    const skip = el("button", "ghost blue", "Passer directement au jeu du jour"); skip.onclick = () => { if (!lock) { lock = true; end(); } };
    const row = el("div", "center"); row.append(skip); m.append(box); if (!st.noSkip) m.append(row); else m.classList.add("compact"); // le jour du diplôme, le rappel ne se passe pas
  };

  // Plusieurs réponses possibles, toutes justes : l'enfant touche ce qu'il reconnaît, puis valide.
  T.multi = (st, m, ctx, next) => {
    let r = 0, max = 0, tok = 0;
    (function show() {
      if (r >= st.rounds.length) return next();
      const R = st.rounds[r]; let lock = false; const my = ++tok; max = Math.max(max, r);
      m.innerHTML = ""; m.append(dots(r, st.rounds.length, max, (k) => { r = k; show(); }));
      const box = el("div", "opts"); ctx.say(R.q);
      R.items.forEach((o) => { const b = opt(o); b.setAttribute("aria-pressed", "false"); box.append(b); b.onclick = () => { if (lock) return; const on = b.classList.toggle("ok"); b.setAttribute("aria-pressed", on); }; });
      const go = el("button", "cta", "C'est choisi !"); const row = el("div", "center"); row.append(go);
      go.onclick = () => { if (lock) return; lock = true; ctx.say(R.fb); ctx.later(() => { if (my !== tok) return; r++; show(); }, ctx.pause(R.fb)); };
      m.append(box, row);
    })();
  };

  T.sort = (st, m, ctx, next) => {
    let c = 0, max = 0, tok = 0;
    (function show() {
      if (c >= st.cards.length) return next();
      const C = st.cards[c]; let lock = false; const my = ++tok; max = Math.max(max, c);
      m.innerHTML = ""; m.append(dots(c, st.cards.length, max, (k) => { c = k; show(); }));
      m.append(el("div", "bigcard", `<span class="pic" aria-hidden="true">${C.i}</span><span>${C.l}</span>`));
      const box = el("div", "opts bins"); ctx.say(C.q || (c === 0 ? st.q : (st.q2 || "Et pour cette carte ?"))); // consigne complète une seule fois
      st.bins.forEach((bn, k) => { const b = opt(bn); box.append(b); b.onclick = () => {
        if (lock) return;
        if (k === C.bin) { lock = true; b.classList.add("ok"); const fb = C.fb || "Oui, bravo !"; ctx.say(fb); ctx.later(() => { if (my !== tok) return; c++; show(); }, ctx.pause(fb)); }
        else { shake(b); ctx.say("Regarde bien, essaie encore !"); }
      }; });
      m.append(box);
    })();
  };

  T.order = (st, m, ctx, next) => {
    let items = shuffle(st.items.map((it, k) => ({ ...it, k })));
    if (items.every((it, i) => it.k === i)) items.reverse();
    let pos = 0; m.innerHTML = ""; ctx.say(st.q);
    const box = el("div", "opts");
    items.forEach((it) => { const b = el("button", "opt", `<span class="rank"></span><span class="pic" aria-hidden="true">${it.i}</span><span>${it.l}</span>`); box.append(b); b.onclick = () => {
      if (b.classList.contains("ok")) return;
      if (it.k === pos) { pos++; b.classList.add("ok"); b.querySelector(".rank").textContent = pos; ctx.say(it.l); if (pos === items.length) ctx.later(next, ctx.pause(it.l) + 500); }
      else { shake(b); ctx.say("Pas tout de suite ! Qu'est-ce qu'on fait avant ? Essaie encore."); }
    }; });
    m.append(box);
  };

  T.memory = (st, m, ctx, next) => {
    m.innerHTML = ""; ctx.say(st.q);
    const cards = shuffle(st.pairs.flatMap((p, k) => [{ ...p, k }, { ...p, k }]));
    const box = el("div", "mem"); let open = [], found = 0, lock = false;
    cards.forEach((c) => { const b = el("button", "memcard", `<span class="back">★</span><span class="pic">${c.i}</span>`); b.setAttribute("aria-label", "Carte retournée, à découvrir"); box.append(b); b.onclick = () => {
      if (lock || b.classList.contains("up")) return;
      b.classList.add("up"); b.setAttribute("aria-label", "Carte : " + c.l); open.push({ b, c });
      if (open.length < 2) return;
      const [a, z] = open; open = [];
      if (a.c.k === z.c.k) { a.b.classList.add("ok"); z.b.classList.add("ok"); found++; ctx.say(a.c.l + " !"); if (found === st.pairs.length) ctx.later(next, 1800); }
      else { lock = true; ctx.later(() => { [a.b, z.b].forEach((x) => { x.classList.remove("up"); x.setAttribute("aria-label", "Carte retournée, à découvrir"); }); lock = false; }, 1100); }
    }; });
    m.append(box);
  };

  T.taps = (st, m, ctx, next) => {
    m.innerHTML = ""; ctx.say(st.q); let left = st.items.length;
    const box = el("div", "opts");
    st.items.forEach((it, k) => { const b = el("button", "opt", `<span class="pic" aria-hidden="true">${it.i}</span><span class="reveal"></span>`); b.setAttribute("aria-label", "Image " + (k + 1) + ", à découvrir"); box.append(b); b.onclick = () => {
      ctx.say(it.say); b.querySelector(".reveal").textContent = it.say; b.setAttribute("aria-label", it.say);
      if (!b.classList.contains("ok")) { b.classList.add("ok"); left--; if (!left) ctx.later(next, ctx.pause(it.say) + 600); }
    }; });
    m.append(box);
  };

  T.find = (st, m, ctx, next) => {
    let p = 0; m.innerHTML = "";
    const prog = el("div"); const scene = el("div", "scene-find", st.build());
    // Sur petit écran le parc dépasse : une indication invite à le faire glisser, puis s'efface.
    const hint = el("p", "swipe-hint", "↔ Fais glisser pour voir tout le parc"); hint.setAttribute("aria-hidden", "true");
    scene.addEventListener("scroll", () => hint.classList.add("seen"), { passive: true });
    m.append(prog, scene, hint);
    const hit = (g) => {
      const P = st.prompts[p]; if (!g || !P || g.classList.contains("found")) return;
      if (g.dataset.id === P.id) { g.classList.add("found"); ctx.say(P.fb); p++; ctx.later(ask, ctx.pause(P.fb)); }
      else { shake(g); ctx.say("Ce n'est pas ça, cherche encore !"); }
    };
    scene.addEventListener("click", (e) => hit(e.target.closest("[data-id]")));
    scene.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hit(e.target.closest("[data-id]")); } });
    function ask() { if (p >= st.prompts.length) return next(); prog.replaceChildren(dots(p, st.prompts.length)); ctx.say(st.prompts[p].q); }
    ask();
  };

  T.figure = (st, m, ctx, next) => {
    let p = 0; m.innerHTML = "";
    const h = { skin: "#b9a4ff" }; // bonhomme de couleur neutre : ni genre ni couleur de peau
    const prog = el("div"); const fig = el("div", "fig", `<svg viewBox="0 0 200 300" role="img" aria-label="Bonhomme">
      <g data-zone="bras" stroke="${h.skin}" stroke-width="20" stroke-linecap="round" fill="none"><path d="M72 108L38 158"/><path d="M128 108L162 158"/></g>
      <g data-zone="mains" fill="${h.skin}"><circle cx="34" cy="166" r="28" fill="transparent"/><circle cx="166" cy="166" r="28" fill="transparent"/><circle cx="34" cy="166" r="14"/><circle cx="166" cy="166" r="14"/></g>
      <g data-zone="jambes" fill="${h.skin}"><rect x="72" y="190" width="24" height="78" rx="11"/><rect x="104" y="190" width="24" height="78" rx="11"/></g>
      <g data-zone="pieds" fill="${h.skin}"><rect x="52" y="256" width="96" height="40" fill="transparent"/><ellipse cx="80" cy="274" rx="19" ry="11"/><ellipse cx="120" cy="274" rx="19" ry="11"/></g>
      <g data-zone="ventre"><rect x="68" y="92" width="64" height="84" rx="20" fill="${h.skin}"/><circle cx="100" cy="150" r="2.5" fill="rgba(0,0,0,.25)"/></g>
      <g data-zone="maillot"><path d="M68 162H132V180Q132 200 100 205Q68 200 68 180z" fill="${st.suit || "#19c6a7"}"/>${st.stripes ? '<path d="M68 170H132M68 180H132" stroke="#fff" stroke-width="4"/>' : ""}</g>
      <g data-zone="tete"><circle cx="100" cy="54" r="40" fill="${h.skin}"/>
        <circle cx="86" cy="58" r="4" fill="#1b1b3a"/><circle cx="114" cy="58" r="4" fill="#1b1b3a"/><path d="M88 72Q100 82 112 72" fill="none" stroke="#1b1b3a" stroke-width="3" stroke-linecap="round"/></g></svg>`);
    m.append(prog, fig);
    const ZONES = { tete: "La tête", bras: "Les bras", mains: "Les mains", ventre: "Le ventre", jambes: "Les jambes", pieds: "Les pieds", maillot: "Sous le slip ou la culotte" };
    fig.querySelectorAll("[data-zone]").forEach((g) => { g.setAttribute("tabindex", "0"); g.setAttribute("role", "button"); g.setAttribute("aria-label", ZONES[g.dataset.zone]); });
    fig.querySelector("svg").setAttribute("role", "group");
    const pick = (e) => {
      const g = e.target.closest("[data-zone]"), P = st.prompts[p]; if (!g || !P) return;
      if (g.dataset.zone === P.zone) { g.classList.add("hit"); ctx.say(P.fb); p++; ctx.later(() => { g.classList.remove("hit"); ask(); }, ctx.pause(P.fb)); }
      else { shake(fig); ctx.say("Presque ! Essaie encore."); }
    };
    fig.querySelector("svg").addEventListener("click", pick);
    fig.querySelector("svg").addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(e); } });
    function ask() { if (p >= st.prompts.length) return next(); if (st.prompts.length > 1) prog.replaceChildren(dots(p, st.prompts.length)); ctx.say(st.prompts[p].q); }
    ask();
  };

  T.doit = (st, m, ctx, next) => {
    let s = 0, max = 0;
    (function show() {
      if (s >= st.steps.length) return next();
      const S = st.steps[s]; max = Math.max(max, s); m.innerHTML = ""; if (st.steps.length > 1) m.append(dots(s, st.steps.length, max, (k) => { s = k; show(); }));
      if (st.hand) m.append(el("div", "hand", st.steps.map((_, k) => `<i class="${k < s ? "on" : k === s ? "cur" : ""}"></i>`).join("")));
      m.append(el("div", "bigcard", `<span class="pic" aria-hidden="true">${S.i}</span><span>${S.l}</span>`));
      const b = el("button", "cta", st.btn || "C'est fait !"); b.onclick = () => { s++; show(); };
      const row = el("div", "center"); row.append(b); m.append(row); ctx.say(S.say || S.l);
    })();
  };

  T.breathe = (st, m, ctx, next) => {
    m.innerHTML = "";
    const petals = Array.from({ length: 8 }, (_, k) => `<b style="--a:${k * 45}deg;--dx:${130 + (k * 37) % 90}px;--dy:${-70 + (k * 53) % 150}px;--d:${(k * 0.22).toFixed(2)}s"></b>`).join("");
    const stage = el("div", "flower-stage", `<i class="scent s1"></i><i class="scent s2"></i><i class="scent s3"></i>
      <div class="flower"><i class="stem"></i><i class="leaf l"></i><i class="leaf r"></i><div class="head">${petals}<i class="core"></i></div></div>`);
    const b = el("button", "cta", "Commencer"); const row = el("div", "center"); row.append(b); m.append(stage, row);
    ctx.say("On va respirer tout doucement avec la fleur. Appuie sur « Commencer ».");
    b.onclick = () => {
      row.remove(); let c = 0;
      // Un décompte accompagne chaque temps : 4 pour sentir, 5 pour souffler.
      const count = el("div", "breath-count"); count.setAttribute("aria-hidden", "true"); stage.append(count);
      const tick = (label, n, total, then) => {
        count.className = "breath-count " + (label === "Je sens" ? "in" : "out");
        count.innerHTML = `<span>${label}</span><b>${n}</b>`;
        ctx.later(() => (n < total ? tick(label, n + 1, total, then) : then()), 1000);
      };
      (function cycle() {
        if (c >= st.cycles) { count.remove(); stage.className = "flower-stage in"; ctx.say("Bravo ! Te voilà calme comme la neige qui tombe."); return ctx.later(next, 3600); }
        stage.className = "flower-stage in"; ctx.say("Sens la fleur, tout doucement, par le nez.");
        tick("Je sens", 1, 4, () => {
          stage.className = "flower-stage out"; ctx.say("Souffle sur les pétales, longtemps, pour les faire s'envoler.");
          tick("Je souffle", 1, 5, () => { c++; cycle(); });
        });
      })();
    };
  };

  // Lance une suite d'étapes. ctx : { say, pause, later, hero, types (moteurs supplémentaires) }
  function run(stages, mount, ctx, done) {
    let i = 0;
    (function step() {
      if (i >= stages.length) return done();
      const st = stages[i++]; const fn = (ctx.types && ctx.types[st.type]) || T[st.type];
      fn(st, mount, ctx, step);
    })();
  }
  return { run, el };
})();
