import { images } from "@/data/images";
import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    name: "Elena Markova",
    role: { en: "Founder and Travel Designer", mk: "Основач и дизајнер на патувања", tr: "Kurucu ve Seyahat Tasarımcısı" },
    bio: {
      en: "Elena designs private journeys with a focus on local hosts, calm pacing, and the details that make a trip feel personal.",
      mk: "Елена креира приватни патувања со фокус на локални домаќини, мирно темпо и детали што го прават патувањето лично.",
      tr: "Elena, yerel ev sahipleri, sakin tempo ve seyahati kişisel hissettiren ayrıntılar üzerine özel yolculuklar tasarlar.",
    },
    languages: ["English", "Macedonian", "Turkish", "Serbian"],
    image: images.team[0],
  },
  {
    name: "Arben Sulejmani",
    role: { en: "Operations Manager", mk: "Оперативен менаџер", tr: "Operasyon Müdürü" },
    bio: {
      en: "Arben coordinates vehicles, guides, timing, and guest support so every route runs smoothly from airport to final farewell.",
      mk: "Арбен ги координира возилата, водичите, времето и поддршката за гостите за секоја рута да тече беспрекорно.",
      tr: "Arben araçları, rehberleri, zamanlamayı ve misafir desteğini koordine ederek her rotanın sorunsuz işlemesini sağlar.",
    },
    languages: ["English", "Macedonian", "Albanian"],
    image: images.team[1],
  },
  {
    name: "Viktor Petrovski",
    role: { en: "Local Guide", mk: "Локален водич", tr: "Yerel Rehber" },
    bio: {
      en: "Viktor leads heritage walks, food stops, and mountain days with the storytelling of someone who grew up between city and village.",
      mk: "Виктор води наследни прошетки, гастро паузи и планински денови со приказни на човек што растел меѓу град и село.",
      tr: "Viktor, şehir ve köy arasında büyümüş birinin anlatımıyla miras yürüyüşleri, lezzet molaları ve dağ günleri yönetir.",
    },
    languages: ["English", "Macedonian", "German"],
    image: images.team[2],
  },
  {
    name: "Aylin Demir",
    role: { en: "Customer Experience Coordinator", mk: "Координатор за корисничко искуство", tr: "Misafir Deneyimi Koordinatörü" },
    bio: {
      en: "Aylin handles pre-trip questions, accessibility needs, restaurant notes, and the small touches guests remember.",
      mk: "Ајлин ги води прашањата пред патување, потребите за пристапност, ресторанските белешки и малите детали што гостите ги паметат.",
      tr: "Aylin seyahat öncesi soruları, erişilebilirlik ihtiyaçlarını, restoran notlarını ve misafirlerin hatırladığı küçük dokunuşları yönetir.",
    },
    languages: ["English", "Turkish", "Macedonian"],
    image: images.team[3],
  },
];
