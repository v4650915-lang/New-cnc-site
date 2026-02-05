'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const ContactForm = () => {
  const [name, setName] = useState('подписчик');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Твои данные Telegram
  const BOT_TOKEN = "8355909549:AAEBQrN4EgN_rh0gKPaQnw8y0dyuu2EZFXM";
  const CHAT_ID = "1163474868";

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, 5 - photos.length);
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Пожалуйста, введите сообщение' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const textHeadline = `🚀 <b>Новое сообщение с сайта!</b>\n\n`;
    const textBody = `👤 <b>Имя:</b> ${name || 'подписчик'}\n💬 <b>Сообщение:</b> ${message}`;

    try {
      if (photos.length === 0) {
        // Если фото нет, отправляем просто текстовое сообщение
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: textHeadline + textBody,
            parse_mode: 'HTML',
          }),
        });

        if (!response.ok) throw new Error('Ошибка при отправке текста');
      } else {
        // Если есть фото, используем sendMediaGroup для пачки фотографий
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);

        const media = photos.map((file, index) => {
          formData.append(`photo${index}`, file);
          return {
            type: 'photo',
            media: `attach://photo${index}`,
            // Подпись добавляем только к первой фотографии в группе
            caption: index === 0 ? textHeadline + textBody : '',
            parse_mode: 'HTML'
          };
        });

        formData.append('media', JSON.stringify(media));

        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Ошибка при отправке медиагруппы');
      }

      // Успешная отправка
      setSubmitStatus({ type: 'success', message: 'Сообщение и фото успешно отправлены в Telegram! 🎉' });
      setMessage('');
      setPhotos([]);
      setName('подписчик');

      setTimeout(() => setSubmitStatus({ type: null, message: '' }), 5000);

    } catch (error) {
      console.error('Error submitting to Telegram:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Ошибка отправки. Проверь интернет или настройки бота.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto my-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
          style={{
            boxShadow: '0 0 40px rgba(251, 146, 60, 0.15), inset 0 0 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          <form onSubmit={handleSubmit} className="relative z-10 p-8 md:p-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                💡 Форма обратной связи
              </h2>
              <p className="text-slate-400 text-sm">
                Ваше мнение важно для улучшения бота
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-slate-300">Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-base rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                placeholder="подписчик"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-slate-300">Сообщение</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Напишите ваши пожелания или сообщите о проблеме..."
                className="w-full px-4 py-3 text-base rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                rows={6}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-slate-300">Прикрепить фото (до 5 шт)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={photos.length >= 5}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={photos.length >= 5}
                className="w-full py-3 text-white font-semibold text-base rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📷 {photos.length >= 5 ? 'Максимум 5 фото' : 'Выбрать фото'}
              </button>

              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img src={URL.createObjectURL(photo)} alt="Preview" className="w-full h-20 object-cover rounded-lg border-2 border-orange-500/50 group-hover:border-orange-500" />
                      <button type="button" onClick={() => removePhoto(index)} className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {submitStatus.type && (
              <div className={`mb-4 p-4 rounded-lg text-center font-semibold border ${submitStatus.type === 'success' ? 'bg-green-900/50 border-green-500 text-green-300' : 'bg-red-900/50 border-red-500 text-red-300'}`}>
                {submitStatus.message}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 text-white font-bold text-lg rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? '🚀 Отправка...' : 'Отправить 📨'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};