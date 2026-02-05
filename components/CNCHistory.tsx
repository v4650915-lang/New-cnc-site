'use client';

import { motion } from 'framer-motion';

export const CNCHistory = () => {
    return (
        <div className="relative max-w-5xl mx-auto my-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm p-8 md:p-12"
            >
                {/* Декоративные элементы */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    {/* Заголовок */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-16 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
                        <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                            История ЧПУ
                        </h2>
                    </div>

                    {/* Контент */}
                    <div className="space-y-6 text-slate-300 leading-relaxed">
                        <p className="text-lg">
                            <span className="text-orange-400 font-bold">Числовое программное управление (ЧПУ)</span> — это революционная технология,
                            которая изменила мир производства навсегда. Всё началось в <span className="text-yellow-400 font-semibold">1949 году</span>,
                            когда ВВС США поручили компании Parsons Corporation разработать систему для автоматизации производства сложных деталей для авиации.
                        </p>

                        <p>
                            Первый станок с ЧПУ был создан в <span className="text-yellow-400 font-semibold">1952 году</span> в Массачусетском технологическом институте (MIT).
                            Это был трёхкоординатный фрезерный станок, управляемый перфокартами. Программа занимала целую комнату,
                            но результат был впечатляющим — точность обработки достигла невиданных высот.
                        </p>

                        <div className="bg-slate-900/50 border-l-4 border-orange-500 p-6 rounded-r-lg my-6">
                            <p className="text-orange-300 font-semibold mb-2">💡 Интересный факт:</p>
                            <p className="text-slate-400">
                                Компания <span className="text-orange-400 font-bold">FANUC</span> (Fujitsu Automatic Numerical Control),
                                основанная в 1956 году, стала мировым лидером в производстве систем ЧПУ.
                                Сегодня более 50% всех станков с ЧПУ в мире используют системы FANUC.
                            </p>
                        </div>

                        <p>
                            В <span className="text-yellow-400 font-semibold">1970-х годах</span> появились микропроцессоры,
                            что сделало станки с ЧПУ компактнее и доступнее. Программирование стало проще благодаря языку <span className="text-orange-400 font-bold">G-код</span>,
                            который используется и по сей день.
                        </p>

                        <p>
                            Современные станки с ЧПУ — это высокоточные машины, способные обрабатывать детали с точностью до <span className="text-orange-400 font-bold">0.001 мм</span>.
                            Они используются в авиации, медицине, автомобилестроении и даже в производстве ювелирных изделий.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700/50 text-center">
                                <div className="text-3xl font-black text-orange-400 mb-2">1952</div>
                                <div className="text-sm text-slate-400">Первый станок с ЧПУ</div>
                            </div>
                            <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700/50 text-center">
                                <div className="text-3xl font-black text-orange-400 mb-2">50%</div>
                                <div className="text-sm text-slate-400">Доля FANUC на рынке</div>
                            </div>
                            <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700/50 text-center">
                                <div className="text-3xl font-black text-orange-400 mb-2">0.001мм</div>
                                <div className="text-sm text-slate-400">Точность обработки</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
