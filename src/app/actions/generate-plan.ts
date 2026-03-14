"use server";

import { supabaseAdmin } from "@/lib/supabase";
import {
  generatePlanData,
  type DayPlan,
  type GroceryCategory,
} from "@/lib/meal-generator";

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
  grocery_list: GroceryCategory[];
  created_at: string;
};

export async function generateMealPlan(payload: PlanRequest) {
  const safePayload: PlanRequest = {
    email: payload.email?.trim() || undefined,
    calories: Number(payload.calories) || 1800,
    days: Math.min(Math.max(payload.days, 3), 7),
    includeSnack: payload.includeSnack,
    mealsPerDay: payload.mealsPerDay,
    focus: payload.focus?.trim() || "",
  };

  const { plan, groceryList } = generatePlanData({
    days: safePayload.days,
    includeSnack: safePayload.includeSnack,
    targetCalories: safePayload.calories,
  });

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
    throw new Error("Не вдалося зберегти план. Перевір ключі Supabase.");
  }

  return data as GeneratedMealPlan;
}
