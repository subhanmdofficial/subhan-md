/*****************************************************************************
 *                                                                           *
 *                     Developed By ᴍ sᴜʙʜᴀɴ ᴀʟɪ                                *
 *                                                                           *
 *  🌐  GitHub   : https://github.com/ᴍ sᴜʙʜᴀɴ ᴀʟɪ                         *
 *  ▶️  YouTube  : https://youtube.com/@ᴍ sᴜʙʜᴀɴ ᴀʟɪ                       *
 *  💬  WhatsApp : https://whatsapp.com/channel/0029VagJIAr3bbVBCpEkAM07     *
 *                                                                           *
 *    © 2026 ᴍ sᴜʙʜᴀɴ ᴀʟɪ. All rights reserved.                            *
 *                                                                           *
 *    Description: This file is part of the 𝐒ᴜʙʜᴀɴ-𝐌ᴅ Project.                 *
 *                 Unauthorized copying or distribution is prohibited.       *
 *                                                                           *
 *****************************************************************************/
import axios from 'axios';
export default {
    command: 'alamy',
    aliases: ['alamydl', 'alamydownload'],
    category: 'download',
    description: 'Download image or video from Alamy URL',
    usage: '.alamy <Alamy URL>',
    async handler(sock, message, args, context) {
        const chatId = context.chatId || message.key.remoteJid;
        const url = args?.[0]?.trim();
        if (!url) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide an Alamy URL.\nExample: .alamy https://www.alamy.com/video/beautiful-lake...' }, { quoted: message });
        }
        try {
            const apiUrl = `https://discardapi.dpdns.org/api/dl/alamy?apikey=guru&url=${encodeURIComponent(url)}`;
            const { data } = await axios.get(apiUrl, { timeout: 10000 });
            if (!data?.status || !data.result?.length) {
                return await sock.sendMessage(chatId, { text: '❌ Failed to fetch media from the provided Alamy URL.' }, { quoted: message });
            }
            const isValidUrl = (u) => u && u.startsWith('http');
            let sent = false;
            for (const item of data.result) {
                if (isValidUrl(item.video)) {
                    await sock.sendMessage(chatId, { video: { url: item.video }, caption: '🎬 *Alamy Video*' }, { quoted: message });
                    sent = true;
                }
                if (isValidUrl(item.image)) {
                    await sock.sendMessage(chatId, { image: { url: item.image }, caption: '🖼️ *Alamy Image*' }, { quoted: message });
                    sent = true;
                }
            }
            if (!sent) {
                await sock.sendMessage(chatId, { text: '❌ No valid media found in the Alamy URL.' }, { quoted: message });
            }
        }
        catch (error) {
            console.error('Alamy download plugin error:', error);
            if (error.code === 'ECONNABORTED') {
                await sock.sendMessage(chatId, { text: '❌ Request timed out. The API may be slow or unreachable.' }, { quoted: message });
            }
            else {
                await sock.sendMessage(chatId, { text: '❌ Failed to download media from Alamy URL.' }, { quoted: message });
            }
        }
    }
};
/*****************************************************************************
 *                                                                           *
 *                     Developed By ᴍ sᴜʙʜᴀɴ ᴀʟɪ                                *
 *                                                                           *
 *  🌐  GitHub   : https://github.com/ᴍ sᴜʙʜᴀɴ ᴀʟɪ                         *
 *  ▶️  YouTube  : https://youtube.com/@ᴍ sᴜʙʜᴀɴ ᴀʟɪ                       *
 *  💬  WhatsApp : https://whatsapp.com/channel/0029VagJIAr3bbVBCpEkAM07     *
 *                                                                           *
 *    © 2026 ᴍ sᴜʙʜᴀɴ ᴀʟɪ. All rights reserved.                            *
 *                                                                           *
 *    Description: This file is part of the 𝐒ᴜʙʜᴀɴ-𝐌ᴅ Project.                 *
 *                 Unauthorized copying or distribution is prohibited.       *
 *                                                                           *
 *****************************************************************************/
