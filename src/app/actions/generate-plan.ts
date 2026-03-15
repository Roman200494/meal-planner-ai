"use server";

import { supabaseAdmin } from "@/lib/supabase";
import {
  generatePlanData,
  type DayPlan,
  type GroceryCategory,
  type MealSlot,
} from "@/lib/meal-generator";

export type PlanRequest = {
  people: number;
  meals: MealSlot[];
  exclusions: string[];
};

export type GeneratedMealPlan = {
  id: string;
  target_calories: number;
  meals: DayPlan[];
  grocery_list: GroceryCategory[];
  created_at: string;
};

const DAYS_IN_PLAN = 7;
const FALLBACK_MEALS: MealSlot[] = ["breakfast", "lunch", "dinner"];

export async function generateMealPlan(payload: PlanRequest) {
  const safePayload = {
    people: Math.max(1, Math.min(Number(payload.people) || 1, 6)),
    meals: (payload.meals?.length ? payload.meals : FALLBACK_MEALS).filter(
      (slot, index, self) => self.indexOf(slot) === index
    ),
    exclusions: Array.isArray(payload.exclusions) ? payload.exclusions : [],
  };

  const { plan, groceryList } = generatePlanData({
    days: DAYS_IN_PLAN,
    mealSlots: safePayload.meals,
    exclusions: safePayload.exclusions,
    people: safePayload.people,
  });

  const { data, error } = await supabaseAdmin
    .from("meal_plans")
    .insert({
      profile_email: null,
      target_calories: safePayload.people * 600,
      days: DAYS_IN_PLAN,
      meals: plan,
      grocery_list: groceryList,
      notes: JSON.stringify({
        exclusions: safePayload.exclusions,
        meals: safePayload.meals,
      }),
    })
    .select("id, target_calories, meals, grocery_list, created_at")
    .single();

  if (error) {
    console.error("Supabase insert error", error);
    throw new Error("Не вдалося зберегти план. Перевір ключі Supabase.");
  }

  return data as GeneratedMealPlan;
}
