import { SocialButtons } from '@/components/SocialButtons';
import { ContactForm } from '@/components/ContactForm';
import { Hero3D } from '@/components/Hero3D';
import { CNCHistory } from '@/components/CNCHistory';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Конструктор ЧПУ 💾 | Обратная связь</title>
        <meta
          name="description"
          content="Telegram-бот для программирования станков с ЧПУ. Расчёты, геометрия, G-код для Fanuc, Siemens, Haas. Форма обратной связи и предложений."
        />
        <meta
          name="keywords"
          content="ЧПУ, CNC, программирование станков, G-код, Fanuc, Siemens, Haas, токарная обработка, калькулятор ЧПУ"
        />
      </Helmet>

      <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Индустриальный фон с сеткой */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        {/* Металлические акценты */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

        {/* Основной контент */}
        <div className="relative z-10">
          <SocialButtons />

          {/* 3D Hero секция */}
          <Hero3D />

          <main className="container max-w-4xl mx-auto px-4 py-12">
            {/* Заголовок */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  Конструктор ЧПУ
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Ваши идеи делают бота лучше! Предложите улучшение или сообщите о проблеме.
              </p>
            </div>

            {/* Форма обратной связи */}
            <ContactForm />

            {/* История ЧПУ */}
            <CNCHistory />
          </main>
        </div>
      </div>
    </>
  );
}

