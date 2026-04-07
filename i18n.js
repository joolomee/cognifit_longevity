/**
 * CogniFit Longevity — i18n Engine v1.0
 * 22 languages | geo-detection | localStorage persistence | RTL support
 */
(function() {
  'use strict';

  var LANGUAGES = {
    en:      { name:'English',        nativeName:'English',          dir:'ltr', flag:'🇬🇧' },
    es:      { name:'Spanish',        nativeName:'Español',          dir:'ltr', flag:'🇪🇸' },
    fr:      { name:'French',         nativeName:'Français',         dir:'ltr', flag:'🇫🇷' },
    de:      { name:'German',         nativeName:'Deutsch',          dir:'ltr', flag:'🇩🇪' },
    it:      { name:'Italian',        nativeName:'Italiano',         dir:'ltr', flag:'🇮🇹' },
    pt:      { name:'Portuguese',     nativeName:'Português',        dir:'ltr', flag:'🇵🇹' },
    nl:      { name:'Dutch',          nativeName:'Nederlands',       dir:'ltr', flag:'🇳🇱' },
    pl:      { name:'Polish',         nativeName:'Polski',           dir:'ltr', flag:'🇵🇱' },
    ru:      { name:'Russian',        nativeName:'Русский',          dir:'ltr', flag:'🇷🇺' },
    ar:      { name:'Arabic',         nativeName:'العربية',          dir:'rtl', flag:'🇸🇦' },
    he:      { name:'Hebrew',         nativeName:'עברית',            dir:'rtl', flag:'🇮🇱' },
    zh:      { name:'Chinese (S)',    nativeName:'中文(简体)',         dir:'ltr', flag:'🇨🇳' },
    'zh-HK': { name:'Chinese (T)',    nativeName:'中文(繁體)',         dir:'ltr', flag:'🇭🇰' },
    ja:      { name:'Japanese',       nativeName:'日本語',            dir:'ltr', flag:'🇯🇵' },
    ko:      { name:'Korean',         nativeName:'한국어',             dir:'ltr', flag:'🇰🇷' },
    tr:      { name:'Turkish',        nativeName:'Türkçe',           dir:'ltr', flag:'🇹🇷' },
    id:      { name:'Indonesian',     nativeName:'Bahasa Indonesia', dir:'ltr', flag:'🇮🇩' },
    bn:      { name:'Bengali',        nativeName:'বাংলা',             dir:'ltr', flag:'🇧🇩' },
    mn:      { name:'Mongolian',      nativeName:'Монгол',           dir:'ltr', flag:'🇲🇳' },
    ur:      { name:'Urdu',           nativeName:'اردو',             dir:'rtl', flag:'🇵🇰' },
    sr:      { name:'Serbian',        nativeName:'Српски',           dir:'ltr', flag:'🇷🇸' },
    el:      { name:'Greek',          nativeName:'Ελληνικά',         dir:'ltr', flag:'🇬🇷' }
  };

  var GEO_MAP = {
    GB:'en',US:'en',AU:'en',CA:'en',NZ:'en',IE:'en',ZA:'en',
    ES:'es',MX:'es',AR:'es',CO:'es',CL:'es',PE:'es',VE:'es',EC:'es',BO:'es',PY:'es',UY:'es',
    FR:'fr',BE:'fr',SN:'fr',CI:'fr',MA:'fr',DZ:'fr',TN:'fr',
    DE:'de',AT:'de',
    IT:'it',
    PT:'pt',BR:'pt',AO:'pt',MZ:'pt',
    NL:'nl',
    PL:'pl',
    RU:'ru',KZ:'ru',BY:'ru',
    SA:'ar',AE:'ar',EG:'ar',JO:'ar',KW:'ar',QA:'ar',BH:'ar',IQ:'ar',SY:'ar',LB:'ar',YE:'ar',OM:'ar',LY:'ar',
    IL:'he',
    CN:'zh',
    HK:'zh-HK',TW:'zh-HK',MO:'zh-HK',
    JP:'ja',
    KR:'ko',
    TR:'tr',
    ID:'id',MY:'id',
    BD:'bn',IN:'bn',
    MN:'mn',
    PK:'ur',
    RS:'sr',ME:'sr',BA:'sr',
    GR:'el',CY:'el'
  };

  var T = {
    en: {
      'page.title':'Cognitive Longevity & Brain Health Training | CogniFit — 1,083+ Studies',
      'nav.platform':'Platform','nav.faq':'FAQ','nav.science':'Science','nav.training':'Brain Training','nav.join':'Join Now',
      'hero.badge':'Cognitive Longevity System',
      'hero.h1.line1':'Live Longer.','hero.h1.line2':'Think Better.','hero.h1.line3':'Stay Independent.',
      'hero.sub':'Aging is inevitable. <strong>Cognitive decline doesn\'t have to be.</strong> Protect the core mental abilities that determine how independently you live as you age.',
      'hero.readtime':'4 min read · Based on 1,083+ clinical studies',
      'hero.cta':'Protect Your Brain','hero.guarantee1':'100% Satisfaction Guaranteed','hero.guarantee2':'30 Day Money Back',
      'hero.users':'USERS WORLDWIDE','hero.scroll':'Scroll',
      'discover.eyebrow':'Cognitive Assessment','discover.h2':'Discover Your Brain\'s Strengths and Weaknesses',
      'discover.cta':'Discover Your Brain',
      'risk.eyebrow':'The Real Problem','risk.h2':'The Real Risk of Aging Isn\'t Physical — It\'s Cognitive',
      'sci.eyebrow':'The Science','sci.h2':'The Science Behind Brain Health & Cognitive Longevity',
      'steps.eyebrow':'How It Works','steps.h2':'Your 4-Step Cognitive Longevity System',
      'who.eyebrow':'Who It\'s For','who.h2':'Built for Every Stage of the Cognitive Longevity Journey',
      'reviews.eyebrow':'Real Results','reviews.h2':'What People Say About CogniFit',
      'faq.eyebrow':'Questions & Answers','faq.h2':'Frequently Asked Questions',
      'closing.cta':'Take the Free Brain Assessment',
      'footer.privacy':'Privacy Policy','footer.terms':'Terms of Service','footer.contact':'Contact','footer.copy':'© 2026 CogniFit Ltd. All rights reserved.'
    },
    es: {
      'page.title':'Longevidad Cognitiva y Entrenamiento Cerebral | CogniFit',
      'nav.platform':'Plataforma','nav.faq':'Preguntas','nav.science':'Ciencia','nav.training':'Entrenamiento','nav.join':'Únete',
      'hero.badge':'Sistema de Longevidad Cognitiva',
      'hero.h1.line1':'Vive más.','hero.h1.line2':'Piensa mejor.','hero.h1.line3':'Mantén tu independencia.',
      'hero.sub':'Envejecer es inevitable. <strong>El deterioro cognitivo no tiene por qué serlo.</strong> Protege las habilidades mentales que determinan tu independencia.',
      'hero.readtime':'4 min de lectura · Basado en 1.083+ estudios clínicos',
      'hero.cta':'Protege tu cerebro','hero.guarantee1':'Satisfacción 100% garantizada','hero.guarantee2':'Devolución en 30 días',
      'hero.users':'USUARIOS EN TODO EL MUNDO','hero.scroll':'Desplázate',
      'discover.eyebrow':'Evaluación Cognitiva','discover.h2':'Descubre las Fortalezas y Debilidades de Tu Cerebro',
      'discover.cta':'Descubre Tu Cerebro',
      'risk.eyebrow':'El Problema Real','risk.h2':'El Verdadero Riesgo del Envejecimiento No Es Físico — Es Cognitivo',
      'sci.eyebrow':'La Ciencia','sci.h2':'La Ciencia Detrás de la Salud Cerebral y la Longevidad Cognitiva',
      'steps.eyebrow':'Cómo Funciona','steps.h2':'Tu Sistema de Longevidad Cognitiva en 4 Pasos',
      'who.eyebrow':'Para Quién Es','who.h2':'Diseñado para Cada Etapa del Viaje de Longevidad Cognitiva',
      'reviews.eyebrow':'Resultados Reales','reviews.h2':'Lo Que Dicen las Personas Sobre CogniFit',
      'faq.eyebrow':'Preguntas y Respuestas','faq.h2':'Preguntas Frecuentes',
      'closing.cta':'Haz la Evaluación Cerebral Gratuita',
      'footer.privacy':'Política de Privacidad','footer.terms':'Términos de Servicio','footer.contact':'Contacto','footer.copy':'© 2026 CogniFit Ltd. Todos los derechos reservados.'
    },
    fr: {
      'page.title':'Longévité Cognitive et Entraînement Cérébral | CogniFit',
      'nav.platform':'Plateforme','nav.faq':'FAQ','nav.science':'Science','nav.training':'Entraînement','nav.join':'Rejoindre',
      'hero.badge':'Système de Longévité Cognitive',
      'hero.h1.line1':'Vivez plus longtemps.','hero.h1.line2':'Pensez mieux.','hero.h1.line3':'Restez indépendant.',
      'hero.sub':'Le vieillissement est inévitable. <strong>Le déclin cognitif ne l\'est pas.</strong> Protégez les capacités mentales qui déterminent votre indépendance.',
      'hero.readtime':'4 min de lecture · Basé sur 1 083+ études cliniques',
      'hero.cta':'Protégez votre cerveau','hero.guarantee1':'Satisfaction 100% garantie','hero.guarantee2':'Remboursement 30 jours',
      'hero.users':'UTILISATEURS DANS LE MONDE','hero.scroll':'Défiler',
      'discover.eyebrow':'Évaluation Cognitive','discover.h2':'Découvrez les Forces et Faiblesses de Votre Cerveau',
      'discover.cta':'Découvrez Votre Cerveau',
      'risk.eyebrow':'Le Vrai Problème','risk.h2':'Le Vrai Risque du Vieillissement N\'est Pas Physique — C\'est Cognitif',
      'sci.eyebrow':'La Science','sci.h2':'La Science Derrière la Santé Cérébrale et la Longévité Cognitive',
      'steps.eyebrow':'Comment Ça Fonctionne','steps.h2':'Votre Système de Longévité Cognitive en 4 Étapes',
      'who.eyebrow':'Pour Qui','who.h2':'Conçu pour Chaque Étape du Parcours de Longévité Cognitive',
      'reviews.eyebrow':'Résultats Réels','reviews.h2':'Ce Que les Gens Disent de CogniFit',
      'faq.eyebrow':'Questions & Réponses','faq.h2':'Questions Fréquemment Posées',
      'closing.cta':'Faire l\'Évaluation Cérébrale Gratuite',
      'footer.privacy':'Politique de Confidentialité','footer.terms':'Conditions d\'Utilisation','footer.contact':'Contact','footer.copy':'© 2026 CogniFit Ltd. Tous droits réservés.'
    },
    de: {
      'page.title':'Kognitive Langlebigkeit & Gehirntraining | CogniFit',
      'nav.platform':'Plattform','nav.faq':'FAQ','nav.science':'Wissenschaft','nav.training':'Gehirntraining','nav.join':'Jetzt beitreten',
      'hero.badge':'Kognitives Langlebigkeitssystem',
      'hero.h1.line1':'Länger leben.','hero.h1.line2':'Besser denken.','hero.h1.line3':'Unabhängig bleiben.',
      'hero.sub':'Altern ist unvermeidlich. <strong>Kognitiver Abbau muss es nicht sein.</strong> Schützen Sie die mentalen Fähigkeiten, die Ihre Unabhängigkeit bestimmen.',
      'hero.readtime':'4 Min. Lesezeit · Basierend auf 1.083+ klinischen Studien',
      'hero.cta':'Schützen Sie Ihr Gehirn','hero.guarantee1':'100% Zufriedenheitsgarantie','hero.guarantee2':'30-Tage-Geld-zurück',
      'hero.users':'NUTZER WELTWEIT','hero.scroll':'Scrollen',
      'discover.eyebrow':'Kognitive Bewertung','discover.h2':'Entdecken Sie die Stärken und Schwächen Ihres Gehirns',
      'discover.cta':'Entdecken Sie Ihr Gehirn',
      'risk.eyebrow':'Das Eigentliche Problem','risk.h2':'Das Eigentliche Risiko des Alterns ist Nicht Körperlich — Es ist Kognitiv',
      'sci.eyebrow':'Die Wissenschaft','sci.h2':'Die Wissenschaft Hinter Gehirngesundheit und Kognitiver Langlebigkeit',
      'steps.eyebrow':'Wie Es Funktioniert','steps.h2':'Ihr 4-Stufiges Kognitives Langlebigkeitssystem',
      'who.eyebrow':'Für Wen','who.h2':'Für Jede Phase der Kognitiven Langlebigkeitsreise Konzipiert',
      'reviews.eyebrow':'Echte Ergebnisse','reviews.h2':'Was Menschen über CogniFit Sagen',
      'faq.eyebrow':'Fragen & Antworten','faq.h2':'Häufig Gestellte Fragen',
      'closing.cta':'Kostenlose Gehirnbewertung Machen',
      'footer.privacy':'Datenschutzrichtlinie','footer.terms':'Nutzungsbedingungen','footer.contact':'Kontakt','footer.copy':'© 2026 CogniFit Ltd. Alle Rechte vorbehalten.'
    },
    it: {
      'page.title':'Longevità Cognitiva e Allenamento Cerebrale | CogniFit',
      'nav.platform':'Piattaforma','nav.faq':'FAQ','nav.science':'Scienza','nav.training':'Allenamento','nav.join':'Unisciti ora',
      'hero.badge':'Sistema di Longevità Cognitiva',
      'hero.h1.line1':'Vivi più a lungo.','hero.h1.line2':'Pensa meglio.','hero.h1.line3':'Rimani indipendente.',
      'hero.sub':'Invecchiare è inevitabile. <strong>Il declino cognitivo non deve esserlo.</strong> Proteggi le capacità mentali che determinano la tua indipendenza.',
      'hero.readtime':'4 min di lettura · Basato su 1.083+ studi clinici',
      'hero.cta':'Proteggi il tuo cervello','hero.guarantee1':'Soddisfazione garantita al 100%','hero.guarantee2':'Rimborso in 30 giorni',
      'hero.users':'UTENTI IN TUTTO IL MONDO','hero.scroll':'Scorri',
      'discover.eyebrow':'Valutazione Cognitiva','discover.h2':'Scopri i Punti di Forza e Debolezza del Tuo Cervello',
      'discover.cta':'Scopri il Tuo Cervello',
      'risk.eyebrow':'Il Vero Problema','risk.h2':'Il Vero Rischio dell\'Invecchiamento Non È Fisico — È Cognitivo',
      'sci.eyebrow':'La Scienza','sci.h2':'La Scienza Dietro la Salute Cerebrale e la Longevità Cognitiva',
      'steps.eyebrow':'Come Funziona','steps.h2':'Il Tuo Sistema di Longevità Cognitiva in 4 Fasi',
      'who.eyebrow':'Per Chi È','who.h2':'Progettato per Ogni Fase del Percorso di Longevità Cognitiva',
      'reviews.eyebrow':'Risultati Reali','reviews.h2':'Cosa Dicono le Persone di CogniFit',
      'faq.eyebrow':'Domande & Risposte','faq.h2':'Domande Frequenti',
      'closing.cta':'Fai la Valutazione Cerebrale Gratuita',
      'footer.privacy':'Informativa sulla Privacy','footer.terms':'Termini di Servizio','footer.contact':'Contatto','footer.copy':'© 2026 CogniFit Ltd. Tutti i diritti riservati.'
    },
    pt: {
      'page.title':'Longevidade Cognitiva e Treino Cerebral | CogniFit',
      'nav.platform':'Plataforma','nav.faq':'FAQ','nav.science':'Ciência','nav.training':'Treino Cerebral','nav.join':'Aderir agora',
      'hero.badge':'Sistema de Longevidade Cognitiva',
      'hero.h1.line1':'Viva mais.','hero.h1.line2':'Pense melhor.','hero.h1.line3':'Mantenha a sua independência.',
      'hero.sub':'Envelhecer é inevitável. <strong>O declínio cognitivo não tem de ser.</strong> Proteja as capacidades mentais que determinam a sua independência.',
      'hero.readtime':'4 min de leitura · Baseado em 1.083+ estudos clínicos',
      'hero.cta':'Proteja o Seu Cérebro','hero.guarantee1':'Satisfação 100% garantida','hero.guarantee2':'Reembolso em 30 dias',
      'hero.users':'UTILIZADORES EM TODO O MUNDO','hero.scroll':'Descer',
      'discover.eyebrow':'Avaliação Cognitiva','discover.h2':'Descubra os Pontos Fortes e Fracos do Seu Cérebro',
      'discover.cta':'Descubra o Seu Cérebro',
      'risk.eyebrow':'O Problema Real','risk.h2':'O Verdadeiro Risco do Envelhecimento Não É Físico — É Cognitivo',
      'sci.eyebrow':'A Ciência','sci.h2':'A Ciência por Trás da Saúde Cerebral e da Longevidade Cognitiva',
      'steps.eyebrow':'Como Funciona','steps.h2':'O Seu Sistema de Longevidade Cognitiva em 4 Passos',
      'who.eyebrow':'Para Quem É','who.h2':'Criado para Cada Fase da Jornada de Longevidade Cognitiva',
      'reviews.eyebrow':'Resultados Reais','reviews.h2':'O Que as Pessoas Dizem sobre a CogniFit',
      'faq.eyebrow':'Perguntas & Respostas','faq.h2':'Perguntas Frequentes',
      'closing.cta':'Fazer a Avaliação Cerebral Gratuita',
      'footer.privacy':'Política de Privacidade','footer.terms':'Termos de Serviço','footer.contact':'Contacto','footer.copy':'© 2026 CogniFit Ltd. Todos os direitos reservados.'
    },
    nl: {
      'page.title':'Cognitieve Levensduur & Hersentraining | CogniFit',
      'nav.platform':'Platform','nav.faq':'FAQ','nav.science':'Wetenschap','nav.training':'Hersentraining','nav.join':'Nu meedoen',
      'hero.badge':'Cognitief Langlevenheidssysteem',
      'hero.h1.line1':'Langer leven.','hero.h1.line2':'Beter denken.','hero.h1.line3':'Blijf onafhankelijk.',
      'hero.sub':'Veroudering is onvermijdelijk. <strong>Cognitieve achteruitgang hoeft dat niet te zijn.</strong>',
      'hero.readtime':'4 min lezen · Gebaseerd op 1.083+ klinische studies',
      'hero.cta':'Bescherm uw hersenen','hero.guarantee1':'100% tevredenheidsgarantie','hero.guarantee2':'30 dagen geld terug',
      'hero.users':'GEBRUIKERS WERELDWIJD','hero.scroll':'Scrollen',
      'discover.eyebrow':'Cognitieve beoordeling','discover.h2':'Ontdek de sterke en zwakke punten van uw hersenen',
      'discover.cta':'Ontdek uw hersenen',
      'risk.eyebrow':'Het echte probleem','risk.h2':'Het echte risico van veroudering is niet fysiek — het is cognitief',
      'sci.eyebrow':'De wetenschap','sci.h2':'De wetenschap achter hersengezonheid en cognitieve levensduur',
      'steps.eyebrow':'Hoe het werkt','steps.h2':'Uw 4-staps cognitief levensduursysteem',
      'who.eyebrow':'Voor wie','who.h2':'Gebouwd voor elke fase van de cognitieve levensduur',
      'reviews.eyebrow':'Echte resultaten','reviews.h2':'Wat mensen zeggen over CogniFit',
      'faq.eyebrow':'Vragen & Antwoorden','faq.h2':'Veelgestelde vragen',
      'closing.cta':'Doe de gratis hersenbeoordeling',
      'footer.privacy':'Privacybeleid','footer.terms':'Servicevoorwaarden','footer.contact':'Contact','footer.copy':'© 2026 CogniFit Ltd. Alle rechten voorbehouden.'
    },
    pl: {
      'page.title':'Długowieczność Poznawcza i Trening Mózgu | CogniFit',
      'nav.platform':'Platforma','nav.faq':'FAQ','nav.science':'Nauka','nav.training':'Trening mózgu','nav.join':'Dołącz teraz',
      'hero.badge':'System Długowieczności Poznawczej',
      'hero.h1.line1':'Żyj dłużej.','hero.h1.line2':'Myśl lepiej.','hero.h1.line3':'Pozostań niezależny.',
      'hero.sub':'Starzenie się jest nieuniknione. <strong>Pogorszenie funkcji poznawczych nie musi być.</strong>',
      'hero.readtime':'4 min czytania · Oparty na 1 083+ badaniach klinicznych',
      'hero.cta':'Chroń swój mózg','hero.guarantee1':'100% gwarancja satysfakcji','hero.guarantee2':'30-dniowy zwrot pieniędzy',
      'hero.users':'UŻYTKOWNIKÓW NA CAŁYM ŚWIECIE','hero.scroll':'Przewiń',
      'discover.eyebrow':'Ocena poznawcza','discover.h2':'Odkryj mocne i słabe strony swojego mózgu',
      'discover.cta':'Odkryj swój mózg',
      'risk.eyebrow':'Prawdziwy problem','risk.h2':'Prawdziwe ryzyko starzenia się nie jest fizyczne — jest poznawcze',
      'sci.eyebrow':'Nauka','sci.h2':'Nauka stojąca za zdrowiem mózgu i długowiecznością poznawczą',
      'steps.eyebrow':'Jak to działa','steps.h2':'Twój 4-etapowy system długowieczności poznawczej',
      'who.eyebrow':'Dla kogo','who.h2':'Stworzony dla każdego etapu podróży długowieczności poznawczej',
      'reviews.eyebrow':'Prawdziwe wyniki','reviews.h2':'Co ludzie mówią o CogniFit',
      'faq.eyebrow':'Pytania i odpowiedzi','faq.h2':'Często zadawane pytania',
      'closing.cta':'Zrób bezpłatną ocenę mózgu',
      'footer.privacy':'Polityka prywatności','footer.terms':'Warunki usługi','footer.contact':'Kontakt','footer.copy':'© 2026 CogniFit Ltd. Wszelkie prawa zastrzeżone.'
    },
    ru: {
      'page.title':'Когнитивное Долголетие и Тренировка Мозга | CogniFit',
      'nav.platform':'Платформа','nav.faq':'FAQ','nav.science':'Наука','nav.training':'Тренировка мозга','nav.join':'Присоединиться',
      'hero.badge':'Система когнитивного долголетия',
      'hero.h1.line1':'Живите дольше.','hero.h1.line2':'Думайте лучше.','hero.h1.line3':'Сохраняйте независимость.',
      'hero.sub':'Старение неизбежно. <strong>Когнитивный спад — нет.</strong>',
      'hero.readtime':'4 мин чтения · На основе 1 083+ клинических исследований',
      'hero.cta':'Защитите свой мозг','hero.guarantee1':'100% гарантия удовлетворения','hero.guarantee2':'Возврат за 30 дней',
      'hero.users':'ПОЛЬЗОВАТЕЛЕЙ ПО ВСЕМУ МИРУ','hero.scroll':'Прокрутите',
      'discover.eyebrow':'Когнитивная оценка','discover.h2':'Откройте сильные и слабые стороны вашего мозга',
      'discover.cta':'Исследуйте свой мозг',
      'risk.eyebrow':'Реальная проблема','risk.h2':'Настоящий риск старения — не физический, а когнитивный',
      'sci.eyebrow':'Наука','sci.h2':'Наука о здоровье мозга и когнитивном долголетии',
      'steps.eyebrow':'Как это работает','steps.h2':'Ваша 4-этапная система когнитивного долголетия',
      'who.eyebrow':'Для кого','who.h2':'Создана для каждого этапа пути когнитивного долголетия',
      'reviews.eyebrow':'Реальные результаты','reviews.h2':'Что люди говорят о CogniFit',
      'faq.eyebrow':'Вопросы и ответы','faq.h2':'Часто задаваемые вопросы',
      'closing.cta':'Пройти бесплатную оценку мозга',
      'footer.privacy':'Политика конфиденциальности','footer.terms':'Условия обслуживания','footer.contact':'Контакты','footer.copy':'© 2026 CogniFit Ltd. Все права защищены.'
    },
    ar: {
      'page.title':'الطول العقلي وتدريب الدماغ | CogniFit',
      'nav.platform':'المنصة','nav.faq':'الأسئلة','nav.science':'العلم','nav.training':'تدريب الدماغ','nav.join':'انضم الآن',
      'hero.badge':'نظام طول العمر الإدراكي',
      'hero.h1.line1':'عش أطول.','hero.h1.line2':'فكر أفضل.','hero.h1.line3':'حافظ على استقلاليتك.',
      'hero.sub':'الشيخوخة حتمية. <strong>لكن التدهور المعرفي ليس كذلك.</strong>',
      'hero.readtime':'4 دقائق قراءة · بناءً على 1,083+ دراسة سريرية',
      'hero.cta':'احم دماغك','hero.guarantee1':'ضمان رضا 100%','hero.guarantee2':'استرداد خلال 30 يومًا',
      'hero.users':'مستخدم حول العالم','hero.scroll':'مرر',
      'discover.eyebrow':'التقييم المعرفي','discover.h2':'اكتشف نقاط القوة والضعف في دماغك',
      'discover.cta':'اكتشف دماغك',
      'risk.eyebrow':'المشكلة الحقيقية','risk.h2':'المخاطر الحقيقية للشيخوخة ليست جسدية — إنها معرفية',
      'sci.eyebrow':'العلم','sci.h2':'العلم وراء صحة الدماغ وطول العمر المعرفي',
      'steps.eyebrow':'كيف يعمل','steps.h2':'نظامك من 4 خطوات لطول العمر المعرفي',
      'who.eyebrow':'لمن','who.h2':'مصمم لكل مرحلة من رحلة طول العمر المعرفي',
      'reviews.eyebrow':'نتائج حقيقية','reviews.h2':'ما يقوله الناس عن CogniFit',
      'faq.eyebrow':'أسئلة وأجوبة','faq.h2':'الأسئلة المتكررة',
      'closing.cta':'أجرِ تقييم الدماغ المجاني',
      'footer.privacy':'سياسة الخصوصية','footer.terms':'شروط الخدمة','footer.contact':'تواصل معنا','footer.copy':'© 2026 CogniFit Ltd. جميع الحقوق محفوظة.'
    },
    he: {
      'page.title':'אריכות ימים קוגניטיבית ואימון מוח | CogniFit',
      'nav.platform':'פלטפורמה','nav.faq':'שאלות','nav.science':'מדע','nav.training':'אימון מוח','nav.join':'הצטרף עכשיו',
      'hero.badge':'מערכת אריכות ימים קוגניטיבית',
      'hero.h1.line1':'חיו יותר.','hero.h1.line2':'חשבו טוב יותר.','hero.h1.line3':'הישארו עצמאיים.',
      'hero.sub':'הזדקנות היא בלתי נמנעת. <strong>ירידה קוגניטיבית אינה חייבת להיות.</strong>',
      'hero.readtime':'4 דקות קריאה · מבוסס על 1,083+ מחקרים קליניים',
      'hero.cta':'הגן על המוח שלך','hero.guarantee1':'שביעות רצון מובטחת 100%','hero.guarantee2':'החזר כסף 30 יום',
      'hero.users':'משתמשים ברחבי העולם','hero.scroll':'גלול',
      'discover.eyebrow':'הערכה קוגניטיבית','discover.h2':'גלו את החוזקות והחולשות של המוח שלכם',
      'discover.cta':'גלו את המוח שלכם',
      'risk.eyebrow':'הבעיה האמיתית','risk.h2':'הסיכון האמיתי של הזדקנות אינו פיזי — הוא קוגניטיבי',
      'sci.eyebrow':'המדע','sci.h2':'המדע מאחורי בריאות המוח ואריכות ימים קוגניטיבית',
      'steps.eyebrow':'איך זה עובד','steps.h2':'מערכת אריכות ימים קוגניטיבית שלך ב-4 שלבים',
      'who.eyebrow':'למי זה מיועד','who.h2':'מותאם לכל שלב במסע אריכות ימים קוגניטיבית',
      'reviews.eyebrow':'תוצאות אמיתיות','reviews.h2':'מה אנשים אומרים על CogniFit',
      'faq.eyebrow':'שאלות ותשובות','faq.h2':'שאלות נפוצות',
      'closing.cta':'בצע הערכת מוח חינמית',
      'footer.privacy':'מדיניות פרטיות','footer.terms':'תנאי שירות','footer.contact':'צור קשר','footer.copy':'© 2026 CogniFit Ltd. כל הזכויות שמורות.'
    },
    zh: {
      'page.title':'认知长寿与大脑训练 | CogniFit',
      'nav.platform':'平台','nav.faq':'常见问题','nav.science':'科学','nav.training':'大脑训练','nav.join':'立即加入',
      'hero.badge':'认知长寿系统',
      'hero.h1.line1':'活得更长。','hero.h1.line2':'思考更好。','hero.h1.line3':'保持独立。',
      'hero.sub':'衰老不可避免。<strong>但认知衰退不必如此。</strong>',
      'hero.readtime':'4分钟阅读 · 基于1,083+临床研究',
      'hero.cta':'保护您的大脑','hero.guarantee1':'100%满意保证','hero.guarantee2':'30天退款',
      'hero.users':'全球用户','hero.scroll':'向下滚动',
      'discover.eyebrow':'认知评估','discover.h2':'发现您大脑的优势和劣势',
      'discover.cta':'探索您的大脑',
      'risk.eyebrow':'真正的问题','risk.h2':'衰老的真正风险不是身体上的——而是认知上的',
      'sci.eyebrow':'科学','sci.h2':'大脑健康与认知长寿背后的科学',
      'steps.eyebrow':'工作原理','steps.h2':'您的4步认知长寿系统',
      'who.eyebrow':'适合人群','who.h2':'为认知长寿旅程的每个阶段而建',
      'reviews.eyebrow':'真实结果','reviews.h2':'人们对CogniFit的评价',
      'faq.eyebrow':'问题与解答','faq.h2':'常见问题',
      'closing.cta':'进行免费大脑评估',
      'footer.privacy':'隐私政策','footer.terms':'服务条款','footer.contact':'联系我们','footer.copy':'© 2026 CogniFit Ltd. 版权所有。'
    },
    'zh-HK': {
      'page.title':'認知長壽與大腦訓練 | CogniFit',
      'nav.platform':'平台','nav.faq':'常見問題','nav.science':'科學','nav.training':'大腦訓練','nav.join':'立即加入',
      'hero.badge':'認知長壽系統',
      'hero.h1.line1':'活得更長。','hero.h1.line2':'思考更好。','hero.h1.line3':'保持獨立。',
      'hero.sub':'衰老不可避免。<strong>但認知衰退不必如此。</strong>',
      'hero.readtime':'4分鐘閱讀 · 基於1,083+臨床研究',
      'hero.cta':'保護您的大腦','hero.guarantee1':'100%滿意保證','hero.guarantee2':'30天退款',
      'hero.users':'全球用戶','hero.scroll':'向下滾動',
      'discover.eyebrow':'認知評估','discover.h2':'發現您大腦的優勢和劣勢',
      'discover.cta':'探索您的大腦',
      'risk.eyebrow':'真正的問題','risk.h2':'衰老的真正風險不是身體上的——而是認知上的',
      'sci.eyebrow':'科學','sci.h2':'大腦健康與認知長壽背後的科學',
      'steps.eyebrow':'工作原理','steps.h2':'您的4步認知長壽系統',
      'who.eyebrow':'適合人群','who.h2':'為認知長壽旅程的每個階段而建',
      'reviews.eyebrow':'真實結果','reviews.h2':'人們對CogniFit的評價',
      'faq.eyebrow':'問題與解答','faq.h2':'常見問題',
      'closing.cta':'進行免費大腦評估',
      'footer.privacy':'隱私政策','footer.terms':'服務條款','footer.contact':'聯繫我們','footer.copy':'© 2026 CogniFit Ltd. 版權所有。'
    },
    ja: {
      'page.title':'認知的長寿と脳トレーニング | CogniFit',
      'nav.platform':'プラットフォーム','nav.faq':'よくある質問','nav.science':'科学','nav.training':'脳トレーニング','nav.join':'今すぐ参加',
      'hero.badge':'認知的長寿システム',
      'hero.h1.line1':'長生きする。','hero.h1.line2':'より良く考える。','hero.h1.line3':'自立を保つ。',
      'hero.sub':'老化は避けられません。<strong>認知機能の低下は避けられます。</strong>',
      'hero.readtime':'4分読み · 1,083+臨床研究に基づく',
      'hero.cta':'脳を守る','hero.guarantee1':'100%満足保証','hero.guarantee2':'30日間返金',
      'hero.users':'世界中のユーザー','hero.scroll':'スクロール',
      'discover.eyebrow':'認知評価','discover.h2':'脳の強みと弱みを発見する',
      'discover.cta':'脳を探索する',
      'risk.eyebrow':'真の問題','risk.h2':'老化の本当のリスクは身体的ではなく認知的です',
      'sci.eyebrow':'科学','sci.h2':'脳の健康と認知的長寿の背後にある科学',
      'steps.eyebrow':'仕組み','steps.h2':'4ステップ認知的長寿システム',
      'who.eyebrow':'対象者','who.h2':'認知的長寿の旅のすべての段階のために構築',
      'reviews.eyebrow':'実際の結果','reviews.h2':'CogniFitについての皆さんの意見',
      'faq.eyebrow':'質問と回答','faq.h2':'よくある質問',
      'closing.cta':'無料脳評価を受ける',
      'footer.privacy':'プライバシーポリシー','footer.terms':'利用規約','footer.contact':'お問い合わせ','footer.copy':'© 2026 CogniFit Ltd. 全著作権所有。'
    },
    ko: {
      'page.title':'인지 장수와 두뇌 훈련 | CogniFit',
      'nav.platform':'플랫폼','nav.faq':'자주 묻는 질문','nav.science':'과학','nav.training':'두뇌 훈련','nav.join':'지금 참여',
      'hero.badge':'인지 장수 시스템',
      'hero.h1.line1':'더 오래 살기.','hero.h1.line2':'더 잘 생각하기.','hero.h1.line3':'독립 유지하기.',
      'hero.sub':'노화는 피할 수 없습니다. <strong>인지 저하는 그렇지 않습니다.</strong>',
      'hero.readtime':'4분 읽기 · 1,083+ 임상 연구 기반',
      'hero.cta':'두뇌를 보호하세요','hero.guarantee1':'100% 만족 보장','hero.guarantee2':'30일 환불',
      'hero.users':'전 세계 사용자','hero.scroll':'스크롤',
      'discover.eyebrow':'인지 평가','discover.h2':'두뇌의 강점과 약점을 발견하세요',
      'discover.cta':'두뇌를 탐색하세요',
      'risk.eyebrow':'진짜 문제','risk.h2':'노화의 진짜 위험은 신체적이 아닌 인지적입니다',
      'sci.eyebrow':'과학','sci.h2':'두뇌 건강과 인지 장수 뒤의 과학',
      'steps.eyebrow':'작동 방식','steps.h2':'4단계 인지 장수 시스템',
      'who.eyebrow':'대상','who.h2':'인지 장수 여정의 모든 단계를 위해 제작',
      'reviews.eyebrow':'실제 결과','reviews.h2':'CogniFit에 대한 사람들의 의견',
      'faq.eyebrow':'질문과 답변','faq.h2':'자주 묻는 질문',
      'closing.cta':'무료 두뇌 평가 받기',
      'footer.privacy':'개인정보처리방침','footer.terms':'서비스 약관','footer.contact':'문의','footer.copy':'© 2026 CogniFit Ltd. 모든 권리 보유.'
    },
    tr: {
      'page.title':'Bilişsel Uzun Yaşam ve Beyin Eğitimi | CogniFit',
      'nav.platform':'Platform','nav.faq':'SSS','nav.science':'Bilim','nav.training':'Beyin Eğitimi','nav.join':'Şimdi Katıl',
      'hero.badge':'Bilişsel Uzun Yaşam Sistemi',
      'hero.h1.line1':'Daha uzun yaşayın.','hero.h1.line2':'Daha iyi düşünün.','hero.h1.line3':'Bağımsız kalın.',
      'hero.sub':'Yaşlanmak kaçınılmazdır. <strong>Bilişsel gerileme olmak zorunda değildir.</strong>',
      'hero.readtime':'4 dk okuma · 1.083+ klinik çalışmaya dayalı',
      'hero.cta':'Beyninizi Koruyun','hero.guarantee1':'%100 Memnuniyet Garantisi','hero.guarantee2':'30 Günlük Para İadesi',
      'hero.users':'DÜNYA GENELİNDE KULLANICI','hero.scroll':'Kaydırın',
      'discover.eyebrow':'Bilişsel Değerlendirme','discover.h2':'Beyninizin Güçlü ve Zayıf Yönlerini Keşfedin',
      'discover.cta':'Beyninizi Keşfedin',
      'risk.eyebrow':'Gerçek Problem','risk.h2':'Yaşlanmanın Gerçek Riski Fiziksel Değil — Bilişseldir',
      'sci.eyebrow':'Bilim','sci.h2':'Beyin Sağlığı ve Bilişsel Uzun Yaşamın Arkasındaki Bilim',
      'steps.eyebrow':'Nasıl Çalışır','steps.h2':'4 Adımlı Bilişsel Uzun Yaşam Sisteminiz',
      'who.eyebrow':'Kimler İçin','who.h2':'Bilişsel Uzun Yaşam Yolculuğunun Her Aşaması İçin',
      'reviews.eyebrow':'Gerçek Sonuçlar','reviews.h2':'İnsanların CogniFit Hakkında Söyledikleri',
      'faq.eyebrow':'Sorular ve Cevaplar','faq.h2':'Sıkça Sorulan Sorular',
      'closing.cta':'Ücretsiz Beyin Değerlendirmesi Yapın',
      'footer.privacy':'Gizlilik Politikası','footer.terms':'Hizmet Şartları','footer.contact':'İletişim','footer.copy':'© 2026 CogniFit Ltd. Tüm hakları saklıdır.'
    },
    id: {
      'page.title':'Umur Panjang Kognitif dan Latihan Otak | CogniFit',
      'nav.platform':'Platform','nav.faq':'FAQ','nav.science':'Ilmu','nav.training':'Latihan Otak','nav.join':'Bergabung Sekarang',
      'hero.badge':'Sistem Umur Panjang Kognitif',
      'hero.h1.line1':'Hidup Lebih Lama.','hero.h1.line2':'Berpikir Lebih Baik.','hero.h1.line3':'Tetap Mandiri.',
      'hero.sub':'Penuaan tidak bisa dihindari. <strong>Penurunan kognitif tidak harus terjadi.</strong>',
      'hero.readtime':'4 menit membaca · Berdasarkan 1.083+ studi klinis',
      'hero.cta':'Lindungi Otak Anda','hero.guarantee1':'Jaminan Kepuasan 100%','hero.guarantee2':'Uang Kembali 30 Hari',
      'hero.users':'PENGGUNA DI SELURUH DUNIA','hero.scroll':'Gulir',
      'discover.eyebrow':'Penilaian Kognitif','discover.h2':'Temukan Kekuatan dan Kelemahan Otak Anda',
      'discover.cta':'Jelajahi Otak Anda',
      'risk.eyebrow':'Masalah Nyata','risk.h2':'Risiko Nyata Penuaan Bukan Fisik — Ini Kognitif',
      'sci.eyebrow':'Ilmu Pengetahuan','sci.h2':'Ilmu di Balik Kesehatan Otak dan Umur Panjang Kognitif',
      'steps.eyebrow':'Cara Kerjanya','steps.h2':'Sistem Umur Panjang Kognitif 4-Langkah Anda',
      'who.eyebrow':'Untuk Siapa','who.h2':'Dibangun untuk Setiap Tahap Perjalanan Umur Panjang Kognitif',
      'reviews.eyebrow':'Hasil Nyata','reviews.h2':'Apa yang Dikatakan Orang tentang CogniFit',
      'faq.eyebrow':'Pertanyaan & Jawaban','faq.h2':'Pertanyaan yang Sering Diajukan',
      'closing.cta':'Lakukan Penilaian Otak Gratis',
      'footer.privacy':'Kebijakan Privasi','footer.terms':'Ketentuan Layanan','footer.contact':'Kontak','footer.copy':'© 2026 CogniFit Ltd. Semua hak dilindungi.'
    },
    bn: {
      'page.title':'জ্ঞানীয় দীর্ঘায়ু ও মস্তিষ্ক প্রশিক্ষণ | CogniFit',
      'nav.platform':'প্ল্যাটফর্ম','nav.faq':'প্রশ্নোত্তর','nav.science':'বিজ্ঞান','nav.training':'মস্তিষ্ক প্রশিক্ষণ','nav.join':'এখনই যোগ দিন',
      'hero.badge':'জ্ঞানীয় দীর্ঘায়ু সিস্টেম',
      'hero.h1.line1':'দীর্ঘজীবী হন।','hero.h1.line2':'ভালো ভাবুন।','hero.h1.line3':'স্বাধীন থাকুন।',
      'hero.sub':'বার্ধক্য অনিবার্য। <strong>জ্ঞানীয় পতন নয়।</strong>',
      'hero.readtime':'৪ মিনিট পড়া · ১,০৮৩+ ক্লিনিকাল গবেষণার উপর ভিত্তি করে',
      'hero.cta':'আপনার মস্তিষ্ক রক্ষা করুন','hero.guarantee1':'১০০% সন্তুষ্টি গ্যারান্টি','hero.guarantee2':'৩০ দিনের অর্থ ফেরত',
      'hero.users':'বিশ্বজুড়ে ব্যবহারকারী','hero.scroll':'স্ক্রোল',
      'discover.eyebrow':'জ্ঞানীয় মূল্যায়ন','discover.h2':'আপনার মস্তিষ্কের শক্তি ও দুর্বলতা আবিষ্কার করুন',
      'discover.cta':'আপনার মস্তিষ্ক অন্বেষণ করুন',
      'risk.eyebrow':'আসল সমস্যা','risk.h2':'বার্ধক্যের আসল ঝুঁকি শারীরিক নয় — এটি জ্ঞানীয়',
      'sci.eyebrow':'বিজ্ঞান','sci.h2':'মস্তিষ্কের স্বাস্থ্য ও জ্ঞানীয় দীর্ঘায়ুর পিছনের বিজ্ঞান',
      'steps.eyebrow':'এটি কীভাবে কাজ করে','steps.h2':'আপনার ৪-পদক্ষেপ জ্ঞানীয় দীর্ঘায়ু সিস্টেম',
      'who.eyebrow':'কার জন্য','who.h2':'জ্ঞানীয় দীর্ঘায়ু যাত্রার প্রতিটি পর্যায়ের জন্য তৈরি',
      'reviews.eyebrow':'বাস্তব ফলাফল','reviews.h2':'মানুষ CogniFit সম্পর্কে কী বলে',
      'faq.eyebrow':'প্রশ্ন ও উত্তর','faq.h2':'প্রায়শই জিজ্ঞাসিত প্রশ্ন',
      'closing.cta':'বিনামূল্যে মস্তিষ্ক মূল্যায়ন করুন',
      'footer.privacy':'গোপনীয়তা নীতি','footer.terms':'সেবার শর্তাবলী','footer.contact':'যোগাযোগ','footer.copy':'© ২০২৬ CogniFit Ltd. সর্বস্বত্ব সংরক্ষিত।'
    },
    mn: {
      'page.title':'Танин мэдрэхүйн удаан насалт ба Тархины сургалт | CogniFit',
      'nav.platform':'Платформ','nav.faq':'Асуултууд','nav.science':'Шинжлэх ухаан','nav.training':'Тархины дасгал','nav.join':'Одоо нэгдэх',
      'hero.badge':'Танин мэдрэхүйн удаан насалтын систем',
      'hero.h1.line1':'Удаан насалаарай.','hero.h1.line2':'Сайн бодоорой.','hero.h1.line3':'Бие даасан байгаарай.',
      'hero.sub':'Хөгшрөлт зайлшгүй. <strong>Танин мэдрэхүйн доройтол зайлшгүй биш.</strong>',
      'hero.readtime':'4 мин унших · 1,083+ клиникийн судалгаанд тулгуурласан',
      'hero.cta':'Тархиа хамгаалаарай','hero.guarantee1':'100% сэтгэл ханамжийн баталгаа','hero.guarantee2':'30 хоногийн мөнгө буцаалт',
      'hero.users':'Дэлхий даяар хэрэглэгчид','hero.scroll':'Гүйлгэх',
      'discover.eyebrow':'Танин мэдрэхүйн үнэлгээ','discover.h2':'Тархиныхаа давуу болон сул талуудыг нээж мэд',
      'discover.cta':'Тархиа судлаарай',
      'risk.eyebrow':'Жинхэнэ асуудал','risk.h2':'Хөгшрөлтийн жинхэнэ эрсдэл бие махбодын биш — танин мэдрэхүйн',
      'sci.eyebrow':'Шинжлэх ухаан','sci.h2':'Тархины эрүүл мэнд ба танин мэдрэхүйн удаан насалтын шинжлэх ухаан',
      'steps.eyebrow':'Хэрхэн ажилладаг','steps.h2':'Таны 4 алхамт танин мэдрэхүйн удаан насалтын систем',
      'who.eyebrow':'Хэнд зориулсан','who.h2':'Танин мэдрэхүйн удаан насалтын аялалын бүх үе шатанд зориулсан',
      'reviews.eyebrow':'Бодит үр дүн','reviews.h2':'Хүмүүс CogniFit-ийн талаар юу хэлдэг',
      'faq.eyebrow':'Асуултууд ба хариултууд','faq.h2':'Байнга асуудаг асуултууд',
      'closing.cta':'Үнэгүй тархины үнэлгээ авах',
      'footer.privacy':'Нууцлалын бодлого','footer.terms':'Үйлчилгээний нөхцөл','footer.contact':'Холбоо барих','footer.copy':'© 2026 CogniFit Ltd. Бүх эрх хуулиар хамгаалагдсан.'
    },
    ur: {
      'page.title':'علمی طول عمر اور دماغی تربیت | CogniFit',
      'nav.platform':'پلیٹ فارم','nav.faq':'عمومی سوالات','nav.science':'سائنس','nav.training':'دماغی تربیت','nav.join':'ابھی شامل ہوں',
      'hero.badge':'علمی طول عمر کا نظام',
      'hero.h1.line1':'زیادہ عرصہ جیئیں۔','hero.h1.line2':'بہتر سوچیں۔','hero.h1.line3':'آزاد رہیں۔',
      'hero.sub':'بڑھاپا ناگزیر ہے۔ <strong>علمی زوال ضروری نہیں۔</strong>',
      'hero.readtime':'4 منٹ پڑھنا · 1,083+ کلینیکل مطالعات پر مبنی',
      'hero.cta':'اپنے دماغ کی حفاظت کریں','hero.guarantee1':'100% اطمینان کی ضمانت','hero.guarantee2':'30 دن واپسی',
      'hero.users':'دنیا بھر میں صارفین','hero.scroll':'سکرول',
      'discover.eyebrow':'علمی تشخیص','discover.h2':'اپنے دماغ کی طاقت اور کمزوریاں دریافت کریں',
      'discover.cta':'اپنا دماغ دریافت کریں',
      'risk.eyebrow':'اصل مسئلہ','risk.h2':'بڑھاپے کا اصل خطرہ جسمانی نہیں — علمی ہے',
      'sci.eyebrow':'سائنس','sci.h2':'دماغی صحت اور علمی طول عمر کے پیچھے کی سائنس',
      'steps.eyebrow':'یہ کیسے کام کرتا ہے','steps.h2':'آپ کا 4 مرحلہ علمی طول عمر کا نظام',
      'who.eyebrow':'کس کے لیے','who.h2':'علمی طول عمر کے سفر کے ہر مرحلے کے لیے بنایا گیا',
      'reviews.eyebrow':'حقیقی نتائج','reviews.h2':'لوگ CogniFit کے بارے میں کیا کہتے ہیں',
      'faq.eyebrow':'سوالات اور جوابات','faq.h2':'اکثر پوچھے جانے والے سوالات',
      'closing.cta':'مفت دماغی تشخیص کریں',
      'footer.privacy':'رازداری کی پالیسی','footer.terms':'خدمات کی شرائط','footer.contact':'رابطہ','footer.copy':'© 2026 CogniFit Ltd. تمام حقوق محفوظ ہیں۔'
    },
    sr: {
      'page.title':'Когнитивна Дуговечност и Тренинг Мозга | CogniFit',
      'nav.platform':'Платформа','nav.faq':'FAQ','nav.science':'Наука','nav.training':'Тренинг мозга','nav.join':'Придружи се сада',
      'hero.badge':'Систем когнитивног дуговечности',
      'hero.h1.line1':'Живи дуже.','hero.h1.line2':'Размишљај боље.','hero.h1.line3':'Остани независан.',
      'hero.sub':'Старење је неизбежно. <strong>Когнитивни пад не мора да буде.</strong>',
      'hero.readtime':'4 мин читања · Засновано на 1.083+ клиничких студија',
      'hero.cta':'Заштити свој мозак','hero.guarantee1':'100% гаранција задовољства','hero.guarantee2':'Повраћај новца за 30 дана',
      'hero.users':'КОРИСНИКА ШИРОМ СВЕТА','hero.scroll':'Помери',
      'discover.eyebrow':'Когнитивна процена','discover.h2':'Открај снаге и слабости свог мозга',
      'discover.cta':'Истражи свој мозак',
      'risk.eyebrow':'Прави проблем','risk.h2':'Прави ризик старења није физички — Когнитивни је',
      'sci.eyebrow':'Наука','sci.h2':'Наука иза здравља мозга и когнитивне дуговечности',
      'steps.eyebrow':'Како функционише','steps.h2':'Твој 4-корачни систем когнитивне дуговечности',
      'who.eyebrow':'За кога','who.h2':'Направљено за сваку фазу путовања когнитивне дуговечности',
      'reviews.eyebrow':'Стварни резултати','reviews.h2':'Шта људи кажу о CogniFit-у',
      'faq.eyebrow':'Питања и одговори','faq.h2':'Често постављана питања',
      'closing.cta':'Уради бесплатну процену мозга',
      'footer.privacy':'Политика приватности','footer.terms':'Услови услуге','footer.contact':'Контакт','footer.copy':'© 2026 CogniFit Ltd. Сва права задржана.'
    },
    el: {
      'page.title':'Νοητική Μακροζωία και Εκπαίδευση Εγκεφάλου | CogniFit',
      'nav.platform':'Πλατφόρμα','nav.faq':'Ερωτήσεις','nav.science':'Επιστήμη','nav.training':'Εκγύμναση Εγκεφάλου','nav.join':'Εγγραφή τώρα',
      'hero.badge':'Σύστημα Νοητικής Μακροζωίας',
      'hero.h1.line1':'Ζήστε περισσότερο.','hero.h1.line2':'Σκεφτείτε καλύτερα.','hero.h1.line3':'Μείνετε ανεξάρτητοι.',
      'hero.sub':'Η γήρανση είναι αναπόφευκτη. <strong>Η γνωστική έκπτωση δεν χρειάζεται να είναι.</strong>',
      'hero.readtime':'4 λεπτά ανάγνωση · Βασισμένο σε 1.083+ κλινικές μελέτες',
      'hero.cta':'Προστατέψτε τον Εγκέφαλό σας','hero.guarantee1':'100% Εγγύηση Ικανοποίησης','hero.guarantee2':'Επιστροφή χρημάτων 30 ημερών',
      'hero.users':'ΧΡΗΣΤΕΣ ΠΑΓΚΟΣΜΙΩΣ','hero.scroll':'Κύλιση',
      'discover.eyebrow':'Γνωστική Αξιολόγηση','discover.h2':'Ανακαλύψτε τις Δυνάμεις και Αδυναμίες του Εγκεφάλου σας',
      'discover.cta':'Εξερευνήστε τον Εγκέφαλό σας',
      'risk.eyebrow':'Το Πραγματικό Πρόβλημα','risk.h2':'Ο Πραγματικός Κίνδυνος της Γήρανσης Δεν Είναι Σωματικός — Είναι Γνωστικός',
      'sci.eyebrow':'Η Επιστήμη','sci.h2':'Η Επιστήμη Πίσω από την Υγεία του Εγκεφάλου και τη Νοητική Μακροζωία',
      'steps.eyebrow':'Πώς Λειτουργεί','steps.h2':'Το 4-Βήματο Σύστημα Νοητικής Μακροζωίας σας',
      'who.eyebrow':'Για Ποιους','who.h2':'Φτιαγμένο για Κάθε Στάδιο του Ταξιδιού Νοητικής Μακροζωίας',
      'reviews.eyebrow':'Πραγματικά Αποτελέσματα','reviews.h2':'Τι Λένε οι Άνθρωποι για το CogniFit',
      'faq.eyebrow':'Ερωτήσεις & Απαντήσεις','faq.h2':'Συχνές Ερωτήσεις',
      'closing.cta':'Κάντε τη Δωρεάν Αξιολόγηση Εγκεφάλου',
      'footer.privacy':'Πολιτική Απορρήτου','footer.terms':'Όροι Χρήσης','footer.contact':'Επικοινωνία','footer.copy':'© 2026 CogniFit Ltd. Όλα τα δικαιώματα διατηρούνται.'
    }
  };

  var STORAGE_KEY = 'cognifit_lang';
  var DEFAULT_LANG = 'en';

  function detectBrowserLang() {
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    var short = nav.split('-')[0];
    if (LANGUAGES[nav]) return nav;
    if (nav.indexOf('zh') === 0) return (nav.indexOf('hk') > -1 || nav.indexOf('tw') > -1) ? 'zh-HK' : 'zh';
    if (LANGUAGES[short]) return short;
    return null;
  }

  function getLang() {
    try {
      var urlParam = new URLSearchParams(window.location.search).get('lang');
      if (urlParam && LANGUAGES[urlParam]) return urlParam;
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && LANGUAGES[stored]) return stored;
    } catch(e) {}
    return detectBrowserLang() || DEFAULT_LANG;
  }

  function translate(lang, key) {
    var dict = T[lang] || T[DEFAULT_LANG];
    return (dict && dict[key]) || (T[DEFAULT_LANG] && T[DEFAULT_LANG][key]) || key;
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var val = translate(lang, key);
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
    if (T[lang] && T[lang]['page.title']) {
      document.title = T[lang]['page.title'];
    }
    var og = document.querySelector('meta[property="og:locale"]');
    if (og) og.setAttribute('content', lang.replace('-','_'));
  }

  function applyDir(lang) {
    var dir = (LANGUAGES[lang] && LANGUAGES[lang].dir) || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.setAttribute('data-dir', dir);
    document.documentElement.lang = lang;
  }

  function updateCanonical(lang) {
    var el = document.querySelector('link[rel="canonical"]');
    if (el) el.href = 'https://brain.cognifit.com/longevity' + (lang === DEFAULT_LANG ? '' : '?lang=' + lang);
  }

  function setLang(lang, persist) {
    if (!LANGUAGES[lang]) return;
    if (persist !== false) { try { localStorage.setItem(STORAGE_KEY, lang); } catch(e) {} }
    applyTranslations(lang);
    applyDir(lang);
    updateCanonical(lang);
    updateSelector(lang);
    document.dispatchEvent(new CustomEvent('langChange', { detail: { lang: lang } }));
  }

  function updateSelector(lang) {
    var btn = document.getElementById('lang-btn');
    if (btn) {
      var code = lang.toUpperCase();
      btn.textContent = code.length > 2 ? code.substring(0,2) : code;
      btn.setAttribute('data-lang', lang);
    }
    document.querySelectorAll('.lang-item').forEach(function(item) {
      item.setAttribute('aria-selected', item.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function geoDetect(cb) {
    try { if (localStorage.getItem(STORAGE_KEY)) return; } catch(e) {}
    fetch('https://api.country.is/', { signal: AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined })
      .then(function(r) { return r.json(); })
      .then(function(d) { var l = GEO_MAP[d.country]; if (l && LANGUAGES[l]) cb(l); })
      .catch(function() {});
  }

  function buildSelector() {
    var navR = document.querySelector('.nav-r');
    if (!navR) return;
    navR.querySelectorAll('span').forEach(function(s) {
      if (/^EN$/i.test(s.textContent.trim())) s.remove();
    });

    var wrap = document.createElement('div');
    wrap.className = 'lang-selector';

    var btn = document.createElement('button');
    btn.id = 'lang-btn';
    btn.className = 'lang-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('title', 'Select language');
    btn.textContent = 'EN';

    var dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown';
    dropdown.setAttribute('role', 'listbox');
    dropdown.setAttribute('aria-label', 'Language selection');

    Object.keys(LANGUAGES).forEach(function(code) {
      var item = document.createElement('button');
      item.className = 'lang-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-lang', code);
      item.setAttribute('lang', code);
      item.setAttribute('aria-selected', 'false');
      item.innerHTML = '<span class="lang-flag">' + LANGUAGES[code].flag + '</span><span class="lang-name">' + LANGUAGES[code].nativeName + '</span>';
      item.addEventListener('click', function() {
        setLang(code, true);
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
      dropdown.appendChild(item);
    });

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var open = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', function() {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });

    wrap.appendChild(btn);
    wrap.appendChild(dropdown);
    navR.appendChild(wrap);
  }

  window.CogniFitI18n = { setLang: setLang, getLang: getLang, LANGUAGES: LANGUAGES };

  document.addEventListener('DOMContentLoaded', function() {
    buildSelector();
    var lang = getLang();
    if (lang !== DEFAULT_LANG) {
      setLang(lang, false);
    } else {
      geoDetect(function(geoLang) { setLang(geoLang, true); });
    }
    updateSelector(lang);
  });

})();
