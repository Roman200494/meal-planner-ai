"use client";

import Image from "next/image";
import { mealCatalog } from "@/data/meal-catalog";

const DAY_TOTAL = 7;
const MEALS_PER_DAY = 3;

type MealGalleryProps = {
  selected: Set<string>;
  onToggle: (mealId: string) => void;
};

export function MealGallery({ selected, onToggle }: MealGalleryProps) {
  const totalSelected = selected.size;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            Вибір страв
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Обери, що хочеш їсти цього тижня
          </h2>
        </div>
        <p className="text-sm text-slate-600">
          {totalSelected}/{DAY_TOTAL * MEALS_PER_DAY} основних страв позначено
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {mealCatalog.map((meal) => {
          const isSelected = selected.has(meal.id);
          return (
            <article
              key={meal.id}
              className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition ${
                isSelected ? "border-emerald-300 ring-2 ring-emerald-100" : "border-slate-100"
              }`}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={meal.imageUrl}
                  alt={meal.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700">
                  {meal.calories} ккал
                </div>
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {meal.name}
                  </h3>
                  <span className="text-xs uppercase text-slate-400">
                    {meal.mealType}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{meal.description}</p>
                <p className="text-xs font-mono text-slate-400">{meal.macros}</p>
                <div className="flex flex-wrap gap-2">
                  {meal.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onToggle(meal.id)}
                  className={`mt-2 w-full rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {isSelected ? "Обрано" : "Додати до плану"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
