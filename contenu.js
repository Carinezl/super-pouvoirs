// Contenu du calendrier. Source complète et références : contenu-calendrier-avent.md
// t : titre, p : pouvoir gagné, c : consigne lue à l'enfant,
// o : objectif (adulte), parler : pistes pour en parler, eviter : à éviter, plus : pour aller plus loin.

const STEP0 = { t: "Je choisis mon personnage", p: "En route pour l'aventure" };

const DAYS = [
  { t: "Pointe et nomme", p: "Je connais mon corps", c: "Écoute bien, puis touche la bonne partie du corps de Bonhomme : la tête, les bras, le ventre, les pieds !",
    o: "Connaître et nommer les grandes parties de son corps.", age: "À 3 ans, nommez la partie avant de la faire toucher. À 5-6 ans, ajoutez le cou, les coudes, les genoux et les chevilles.", jour: "Au bain ou à l'habillage, nommez ensemble les parties du corps.", compris: "Votre enfant montre et nomme les grandes parties de son corps.", parler: ["Après le jeu, jouez à « Jacques a dit » avec les parties de son vrai corps.", "« À quoi servent tes mains ? tes pieds ? ton ventre ? »"],
    plus: "« Ton corps t'appartient ! », Lucia Serrano (CrackBoom!, dès 3 ans)." },
  { t: "Les mots du docteur", p: "Je dis les mots exacts", c: "Ce qui est caché sous le maillot de bain, ce sont les parties intimes. Elles ont des noms exacts, comme chez le docteur.",
    o: "Connaître les mots exacts des parties intimes, pour pouvoir en parler clairement à un adulte.", age: "À 3 ans, un ou deux mots suffisent : « fesses », puis « vulve » ou « pénis ». Les autres viendront plus tard.", jour: "Employez ces mots au quotidien, à la toilette ou chez le médecin, sur le même ton que « genou » ou « coude ».", compris: "Votre enfant emploie ces mots sans gêne et sait que ces parties sont intimes.", parler: ["Un enfant qui a les mots peut dire clairement ce qui se passe et être compris.", "Si c'est difficile pour vous, dites au moins « parties intimes ». Le jeu nomme les fesses, la poitrine, la vulve, le pénis et les testicules."],
    eviter: "Les surnoms seuls, ou traiter ces mots comme des gros mots.", plus: "« C'est MON corps ! », Mai Lan Chapiron (La Martinière). Podcast « Et si on se parlait ? », épisode 3-6 ans." },
  { t: "Je prends soin de mon trésor", p: "Mon corps est mon trésor", c: "Ton corps est ton trésor. Remets les images de la toilette dans le bon ordre !",
    o: "Prendre soin de son corps et apprendre à se laver sans aide.", age: "À 3 ans, faites le jeu ensemble en racontant le bain : « D'abord on enlève les habits, et ensuite ? » À 5-6 ans, laissez votre enfant chercher.", jour: "Au prochain bain, proposez-lui de se laver sans aide, en restant à côté.", compris: "Votre enfant se lave de plus en plus sans aide, parties intimes comprises.", parler: ["« Ce soir, c'est toi qui commandes le bain : tu me montres comment tu te laves ? »", "Laissez l'enfant laver lui-même ses parties intimes dès qu'il le peut."],
    plus: "Livret Bayard « Mon corps est un trésor » (3-6 ans, gratuit)." },
  { t: "Toc toc !", p: "Je protège mon intimité", c: "La porte de la salle de bain est fermée. Que fait le personnage ? Il frappe et il attend !",
    o: "Comprendre ce qu'est l'intimité : frapper avant d'entrer, et savoir où et quand on peut se déshabiller.", age: "La carte « Ça dépend » est difficile avant 4-5 ans : donnez un exemple concret (« dans ta chambre, si la porte est fermée... »).", jour: "Frappez vous-même avant d'entrer dans sa chambre ou dans la salle de bain.", compris: "Votre enfant frappe avant d'entrer, ou demande à être tranquille.", parler: ["Instaurez ensemble la règle « on frappe avant d'entrer », valable aussi pour les adultes.", "« Où est-ce que tu aimes être tranquille ? »"] },
  { t: "Tous différents, tous super", p: "Super-respect", c: "Découvre l'équipe des super héros et héroïnes. Chaque corps est unique, et on ne se moque jamais du corps de quelqu'un.",
    o: "Accepter son corps tel qu'il est et respecter celui des autres, sans moquerie.", jour: "Regardez ensemble un album ou des photos : en quoi les personnes sont-elles différentes ?", compris: "Votre enfant parle des différences sans se moquer, et sait que les jeux et les couleurs sont à tout le monde.", parler: ["« Qu'est-ce que ton corps sait bien faire ? »", "Comparez vos mains : taille, forme, couleur."],
    plus: "« On est tous différents ! », Mai Lan Chapiron (La Martinière)." },
  { t: "Qui peut m'aider ?", p: "Je sais qui m'aide", c: "Un soin, ça s'explique. Aide ton personnage : on lui explique, on lui demande, et il peut dire ce qu'il ressent.",
    o: "Savoir qu'un soin s'explique et se demande, et oser dire quand il gêne.", age: "Six questions, c'est long à 3 ans : faites-en trois, et gardez la suite pour le lendemain.", jour: "Au prochain soin (crème, pansement, mouchage), dites ce que vous allez faire et demandez son accord.", compris: "Votre enfant ose dire « je préfère le faire moi-même » ou « ça me gêne ».",
    parler: ["Avant un soin, dites ce que vous allez faire et pourquoi, puis demandez : « Tu es d'accord ? Tu préfères le faire toi-même ? »", "Si un soin est indispensable et que l'enfant refuse, expliquez et proposez un choix (maintenant ou dans cinq minutes, toi ou moi) plutôt que de forcer.", "Dites-lui qu'il peut toujours dire « stop, ça me gêne », même à vous, même au docteur."],
    eviter: "Présenter un geste comme toujours acceptable ou toujours interdit : le même geste peut être un soin, ou ne pas en être un. Restez attentif si un adulte insiste pour s'occuper seul du bain ou du coucher." },
  { t: "Ma super-bulle", p: "Super-bulle", c: "Ton personnage a une bulle magique autour de lui. Fais-la grandir ou rétrécir, comme tu en as envie !",
    o: "Reconnaître son espace personnel (sa « bulle ») et savoir dire quand on veut plus ou moins de distance.", age: "À 3 ans, mimez la bulle avec les bras avant de jouer.", jour: "Demandez de temps en temps : « Elle est comment, ta bulle, là ? »", compris: "Votre enfant dit quand il lui faut de la place, et accepte que les autres en veuillent aussi.", parler: ["Avec un cerceau ou les bras, montrez « ma bulle aujourd'hui ».", "Si quelqu'un dit non à un câlin, ce n'est pas qu'il ne t'aime pas : il a besoin d'espace."] },
  { t: "Bonjour à ma façon", p: "Je choisis", c: "Quelqu'un que tu aimes arrive ! Comment veux-tu lui dire bonjour ? Un bisou, un câlin, un check, un coucou ou un bisou qui vole ?",
    o: "Savoir qu'on peut choisir comment dire bonjour, et qu'un bisou ou un câlin ne sont jamais obligatoires.", jour: "Avant une visite, demandez-lui comment dire bonjour aujourd'hui, et prévenez les adultes.", compris: "Votre enfant choisit sa façon de dire bonjour sans culpabiliser.", parler: ["Prévenez vos proches avant les fêtes.", "Proposez les « bisous qui volent »."],
    eviter: "« Fais-lui un bisou, sinon il va être triste. » On ne force jamais un bisou ni un câlin, et on ne demande pas à un enfant d'en faire un pour faire plaisir à un adulte.", plus: "« Je peux te faire un bisou ? », S. Bourdeverre-Veyssière et C. Fruy (dès 3 ans)." },
  { t: "Les mêmes règles pour tout le monde", p: "Mes règles pour tout le monde", c: "Un câlin, un bisou, des chatouilles : qui doit s'assurer que tu es d'accord ? Tout le monde !",
    o: "Savoir que les mêmes règles valent pour tout le monde, proches compris : on demande mon accord avant de me toucher, et personne ne peut m'obliger à toucher quelqu'un.", age: "À 3 ans, faites seulement les deux premières cartes, puis dites la règle ensemble.", jour: "Avant un câlin, un bisou ou des chatouilles, demandez : « Tu veux bien ? », et accueillez un non avec le sourire.", compris: "Votre enfant sait que la règle est la même pour tout le monde, et ose dire non à un proche.",
    parler: ["Le jeu ne classe pas les personnes en « sûres » et « pas sûres » : la plupart des violences sont commises par des proches. Il répète une seule idée, les règles sont les mêmes pour tout le monde.", "Dites-le avec vos mots : « Même moi, je te demande. Et tu as le droit de me dire non. »"],
    eviter: "Laisser entendre que le danger vient surtout des inconnus, ou qu'on ne dit pas non aux personnes qu'on aime.",
    plus: "Éducation nationale, vademecum « Violences sexuelles intrafamiliales » : personne n'a le droit de toucher le corps d'un enfant sans son accord, que ce soit un membre de sa famille ou non." },
  { t: "Tu es d'accord ?", p: "Super-politesse", c: "Ton personnage veut faire un câlin à son ami·e. D'abord, il demande : tu es d'accord ?",
    o: "Demander avant de toucher quelqu'un, et repérer sur son visage et son corps s'il est d'accord.", jour: "Montrez l'exemple : « Je peux te faire un câlin ? », « Tu me prêtes ton crayon ? »", compris: "Votre enfant demande avant de prendre, de toucher ou de s'installer, et regarde la réaction de l'autre.", parler: ["Entraînez-vous avec une peluche, puis entre vous.", "Vous aussi, demandez : « Je peux te faire un câlin ? »"],
    plus: "Saprea, « Enseigner le consentement à votre enfant »." },
  { t: "J'ai le droit de changer d'avis", p: "Je peux changer d'avis", c: "Les chatouilles, c'était rigolo. Maintenant ton personnage en a assez. Il dit : stop !",
    o: "Savoir qu'on peut changer d'avis à tout moment, et respecter le « stop » des autres.", jour: "Quand votre enfant dit « stop » pendant un jeu, arrêtez aussitôt et dites-le : « Tu as dit stop, j'arrête. »", compris: "Votre enfant dit stop sans crainte, et s'arrête quand un autre le dit.", parler: ["Quand l'enfant dit « stop » aux chatouilles, arrêtez tout de suite, même en riant."] },
  { t: "La super posture", p: "Voix de tonnerre", c: "Tiens-toi bien droit, regarde dans les yeux et dis avec ta grosse voix : arrête, j'aime pas ça !",
    o: "S'entraîner à dire non avec assurance : posture, regard et voix forte.", age: "Certains enfants n'osent pas crier : commencez par chuchoter, puis montez le son ensemble, comme un jeu.", jour: "Rejouez la super posture devant un miroir.", compris: "Votre enfant dit non d'une voix ferme, en se tenant bien droit.", parler: ["Jouez au « oui clair et net » (sourire, voix douce) et au « non clair et net » (visage sérieux, voix forte).", "Répétez souvent, surtout avec un enfant qui hésite à crier."],
    plus: "« J'ai le droit de dire non ! », O. Célier, T. Piet et F. Vella (dès 3 ans)." },
  { t: "Memory des émotions", p: "Radar à émotions", c: "Retrouve les deux enfants qui ressentent la même chose : la joie, la colère, la peur ou la tristesse.",
    o: "Reconnaître et nommer les quatre émotions de base : joie, colère, peur, tristesse.", age: "À 3 ans, retournez d'abord toutes les cartes : il s'agit seulement d'associer les deux mêmes visages.", jour: "Nommez vos propres émotions : « Là, je suis en colère », « Je me sens triste aujourd'hui ».", compris: "Votre enfant nomme au moins deux émotions, chez lui ou chez les autres.", parler: ["« Raconte-moi un moment où tu as été très content·e aujourd'hui. »"] },
  { t: "Ce que mon corps me dit", p: "Détecteur du corps", c: "Quand j'ai peur, mon cœur bat vite. Quand je suis en colère, je serre les poings. Associe chaque signal à son émotion !",
    o: "Repérer dans son corps les signes d'une émotion, pour comprendre ce que l'on ressent.", jour: "Quand une émotion arrive, demandez : « Où est-ce que tu la sens dans ton corps ? »", compris: "Votre enfant relie une sensation (ventre, cœur, gorge) à une émotion.", parler: ["Mimez chaque émotion avec tout le corps, pas seulement le visage."] },
  { t: "La météo de mon cœur", p: "Météo du cœur", c: "Le même geste peut mettre du soleil ou un nuage. Écoute bien l'histoire, puis choisis !",
    o: "Savoir qu'un même geste peut faire du bien ou gêner selon le moment, et se fier à ce que l'on ressent.", jour: "Après un câlin ou un jeu, demandez : « C'était soleil ou nuage ? »", compris: "Votre enfant dit ce qui lui plaît ou non, et sait que cela peut changer d'un jour à l'autre.", parler: ["« Quel geste te met du soleil ? Est-ce qu'il y a des jours où tu n'en as pas envie ? »", "Montrez l'exemple : « Là, je n'ai pas envie de chatouilles, plus tard peut-être. »"],
    eviter: "Classer les gestes en « bons » et « mauvais » une fois pour toutes.",
    plus: "Podcast « Ton corps c'est toi », épisode 3 (Comitys), à écouter d'abord sans l'enfant." },
  { t: "Mon alarme « Oh oh ! »", p: "Alarme activée", c: "Il y a quatre règles d'or. Si quelqu'un ne les respecte pas, une alarme se déclenche dans ton corps et fait : « Oh oh ! »",
    o: "Connaître les quatre règles qui protègent les parties intimes, et écouter son signal d'alarme intérieur.", age: "À 3 ans, retenez surtout : « Ce qui est sous la culotte ou le slip est à toi. Si ça fait oh oh, tu viens me le dire. »", jour: "Rappelez la règle sans dramatiser, au bain ou à l'habillage.", compris: "Votre enfant sait que la règle vaut pour tout le monde, même pour un jeu, et qu'on peut toujours vous en parler.", parler: ["Parfois c'est difficile de voir qu'on ne nous respecte pas : je le sais parce que je me sens mal, il y a quelque chose de bizarre."],
    eviter: "Limiter le message à « ne laisse personne te toucher », ou se concentrer sur l'inconnu au parc.", plus: "« Kiko et la main » (Conseil de l'Europe, gratuit). Vidéo « Le Loup » de Mai Lan Chapiron, à regarder d'abord sans l'enfant." },
  { t: "Cherche et trouve", p: "Œil de lynx", c: "Dans le parc enneigé, trouve un enfant joyeux, un enfant triste et un enfant qui ne veut pas de câlin.",
    o: "S'exercer à observer les autres : leurs émotions, leurs gestes, leur envie d'être tranquilles.", age: "À 3 ans, cherchez ensemble en pointant du doigt et en décrivant ce que vous voyez.", jour: "Dans un livre ou dans la rue, cherchez ensemble comment se sentent les personnages.", compris: "Votre enfant repère une émotion ou un refus sur un visage ou dans une posture.", parler: ["« Comment tu sais qu'il n'a pas envie ? Qu'est-ce qu'on pourrait faire pour l'aider ? »"] },
  { t: "Je sens, je souffle", p: "Calme olympien", c: "Sens la fleur tout doucement, puis souffle sur ses pétales pour les faire s'envoler.",
    o: "Apprendre un geste simple pour retrouver son calme quand une émotion déborde.", jour: "Refaites l'exercice au coucher, ou après une grosse colère, une fois le calme revenu.", compris: "Votre enfant pense à souffler quand une émotion monte, sans qu'on le lui rappelle.", parler: ["Refaites l'exercice au coucher ou avant une situation stressante."] },
  { t: "Mes 3 étapes", p: "Le plan d'action", c: "Un : je dis non. Deux : je m'en vais. Trois : j'en parle à un adulte de confiance. Remets les images dans l'ordre !",
    o: "Savoir quoi faire dans une situation inconfortable : dire non, s'éloigner, en parler.", age: "À 3 ans, mimez les trois gestes plutôt que de les trier : la main levée, les pieds qui partent, la bouche qui parle.", jour: "Rejouez les trois étapes avec des peluches.", compris: "Votre enfant cite au moins « je dis non » et « j'en parle ».", parler: ["Mimez les trois étapes ensemble.", "Si l'enfant n'a pas réussi à dire non ou à partir, ce n'est pas sa faute. Le plus important, c'est d'en parler."] },
  { t: "Secret soleil, secret nuage", p: "Je démasque les secrets", c: "Un cadeau surprise pour quelqu'un qu'on aime, c'est un secret soleil. Un secret qui rend triste, c'est un secret nuage : on le raconte !",
    o: "Faire la différence entre une surprise joyeuse et un secret qui pèse, et savoir que ce dernier se raconte.", age: "Avant 4-5 ans, parlez de « surprise » (que l'on dévoile bientôt) et de « secret qui fait mal au ventre » (que l'on raconte).", jour: "Si vous préparez un cadeau, dites « c'est une surprise » plutôt que « c'est un secret ».", compris: "Votre enfant sait qu'un secret qui pèse se raconte, même si on lui a demandé de se taire.", parler: ["« Si quelqu'un ne respecte pas ton trésor et te dit que c'est un secret, tu as le droit de désobéir et de le dire. »", "Préférez le mot « surprise » pour les cadeaux."],
    eviter: "Demander à l'enfant de garder des secrets entre adultes. Gronder ou punir un enfant parce qu'il a parlé : il ne doit jamais regretter de s'être confié.", plus: "Pour l'adulte : l'album « Le Loup », Mai Lan Chapiron, avec son cahier pour les parents." },
  { t: "Ma main de confiance", p: "Main de confiance", c: "Ta main a cinq doigts. Pour chaque doigt, choisis un adulte avec qui tu te sens toujours bien.",
    o: "Identifier cinq adultes de confiance à qui parler en cas de souci.", age: "À 3 ans, deux ou trois adultes suffisent.", jour: "Tracez sa main sur une feuille, écrivez un prénom par doigt et affichez-la.", compris: "Votre enfant nomme au moins deux adultes à qui parler, dont un en dehors de la maison.", parler: ["Pendant le jeu, votre enfant dit les prénoms à voix haute : aidez-le à trouver cinq vrais adultes, dont au moins un en dehors de la maison.", "Ensuite, tracez le contour de sa main sur une feuille et écrivez un prénom par doigt.", "Prévenez ces adultes qu'ils ont été choisis."] },
  { t: "Le chemin vers mon équipe", p: "Je persévère", c: "Ton personnage cherche un adulte pour l'aider. Si un adulte n'écoute pas, on va voir le suivant !",
    o: "Savoir insister : si un adulte n'écoute pas, on en parle à un autre, jusqu'à être entendu·e.", jour: "Dites-le clairement : « Si un jour je ne t'écoute pas bien, insiste, ou va le dire à... »", compris: "Votre enfant sait qu'il faut continuer à en parler jusqu'à être écouté.", parler: ["Si votre enfant se confie : « Je te crois. Ce n'est pas ta faute. Tu as bien fait de m'en parler. Je vais t'aider. »", "Gardez votre calme, ne restez pas seul·e et appelez le 119."],
    eviter: "Les « pourquoi » en série, les questions qui orientent, le faire répéter. Gronder ou punir un enfant parce qu'il a parlé : il ne doit jamais regretter de s'être confié." },
  { t: "Mes super-droits", p: "Super-révision", c: "Le grand quiz des super-pouvoirs ! Tu as le droit d'être protégé. Ce n'est jamais la faute de l'enfant.",
    o: "Réviser l'essentiel, et retenir qu'un enfant a le droit d'être protégé et n'est jamais fautif.", age: "Six questions : à 3 ans, faites le quiz en deux fois.", jour: "Demandez-lui ce que le calendrier lui a appris de plus important.", compris: "Votre enfant retrouve plusieurs messages : mon corps est à moi, j'ai le droit de dire non, j'en parle.", parler: ["La Convention internationale des droits de l'enfant protège chaque enfant contre toutes les violences.", "Le 119 s'appelle aussi quand on est témoin."],
    plus: "« Interdit de me faire MAL », Mai Lan Chapiron. Coloriages gratuits « Ta voix compte ! » de Mille Miettes." },
  { t: "Le grand diplôme", p: "Super-pouvoirs réunis", c: "Bravo ! Tu as gagné tous tes super-pouvoirs. Voici ton diplôme des super-pouvoirs !",
    o: "Fêter le chemin parcouru et donner envie de continuer à en parler toute l'année.", compris: "Votre enfant reparle de ce qu'il a appris sans qu'on le lui demande.", parler: ["Félicitez votre enfant pour tout le chemin parcouru.", "Affichez le diplôme dans sa chambre, avec la main de confiance si vous l'avez dessinée (jour 21).", "Relisez un album de temps en temps."] }
];

const INFO = {
  contacts: {
    title: "Contacts utiles", sub: "Mis à jour le 26 novembre 2026",
    html: `
<div class="contact"><b>119</b><span>Allô Enfance en danger. Gratuit, 24h/24, 7j/7, n'apparaît pas sur les relevés. Pour un enfant ou un adulte inquiet. Formulaire en ligne et version en langue des signes : <a href="https://www.allo119.gouv.fr/" target="_blank" rel="noopener">allo119.gouv.fr</a></span></div>
<div class="contact"><b>17 · 112</b><span>Police, gendarmerie ou urgences, en cas de danger immédiat.</span></div>
<div class="contact"><b>114</b><span>Urgence par SMS, pour les personnes sourdes, malentendantes ou qui ne peuvent pas parler.</span></div>
<div class="contact"><b>0 805 802 804</b><span>Ligne de la CIIVISE, pour les personnes victimes de violences sexuelles dans l'enfance. Gratuit, du lundi au vendredi, 10h-19h.</span></div>
<div class="contact"><b>116 006</b><span>France Victimes, aide aux victimes. Gratuit, 7j/7.</span></div>
<div class="contact"><b>3018</b><span>Violences numériques, images et photos. Gratuit, 7j/7, 9h-23h.</span></div>
<p>Pour signaler en ligne (adultes) : la plateforme « Signaler une violence conjugale, sexuelle ou sexiste » sur <a href="https://www.service-public.gouv.fr/cmi" target="_blank" rel="noopener">service-public.gouv.fr/cmi</a>. Vous pouvez aussi contacter la CRIP de votre département.</p>
<h3>Focus périscolaire</h3>
<p>Pour une inquiétude liée à la cantine, à la garderie, au centre de loisirs ou aux activités après la classe.</p>
<div class="contact"><b>06 17 52 66 21</b><span><em class="where">À Paris.</em> Cellule de signalement des violences dans le périscolaire de la Ville de Paris, dédiée aux violences faites aux enfants sur les temps périscolaires et animée par des professionnel·les de la protection de l'enfance. Par e-mail : <a href="mailto:signalement-violence-periscolaire@paris.fr">signalement-violence-periscolaire@paris.fr</a></span></div>
<div class="contact"><b>01 87 66 36 42</b><span><em class="where">À Paris.</em> Cellule d'écoute psychologique de l'OSE (Œuvre de Secours aux Enfants), pour les parents dont l'enfant a pu être exposé à des violences à l'école ou au périscolaire. Gratuit et confidentiel, du lundi au vendredi de 9h30 à 17h. En dehors de ces horaires, laissez un message : l'équipe vous rappelle. Elle vous conseille aussi en cas de doute sur la conduite ou les propos de votre enfant, et soutient les familles d'enfants ayant des besoins spécifiques ou des difficultés d'expression.</span></div>
<div class="contact"><b>01 87 04 21 36</b><span><em class="where">À Paris, antenne Sud.</em> Paris Aide aux Victimes : information sur vos droits, aide dans les démarches et soutien psychologique. Gratuit et confidentiel, sur rendez-vous. Par e-mail : <a href="mailto:contact13@pav75.fr">contact13@pav75.fr</a></span></div>
<div class="contact"><b>01 53 06 83 50</b><span><em class="where">À Paris, antenne Nord.</em> Paris Aide aux Victimes : le même accompagnement, pour le nord de Paris. Par e-mail : <a href="mailto:contact17@pav75.fr">contact17@pav75.fr</a></span></div>
<div class="contact"><b>01 44 32 77 08</b><span><em class="where">À Paris.</em> Bureau d'aide aux victimes du tribunal judiciaire de Paris (porte de Clichy). Accueil sans rendez-vous par un·e juriste, du lundi au vendredi de 9h à 12h et de 13h à 17h.</span></div>
<div class="contact"><b>PMI</b><span><em class="where">À Paris.</em> Les centres de Protection maternelle et infantile accueillent gratuitement les parents et les enfants jusqu'à 6 ans, sans rendez-vous pour un conseil, sur rendez-vous avec un·e psychologue ou un médecin : <a href="https://www.paris.fr/recherche/lieux?types=centres-de-pmi" target="_blank" rel="noopener">trouver un centre</a>.</span></div>
<div class="contact"><b>Crèche</b><span><em class="where">À Paris.</em> Pour un fait survenu dans une crèche ou un autre lieu d'accueil municipal des jeunes enfants : le ou la responsable de la crèche, la coordination petite enfance de votre arrondissement (Caspe), ou <a href="mailto:signalement-violence-dfpe@paris.fr">signalement-violence-dfpe@paris.fr</a>.</span></div>
<div class="contact"><b>École</b><span><em class="where">À Paris.</em> En maternelle comme en élémentaire : le directeur ou la directrice de l'école, le ou la responsable éducatif ville (REV) pour le périscolaire, ou la circonscription des affaires scolaires (Caspe) de votre arrondissement. La ligne de signalement <strong>06 17 52 66 21</strong>, plus haut, couvre aussi l'école. <em class="where">Partout en France.</em> Sur rendez-vous, vous pouvez vous adresser selon votre situation au médecin scolaire, à l'assistant·e social·e ou au/à la psychologue scolaire. Ce sont des partenaires privilégiés de l'école.</span></div>
<div class="contact"><b>Sport</b><span><em class="where">À Paris.</em> Pour un fait survenu dans un équipement sportif ou jeunesse municipal : le ou la responsable de l'équipement, ou <a href="mailto:DJS-signalementVSS@paris.fr">DJS-signalementVSS@paris.fr</a>.</span></div>
<div class="contact"><b>Associations</b><span><em class="where">Partout en France.</em> <a href="https://www.sosperiscolaire.fr/" target="_blank" rel="noopener">SOS Périscolaire</a>, un collectif de parents et de professionnel·les de l'enfance qui accompagne les familles confrontées aux violences du temps périscolaire.</span></div>
<p>Tous ces contacts parisiens, avec leurs horaires à jour, sont réunis sur la page de la Ville de Paris <a href="https://www.paris.fr/pages/violences-sexuelles-en-milieu-scolaire-a-qui-s-adresser-33352" target="_blank" rel="noopener">« Violences sexuelles en milieu scolaire : à qui s'adresser ? »</a>.</p>
<p>Partout en France, le <strong>119</strong> reste le numéro à appeler pour toute inquiétude concernant un enfant, y compris sur les temps périscolaires.</p>`
  },
  ressources: {
    title: "Ressources pour aller plus loin",
    html: `
<h3>Albums à lire avec un enfant de 3 à 6 ans</h3>
<ul class="books">
<li class="book"><strong>C'est MON corps !</strong>, Mai Lan Chapiron (La Martinière Jeunesse)<span class="themes">Thèmes : propriété du corps, limites corporelles, consentement, prévention des violences.</span>Un livre très accessible, qui explique simplement à l'enfant que son corps lui appartient. Dans la même série : <em>Interdit de me faire MAL</em> et <em>On est tous différents !</em></li>
<li class="book"><strong>Mon corps m'appartient !</strong>, Isabelle Filliozat et Margot Fried-Filliozat (Nathan)<span class="themes">Thèmes : respect du corps, limites personnelles, consentement au quotidien.</span>L'enfant y apprend qu'il a le droit d'accepter ou de refuser des câlins et des contacts physiques, et que son corps lui appartient.</li>
<li class="book"><strong>Ton corps t'appartient !</strong>, Lucia Serrano (CrackBoom!)<span class="themes">Thèmes : anatomie, intimité, consentement, adulte de confiance.</span>Un album éducatif dès 3 ans, qui nomme les parties du corps et explique que personne n'a le droit d'y toucher sans accord.</li>
<li class="book"><strong>Je peux te faire un bisou ?</strong>, Soline Bourdeverre-Veyssière et Chloé Fruy (Il était un bouquin)<span class="themes">Thèmes : bisous, consentement, respect de l'autre.</span>Castille se demande à qui l'on fait des bisous, et surtout comment demander. Dès 3 ans.</li>
<li class="book"><strong>C'est mon corps !</strong>, Élise Gravel (Scholastic)<span class="themes">Thèmes : autonomie corporelle, diversité des corps, consentement.</span>Avec des illustrations claires et bienveillantes, cet album aborde la souveraineté sur son propre corps et apprend à poser ses limites face aux autres.</li>
<li class="book"><strong>J'ai le droit de dire non !</strong>, Ophélie Célier, Thomas Piet et Fanny Vella (Petit Kiwi)<span class="themes">Thèmes : droit de refuser, droit à l'image, jeux pour tout le monde.</span>Un album bienveillant sur les différentes façons de donner ou non son accord. Dès 3 ans.</li>
<li class="book"><strong>Mon corps rien qu'à moi</strong>, Agathe Sorlet (Albin Michel Jeunesse)<span class="themes">Thèmes : le corps, l'intimité.</span>Un album joyeux, inspiré du vécu de l'autrice.</li>
</ul>
<h3>Livrets et outils gratuits pour les 3-6 ans</h3>
<ul>
<li><a href="https://www.bayard-jeunesse.com/infos/actualites/violences-sexuelles-comment-proteger-enfants-et-adolescents/" target="_blank" rel="noopener">Bayard Jeunesse, <em>Mon corps est un trésor</em></a> : livret à télécharger, avec ses suites pour les 7-13 ans et les ados</li>
<li><a href="https://www.coe.int/fr/web/children/kiko-and-the-hand" target="_blank" rel="noopener">Conseil de l'Europe, <em>Kiko et la main</em></a> : la règle du sous-vêtement, les bons et les mauvais secrets. Livre, vidéo, coloriages et guide pour les parents, à télécharger gratuitement (3-7 ans)</li>
<li><a href="https://association-cvm.org/ressources/mon-corps-mon-tresor-avec-anae-et-eloi" target="_blank" rel="noopener"><em>Mon corps, mon trésor avec Anaé et Éloi</em></a> : kit de prévention pour les 4-6 ans, et <a href="https://association-cvm.org/ressources/ton-corps-est-a-toi-affiche" target="_blank" rel="noopener">l'affiche <em>Ton corps est à toi</em></a> (répertoriés par l'association CVM)</li>
<li><a href="https://www.millemiettes.org/" target="_blank" rel="noopener">Mille Miettes</a> : affiches et coloriages « Ta voix compte ! »</li>
<li><a href="https://www.allo119.gouv.fr/sites/default/files/upload/content/actualites/livret-cide-2019-def.pdf" target="_blank" rel="noopener">Livret du 119 sur les droits de l'enfant</a></li>
</ul>
<h3>À découvrir d'abord sans l'enfant</h3>
<p>Ces ressources sont de qualité, mais abordent les violences de façon directe. Regardez-les avant de décider si, et quand, les partager.</p>
<ul>
<li><a href="https://www.leloup.org/" target="_blank" rel="noopener"><em>Le Loup</em>, Mai Lan Chapiron</a> : album (dès 4 ans), vidéo de prévention et chanson, sur l'inceste, avec un cahier pour les adultes</li>
<li><a href="https://www.memoiretraumatique.org/assets/files/v1/Documents-pdf/2022-quand-on-te-fait-du-mal_ponti-memoire-traumatique-hdweb.pdf" target="_blank" rel="noopener"><em>Quand on te fait du mal</em></a> : brochure illustrée par Claude Ponti, association Mémoire traumatique et victimologie (maternelle, CP, CE1)</li>
<li><a href="https://lnk.to/etsionseparlait" target="_blank" rel="noopener"><em>Et si on se parlait ?</em></a>, podcast d'Andréa Bescond : épisode « 3 à 6 ans, découvrir les parties intimes »</li>
<li><a href="https://www.comitys.com/podcast-ton-corps-c-est-toi/" target="_blank" rel="noopener"><em>Ton corps c'est toi</em></a>, podcast de Comitys : épisode 3, « Touchers-bonheur et touchers-malheur »</li>
</ul>
<h3>Sites officiels</h3>
<ul>
<li><a href="https://www.allo119.gouv.fr/" target="_blank" rel="noopener">allo119.gouv.fr</a> : le service national d'accueil téléphonique pour l'enfance en danger, avec ses affiches, sa plaquette pour les enfants et son film pédagogique</li>
<li><a href="https://www.info.gouv.fr/actualite/le-gouvernement-contre-les-violences-sexuelles-faites-aux-enfants" target="_blank" rel="noopener">Campagne nationale contre les violences sexuelles faites aux enfants</a> (info.gouv.fr)</li>
<li><a href="https://eduscol.education.gouv.fr/5916/mettre-en-oeuvre-le-programme-evarevars" target="_blank" rel="noopener">Éducation nationale, programme d'éducation à la vie affective et relationnelle</a> : ce que votre enfant aborde à l'école depuis la rentrée 2025, dès la maternelle</li>
<li><a href="https://eduscol.education.gouv.fr/sites/default/files/document/vademecum-violences-sexuelles-intrafamiliales-comprendre-prevenir-reperer-et-agir-73590.pdf" target="_blank" rel="noopener">Éducation nationale, vademecum « Violences sexuelles intrafamiliales : comprendre, prévenir, repérer et agir »</a> : écrit pour les personnels des écoles, il précise comment accueillir la parole d'un enfant</li>
<li><a href="https://eduscol.education.gouv.fr/7111/agir-contre-les-violences-sexistes-et-sexuelles-faites-aux-enfants" target="_blank" rel="noopener">Éducation nationale, « Agir contre les violences sexistes et sexuelles faites aux enfants »</a></li>
<li><a href="https://www.ciivise.fr/" target="_blank" rel="noopener">CIIVISE</a> : commission indépendante sur l'inceste et les violences sexuelles faites aux enfants, son rapport de 2023 et sa ligne d'écoute</li>
<li><a href="https://jeprotegemonenfant.gouv.fr/" target="_blank" rel="noopener">jeprotegemonenfant.gouv.fr</a> : protéger son enfant des écrans et des images qui ne sont pas de son âge</li>
<li><a href="https://www.unicef.fr/convention-droits-enfants/protection/" target="_blank" rel="noopener">UNICEF France, le droit à la protection</a> : ce que dit la Convention internationale des droits de l'enfant</li>
<li><a href="https://solidarites.gouv.fr/lutter-contre-les-violences-faites-aux-enfants" target="_blank" rel="noopener">Ministère des Solidarités, « Lutter contre les violences faites aux enfants »</a> : l'action publique et les dispositifs d'aide</li>
<li><a href="https://www.paris.fr/pages/violences-sexuelles-en-milieu-scolaire-a-qui-s-adresser-33352" target="_blank" rel="noopener">Ville de Paris, « Violences sexuelles en milieu scolaire : à qui s'adresser ? »</a> : pour le périscolaire parisien, la cellule de signalement, la cellule d'écoute de l'OSE et les professionnel·les de l'école.</li>
</ul>
<h3>Pour vous, adulte : comprendre et savoir réagir</h3>
<ul>
<li><a href="https://cdn.paris.fr/paris/2026/10/23/vsm_a5-10-2026_sr-uPom.pdf" target="_blank" rel="noopener">Ville de Paris, <em>Prévenir, repérer, agir contre les violences sexuelles faites aux enfants</em></a> : guide pour les parents (version d'octobre 2026). Les signes qui peuvent alerter, les phrases à privilégier et à éviter si votre enfant se confie, et à qui s'adresser</li>
<li><a href="https://violences-sexuelles.info/dl/VSI-COMPORTEMENT-SEXUELS-ENFANTS.pdf" target="_blank" rel="noopener"><em>Les comportements sexuels des enfants et des adolescents</em></a> : guide du CRIAVS Île-de-France pour distinguer ce qui est normal de ce qui doit alerter</li>
<li><a href="https://saprea.org/fr/education-communautaire/enseigner-le-consentement-a-votre-enfant/" target="_blank" rel="noopener">Saprea, <em>Enseigner le consentement à votre enfant</em></a> : guide de discussion et fiche de travail</li>
<li><a href="https://www.comitys.com/consentement-explique-aux-enfants/" target="_blank" rel="noopener">Comitys, « Comment travailler le respect du corps avec des enfants ? »</a> et sa vidéo <em>Le consentement expliqué aux enfants</em> (dès 6 ans)</li>
<li><a href="https://collectifenfantiste.fr/trouver-de-laide/" target="_blank" rel="noopener">Collectif enfantiste, « Trouver de l'aide »</a> : annuaire d'associations et de professionnel·les</li>
<li><a href="https://colosse.fr/" target="_blank" rel="noopener">Colosse aux pieds d'argile</a> : prévention des violences sexuelles dans le sport et les loisirs</li>
<li><a href="https://e-enfance.org/numero-3018/" target="_blank" rel="noopener">e-Enfance et le 3018</a> : violences numériques</li>
<li><a href="https://www.jdanimation.fr/infos/25-ressources-pour-prevenir-les-violences-sexuelles-faites-aux-enfants-et-agir" target="_blank" rel="noopener">Le Journal de l'Animation, « 25 ressources pour prévenir les violences sexuelles faites aux enfants et agir »</a></li>
</ul>`
  },
  apropos: {
    title: "À propos",
    html: `
<h3>Ce que c'est</h3>
<p>Un calendrier de l'avent à partager entre un adulte et un enfant de 3 à 6 ans. Chaque jour, un petit jeu et une fiche pour l'adulte abordent le corps, l'intimité, le droit de dire oui ou non, les émotions et les personnes de confiance.</p>
<h3>Son objectif</h3>
<p>Ouvrir le dialogue, avec des mots simples et un ton joyeux, pour que parler de son corps et de ce que l'on ressent devienne naturel à la maison.</p>
<h3>Ce que ce n'est pas</h3>
<ul><li>Ce n'est ni un outil de dépistage, ni un avis médical, psychologique ou juridique.</li><li>Il ne garantit pas, à lui seul, la sécurité d'un enfant.</li><li>Il ne remplace ni votre présence, ni le travail des professionnel·les de l'enfance et de la santé.</li></ul>
<h3>Qui l'a conçu</h3>
<p>Ce calendrier a été conçu par <a href="https://www.linkedin.com/in/carinesit/" target="_blank" rel="noopener">Carine Sit</a>, maman, et femme soucieuse de l'épanouissement et de l'émancipation joyeuse des enfants.</p>
<p>Carine n'est ni professionnelle de santé, ni psychologue, ni experte de la protection de l'enfance. Elle a construit ce calendrier à partir de documents publiés par des institutions et des associations reconnues, dont la liste figure plus bas.</p>
<h3>À lire avant de l'utiliser</h3>
<ul>
<li>Une relecture par un·e professionnel·le de l'enfance est en cours. Vos remarques sont les bienvenues : si vous repérez une erreur ou une formulation à améliorer, écrivez à <a href="mailto:calendriersuperpouvoirs@gmail.com">calendriersuperpouvoirs@gmail.com</a>.</li>
<li>Ce calendrier est proposé comme une <strong>ressource parmi d'autres</strong>. Il ne se substitue pas au travail des professionnel·les : médecins, psychologues, enseignant·es, services de protection de l'enfance.</li>
<li>Chaque enfant est différent. Vous connaissez le vôtre : adaptez, sautez une fenêtre, ou arrêtez si un jeu met mal à l'aise.</li>
<li>Si une situation vous inquiète, ou si votre enfant vous confie quelque chose, ne cherchez pas la réponse ici : tournez-vous vers un·e professionnel·le, ou appelez le <strong>119</strong>.</li>
</ul>
<h3>Les sources</h3>
<p>Les jeux et les fiches ont été construits à partir de ces documents.</p>
<ul>
<li>Ministère de l'Éducation nationale : programme d'éducation à la vie affective et relationnelle à l'école maternelle (2025) ; vademecum « Violences sexuelles intrafamiliales : comprendre, prévenir, repérer et agir » ; guide « Prévention et traitement des violences sexuelles ».</li>
<li>Ville de Paris : guide pour les parents « Prévenir, repérer, agir contre les violences sexuelles faites aux enfants » (3<sup>e</sup> édition, 2026).</li>
<li>CRIAVS Île-de-France : « Les comportements sexuels des enfants et des adolescents » (violences-sexuelles.info).</li>
<li>Conseil de l'Europe : « Kiko et la main » et la règle « On ne touche pas ici ».</li>
<li>Service national d'accueil téléphonique de l'enfance en danger (119) et UNICEF France, pour les droits de l'enfant et les contacts.</li>
<li>Fondation Marie-Vincent (Québec) : cahier parent-enfant « Parle-moi plus, Marvin » et cahier-causerie « Dis-moi tout, Marvin ».</li>
<li>Bayard Jeunesse : livrets « Mon corps est un trésor » et « Stop aux violences sexuelles faites aux enfants ».</li>
<li>Saprea : « Enseigner le consentement à votre enfant ».</li>
<li>Office national du film du Canada : guide du programme « Mon corps, c'est mon corps ».</li>
<li>Association Mémoire traumatique et victimologie : « Quand on te fait du mal », illustré par Claude Ponti.</li>
<li>Sites de l'association Mille Miettes et du projet <em>Le Loup</em> (Mai Lan Chapiron) ; Comitys ; Le Journal de l'Animation, « 25 ressources pour prévenir les violences sexuelles faites aux enfants et agir ».</li>
<li>Éditions CrackBoom! : fiche pédagogique de l'album « Ton corps t'appartient ! ».</li>
<li>Pour les contacts utiles : Ville de Paris, CIIVISE, e-Enfance (3018), France Victimes (116 006) et service-public.gouv.fr.</li>
</ul>
<p>Les liens vers ces documents sont dans la rubrique Ressources.</p>
<h3>Une conviction</h3>
<p>La sécurité des enfants ne doit jamais reposer sur les enfants eux-mêmes. Les protéger est la responsabilité des adultes, et un sujet collectif : familles, écoles, institutions, société tout entière. Sensibiliser un enfant ne le rend pas responsable de ce qui pourrait lui arriver. Cela lui donne des mots, et cela contribue à une vigilance partagée, qui compte.</p>
<h3>Crédits</h3>
<p>Musique : <em>Wintery loop</em>, Emma_MA (opengameart.org), domaine public (CC0).</p>
<p>Polices de caractères : Bricolage Grotesque, Bagel Fat One et Nunito, polices libres (licence SIL Open Font License).</p>
<h3>Nous écrire</h3>
<p>Une question, une remarque, une erreur à signaler ? Écrivez à <a href="mailto:calendriersuperpouvoirs@gmail.com">calendriersuperpouvoirs@gmail.com</a>.</p>
<p class="note">En cas d'inquiétude pour un enfant, n'écrivez pas à cette adresse : appelez le <strong>119</strong>, gratuit, 24h/24.</p>`
  },
  mentions: {
    title: "Mentions légales",
    html: `
<h3>Éditrice du site</h3>
<p>Ce site est édité à titre personnel par Carine Sit, particulier.</p>
<p>Contact : <a href="mailto:calendriersuperpouvoirs@gmail.com">calendriersuperpouvoirs@gmail.com</a></p>
<h3>Hébergement</h3>
<p>Ce site est hébergé par GitHub Pages, un service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis. Contact : <a href="https://support.github.com/" target="_blank" rel="noopener">support.github.com</a>.</p>
<h3>Propriété des contenus</h3>
<p>© 2026 Carine Sit. Tous droits réservés. Les textes, les jeux, les illustrations et le code de ce calendrier ont été créés par son éditrice et lui appartiennent.</p>
<p>Ce que vous pouvez faire librement :</p>
<ul>
<li>utiliser le calendrier gratuitement, en famille, en classe ou en association ;</li>
<li>partager le lien du site ;</li>
<li>imprimer le diplôme.</li>
</ul>
<p>Pour toute autre utilisation (copier, adapter ou republier des textes, des jeux, des illustrations ou le code du site), merci de demander l'accord de l'éditrice à <a href="mailto:calendriersuperpouvoirs@gmail.com">calendriersuperpouvoirs@gmail.com</a>.</p>
<p>La musique et les polices de caractères appartiennent à leurs auteurs et sont utilisées sous licence libre. Le détail figure dans <button type="button" class="inlinelink" data-info="apropos">« À propos »</button>.</p>
<h3>Données personnelles</h3>
<ul>
<li>Ce site ne collecte aucune donnée personnelle : pas de compte, pas de formulaire, pas de statistiques de visite, pas de publicité.</li>
<li>Il n'utilise aucun cookie de suivi et ne transmet aucune donnée à des tiers.</li>
<li>Le personnage choisi, son nom, les jeux réussis et le réglage de la musique sont enregistrés uniquement dans votre navigateur, sur votre appareil. Vous pouvez les effacer à tout moment avec « Réinitialiser le jeu », dans les réglages du calendrier.</li>
</ul>
<h3>Liens vers d'autres sites</h3>
<p>Ce site renvoie vers des sites extérieurs, qui ont leurs propres règles. Son éditrice n'est pas responsable de leur contenu.</p>
<h3>Limites</h3>
<p>Ce calendrier est une ressource de sensibilisation. Il ne remplace pas l'avis d'un·e professionnel·le de santé, de l'enfance ou du droit. En cas d'inquiétude pour un enfant, appelez le <strong>119</strong>.</p>`
  },
  parents: {
    title: "Espace parents", sub: "Conseils pratiques pour accompagner votre enfant",
    html: `
<p class="lead">Si la protection des enfants relève d'une responsabilité collective, parler du corps, de l'intimité et des émotions avec un enfant est un moyen clé pour y contribuer. Donner aux enfants l'espace et les mots pour parler librement et spontanément de ce qu'ils ressentent, c'est aussi leur donner la capacité de dire ce qui leur arrive et ce qu'ils traversent. Et, in fine, donner aux adultes les moyens de mieux les accompagner.</p>

<section class="sec s1">
<h3><span class="n">1</span>Le calendrier, mode d'emploi</h3>
<p>Le calendrier des super-pouvoirs est un outil pédagogique conçu pour sensibiliser les enfants au consentement et au respect de leur corps. Il se présente sous la forme d'un calendrier de l'avent qui, chaque jour, propose un moment à partager en famille pour aborder ces sujets de manière simple et ludique.</p>
<h4>Ses objectifs</h4>
<ul>
<li><strong>Sensibiliser</strong> votre enfant à son corps, à son intimité et au respect de celui des autres.</li>
<li>L'aider à <strong>reconnaître et à dire ce qu'il ressent</strong>.</li>
<li>Installer des <strong>réflexes simples</strong> : demander avant de toucher, dire non, s'éloigner, en parler à un adulte de confiance.</li>
<li>Créer entre vous une <strong>habitude de dialogue</strong> sur ces sujets.</li>
</ul>
<p class="key">Le calendrier donne des mots à votre enfant. La protection, elle, reste le rôle des adultes : ce n'est jamais à l'enfant de se protéger seul.</p>
<h4>Comment l'utiliser</h4>
<ul>
<li>Du 1<sup>er</sup> au 24 décembre, chaque jour ouvre un petit jeu à faire en famille et une fiche de conseils pour les parents.</li>
<li>Les jours passés restent ouverts : une fenêtre manquée se rattrape quand vous voulez.</li>
<li>Chaque jeu prend 5 à 10 minutes. Jouez ensemble : lisez les consignes à voix haute et votre enfant répond.</li>
<li>À partir du 2 décembre, chaque jeu démarre par une petite révision de ce qui a été vu la veille. Vous pouvez décider de sauter cette étape et de passer directement à la fiche du jour.</li>
<li>Chaque fenêtre a un onglet « Fiche adulte » : l'objectif du jour, comment en parler, et des idées pour poursuivre la dynamique au quotidien.</li>
<li>Si votre enfant n'a pas envie, on reporte.</li>
<li>Le bouton « Réglages » permet de débloquer toutes les fenêtres en avance (avant le 24 décembre), ou de réinitialiser le jeu (c'est-à-dire effacer les super-pouvoirs gagnés et le personnage choisi).</li>
</ul>
<h4>Quand votre enfant vous pose une question</h4>
<ul>
<li>Montrez-vous ouvert·e : « Merci de me partager ton interrogation. »</li>
<li>Demandez d'abord ce que votre enfant en pense : « Et toi, qu'en dis-tu ? »</li>
<li>Vous avez le droit de réfléchir avant de répondre. Revenez-y ensuite, comme promis.</li>
<li>Évitez d'esquiver ou de dire « on ne parle pas de ça » : votre enfant irait chercher la réponse ailleurs.</li>
</ul>
<h4>Méthodologie</h4>
<p>Les jeux et les fiches ont été construits à partir de documents publiés par des professionnel·les et des institutions reconnues. Une relecture par un·e professionnel·le de l'enfance est en cours. Une remarque, une correction à proposer ? Écrivez à <a href="mailto:calendriersuperpouvoirs@gmail.com">calendriersuperpouvoirs@gmail.com</a>. <button type="button" class="inlinelink" data-info="apropos">En savoir plus dans « À propos »</button></p>
</section>

<section class="sec s2">
<h3><span class="n">2</span>Quelques repères entre 3 et 6 ans</h3>
<p>Découvrir son corps et celui des autres fait partie du développement. Des signes peuvent vous indiquer si le rapport de votre enfant à son corps relève d'une phase de découverte, ou s'il doit susciter une vigilance, voire une inquiétude.</p>
<div class="levels">
<div class="lv ok"><strong>Comportement de découverte</strong>Poser des questions, jouer au docteur, aimer être nu, explorer son propre corps.</div>
<div class="lv mid"><strong>Comportement préoccupant</strong>Reposer sans cesse les mêmes questions, se montrer nu en public, observer les autres avec insistance, malgré vos explications.</div>
<div class="lv hi"><strong>Comportement nécessitant une aide professionnelle</strong>Forcer d'autres enfants, en savoir beaucoup trop pour son âge, se blesser, agir en cachette puis nier.</div>
</div>
<h4>D'autres signes qui peuvent alerter</h4>
<p>Un changement soudain et inexpliqué mérite toujours votre attention :</p>
<ul>
<li>humeur : tristesse, colère ou repli inhabituels ;</li>
<li>sommeil et appétit : cauchemars, difficultés à s'endormir, refus de manger ;</li>
<li>plaintes répétées : maux de ventre, maux de tête ;</li>
<li>rapport au corps : refus de se déshabiller, de se laver ou d'être touché ;</li>
<li>retours en arrière : pipi au lit, peur de dormir seul, refus panique d'aller dans un lieu.</li>
</ul>
<p>Ces signes peuvent avoir bien d'autres causes (ex : arrivée d'un bébé dans la famille). Ils ne prouvent rien, mais ils se prennent au sérieux.</p>
<p>À qui en parler : votre médecin, un·e psychologue ou pédopsychiatre, le centre médico-psychologique (CMP) de votre secteur, le ou la psychologue scolaire.</p>
</section>

<section class="sec s3">
<h3><span class="n">3</span>Si votre enfant vous confie quelque chose</h3>
<h4>Ce que vous pouvez dire</h4>
<p class="key">« Je te crois. » « Ce n'est pas ta faute. » « Merci de m'en avoir parlé, c'est courageux. » « Personne n'a le droit de te faire ça. » « Je vais t'aider. »</p>
<h4>Ce qu'il faut faire</h4>
<ul>
<li>Gardez votre calme et laissez votre enfant parler librement.</li>
<li>Notez ses mots tels quels, sans les interpréter.</li>
<li>Ne restez pas seul·e : appelez le <strong>119</strong>, gratuit, 24h/24 et 7j/7. Il conseille aussi les parents.</li>
<li>En cas de danger immédiat : le <strong>17</strong> ou le <strong>112</strong>.</li>
<li>Pour les autres numéros d'aide, dont ceux du périscolaire : <button type="button" class="inlinelink" data-info="contacts">voir « Contacts utiles »</button>.</li>
</ul>
<h4>Ce qu'il faut éviter</h4>
<ul>
<li>Faire répéter, ou poser des questions fermées.</li>
<li>Chercher des preuves : c'est le rôle des enquêteurs.</li>
<li>Promettre quoi que ce soit sur la suite, ou de garder le secret.</li>
<li>Minimiser ou culpabiliser : « Ce n'est pas grave », « Pourquoi tu n'as rien dit plus tôt ? ».</li>
<li>Gronder ou punir un enfant parce qu'il a parlé.</li>
<li>Orienter ses réponses ou citer un prénom.</li>
</ul>
<h4>Si vous avez un doute et qu'il ou elle n'a rien dit</h4>
<ul>
<li>Un enfant met souvent longtemps à parler, et son silence ne veut pas dire que tout va bien.</li>
<li>Plutôt que de questionner, appuyez-vous sur un support : un album, une courte vidéo, un jeu de ce calendrier. Laissez votre enfant réagir spontanément.</li>
<li>Demandez simplement : « À quoi cela te fait penser ? »</li>
<li>Des idées de supports : <button type="button" class="inlinelink" data-info="ressources">voir « Ressources »</button>.</li>
</ul>
</section>`
  }
};
