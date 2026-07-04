import { images } from "@/data/images";
import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "places-you-must-visit-north-macedonia",
    title: {
      en: "7 Places You Must Visit in North Macedonia",
      mk: "7 места што мора да ги посетите во Северна Македонија",
      tr: "Kuzey Makedonya'da Görmeniz Gereken 7 Yer",
    },
    category: { en: "Inspiration", mk: "Инспирација", tr: "İlham" },
    author: "Elena Markova",
    date: "2026-05-14",
    readingTime: { en: "6 min read", mk: "6 минути читање", tr: "6 dk okuma" },
    coverImage: images.blog[0],
    excerpt: {
      en: "From old bazaars to lake monasteries and mountain villages, these are the places that shape a first journey through the country.",
      mk: "Од стари чаршии до езерски манастири и планински села, ова се местата што го обликуваат првото патување низ земјата.",
      tr: "Eski çarşılardan göl manastırlarına ve dağ köylerine, ülkeye ilk yolculuğu şekillendiren yerler.",
    },
    content: {
      en: [
        "North Macedonia rewards travellers who move slowly. Skopje, Matka Canyon, Ohrid, Bitola, Krusevo, Mavrovo, and Tikves each reveal a different rhythm of the country.",
        "A strong itinerary balances headline monuments with local pauses: coffee in the Old Bazaar, a quiet lake path in Ohrid, a mountain lunch in Mavrovo, and a glass of Vranec in Tikves.",
        "The best route depends on season and pace, but a private plan makes it easy to connect cities, villages, and nature without losing the feeling of discovery.",
      ],
      mk: [
        "Северна Македонија ги наградува патниците што патуваат полека. Скопје, кањонот Матка, Охрид, Битола, Крушево, Маврово и Тиквеш откриваат различен ритам на земјата.",
        "Добрата маршрута ги балансира главните споменици со локални паузи: кафе во Старата чаршија, мирна езерска патека во Охрид, планински ручек во Маврово и чаша Вранец во Тиквеш.",
        "Најдобрата рута зависи од сезоната и темпото, но приватен план лесно ги поврзува градовите, селата и природата без да се изгуби чувството на откривање.",
      ],
      tr: [
        "Kuzey Makedonya yavaş hareket eden gezginleri ödüllendirir. Üsküp, Matka Kanyonu, Ohri, Manastır, Kruşevo, Mavrovo ve Tikveş ülkenin farklı ritimlerini gösterir.",
        "Güçlü bir rota önemli anıtları yerel molalarla dengeler: Eski Çarşı'da kahve, Ohri'de sakin bir göl yolu, Mavrovo'da dağ öğle yemeği ve Tikveş'te bir kadeh Vranec.",
        "En iyi rota mevsime ve tempoya bağlıdır; özel plan şehirleri, köyleri ve doğayı keşif hissini kaybetmeden bağlar.",
      ],
    },
  },
  {
    slug: "perfect-weekend-in-skopje",
    title: { en: "A Perfect Weekend in Skopje", mk: "Совршен викенд во Скопје", tr: "Üsküp'te Kusursuz Bir Hafta Sonu" },
    category: { en: "City Guide", mk: "Градски водич", tr: "Şehir Rehberi" },
    author: "Viktor Petrovski",
    date: "2026-04-22",
    readingTime: { en: "5 min read", mk: "5 минути читање", tr: "5 dk okuma" },
    coverImage: images.blog[1],
    excerpt: {
      en: "How to spend two days between the Stone Bridge, Old Bazaar, modern cafes, hillside views, and a quick canyon escape.",
      mk: "Како да поминете два дена меѓу Камениот мост, Старата чаршија, модерни кафулиња, погледи од рид и кратко бегство во кањон.",
      tr: "Taş Köprü, Eski Çarşı, modern kafeler, tepe manzaraları ve kısa bir kanyon kaçamağı arasında iki gün.",
    },
    content: {
      en: [
        "Start in the centre and cross the Stone Bridge early, before the Old Bazaar fills with afternoon movement.",
        "Use your second day for Matka Canyon or a slower neighbourhood route with cafes, museums, and local restaurants.",
        "Skopje works best when you mix contrasts: Ottoman lanes, modern squares, hilltop views, and warm hospitality.",
      ],
      mk: [
        "Започнете во центарот и преминете го Камениот мост рано, пред Старата чаршија да се исполни со попладневно движење.",
        "Вториот ден искористете го за Матка или побавна маалска рута со кафулиња, музеи и локални ресторани.",
        "Скопје најдобро функционира кога ги мешате контрастите: османлиски улички, модерни плоштади, ридски погледи и топло гостопримство.",
      ],
      tr: [
        "Merkezden başlayın ve Eski Çarşı öğleden sonra hareketlenmeden Taş Köprü'yü erken geçin.",
        "İkinci gününüzü Matka Kanyonu'na veya kafeler, müzeler ve yerel restoranlarla daha yavaş bir mahalle rotasına ayırın.",
        "Üsküp en iyi karşıtlıklarla çalışır: Osmanlı sokakları, modern meydanlar, tepe manzaraları ve sıcak misafirperverlik.",
      ],
    },
  },
  {
    slug: "why-ohrid-next-destination",
    title: { en: "Why Ohrid Should Be Your Next Destination", mk: "Зошто Охрид треба да биде вашата следна дестинација", tr: "Neden Sonraki Rotanız Ohri Olmalı" },
    category: { en: "Heritage", mk: "Наследство", tr: "Miras" },
    author: "Elena Markova",
    date: "2026-03-18",
    readingTime: { en: "7 min read", mk: "7 минути читање", tr: "7 dk okuma" },
    coverImage: images.blog[2],
    excerpt: {
      en: "Ohrid pairs lake calm with UNESCO heritage, small workshops, and sunset walks that feel timeless.",
      mk: "Охрид ја спојува езерската тишина со УНЕСКО наследство, мали работилници и безвременски прошетки на зајдисонце.",
      tr: "Ohri göl sakinliğini UNESCO mirası, küçük atölyeler ve zamansız gün batımı yürüyüşleriyle birleştirir.",
    },
    content: {
      en: [
        "Ohrid is both a heritage city and a lake retreat. Churches, amphitheatre stones, and old lanes sit within minutes of clear water.",
        "A private guide helps connect the monuments with the living city: pearl makers, family restaurants, and quiet viewpoints.",
        "Stay longer if you can. The city changes character in the early morning and again when the lake turns gold.",
      ],
      mk: [
        "Охрид е и град на наследство и езерско прибежиште. Цркви, амфитеатар и стари улички се на неколку минути од чистата вода.",
        "Приватен водич помага да се поврзат спомениците со живиот град: бисерџии, семејни ресторани и мирни видиковци.",
        "Останете подолго ако можете. Градот го менува карактерот рано наутро и повторно кога езерото станува златно.",
      ],
      tr: [
        "Ohri hem miras kenti hem de göl kaçamağıdır. Kiliseler, amfitiyatro taşları ve eski sokaklar berrak suya dakikalar uzaklıktadır.",
        "Özel rehber anıtları yaşayan şehirle bağlar: inci ustaları, aile restoranları ve sakin seyir noktaları.",
        "Mümkünse daha uzun kalın. Şehir sabah erken ve göl altına döndüğünde bambaşka görünür.",
      ],
    },
  },
  {
    slug: "best-time-to-visit-matka-canyon",
    title: { en: "The Best Time to Visit Matka Canyon", mk: "Најдобро време за посета на кањонот Матка", tr: "Matka Kanyonu'nu Ziyaret Etmek İçin En İyi Zaman" },
    category: { en: "Nature", mk: "Природа", tr: "Doğa" },
    author: "Arben Sulejmani",
    date: "2026-02-26",
    readingTime: { en: "4 min read", mk: "4 минути читање", tr: "4 dk okuma" },
    coverImage: images.blog[3],
    excerpt: {
      en: "Morning light, weekday visits, and shoulder seasons make the canyon feel calmer and more cinematic.",
      mk: "Утринската светлина, работните денови и преодните сезони го прават кањонот помирен и покинематографски.",
      tr: "Sabah ışığı, hafta içi ziyaretler ve ara sezonlar kanyonu daha sakin ve sinematik hissettirir.",
    },
    content: {
      en: [
        "Spring and autumn are ideal for Matka Canyon because the temperatures are comfortable and the water takes on deep colour.",
        "Arriving early gives you softer light, quieter paths, and more flexibility for boats or cave visits.",
        "In summer, choose a private transfer and plan a slower lunch so the day never feels crowded.",
      ],
      mk: [
        "Пролетта и есента се идеални за Матка бидејќи температурите се пријатни, а водата добива длабока боја.",
        "Раното пристигнување носи помека светлина, помирни патеки и поголема флексибилност за чамци или пештери.",
        "Во лето, изберете приватен трансфер и побавен ручек за денот да не изгледа преполн.",
      ],
      tr: [
        "İlkbahar ve sonbahar Matka için idealdir; sıcaklıklar rahattır ve su derin renklere bürünür.",
        "Erken varış daha yumuşak ışık, daha sakin patikalar ve tekne ya da mağara ziyaretlerinde esneklik sağlar.",
        "Yazın özel transfer ve daha yavaş bir öğle yemeği günü kalabalık hissettirmez.",
      ],
    },
  },
  {
    slug: "traditional-macedonian-food",
    title: { en: "Traditional Macedonian Food You Should Try", mk: "Традиционална македонска храна што треба да ја пробате", tr: "Denemeniz Gereken Geleneksel Makedon Yemekleri" },
    category: { en: "Food", mk: "Храна", tr: "Yemek" },
    author: "Aylin Demir",
    date: "2026-01-29",
    readingTime: { en: "5 min read", mk: "5 минути читање", tr: "5 dk okuma" },
    coverImage: images.blog[4],
    excerpt: {
      en: "Ajvar, tavce gravce, pastrmajlija, shopska salad, and village cheeses tell the country through flavour.",
      mk: "Ајвар, тавче гравче, пастрмајлија, шопска салата и селски сирења ја раскажуваат земјата преку вкус.",
      tr: "Ajvar, tavçe gravçe, pastrmayliya, şopska salata ve köy peynirleri ülkeyi lezzetle anlatır.",
    },
    content: {
      en: [
        "Food in North Macedonia is generous, seasonal, and deeply connected to family tables.",
        "A good food route should include market produce, a simple grill, slow beans, village cheese, and something sweet with strong coffee.",
        "Ask your guide where locals eat that week. Small seasonal changes often make the best meal of the trip.",
      ],
      mk: [
        "Храната во Северна Македонија е дарежлива, сезонска и длабоко поврзана со семејната трпеза.",
        "Добра гастро рута треба да вклучи пазарски производи, едноставна скара, бавно гравче, селско сирење и нешто слатко со силно кафе.",
        "Прашајте го водичот каде јадат локалците таа недела. Малите сезонски промени често го носат најдобриот оброк.",
      ],
      tr: [
        "Kuzey Makedonya'da yemek cömert, mevsimsel ve aile sofralarıyla derinden bağlantılıdır.",
        "İyi bir yemek rotası pazar ürünleri, sade ızgara, yavaş pişmiş fasulye, köy peyniri ve sert kahveyle tatlı içermelidir.",
        "Rehberinize o hafta yerlilerin nerede yediğini sorun. Küçük mevsimsel değişiklikler çoğu zaman seyahatin en iyi yemeğini getirir.",
      ],
    },
  },
  {
    slug: "complete-guide-mavrovo-national-park",
    title: { en: "A Complete Guide to Mavrovo National Park", mk: "Целосен водич за Национален парк Маврово", tr: "Mavrovo Milli Parkı İçin Tam Rehber" },
    category: { en: "Mountains", mk: "Планини", tr: "Dağlar" },
    author: "Viktor Petrovski",
    date: "2025-12-12",
    readingTime: { en: "8 min read", mk: "8 минути читање", tr: "8 dk okuma" },
    coverImage: images.blog[5],
    excerpt: {
      en: "What to know before visiting Mavrovo: seasons, viewpoints, villages, food stops, and easy route ideas.",
      mk: "Што треба да знаете пред посета на Маврово: сезони, видиковци, села, гастро паузи и лесни идеи за рута.",
      tr: "Mavrovo'yu ziyaret etmeden önce bilinmesi gerekenler: sezonlar, manzaralar, köyler, yemek molaları ve kolay rota fikirleri.",
    },
    content: {
      en: [
        "Mavrovo changes dramatically with the season. Winter brings snow scenes, spring brings green valleys, and autumn brings quiet colour.",
        "For first-time visitors, combine lake viewpoints with Galicnik or a shorter forest walk instead of trying to do everything.",
        "Private transport matters because the region is spread out. It gives you time for photo stops, lunch, and weather changes.",
      ],
      mk: [
        "Маврово драматично се менува со сезоната. Зимата носи снег, пролетта зелени долини, а есента тивки бои.",
        "За прва посета, комбинирајте езерски видиковци со Галичник или пократка шумска прошетка наместо да се обидете да видите сè.",
        "Приватниот превоз е важен бидејќи регионот е распространет. Дава време за фотографии, ручек и промени во времето.",
      ],
      tr: [
        "Mavrovo mevsime göre dramatik biçimde değişir. Kış kar manzaraları, ilkbahar yeşil vadiler, sonbahar sakin renkler getirir.",
        "İlk ziyaret için her şeyi yapmaya çalışmak yerine göl manzaralarını Galiçnik veya kısa bir orman yürüyüşüyle birleştirin.",
        "Bölge geniş olduğu için özel ulaşım önemlidir. Fotoğraf molaları, öğle yemeği ve hava değişimleri için zaman sağlar.",
      ],
    },
  },
];
