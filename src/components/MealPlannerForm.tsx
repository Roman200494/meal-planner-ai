"use client";

import { useMemo, useState, useTransition } from "react";
import {
  generateMealPlan,
  type GeneratedMealPlan,
} from "@/app/actions/generate-plan";
import type { MealSlot } from "@/lib/meal-generator";

const peopleOptions = [1, 2, 3, 4];
const mealOptions: { value: MealSlot; label: string }[] = [
  { value: "breakfast", label: "Сніданок" },
  { value: "lunch", label: "Обід" },
  { value: "dinner", label: "Вечеря" },
  { value: "snack", label: "Перекус" },
];

const exclusionOptions = [
  "без м'яса",
  "без риби",
  "без молочки",
  "без глютену",
];

export function MealPlannerForm() {
  const [plan, setPlan] = useState<GeneratedMealPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [people, setPeople] = useState(2);
  const [selectedMeals, setSelectedMeals] = useState<MealSlot[]>([
    "breakfast",
    "lunch",
    "dinner",
  ]);
  const [exclusions, setExclusions] = useState<string[]>([]);

  const toggleMeal = (slot: MealSlot) => {
    setSelectedMeals((prev) => {
      const next = prev.includes(slot) ? prev.filter((item) => item !== slot) : [...prev, slot];
      return next.length ? next : prev; // не дозволяємо спорожнити вибір
    });
  };

  const toggleExclusion = (value: string) => {
    setExclusions((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const planMeta = useMemo(() => {
    const mealsLabel = mealOptions
      .filter((option) => selectedMeals.includes(option.value))
      .map((option) => option.label)
      .join(", ");
    const exclusionsLabel = exclusions.length ? exclusions.join(", ") : "немає";
    return `${people} люд. · ${mealsLabel} · обмеження: ${exclusionsLabel}`;
  }, [people, selectedMeals, exclusions]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedMeals.length) {
      setError("Оберіть хоча б один прийом їжі");
      return;
    }

    startTransition(async () => {
      try {
        setError(null);
        const response = await generateMealPlan({
          people,
          meals: selectedMeals,
          exclusions,
        });
        setPlan(response);
      } catch (err) {
        console.error(err);
        setError("Не вдалося згенерувати план. Перевір підключення до Supabase.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-[32px] bg-white/90 p-6 shadow-[0_20px_60px_rgba(194,97,58,0.15)] ring-1 ring-[#f3dfd2]"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#c2613a]">Meal planner</p>
            <h2 className="text-2xl font-[family-name:var(--font-display)] text-[#2b1b14]">
              3 кроки замість довгої анкети
            </h2>
          </div>
          <span className="rounded-full bg-[#fff3e6] px-4 py-1 text-xs font-semibold text-[#c2613a]">
            {planMeta}
          </span>
        </div>

        <section className="mt-6 space-y-2">
          <p className="text-sm font-semibold text-[#5d3b2a]">1. Скільки людей готуємо?</p>
          <div className="grid grid-cols-4 gap-3">
            {peopleOptions.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setPeople(count)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  people === count
                    ? "border-[#c2613a] bg-[#fff1e3] text-[#c2613a]"
                    : "border-[#f0d4c2] text-[#5d3b2a] hover:border-[#d9ac8b]"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 space-y-2">
          <p className="text-sm font-semibold text-[#5d3b2a]">2. Які прийоми їжі плануємо?</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {mealOptions.map((option) => {
              const isActive = selectedMeals.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleMeal(option.value)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "border-[#4f5b2c] bg-[#e8f3d0] text-[#4f5b2c]"
                      : "border-[#f0d4c2] text-[#5d3b2a] hover:border-[#d9ac8b]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 space-y-2">
          <p className="text-sm font-semibold text-[#5d3b2a]">3. Що не їмо?</p>
          <div className="flex flex-wrap gap-2">
            {exclusionOptions.map((option) => {
              const isActive = exclusions.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleExclusion(option)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-[#c2613a] text-white"
                      : "bg-[#fff1e3] text-[#8c5338] hover:bg-[#f8d8bf]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-[#c2613a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a44f2d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Генеруємо…" : "Зібрати меню"}
          </button>
          {error && <p className="text-sm text-rose-600">{error}</p>}
        </div>
      </form>

      <div className="rounded-[32px] bg-white/90 p-6 shadow-[0_20px_60px_rgba(194,97,58,0.15)] ring-1 ring-[#f3dfd2]">
        <h3 className="text-base font-semibold text-[#2b1b14]">
          {plan ? "Готовий план" : "Превʼю результату"}
        </h3>
        {!plan && (
          <p className="mt-2 text-sm text-[#6c4a33]">
            Після натискання кнопки отримаєш тижневий розклад і список покупок у Supabase.
          </p>
        )}

        {plan && (
          <div className="mt-4 space-y-4">
            {plan.meals.slice(0, 2).map((day) => (
              <div key={day.day} className="rounded-2xl border border-[#f0d4c2] bg-[#fff9f3] p-4">
                <div className="flex items-center justify-between text-sm font-semibold text-[#5d3b2a]">
                  <p>{day.day}</p>
                  <p>{day.totalCalories} ккал</p>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#6c4a33]">
                  {day.meals.map((meal) => (
                    <li key={`${day.day}-${meal.id}`} className="flex items-center justify-between">
                      <span>
                        {meal.slotLabel}: {meal.name}
                      </span>
                      <span className="text-xs text-[#8c5338]">{meal.calories} ккал</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-2xl border border-dashed border-[#f0d4c2] p-4 text-sm text-[#6c4a33]">
              <p className="font-semibold text-[#c2613a]">Список покупок</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {plan.grocery_list.slice(0, 2).map((group) => (
                  <div key={group.category} className="rounded-xl border border-[#f3dfd2] bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8c5338]">
                      {group.category}
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-[#6c4a33]">
                      {group.items.slice(0, 3).map((item) => (
                        <li key={`${group.category}-${item.name}`}>
                          {item.name}: {Math.round(item.amount)} {item.unit}
                        </li>
                      ))}
                      {group.items.length > 3 && (
                        <li className="text-[#b37758]">+ ще {group.items.length - 3}</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-[#d9ac8b] bg-[#fff5eb] p-4 text-xs text-[#8c5338]">
              План збережено в Supabase (`meal_plans`). Категорій у grocery list: {plan.grocery_list.length}.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
