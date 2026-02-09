import type { NextApiRequest, NextApiResponse } from 'next';
import { socialLinksConfig } from '@/config/socialLinks';
import axios from 'axios';
import FormData from 'form-data';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // Увеличиваем лимит для фото
        },
    },
};

interface ContactRequest {
    name: string;
    message: string;
    photos?: string[]; // Array of base64 strings
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, message, photos } = req.body as ContactRequest;

        if (!name || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            console.error('Telegram credentials missing');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const textHeadline = `🚀 <b>Новое сообщение с сайта!</b>\n\n`;
        const textBody = `👤 <b>Имя:</b> ${name}\n💬 <b>Сообщение:</b> ${message}`;
        const fullText = textHeadline + textBody;

        // 1. Если нет фото, отправляем просто текст
        if (!photos || photos.length === 0) {
            await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: fullText,
                parse_mode: 'HTML',
            });
            return res.status(200).json({ success: true });
        }

        // 2. Если есть фото, отправляем MediaGroup
        // Telegram API требует отправку файлов через multipart/form-data
        const form = new FormData();
        form.append('chat_id', CHAT_ID);

        const media = photos.map((photoBase64, index) => {
            // photoBase64 приходит в формате "data:image/png;base64,..."
            // Нам нужно извлечь данные и создать буфер
            const base64Data = photoBase64.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, 'base64');

            // Добавляем файл в форму
            form.append(`photo${index}`, buffer, { filename: `photo${index}.jpg` });

            return {
                type: 'photo',
                media: `attach://photo${index}`,
                caption: index === 0 ? fullText : '', // Подпись только к первому фото
                parse_mode: 'HTML',
            };
        });

        form.append('media', JSON.stringify(media));

        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`, form, {
            headers: form.getHeaders(),
        });

        return res.status(200).json({ success: true });

    } catch (error: any) {
        console.error('Telegram API Error:', error.response?.data || error.message);
        return res.status(500).json({ message: 'Failed to send message via Telegram' });
    }
}
