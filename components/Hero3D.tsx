'use client';

import { motion } from 'framer-motion';

export const Hero3D = () => {
    return (
        <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
            {/* Вращающийся 3D куб на фоне */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
                <motion.div
                    animate={{
                        rotateX: 360,
                        rotateY: 360,
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        transformStyle: 'preserve-3d',
                        width: '300px',
                        height: '300px',
                    }}
                >
                    {/* Грани куба */}
                    {[
                        {
                            transform: 'rotateY(0deg) translateZ(150px)',
                            bg: 'from-yellow-400/30 to-yellow-500/30',
                            text: 'FANUC',
                            textColor: '#ED1C24',
                            bgColor: 'linear-gradient(to bottom, #fff04d 0%, #FFE600 30%, #f2d900 100%)',
                            fontSize: '2.5rem'
                        },
                        {
                            transform: 'rotateY(90deg) translateZ(150px)',
                            bg: 'from-cyan-500/30 to-teal-500/30',
                            text: 'SIEMENS',
                            textColor: '#ffffff',
                            bgColor: '#009999',
                            fontSize: '1.8rem'
                        },
                        {
                            transform: 'rotateY(180deg) translateZ(150px)',
                            bg: 'from-gray-600/30 to-gray-700/30',
                            text: 'HAAS',
                            textColor: '#000000',
                            bgColor: '#C0C0C0',
                            fontSize: '2.5rem'
                        },
                        {
                            transform: 'rotateY(-90deg) translateZ(150px)',
                            bg: 'from-blue-600/30 to-blue-700/30',
                            text: 'FMS',
                            textColor: '#ffffff',
                            bgColor: '#003DA5',
                            fontSize: '2.8rem'
                        },
                        {
                            transform: 'rotateX(90deg) translateZ(150px)',
                            bg: 'from-red-500/30 to-red-600/30',
                            text: 'MAZAK',
                            textColor: '#ffffff',
                            bgColor: '#E31E24',
                            fontSize: '2.2rem'
                        },
                        {
                            transform: 'rotateX(-90deg) translateZ(150px)',
                            bg: 'from-orange-500/30 to-orange-600/30',
                            text: 'SYNTEC',
                            textColor: '#ffffff',
                            bgColor: '#FF6600',
                            fontSize: '2rem'
                        },
                    ].map((face, i) => (
                        <div
                            key={i}
                            className={`absolute w-full h-full bg-gradient-to-br ${face.bg} border-2 border-white/30 backdrop-blur-sm`}
                            style={{
                                transform: face.transform,
                                backfaceVisibility: 'visible',
                            }}
                        >
                            <div className="w-full h-full flex items-center justify-center p-4">
                                <div
                                    className="px-6 py-3 rounded-md shadow-lg"
                                    style={{
                                        background: face.bgColor,
                                        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial Black', sans-serif",
                                        fontSize: face.fontSize,
                                        fontWeight: 900,
                                        color: face.textColor,
                                        textTransform: 'uppercase',
                                        letterSpacing: face.text === 'FANUC' ? '-1px' : '0.5px',
                                        lineHeight: 1,
                                        WebkitFontSmoothing: 'antialiased',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    {face.text}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Основной контент */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                {/* Иконки шестерёнок по бокам - ЯРКИЕ */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:block">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <svg width="60" height="60" viewBox="0 0 100 100" className="text-orange-500 drop-shadow-lg">
                            <path
                                fill="currentColor"
                                d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,50 L30,65 L35,45 L20,30 L40,30 Z"
                            />
                            <circle cx="50" cy="50" r="15" fill="currentColor" />
                        </svg>
                    </motion.div>
                </div>

                <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden lg:block">
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <svg width="60" height="60" viewBox="0 0 100 100" className="text-orange-500 drop-shadow-lg">
                            <path
                                fill="currentColor"
                                d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,50 L30,65 L35,45 L20,30 L40,30 Z"
                            />
                            <circle cx="50" cy="50" r="15" fill="currentColor" />
                        </svg>
                    </motion.div>
                </div>

                {/* Маленькие плюсики - ЯРКИЕ */}
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-10 left-1/4 text-orange-400 text-3xl font-bold"
                >
                    +
                </motion.div>
                <motion.div
                    animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute bottom-10 right-1/4 text-blue-400 text-3xl font-bold"
                >
                    +
                </motion.div>

                {/* Главный заголовок */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
                        style={{
                            fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(251, 146, 60, 0.3)',
                            letterSpacing: '0.05em',
                        }}
                    >
                        <span className="inline-block bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-2xl">
                            ТОКАРНАЯ
                        </span>
                        <br />
                        <span className="inline-block bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-2xl">
                            ОБРАБОТКА
                        </span>
                        <br />
                        <span className="inline-block bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
                            ЧПУ
                        </span>
                    </h1>
                </motion.div>

                {/* Подзаголовки */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-4 mb-8"
                >
                    <p className="text-xl md:text-2xl text-slate-200 font-semibold max-w-3xl mx-auto drop-shadow-lg">
                        Мастерство, проверенное Fanuc. Ваш путь от концепции до безупречной детали.
                    </p>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto drop-shadow-lg">
                        Стань востребованным специалистом: программирование и работа на станках с ЧПУ.
                    </p>
                </motion.div>

                {/* Декоративная линия */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"
                />
            </div>
        </div>
    );
};
