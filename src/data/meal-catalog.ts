export type MealCard = {
  id: string;
  name: string;
  mealType: "сніданок" | "обід" | "вечеря" | "перекус";
  calories: number;
  macros: string;
  description: string;
  imageUrl: string;
  tags: string[];
};

export const mealCatalog: MealCard[] = [
  {
    id: "mc-overnight",
    name: "Овернайт-вівсянка з ягодами",
    mealType: "сніданок",
    calories: 420,
    macros: "32P / 50C / 12F",
    description: "Вівсянка на мигдальному молоці з чіа та свіжими ягодами.",
    imageUrl:
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=600&q=80",
    tags: ["веган", "швидко"],
  },
  {
    id: "mc-tofu",
    name: "Скрембл із тофу",
    mealType: "сніданок",
    calories: 380,
    macros: "28P / 18C / 22F",
    description: "Тофу зі шпинатом, томатами та прянощами.",
    imageUrl:
      "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=600&q=80",
    tags: ["веган", "високий білок"],
  },
  {
    id: "mc-syrnyk",
    name: "Запечені сирники",
    mealType: "сніданок",
    calories: 430,
    macros: "34P / 40C / 14F",
    description: "Легкі сирники з йогуртовим соусом та ягодами.",
    imageUrl:
      "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=600&q=80",
    tags: ["низький цукор"],
  },
  {
    id: "mc-salmon-bowl",
    name: "Боул з лососем",
    mealType: "обід",
    calories: 560,
    macros: "40P / 55C / 18F",
    description: "Рис, кіноа, лосось, овочі та соус понзу.",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    tags: ["омега-3", "без глютену"],
  },
  {
    id: "mc-buckwheat",
    name: "Гречка з індичкою",
    mealType: "обід",
    calories: 520,
    macros: "45P / 48C / 15F",
    description: "Соковита індичка з грибами на гречаній подушці.",
    imageUrl:
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=600&q=80",
    tags: ["без глютену"],
  },
  {
    id: "mc-pesto",
    name: "Паста з куркою та песто",
    mealType: "обід",
    calories: 600,
    macros: "42P / 60C / 20F",
    description: "Цільнозернова паста, курка, броколі та базиліковий песто.",
    imageUrl:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80",
    tags: ["комфорт"],
  },
  {
    id: "mc-curry",
    name: "Кокосове карі з нутом",
    mealType: "вечеря",
    calories: 480,
    macros: "22P / 54C / 18F",
    description: "Нут, овочі та жасминовий рис у кокосовому соусі.",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    tags: ["веган", "пікантно"],
  },
  {
    id: "mc-chicken-salad",
    name: "Теплий салат з куркою",
    mealType: "вечеря",
    calories: 450,
    macros: "42P / 40C / 16F",
    description: "Курка, кіноа, зелень і цитрусовий соус.",
    imageUrl:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=600&q=80",
    tags: ["високий білок"],
  },
  {
    id: "mc-baked-cod",
    name: "Запечена тріска",
    mealType: "вечеря",
    calories: 430,
    macros: "38P / 28C / 18F",
    description: "Тріска з картоплею, цукіні й травами.",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    tags: ["омега-3"],
  },
  {
    id: "mc-yogurt",
    name: "Йогурт з горіхами",
    mealType: "перекус",
    calories: 220,
    macros: "18P / 16C / 10F",
    description: "Грецький йогурт, мед та мікс горіхів.",
    imageUrl:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80",
    tags: ["швидко"],
  },
  {
    id: "mc-hummus",
    name: "Хумус з овочами",
    mealType: "перекус",
    calories: 210,
    macros: "8P / 22C / 10F",
    description: "Хумус, морква, огірок і паприка.",
    imageUrl:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
    tags: ["веган"],
  },
  {
    id: "mc-protein-bar",
    name: "Протеїновий батончик",
    mealType: "перекус",
    calories: 240,
    macros: "20P / 20C / 12F",
    description: "Домашній батончик з фініками та арахісовою пастою.",
    imageUrl:
      "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=600&q=80",
    tags: ["високий білок"],
  },
];
