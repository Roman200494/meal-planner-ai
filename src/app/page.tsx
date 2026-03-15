import { MealPlannerForm } from "@/components/MealPlannerForm";
import { MealPlannerWorkspace } from "@/components/MealPlannerWorkspace";

const steps = [
  {
    title: "Опиши контекст",
    detail:
      "Калорійність, стиль харчування й продукти, яких хочеш уникнути. Все займає менше хвилини.",
  },
  {
    title: "AI підбирає меню",
    detail:
      "Страви з нашого каталогу (до 6 інгредієнтів, до 30 хв) розкладаються на тиждень із повтореннями.",
  },
  {
    title: "Grocery list без лишнього",
    detail:
      "Список покупок автоматично групується та зберігається в Supabase разом із планом.",
  },
];

const heroStats = [
  { label: "Час приготування", value: "≤30 хв" },
  { label: "Інгредієнтів", value: "≤6" },
  { label: "Вартість", value: "₴99/тижд" },
];

const quickWins = [
  "Теплі фото страв через Pexels API",
  "Борщ чи лосось можна повторювати на 2 дні",
  "Grocery list + kcal/білок одразу на картці",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-10 text-[#2b1b14] sm:px-6 lg:px-10">
      <header className="relative overflow-hidden rounded-[40px] bg-white/90 p-8 shadow-[0_30px_80px_rgba(205,160,130,0.25)] ring-1 ring-[#f0d4c2]">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#f9d9c2]/60 blur-3xl" />
        <div className="absolute bottom-6 right-8 hidden h-32 w-32 rounded-full bg-[#f7c79e]/50 blur-3xl md:block" />
        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-[#c26a3a]">
              Meal Planner AI
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-[#2a160f] sm:text-5xl">
              Не думай, що готувати — AI збере меню на тиждень і список покупок за 30 секунд
            </h1>
            <p className="text-lg text-[#5d3b2a]">
              Для фітнес-блогера або зайнятої людини 25–35 років: теплі картки страв «як у ресторані»,
              реальні фото з Pexels та grocery list без зайвого.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#generator"
                className="rounded-full bg-[#c2613a] px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#a44f2d]"
              >
                Згенерувати меню зараз
              </a>
              <a
                href="https://meal-planner-ai-lemon.vercel.app"
                className="rounded-full border border-[#f0d4c2] px-7 py-3 text-center text-sm font-semibold text-[#8c5338] transition hover:border-[#d9ac8b]"
              >
                Продивитись демо
              </a>
            </div>
            <ul className="space-y-2 text-sm text-[#6c4a33]">
              {quickWins.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#c2613a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              className="absolute inset-0 rounded-[32px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(145deg, rgba(0,0,0,0.25), rgba(0,0,0,0.05)), url('https://images.pexels.com/photos/3298637/pexels-photo-3298637.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1')",
              }}
            />
            <div className="relative flex h-full flex-col justify-between rounded-[32px] bg-gradient-to-b from-[#20110b]/50 to-[#20110b]/30 p-6 text-white">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Sample plan</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl">
                  Понеділок — лосось з овочами, вівторок — борщ на два дні
                </h3>
                <p className="mt-3 text-sm text-white/80">
                  Кожна картка має kcal, білок і фото з Pexels. Хочеш замінити страву — просто клікни й обери іншу.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/15 p-3 text-center">
                    <p className="text-xs uppercase tracking-wide text-white/70">{stat.label}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section
        id="generator"
        className="grid gap-8 rounded-[32px] bg-white/90 p-6 shadow-[0_20px_70px_rgba(205,160,130,0.18)] ring-1 ring-[#f3dfd2] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
      >
        <div className="rounded-[28px] bg-[#fff9f3] p-4 shadow-inner">
          <MealPlannerForm />
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] bg-[#fef3e7] p-6 ring-1 ring-[#f4d3bf]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#c2613a]">
              Як це працює
            </p>
            <div className="mt-5 space-y-6">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-[#c2613a]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-[#2b1b14]">{step.title}</p>
                    <p className="text-sm text-[#6c4a33]">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-dashed border-[#d3a98f] bg-white/70 p-5 text-sm text-[#6c4a33]">
            Коли план готовий, можна одним кліком:
            <ul className="mt-3 space-y-1">
              <li>• зберегти план у Supabase</li>
              <li>• скопіювати grocery list в Telegram/нотатки</li>
              <li>• надіслати передплатникам як меню дня</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-[0_15px_50px_rgba(205,160,130,0.18)] ring-1 ring-[#f0d4c2]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#c2613a]">Workspace</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#2b1b14]">
              Меню «як у ресторані»: великі фото, kcal/білок на картці, повтори страв на 2 дні
            </h2>
            <p className="text-[#5d3b2a]">
              Галерея вже тягне фото через Pexels API: ти обираєш страви, ми автоматично розкладаємо їх по днях і підраховуємо закупи.
            </p>
          </div>
          <div className="rounded-[28px] bg-[#fff5eb] p-5 text-sm text-[#5d3b2a]">
            <p className="font-semibold text-[#c2613a]">Чому це працює:</p>
            <ul className="mt-3 space-y-2">
              <li>• Страви підготовлені під фітнес-аудиторію (25–35 років).</li>
              <li>• Кожен рецепт зберігається в Supabase — можна робити аналіз популярності.</li>
              <li>• Легко підключити платну підписку: ₴99/тиждень або ₴299/місяць.</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-[28px] border border-[#f0d4c2] bg-[#fff9f3] p-4">
          <MealPlannerWorkspace />
        </div>
      </section>
    </main>
  );
}
