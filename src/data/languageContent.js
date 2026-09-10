// languageContent.js
// Central original dataset for LinguaLearn. Every item follows a consistent
// shape so the rest of the application can treat all categories uniformly.
//
// Item shape:
// {
//   id: unique string within a language+category
//   sourceText: the English prompt
//   targetText: the phrase/word in the target language
//   pronunciation: a simple, readable phonetic guide
//   note: an example sentence (vocab/phrases/sentences) OR the explanation
//         for a grammar topic
// }

export const LANGUAGES = [
  { code: "es", name: "Spanish", nativeName: "Español", speechLang: "es-ES", accent: "#c15b3c" },
  { code: "fr", name: "French", nativeName: "Français", speechLang: "fr-FR", accent: "#3c6e91" },
  { code: "de", name: "German", nativeName: "Deutsch", speechLang: "de-DE", accent: "#6b7d3a" },
  { code: "ja", name: "Japanese", nativeName: "日本語", speechLang: "ja-JP", accent: "#a1477a" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", speechLang: "ta-IN", accent: "#b8862f" },
];

export const CATEGORIES = [
  {
    id: "vocabulary",
    label: "Vocabulary",
    description: "Everyday words worth knowing by heart.",
  },
  {
    id: "phrases",
    label: "Common Phrases",
    description: "Short expressions you'll reach for in real conversations.",
  },
  {
    id: "sentences",
    label: "Sentences",
    description: "Full sentences that combine vocabulary in context.",
  },
  {
    id: "grammar",
    label: "Grammar",
    description: "Small grammar notes that explain the 'why' behind the words.",
  },
];

export const LEARNING_CONTENT = {
  es: {
    vocabulary: [
      { id: "es-v1", sourceText: "hello", targetText: "Hola", pronunciation: "OH-lah", note: "Used any time of day to greet someone." },
      { id: "es-v2", sourceText: "water", targetText: "Agua", pronunciation: "AH-gwah", note: "¿Me trae agua, por favor? — Could you bring me water, please?" },
      { id: "es-v3", sourceText: "friend", targetText: "Amigo", pronunciation: "ah-MEE-goh", note: "Use 'amiga' for a female friend." },
      { id: "es-v4", sourceText: "book", targetText: "Libro", pronunciation: "LEE-broh", note: "Este libro es interesante — This book is interesting." },
      { id: "es-v5", sourceText: "house", targetText: "Casa", pronunciation: "KAH-sah", note: "Voy a casa — I'm going home." },
      { id: "es-v6", sourceText: "sun", targetText: "Sol", pronunciation: "sohl", note: "Hace sol hoy — It's sunny today." },
    ],
    phrases: [
      { id: "es-p1", sourceText: "How are you?", targetText: "¿Cómo estás?", pronunciation: "KOH-moh es-TAHS", note: "A friendly, informal greeting." },
      { id: "es-p2", sourceText: "Thank you very much", targetText: "Muchas gracias", pronunciation: "MOO-chahs GRAH-syahs", note: "A warmer way to say thanks than 'gracias' alone." },
      { id: "es-p3", sourceText: "See you later", targetText: "Hasta luego", pronunciation: "AHS-tah LWEH-goh", note: "A casual way to say goodbye." },
      { id: "es-p4", sourceText: "What is your name?", targetText: "¿Cómo te llamas?", pronunciation: "KOH-moh teh YAH-mahs", note: "Literally, 'What do you call yourself?'" },
      { id: "es-p5", sourceText: "Nice to meet you", targetText: "Mucho gusto", pronunciation: "MOO-choh GOOS-toh", note: "Said right after being introduced to someone." },
    ],
    sentences: [
      { id: "es-s1", sourceText: "I would like a coffee.", targetText: "Quisiera un café.", pronunciation: "kee-SYEH-rah oon kah-FEH", note: "A polite way to order in a cafe." },
      { id: "es-s2", sourceText: "Where is the train station?", targetText: "¿Dónde está la estación de tren?", pronunciation: "DOHN-deh es-TAH lah es-tah-SYOHN deh trehn", note: "Useful for navigating a new city." },
      { id: "es-s3", sourceText: "I am learning Spanish.", targetText: "Estoy aprendiendo español.", pronunciation: "es-TOY ah-prehn-DYEHN-doh es-pahn-YOHL", note: "Great line to say to a native speaker." },
      { id: "es-s4", sourceText: "Can you help me, please?", targetText: "¿Puedes ayudarme, por favor?", pronunciation: "PWEH-dehs ah-yoo-DAHR-meh, pohr fah-VOHR", note: "A friendly, informal request for help." },
      { id: "es-s5", sourceText: "The weather is nice today.", targetText: "Hace buen tiempo hoy.", pronunciation: "AH-seh bwehn TYEHM-poh oy", note: "Common small talk opener." },
    ],
    grammar: [
      { id: "es-g1", sourceText: "Gender of Nouns", targetText: "Género de los sustantivos", pronunciation: "HEH-neh-roh deh lohs soos-tahn-TEE-vohs", note: "Nouns are masculine or feminine. Most words ending in -o are masculine (el libro) and most ending in -a are feminine (la casa)." },
      { id: "es-g2", sourceText: "Ser vs Estar", targetText: "Ser y Estar", pronunciation: "sehr ee es-TAHR", note: "Both mean 'to be'. Use 'ser' for lasting traits (Soy alto) and 'estar' for temporary states or location (Estoy cansado)." },
      { id: "es-g3", sourceText: "Present Tense -AR Verbs", targetText: "Verbos en -AR", pronunciation: "VEHR-bohs ehn ahr", note: "Drop -ar and add endings: hablar → hablo, hablas, habla, hablamos, habláis, hablan." },
      { id: "es-g4", sourceText: "Adjective Agreement", targetText: "Concordancia de adjetivos", pronunciation: "kohn-kohr-DAHN-syah deh ah-heh-TEE-vohs", note: "Adjectives match the noun's gender and number: un coche rojo, una casa roja, unos coches rojos." },
    ],
  },
  fr: {
    vocabulary: [
      { id: "fr-v1", sourceText: "hello", targetText: "Bonjour", pronunciation: "bon-ZHOOR", note: "The standard daytime greeting in French." },
      { id: "fr-v2", sourceText: "water", targetText: "Eau", pronunciation: "oh", note: "Une bouteille d'eau — a bottle of water." },
      { id: "fr-v3", sourceText: "friend", targetText: "Ami", pronunciation: "ah-MEE", note: "Use 'amie' for a female friend." },
      { id: "fr-v4", sourceText: "book", targetText: "Livre", pronunciation: "LEE-vr", note: "J'aime ce livre — I like this book." },
      { id: "fr-v5", sourceText: "house", targetText: "Maison", pronunciation: "meh-ZOHN", note: "Je rentre à la maison — I'm heading home." },
      { id: "fr-v6", sourceText: "sun", targetText: "Soleil", pronunciation: "soh-LAY", note: "Le soleil brille — The sun is shining." },
    ],
    phrases: [
      { id: "fr-p1", sourceText: "How are you?", targetText: "Comment ça va ?", pronunciation: "koh-mahn sah vah", note: "A relaxed, everyday greeting." },
      { id: "fr-p2", sourceText: "Thank you very much", targetText: "Merci beaucoup", pronunciation: "mehr-SEE boh-KOO", note: "Add 'beaucoup' to emphasize gratitude." },
      { id: "fr-p3", sourceText: "See you later", targetText: "À plus tard", pronunciation: "ah plew tar", note: "Often shortened to 'À plus' among friends." },
      { id: "fr-p4", sourceText: "What is your name?", targetText: "Comment tu t'appelles ?", pronunciation: "koh-mahn tew tah-PELL", note: "Informal version, used with peers." },
      { id: "fr-p5", sourceText: "Nice to meet you", targetText: "Enchanté", pronunciation: "ahn-shahn-TAY", note: "Literally 'enchanted' — a polite introduction phrase." },
    ],
    sentences: [
      { id: "fr-s1", sourceText: "I would like a coffee.", targetText: "Je voudrais un café.", pronunciation: "zhuh voo-DREH uhn kah-FAY", note: "Polite ordering phrase for a cafe." },
      { id: "fr-s2", sourceText: "Where is the train station?", targetText: "Où est la gare ?", pronunciation: "oo eh lah gar", note: "Handy for asking directions." },
      { id: "fr-s3", sourceText: "I am learning French.", targetText: "J'apprends le français.", pronunciation: "zhah-PRAHN luh frahn-SEH", note: "Good conversation starter with locals." },
      { id: "fr-s4", sourceText: "Can you help me, please?", targetText: "Pouvez-vous m'aider, s'il vous plaît ?", pronunciation: "poo-VAY voo meh-DAY seel voo pleh", note: "The formal 'vous' form, safe for strangers." },
      { id: "fr-s5", sourceText: "The weather is nice today.", targetText: "Il fait beau aujourd'hui.", pronunciation: "eel feh boh oh-zhoor-DWEE", note: "Common small talk about the weather." },
    ],
    grammar: [
      { id: "fr-g1", sourceText: "Gendered Articles", targetText: "Articles définis et indéfinis", pronunciation: "ar-TEEKL day-fee-NEE zay ahn-day-fee-NEE", note: "Nouns take 'le/un' (masculine) or 'la/une' (feminine): le livre, la maison." },
      { id: "fr-g2", sourceText: "Regular -ER Verbs", targetText: "Verbes en -ER", pronunciation: "vehrb ahn uhr", note: "Drop -er and add endings: parler → parle, parles, parle, parlons, parlez, parlent." },
      { id: "fr-g3", sourceText: "Negation with ne...pas", targetText: "La négation avec ne...pas", pronunciation: "lah nay-gah-syohn ahvek nuh pah", note: "Wrap the verb: Je ne sais pas — I don't know." },
      { id: "fr-g4", sourceText: "Adjective Placement", targetText: "Place des adjectifs", pronunciation: "plahs day zad-zhek-TEEF", note: "Most adjectives follow the noun (une voiture rouge), but common short ones come before it (un petit chat)." },
    ],
  },
  de: {
    vocabulary: [
      { id: "de-v1", sourceText: "hello", targetText: "Hallo", pronunciation: "HAH-loh", note: "A casual greeting used at any time of day." },
      { id: "de-v2", sourceText: "water", targetText: "Wasser", pronunciation: "VAH-ser", note: "Ein Glas Wasser, bitte — A glass of water, please." },
      { id: "de-v3", sourceText: "friend", targetText: "Freund", pronunciation: "froynt", note: "Use 'Freundin' for a female friend." },
      { id: "de-v4", sourceText: "book", targetText: "Buch", pronunciation: "bookh", note: "Das Buch ist spannend — The book is exciting." },
      { id: "de-v5", sourceText: "house", targetText: "Haus", pronunciation: "hows", note: "Ich bin zu Hause — I'm at home." },
      { id: "de-v6", sourceText: "sun", targetText: "Sonne", pronunciation: "ZOH-neh", note: "Die Sonne scheint — The sun is shining." },
    ],
    phrases: [
      { id: "de-p1", sourceText: "How are you?", targetText: "Wie geht es dir?", pronunciation: "vee gayt es deer", note: "The informal way to ask how someone is." },
      { id: "de-p2", sourceText: "Thank you very much", targetText: "Vielen Dank", pronunciation: "FEE-len dahnk", note: "A polite, common way to say thanks." },
      { id: "de-p3", sourceText: "See you later", targetText: "Bis später", pronunciation: "bis SHPAY-ter", note: "A relaxed farewell among friends." },
      { id: "de-p4", sourceText: "What is your name?", targetText: "Wie heißt du?", pronunciation: "vee highst doo", note: "Informal; use 'Wie heißen Sie?' formally." },
      { id: "de-p5", sourceText: "Nice to meet you", targetText: "Freut mich", pronunciation: "froyt mikh", note: "Said right after an introduction." },
    ],
    sentences: [
      { id: "de-s1", sourceText: "I would like a coffee.", targetText: "Ich hätte gern einen Kaffee.", pronunciation: "ikh HET-teh gairn EYE-nen kah-FAY", note: "Polite way to order at a cafe." },
      { id: "de-s2", sourceText: "Where is the train station?", targetText: "Wo ist der Bahnhof?", pronunciation: "voh ist dair BAHN-hohf", note: "Useful when navigating a German city." },
      { id: "de-s3", sourceText: "I am learning German.", targetText: "Ich lerne Deutsch.", pronunciation: "ikh LEHR-neh doytsh", note: "A natural line to say to a native speaker." },
      { id: "de-s4", sourceText: "Can you help me, please?", targetText: "Kannst du mir bitte helfen?", pronunciation: "kahnst doo meer BIT-teh HELL-fen", note: "Informal request for assistance." },
      { id: "de-s5", sourceText: "The weather is nice today.", targetText: "Das Wetter ist heute schön.", pronunciation: "dahs VET-ter ist HOY-teh shurn", note: "Common small talk about the weather." },
    ],
    grammar: [
      { id: "de-g1", sourceText: "Noun Genders and Articles", targetText: "Genus und Artikel", pronunciation: "GAY-noos oont ar-TEE-kel", note: "Every noun is der (masculine), die (feminine), or das (neuter): der Mann, die Frau, das Kind." },
      { id: "de-g2", sourceText: "Verb-Second Word Order", targetText: "Verbzweitstellung", pronunciation: "VEHRB-tsvyt-shtel-oong", note: "The conjugated verb is always the second element: Heute gehe ich ins Kino." },
      { id: "de-g3", sourceText: "Present Tense Regular Verbs", targetText: "Präsens regelmäßiger Verben", pronunciation: "PRAY-zens RAY-gel-mays-ig-er VEHR-ben", note: "spielen → spiele, spielst, spielt, spielen, spielt, spielen." },
      { id: "de-g4", sourceText: "Cases: Nominative vs Accusative", targetText: "Nominativ und Akkusativ", pronunciation: "NOH-mee-nah-teef oont ah-koo-zah-TEEF", note: "The subject takes nominative (der Hund), the direct object takes accusative (den Hund)." },
    ],
  },
  ja: {
    vocabulary: [
      { id: "ja-v1", sourceText: "hello", targetText: "こんにちは", pronunciation: "kon-nichi-wa", note: "Used as a general daytime greeting." },
      { id: "ja-v2", sourceText: "water", targetText: "水", pronunciation: "mizu", note: "水をください — Water, please." },
      { id: "ja-v3", sourceText: "friend", targetText: "友達", pronunciation: "tomodachi", note: "彼は私の友達です — He is my friend." },
      { id: "ja-v4", sourceText: "book", targetText: "本", pronunciation: "hon", note: "この本が好きです — I like this book." },
      { id: "ja-v5", sourceText: "house", targetText: "家", pronunciation: "ie", note: "家に帰ります — I'm going home." },
      { id: "ja-v6", sourceText: "sun", targetText: "太陽", pronunciation: "taiyou", note: "太陽が明るいです — The sun is bright." },
    ],
    phrases: [
      { id: "ja-p1", sourceText: "How are you?", targetText: "お元気ですか？", pronunciation: "o-genki desu ka", note: "A polite way to ask about someone's wellbeing." },
      { id: "ja-p2", sourceText: "Thank you very much", targetText: "どうもありがとうございます", pronunciation: "doumo arigatou gozaimasu", note: "The most formal, complete way to say thanks." },
      { id: "ja-p3", sourceText: "See you later", targetText: "またあとで", pronunciation: "mata ato de", note: "A casual goodbye among friends." },
      { id: "ja-p4", sourceText: "What is your name?", targetText: "お名前は何ですか？", pronunciation: "o-namae wa nan desu ka", note: "A polite way to ask for someone's name." },
      { id: "ja-p5", sourceText: "Nice to meet you", targetText: "はじめまして", pronunciation: "hajimemashite", note: "Said only at a first meeting." },
    ],
    sentences: [
      { id: "ja-s1", sourceText: "I would like a coffee.", targetText: "コーヒーをお願いします", pronunciation: "koohii o onegaishimasu", note: "Polite way to order at a cafe." },
      { id: "ja-s2", sourceText: "Where is the train station?", targetText: "駅はどこですか？", pronunciation: "eki wa doko desu ka", note: "Very handy phrase in any Japanese city." },
      { id: "ja-s3", sourceText: "I am learning Japanese.", targetText: "日本語を勉強しています", pronunciation: "nihongo o benkyou shiteimasu", note: "A great line to share with a native speaker." },
      { id: "ja-s4", sourceText: "Can you help me, please?", targetText: "手伝ってもらえますか？", pronunciation: "tetsudatte moraemasu ka", note: "A polite request for help." },
      { id: "ja-s5", sourceText: "The weather is nice today.", targetText: "今日はいい天気です", pronunciation: "kyou wa ii tenki desu", note: "Common small talk opener." },
    ],
    grammar: [
      { id: "ja-g1", sourceText: "Sentence Order (SOV)", targetText: "語順（主語・目的語・動詞）", pronunciation: "go-jun (shugo, mokutekigo, doushi)", note: "Japanese places the verb last: 私はりんごを食べます — I apple eat (I eat an apple)." },
      { id: "ja-g2", sourceText: "Particles wa and ga", targetText: "助詞「は」と「が」", pronunciation: "joshi 'wa' to 'ga'", note: "'wa' marks the topic of a sentence; 'ga' marks the grammatical subject, often for new information." },
      { id: "ja-g3", sourceText: "Polite Verb Form -masu", targetText: "丁寧形「〜ます」", pronunciation: "teineikei '-masu'", note: "Adding -masu to a verb stem makes it polite: 食べる → 食べます (to eat, politely)." },
      { id: "ja-g4", sourceText: "Counting and Counters", targetText: "数え方（助数詞）", pronunciation: "kazoekata (josuushi)", note: "Different objects use different counters, e.g. 本 (hon) for long thin objects: 鉛筆一本 — one pencil." },
    ],
  },
  ta: {
    vocabulary: [
      { id: "ta-v1", sourceText: "hello", targetText: "வணக்கம்", pronunciation: "vanakkam", note: "A respectful greeting used at any time of day." },
      { id: "ta-v2", sourceText: "water", targetText: "தண்ணீர்", pronunciation: "thanneer", note: "எனக்கு தண்ணீர் வேணும் — I need water." },
      { id: "ta-v3", sourceText: "friend", targetText: "நண்பன்", pronunciation: "nanban", note: "Use 'nanbi' for a female friend." },
      { id: "ta-v4", sourceText: "book", targetText: "புத்தகம்", pronunciation: "puthagam", note: "இந்த புத்தகம் நல்லா இருக்கு — This book is good." },
      { id: "ta-v5", sourceText: "house", targetText: "வீடு", pronunciation: "veedu", note: "நான் வீட்டுக்கு போறேன் — I'm going home." },
      { id: "ta-v6", sourceText: "sun", targetText: "சூரியன்", pronunciation: "sooriyan", note: "சூரியன் பிரகாசமா இருக்கு — The sun is bright." },
    ],
    phrases: [
      { id: "ta-p1", sourceText: "How are you?", targetText: "எப்படி இருக்கீங்க?", pronunciation: "eppadi irukkeenga", note: "A polite, everyday greeting." },
      { id: "ta-p2", sourceText: "Thank you very much", targetText: "ரொம்ப நன்றி", pronunciation: "romba nandri", note: "'romba' adds emphasis, meaning 'very'." },
      { id: "ta-p3", sourceText: "See you later", targetText: "பிறகு பார்க்கலாம்", pronunciation: "piragu paarkalaam", note: "A casual, friendly farewell." },
      { id: "ta-p4", sourceText: "What is your name?", targetText: "உங்க பேரு என்ன?", pronunciation: "unga peru enna", note: "A polite way to ask for a name." },
      { id: "ta-p5", sourceText: "Nice to meet you", targetText: "உங்களை சந்தித்ததில் மகிழ்ச்சி", pronunciation: "ungalai santhithathil magizhchi", note: "Used right after being introduced." },
    ],
    sentences: [
      { id: "ta-s1", sourceText: "I would like a coffee.", targetText: "எனக்கு காபி வேணும்", pronunciation: "enakku kaapi vènum", note: "A simple way to request coffee." },
      { id: "ta-s2", sourceText: "Where is the train station?", targetText: "ரயில் நிலையம் எங்க இருக்கு?", pronunciation: "rayil nilayam enga irukku", note: "Useful for finding your way around." },
      { id: "ta-s3", sourceText: "I am learning Tamil.", targetText: "நான் தமிழ் கத்துக்கிறேன்", pronunciation: "naan thamizh kathukkiren", note: "A nice line to share with a native speaker." },
      { id: "ta-s4", sourceText: "Can you help me, please?", targetText: "தயவு செஞ்சு எனக்கு உதவி பண்ணுங்க", pronunciation: "thayavu senju enakku udhavi pannunga", note: "A polite request for assistance." },
      { id: "ta-s5", sourceText: "The weather is nice today.", targetText: "இன்னைக்கு வானிலை நல்லா இருக்கு", pronunciation: "innaikku vaanilai nallaa irukku", note: "Common small talk about the weather." },
    ],
    grammar: [
      { id: "ta-g1", sourceText: "Basic Sentence Order (SOV)", targetText: "வாக்கிய அமைப்பு", pronunciation: "vaakkiya amaippu", note: "Tamil places the verb last: நான் சாப்பாடு சாப்பிடுறேன் — I food eat (I eat food)." },
      { id: "ta-g2", sourceText: "Respectful vs Casual Forms", targetText: "மரியாதை மற்றும் சாதாரண வடிவங்கள்", pronunciation: "mariyaadhai matrum saadhaarana vadivangal", note: "Add '-nga' to verbs and pronouns for respect: வா (come, casual) vs வாங்க (come, respectful)." },
      { id: "ta-g3", sourceText: "Postpositions Instead of Prepositions", targetText: "பின்னொட்டு சொற்கள்", pronunciation: "pinnottu sorkal", note: "Location words follow the noun: மேசை மேல — on the table (table + on)." },
      { id: "ta-g4", sourceText: "Plural Marker -kal", targetText: "பன்மை விகுதி -கள்", pronunciation: "panmai vigudhi -kal", note: "Add '-kal' to make a noun plural: புத்தகம் (book) → புத்தகங்கள் (books)." },
    ],
  },
};

// A small, ordered list used across the app whenever category order matters.
export const CATEGORY_IDS = CATEGORIES.map((category) => category.id);

export function getContentFor(languageCode, categoryId) {
  const languageContent = LEARNING_CONTENT[languageCode];
  if (!languageContent) return [];
  return languageContent[categoryId] || [];
}

export function getAllContentFor(languageCode) {
  const languageContent = LEARNING_CONTENT[languageCode];
  if (!languageContent) return [];
  return CATEGORY_IDS.flatMap((categoryId) =>
    (languageContent[categoryId] || []).map((item) => ({ ...item, category: categoryId }))
  );
}
