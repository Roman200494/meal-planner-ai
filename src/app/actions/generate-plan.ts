"use server";

import { supabaseAdmin } from "@/lib/supabase";

type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

type LibraryMeal = {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  macros: string;
  ingredients: Ingredient[];
};

export type PlanRequest = {
  email?: string;
  calories: number;
  days: number;
  includeSnack: boolean;
  mealsPerDay: number;
  focus: string;
};

export type GeneratedMealPlan = {
  id: string;
  target_calories: number;
  meals: DayPlan[];
  grocery_list: GroceryItem[];
  created_at: string;
};

export type DayPlan = {
  day: string;
  meals: Array<LibraryMeal & { slot: string }>;
  totalCalories: number;
};

export type GroceryItem = {
  name: string;
  unit: string;
  amount: number;
};

const MEAL_LIBRARY: Record<string, LibraryMeal[]> = {
  breakfast: [
    {
      id: "bf-overnight",
      name: "Овернайт-вівсянка з ягодами",
      type: "breakfast",
      calories: 420,
      macros: "32P / 50C / 12F",
      ingredients: [
        { name: "вівсяні пластівці", amount: 60, unit: "г" },
        { name: "мигдальне молоко", amount: 200, unit: "мл" },
        { name: "чіа", amount: 10, unit: "г" },
        { name: "ягоди", amount: 80, unit: "г" },
      ],
    },
    {
      id: "bf-tofu-scramble",
      name: "Скрембл із тофу та шпинатом",
      type: "breakfast",
      calories: 380,
      macros: "28P / 18C / 22F",
      ingredients: [
        { name: "тофу", amount: 150, unit: "г" },
        { name: "шпинат", amount: 50, unit: "г" },
        { name: "оливкова олія", amount: 10, unit: "г" },
        { name: "томат чері", amount: 80, unit: "г" },
      ],
    },
  ],
  lunch: [
    {
      id: "ln-salmon-bowl",
      name: "Боул із лососем та кіноа",
      type: "lunch",
      calories: 560,
      macros: "40P / 55C / 18F",
      ingredients: [
        { name: "кіноа", amount: 70, unit: "г" },
        { name: "лосось", amount: 150, unit: "г" },
        { name: "огірок", amount: 80, unit: "г" },
        { name: "авокадо", amount: 70, unit: "г" },
      ],
    },
    {
      id: "ln-buckwheat",
      name: "Гречка з індичкою та грибами",
      type: "lunch",
      calories: 520,
      macros: "45P / 48C / 15F",
      ingredients: [
        { name: "гречка", amount: 80, unit: "г" },
        { name: "філе індички", amount: 150, unit: "г" },
        { name: "печериці", amount: 100, unit: "г" },
        { name: "цибуля", amount: 40, unit: "г" },
      ],
    },
  ],
  dinner: [
    {
      id: "dn-curry",
      name: "Кокосове карі з нутом",
      type: "dinner",
      calories: 480,
      macros: "22P / 54C / 18F",
      ingredients: [
        { name: "нут", amount: 120, unit: "г" },
        { name: "кокосове молоко", amount: 150, unit: "мл" },
        { name: "рис жасмин", amount: 70, unit: "г" },
        { name: "броколі", amount: 80, unit: "г" },
      ],
    },
    {
      id: "dn-chicken-salad",
      name: "Теплий салат з куркою і кіноа",
      type: "dinner",
      calories: 450,
      macros: "42P / 40C / 16F",
      ingredients: [
        { name: "куряче філе", amount: 140, unit: "г" },
        { name: "кіноа", amount: 60, unit: "г" },
        { name: "листя салату", amount: 70, unit: "г" },
        { name: "оливкова олія", amount: 10, unit: "г" },
      ],
    },
  ],
  snack: [
    {
      id: "sn-yogurt",
      name: "Грецький йогурт з горіхами",
      type: "snack",
      calories: 220,
      macros: "18P / 16C / 10F",
      ingredients: [
        { name: "йогурт", amount: 150, unit: "г" },
        { name: "горіхи", amount: 20, unit: "г" },
        { name: "мед", amount: 10, unit: "г" },
      ],
    },
    {
      id: "sn-hummus",
      name: "Хумус з морквяними паличками",
      type: "snack",
      calories: 210,
      macros: "8P / 22C / 10F",
      ingredients: [
        { name: "хумус", amount: 70, unit: "г" },
        { name: "морква", amount: 90, unit: "г" },
      ],
    },
  ],
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

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function buildDayPlan(payload: PlanRequest, dayIndex: number): DayPlan {
  const slots = [
    { slot: "Сніданок", meal: pickRandom(MEAL_LIBRARY.breakfast) },
    { slot: "Обід", meal: pickRandom(MEAL_LIBRARY.lunch) },
    { slot: "Вечеря", meal: pickRandom(MEAL_LIBRARY.dinner) },
  ];

  if (payload.includeSnack) {
    slots.push({ slot: "Перекус", meal: pickRandom(MEAL_LIBRARY.snack) });
  }

  const meals = slots.map(({ slot, meal }) => ({ ...meal, slot }));
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return {
    day: DAY_LABELS[dayIndex % DAY_LABELS.length],
    meals,
    totalCalories,
  };
}

function buildGroceryList(plan: DayPlan[]): GroceryItem[] {
  const store = new Map<string, GroceryItem>();

  plan.forEach((day) => {
    day.meals.forEach((meal) => {
      meal.ingredients.forEach((ingredient) => {
        const key = `${ingredient.name}-${ingredient.unit}`;
        const current = store.get(key);
        if (current) {
          current.amount += ingredient.amount;
        } else {
          store.set(key, {
            name: ingredient.name,
            unit: ingredient.unit,
            amount: ingredient.amount,
          });
        }
      });
    });
  });

  return Array.from(store.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function generateMealPlan(payload: PlanRequest) {
  const safePayload: PlanRequest = {
    email: payload.email?.trim() || undefined,
    calories: Number(payload.calories) || 1800,
    days: Math.min(Math.max(payload.days, 3), 7),
    includeSnack: payload.includeSnack,
    mealsPerDay: payload.mealsPerDay,
    focus: payload.focus,
  };

  const plan: DayPlan[] = Array.from({ length: safePayload.days }, (_, index) =>
    buildDayPlan(safePayload, index)
  );

  const groceryList = buildGroceryList(plan);

  const { data, error } = await supabaseAdmin
    .from("meal_plans")
    .insert({
      profile_email: safePayload.email,
      target_calories: safePayload.calories,
      days: safePayload.days,
      meals: plan,
      grocery_list: groceryList,
      notes: safePayload.focus,
    })
    .select("id, target_calories, meals, grocery_list, created_at")
    .single();

  if (error) {
    console.error("Supabase insert error", error);
    throw new Error("Не вдалося зберегти план. Перевіряю ключі Supabase.");
  }

  return data as GeneratedMealPlan;
}
