import { generateMealPlan } from "@/app/actions/generate-plan";

async function main() {
  const result = await generateMealPlan({
    
    calories: 2000,
    days: 3,
    includeSnack: true,
    mealsPerDay: 3,
    focus: "smoke-test",
  });

  console.log(
    `Created plan ${result.id} with ${result.meals.length} days and ${result.grocery_list.length} grocery categories`
  );
}

main().catch((error) => {
  console.error("Smoke test failed", error);
  process.exit(1);
});
