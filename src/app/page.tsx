import { MealPlannerForm } from "@/components/MealPlannerForm";
import { MealGallery } from "@/components/MealGallery";

const steps = [
  {
    title: "Опиши контекст",
    detail: "Ціль, калорійність, обмеження — форма збирає базові параметри.",
  },
  {
    title: "AI підбір та Supabase",
    detail:
      "Server action формує меню, а Supabase зберігає план + grocery list в таблицю meal_plans.",
  },
  {
    title: "Шеринг з аудиторією",
    detail: "Посилання можна кидати тестерам і збирати фідбек у той самий день.",
  },
];

const highlights = [
  {
    label: "Таймінг",
    value: "< 2 хв",
    detail: "на створення меню",
  },
  {
    label: "Економія",
    value: "-15%",
    detail: "менше зайвих закупів",
  },
  {
    label: "Гнучкість",
    value: "3-7 днів",
    detail: "довжина плану",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-10">
      <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Live MVP
            </p>
            <h1 className="text-4xl font-semibold text-slate-900">
              Meal Planner AI: <span className="text-emerald-600">тижневе меню + закупи</span> одним кліком
            </h1>
            <p className="text-lg text-slate-600">
              Форма → AI логіка → Supabase. Збирай плани, тестуй монетизацію і підключай доставку продуктів.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#generator"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Згенерувати план
              </a>
              <a
                href="https://meal-planner-ai-lemon.vercel.app"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              >
                Продакшн лінк
              </a>
            </div>
          </div>
          <div className="grid w-full max-w-sm grid-cols-3 gap-3 rounded-3xl border border-slate-100 p-5 text-center">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {item.label}
                </p>
                <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
                <p className="text-xs text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section
        id="generator"
        className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
      >
        <MealPlannerForm />

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-xl font-semibold text-slate-900">Як виглядає процес</h2>
            <div className="mt-4 space-y-5">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-sm font-semibold text-emerald-700">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-900">{step.title}</p>
                    <p className="text-sm text-slate-600">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/70 p-5 text-sm text-emerald-800">
            Наступний крок — підключити справжню базу рецептів, обробити фідбек тестерів та додати інтеграції з доставкою продуктів.
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <MealGallery />
      </section>
    </main>
  );
}
