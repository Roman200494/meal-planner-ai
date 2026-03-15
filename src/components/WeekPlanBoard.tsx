"use client";

import type { MealCard } from "@/data/meal-catalog";

const days = [
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "Пʼятниця",
  "Субота",
  "Неділя",
];

type Props = {
  selection: MealCard[];
};

export function WeekPlanBoard({ selection }: Props) {
  const breakfasts = selection.filter((meal) => meal.mealType === "breakfast");
  const lunches = selection.filter((meal) => meal.mealType === "lunch");
  const dinners = selection.filter((meal) => meal.mealType === "dinner");
  const snacks = selection.filter((meal) => meal.mealType === "snack");

  const fallback = (list: MealCard[], index: number) =>
    list.length ? list[index % list.length] : selection[index % selection.length];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            План на тиждень
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Попередній розклад (по 3 страви на день)
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {days.map((day, index) => {
          const breakfast = fallback(breakfasts, index);
          const lunch = fallback(lunches, index);
          const dinner = fallback(dinners, index);
          const snack = fallback(snacks, index);

          return (
            <div
              key={day}
              className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{day}</h3>
                <span className="text-xs text-slate-400">
                  {breakfast.calories + lunch.calories + dinner.calories} ккал
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="rounded-2xl bg-slate-50 px-3 py-2">
                  <p className="font-semibold text-slate-900">Сніданок</p>
                  <p className="text-slate-600">{breakfast.name}</p>
                </li>
                <li className="rounded-2xl bg-slate-50 px-3 py-2">
                  <p className="font-semibold text-slate-900">Обід</p>
                  <p className="text-slate-600">{lunch.name}</p>
                </li>
                <li className="rounded-2xl bg-slate-50 px-3 py-2">
                  <p className="font-semibold text-slate-900">Вечеря</p>
                  <p className="text-slate-600">{dinner.name}</p>
                </li>
                <li className="rounded-2xl bg-emerald-50/70 px-3 py-2">
                  <p className="font-semibold text-emerald-800">Перекус</p>
                  <p className="text-emerald-700">{snack.name}</p>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
