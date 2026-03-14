const sampleMeals = [
  {
    id: 1,
    name: "Вівсянка з ягодами",
    type: "Сніданок",
    calories: 420,
    macros: "35P / 45C / 12F",
  },
  {
    id: 2,
    name: "Боул із лососем",
    type: "Обід",
    calories: 560,
    macros: "42P / 48C / 20F",
  },
  {
    id: 3,
    name: "Теплий салат з куркою",
    type: "Вечеря",
    calories: 480,
    macros: "38P / 32C / 18F",
  },
];

const steps = [
  { title: "Опиши ціль", detail: "Оберіть калорійність, обмеження та кількість прийомів їжі." },
  { title: "Отримай план", detail: "AI підбирає меню на тиждень + список покупок без зайвого." },
  { title: "Запусти тест", detail: "Надішліть посилання друзям та зберіть фідбек." },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-10">
      <header className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <p className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            Early MVP • Meal Planner AI
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            Плануй харчування на тиждень <span className="text-emerald-600">без табличного болю</span>
          </h1>
          <p className="text-lg text-slate-600">
            Собери меню, порахуй калорії й згенеруй список закупів за кілька хвилин. Готово до тестів з аудиторією.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
              Зібрати план
            </button>
            <button className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
              Переглянути демо
            </button>
          </div>
        </div>
        <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-slate-900 p-5 text-white shadow-sm">
          <p className="text-sm uppercase tracking-wide text-slate-300">Параметри плану</p>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="text-slate-400">Калорійність</p>
              <p className="text-lg font-semibold">2 000 ккал / день</p>
            </div>
            <div>
              <p className="text-slate-400">Прийоми їжі</p>
              <p className="text-lg font-semibold">3 основних + 1 перекус</p>
            </div>
            <div>
              <p className="text-slate-400">Обмеження</p>
              <p className="text-lg font-semibold">Без цукру, high-protein</p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-semibold text-slate-900">Приклад дня</h2>
          <p className="mt-1 text-sm text-slate-500">Середа • 1 460 ккал</p>
          <ul className="mt-6 space-y-4">
            {sampleMeals.map((meal) => (
              <li
                key={meal.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-500">{meal.type}</p>
                  <p className="text-base font-semibold text-slate-900">{meal.name}</p>
                  <p className="text-sm text-slate-500">{meal.macros}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{meal.calories}</p>
                  <p className="text-sm text-slate-500">ккал</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-semibold text-slate-900">Як це працює</h2>
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
          <div className="mt-6 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-800">
            Після MVP підʼєднаємо Supabase, генерацію меню та grocery list, щоб тестери бачили живий результат.
          </div>
        </div>
      </section>
    </main>
  );
}
