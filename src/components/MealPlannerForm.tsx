"use client";

import { useState, useTransition } from "react";
import {
  generateMealPlan,
  type GeneratedMealPlan,
} from "@/app/actions/generate-plan";

const calorieTargets = [1600, 1800, 2000, 2300];
const focuses = [
  "Харчування для енергії",
  "Зниження ваги",
  "Підтримка мʼязів",
];

export function MealPlannerForm() {
  const [plan, setPlan] = useState<GeneratedMealPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload = {
      email: formData.get("email")?.toString(),
      calories: Number(formData.get("calories")),
      days: Number(formData.get("days")),
      includeSnack: formData.get("snack") === "on",
      mealsPerDay: 3,
      focus: formData.get("focus")?.toString() ?? "",
    };

    startTransition(async () => {
      try {
        setError(null);
        const response = await generateMealPlan(payload);
        setPlan(response);
      } catch (err) {
        console.error(err);
        setError("Не вдалося згенерувати план. Перевір дані або ключі Supabase.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-600">
              AI Meal Generator
            </p>
            <h2 className="text-xl font-semibold text-slate-900">
              Параметри плану
            </h2>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            beta
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm">
            <span className="text-slate-500">Email (опціонально)</span>
            <input
              name="email"
              type="email"
              placeholder="king.roman@example.com"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none"
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-slate-500">Фокус</span>
            <select
              name="focus"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none"
              defaultValue={focuses[0]}
            >
              {focuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-slate-500">Калорійність</span>
            <select
              name="calories"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none"
              defaultValue={calorieTargets[2]}
            >
              {calorieTargets.map((value) => (
                <option key={value} value={value}>
                  {value} ккал/день
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-slate-500">Тривалість</span>
            <select
              name="days"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none"
              defaultValue={7}
            >
              {[3, 5, 7].map((value) => (
                <option key={value} value={value}>
                  {value} днів
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
          <input
            type="checkbox"
            name="snack"
            defaultChecked
            className="h-4 w-4 rounded border-slate-300 text-emerald-600"
          />
          Додати перекуси
        </label>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Генеруємо…" : "Згенерувати план"}
          </button>
          {error && <p className="text-sm text-rose-600">{error}</p>}
        </div>
      </form>

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-base font-semibold text-slate-900">
          {plan ? "Готовий план" : "Превʼю результату"}
        </h3>
        {!plan && (
          <p className="mt-2 text-sm text-slate-500">
            Заповни форму вище, щоб побачити тижневий розклад і список покупок.
          </p>
        )}

        {plan && (
          <div className="mt-4 space-y-4">
            {plan.meals.slice(0, 2).map((day) => (
              <div key={day.day} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-600">{day.day}</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {day.totalCalories} ккал
                  </p>
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  {day.meals.map((meal) => (
                    <li key={`${day.day}-${meal.id}`} className="flex items-center justify-between">
                      <span className="text-slate-600">
                        {meal.slotLabel}: {meal.name}
                      </span>
                      <span className="text-slate-400">{meal.calories} ккал</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-2xl border border-slate-100 p-4 text-sm">
              <p className="font-semibold text-slate-900">Список покупок</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {plan.grocery_list.slice(0, 2).map((group) => (
                  <div key={group.category} className="rounded-xl border border-dashed border-slate-200 p-3">
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      {group.category}
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-slate-600">
                      {group.items.slice(0, 3).map((item) => (
                        <li key={`${group.category}-${item.name}`}>
                          {item.name}: {Math.round(item.amount)} {item.unit}
                        </li>
                      ))}
                      {group.items.length > 3 && (
                        <li className="text-slate-400">+ ще {group.items.length - 3}</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-800">
              Збережено в Supabase (`meal_plans`). Категорій у grocery list: {plan.grocery_list.length}.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
