"use client";

import { useMemo, useState } from "react";
import { mealCatalog } from "@/data/meal-catalog";
import { MealGallery } from "@/components/MealGallery";
import { WeekPlanBoard } from "@/components/WeekPlanBoard";

export function MealPlannerWorkspace() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const planMeals = useMemo(() => {
    const selectedMeals = mealCatalog.filter((meal) => selected.has(meal.id));
    return selectedMeals.length > 0 ? selectedMeals : mealCatalog;
  }, [selected]);

  const summary = useMemo(() => {
    return planMeals.reduce(
      (acc, meal) => {
        if (meal.mealType === "сніданок") acc.breakfast += 1;
        if (meal.mealType === "обід") acc.lunch += 1;
        if (meal.mealType === "вечеря") acc.dinner += 1;
        if (meal.mealType === "перекус") acc.snack += 1;
        return acc;
      },
      { breakfast: 0, lunch: 0, dinner: 0, snack: 0 }
    );
  }, [planMeals]);

  const handleToggle = (mealId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(mealId)) {
        next.delete(mealId);
      } else {
        next.add(mealId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <MealGallery selected={selected} onToggle={handleToggle} />
      <WeekPlanBoard selection={planMeals} />
      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">Зведення</p>
        <p className="mt-1">
          Сніданків: {summary.breakfast} · Обідів: {summary.lunch} · Вечерь: {summary.dinner} · Перекусів: {summary.snack}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Вибрані позиції автоматично переносяться у план і список покупок (бек логіка).
        </p>
      </div>
    </div>
  );
}
