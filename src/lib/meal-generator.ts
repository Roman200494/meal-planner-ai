export type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";

export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
  category: string;
};

export type MealRecipe = {
  id: string;
  name: string;
  slot: MealSlot;
  calories: number;
  macros: string;
  ingredients: Ingredient[];
  tags?: string[];
};

export type PlannedMeal = MealRecipe & { slotLabel: string };

export type DayPlan = {
  day: string;
  meals: PlannedMeal[];
  totalCalories: number;
};

export type GroceryItem = {
  name: string;
  unit: string;
  amount: number;
};

export type GroceryCategory = {
  category: string;
  items: GroceryItem[];
};

export type GeneratorInput = {
  days: number;
  includeSnack: boolean;
  targetCalories: number;
};

const SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: "Сніданок",
  lunch: "Обід",
  dinner: "Вечеря",
  snack: "Перекус",
};

const DAY_LABELS = [
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "Пʼятниця",
  "Субота",
  "Неділя",
];

const MEAL_LIBRARY: Record<MealSlot, MealRecipe[]> = {
  breakfast: [
    {
      id: "bf-overnight",
      name: "Овернайт-вівсянка з ягодами",
      slot: "breakfast",
      calories: 420,
      macros: "32P / 50C / 12F",
      ingredients: [
        { name: "вівсяні пластівці", amount: 60, unit: "г", category: "Зернові" },
        { name: "мигдальне молоко", amount: 200, unit: "мл", category: "Молочка" },
        { name: "чіа", amount: 10, unit: "г", category: "Суперфуди" },
        { name: "ягоди", amount: 80, unit: "г", category: "Фрукти" },
      ],
    },
    {
      id: "bf-tofu-scramble",
      name: "Скрембл із тофу та шпинатом",
      slot: "breakfast",
      calories: 380,
      macros: "28P / 18C / 22F",
      ingredients: [
        { name: "тофу", amount: 150, unit: "г", category: "Білок" },
        { name: "шпинат", amount: 50, unit: "г", category: "Зелень" },
        { name: "оливкова олія", amount: 10, unit: "г", category: "Жири" },
        { name: "томат чері", amount: 80, unit: "г", category: "Овочі" },
      ],
    },
    {
      id: "bf-syrnyky",
      name: "Запечені сирники з соусом",
      slot: "breakfast",
      calories: 430,
      macros: "34P / 40C / 14F",
      ingredients: [
        { name: "сир 5%", amount: 200, unit: "г", category: "Молочка" },
        { name: "яйце", amount: 1, unit: "шт", category: "Білок" },
        { name: "рисове борошно", amount: 40, unit: "г", category: "Зернові" },
        { name: "йогурт", amount: 50, unit: "г", category: "Молочка" },
      ],
    },
    {
      id: "bf-green-smoothie",
      name: "Зелений смузі з ківі",
      slot: "breakfast",
      calories: 310,
      macros: "18P / 42C / 8F",
      ingredients: [
        { name: "йогурт", amount: 150, unit: "г", category: "Молочка" },
        { name: "ківі", amount: 120, unit: "г", category: "Фрукти" },
        { name: "шпинат", amount: 40, unit: "г", category: "Зелень" },
        { name: "лляне насіння", amount: 10, unit: "г", category: "Суперфуди" },
      ],
    },
  ],
  lunch: [
    {
      id: "ln-salmon-bowl",
      name: "Боул із лососем та кіноа",
      slot: "lunch",
      calories: 560,
      macros: "40P / 55C / 18F",
      ingredients: [
        { name: "кіноа", amount: 70, unit: "г", category: "Зернові" },
        { name: "лосось", amount: 150, unit: "г", category: "Білок" },
        { name: "огірок", amount: 80, unit: "г", category: "Овочі" },
        { name: "авокадо", amount: 70, unit: "г", category: "Жири" },
      ],
    },
    {
      id: "ln-buckwheat",
      name: "Гречка з індичкою та грибами",
      slot: "lunch",
      calories: 520,
      macros: "45P / 48C / 15F",
      ingredients: [
        { name: "гречка", amount: 80, unit: "г", category: "Зернові" },
        { name: "філе індички", amount: 150, unit: "г", category: "Білок" },
        { name: "печериці", amount: 100, unit: "г", category: "Овочі" },
        { name: "цибуля", amount: 40, unit: "г", category: "Овочі" },
      ],
    },
    {
      id: "ln-pesto-pasta",
      name: "Паста з куркою та песто",
      slot: "lunch",
      calories: 600,
      macros: "42P / 60C / 20F",
      ingredients: [
        { name: "паста цільнозернова", amount: 90, unit: "г", category: "Зернові" },
        { name: "куряче філе", amount: 150, unit: "г", category: "Білок" },
        { name: "песто", amount: 30, unit: "г", category: "Жири" },
        { name: "броколі", amount: 80, unit: "г", category: "Овочі" },
      ],
    },
    {
      id: "ln-lentil-soup",
      name: "Томатно-нутовий суп",
      slot: "lunch",
      calories: 480,
      macros: "25P / 58C / 14F",
      ingredients: [
        { name: "нут", amount: 120, unit: "г", category: "Білок" },
        { name: "томат", amount: 150, unit: "г", category: "Овочі" },
        { name: "морква", amount: 80, unit: "г", category: "Овочі" },
        { name: "булгур", amount: 50, unit: "г", category: "Зернові" },
      ],
    },
  ],
  dinner: [
    {
      id: "dn-curry",
      name: "Кокосове карі з нутом",
      slot: "dinner",
      calories: 480,
      macros: "22P / 54C / 18F",
      ingredients: [
        { name: "нут", amount: 120, unit: "г", category: "Білок" },
        { name: "кокосове молоко", amount: 150, unit: "мл", category: "Жири" },
        { name: "рис жасмин", amount: 70, unit: "г", category: "Зернові" },
        { name: "броколі", amount: 80, unit: "г", category: "Овочі" },
      ],
    },
    {
      id: "dn-chicken-salad",
      name: "Теплий салат з куркою і кіноа",
      slot: "dinner",
      calories: 450,
      macros: "42P / 40C / 16F",
      ingredients: [
        { name: "куряче філе", amount: 140, unit: "г", category: "Білок" },
        { name: "кіноа", amount: 60, unit: "г", category: "Зернові" },
        { name: "листя салату", amount: 70, unit: "г", category: "Зелень" },
        { name: "оливкова олія", amount: 10, unit: "г", category: "Жири" },
      ],
    },
    {
      id: "dn-baked-cod",
      name: "Запечена тріска з овочами",
      slot: "dinner",
      calories: 430,
      macros: "38P / 28C / 18F",
      ingredients: [
        { name: "тріска", amount: 160, unit: "г", category: "Білок" },
        { name: "картопля", amount: 120, unit: "г", category: "Зернові" },
        { name: "цукіні", amount: 90, unit: "г", category: "Овочі" },
        { name: "лимон", amount: 30, unit: "г", category: "Спеції" },
      ],
    },
    {
      id: "dn-tofu-stirfry",
      name: "Стір-фрай з тофу та овочами",
      slot: "dinner",
      calories: 440,
      macros: "30P / 46C / 14F",
      ingredients: [
        { name: "тофу", amount: 160, unit: "г", category: "Білок" },
        { name: "рис", amount: 70, unit: "г", category: "Зернові" },
        { name: "болгарський перець", amount: 80, unit: "г", category: "Овочі" },
        { name: "соєвий соус", amount: 15, unit: "г", category: "Соуси" },
      ],
    },
  ],
  snack: [
    {
      id: "sn-yogurt",
      name: "Грецький йогурт з горіхами",
      slot: "snack",
      calories: 220,
      macros: "18P / 16C / 10F",
      ingredients: [
        { name: "йогурт", amount: 150, unit: "г", category: "Молочка" },
        { name: "горіхи", amount: 20, unit: "г", category: "Снеки" },
        { name: "мед", amount: 10, unit: "г", category: "Снеки" },
      ],
    },
    {
      id: "sn-hummus",
      name: "Хумус з морквяними паличками",
      slot: "snack",
      calories: 210,
      macros: "8P / 22C / 10F",
      ingredients: [
        { name: "хумус", amount: 70, unit: "г", category: "Снеки" },
        { name: "морква", amount: 90, unit: "г", category: "Овочі" },
      ],
    },
    {
      id: "sn-protein-bar",
      name: "Домашній протеїновий батончик",
      slot: "snack",
      calories: 240,
      macros: "20P / 20C / 12F",
      ingredients: [
        { name: "протеїновий порошок", amount: 30, unit: "г", category: "Суперфуди" },
        { name: "фініки", amount: 40, unit: "г", category: "Фрукти" },
        { name: "арахісова паста", amount: 25, unit: "г", category: "Снеки" },
      ],
    },
    {
      id: "sn-apple-butter",
      name: "Яблуко з мигдальною пастою",
      slot: "snack",
      calories: 200,
      macros: "6P / 28C / 8F",
      ingredients: [
        { name: "яблуко", amount: 150, unit: "г", category: "Фрукти" },
        { name: "мигдальна паста", amount: 20, unit: "г", category: "Снеки" },
      ],
    },
  ],
};

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generatePlanData(input: GeneratorInput) {
  const days = Math.min(Math.max(input.days, 3), 7);
  const rotation = {
    breakfast: shuffleArray(MEAL_LIBRARY.breakfast),
    lunch: shuffleArray(MEAL_LIBRARY.lunch),
    dinner: shuffleArray(MEAL_LIBRARY.dinner),
    snack: shuffleArray(MEAL_LIBRARY.snack),
  };

  const counters: Record<MealSlot, number> = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
  };

  const plan: DayPlan[] = Array.from({ length: days }, (_, idx) => {
    const baseSlots: MealSlot[] = ["breakfast", "lunch", "dinner"];
    if (input.includeSnack) {
      baseSlots.push("snack");
    }

    const meals = baseSlots.map((slot) => {
      const library = rotation[slot];
      const meal = library[counters[slot] % library.length];
      counters[slot] += 1;
      return {
        ...meal,
        slotLabel: SLOT_LABELS[slot],
      };
    });

    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

    return {
      day: DAY_LABELS[idx % DAY_LABELS.length],
      meals,
      totalCalories,
    };
  });

  const groceryList = buildCategorisedList(plan);

  return { plan, groceryList };
}

function buildCategorisedList(plan: DayPlan[]): GroceryCategory[] {
  const bucket = new Map<string, Map<string, GroceryItem>>();

  plan.forEach((day) => {
    day.meals.forEach((meal) => {
      meal.ingredients.forEach((ingredient) => {
        const category = ingredient.category;
        if (!bucket.has(category)) {
          bucket.set(category, new Map());
        }
        const categoryMap = bucket.get(category)!;
        const key = `${ingredient.name}-${ingredient.unit}`;
        const current = categoryMap.get(key);
        if (current) {
          current.amount += ingredient.amount;
        } else {
          categoryMap.set(key, {
            name: ingredient.name,
            unit: ingredient.unit,
            amount: ingredient.amount,
          });
        }
      });
    });
  });

  return Array.from(bucket.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([category, items]) => ({
      category,
      items: Array.from(items.values()).sort((a, b) => a.name.localeCompare(b.name)),
    }));
}
