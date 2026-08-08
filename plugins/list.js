import config from '../config.js';
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
import commandHandler from '../lib/commandHandler.js';
import path from 'path';
import fs from 'fs';
function formatTime() {
    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: config.timeZone || 'UTC'
    };
    return now.toLocaleTimeString('en-US', options);
}
function formatUptime() {
    let s = Math.floor(process.uptime());
    const h = Math.floor(s / 3600);
    s %= 3600;
    const m = Math.floor(s / 60);
    s %= 60;
    return `${h}h ${m}m ${s}s`;
}
// small-caps font converter (matches ᴀᴅᴅʀᴇᴘʟʏ style seen across the bot)
const smallCapsMap = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ',
    i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ',
    q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x',
    y: 'ʏ', z: 'ᴢ'
};
function toSmallCaps(str) {
    return String(str).toLowerCase().split('').map(ch => smallCapsMap[ch] || ch).join('');
}
// fixed emoji per category so headers stay consistent (not random)
const categoryIcons = {
    owner: '👑', admin: '🛡️', group: '👥', download: '📥', ai: '🤖',
    search: '🔍', apks: '📲', info: 'ℹ️', fun: '😂', stalk: '🕵️',
    games: '🎮', images: '🖼️', menu: '📋', tools: '🧰', stickers: '🎨',
    quotes: '💬', music: '🎵', utility: '🛠️', general: '⚡', upload: '☁️'
};
function getCategoryIcon(cat) {
    return categoryIcons[cat.toLowerCase()] || '📂';
}
const menuStyles = [
    // Style 1 — matches the classic double-line header with ➥ / ➣ arrows
    {
        render({ info, categories, prefix }) {
            let t = `╭══════════════════⟫\n`;
            t += `➥  *ʙᴏᴛ ɴᴀᴍᴇ* : *${info.bot}*\n`;
            t += `➥  *sᴛᴀᴛᴜs* : *ᴀᴄᴛɪᴠᴇ* 🟢\n`;
            t += `➥  *ᴘʀᴇғɪx* : ${info.prefix}\n`;
            t += `➥  *ᴜᴘᴛɪᴍᴇ* : ${info.uptime}\n`;
            t += `➥  *ᴄᴏᴍᴍᴀɴᴅs* : ${info.total}\n`;
            t += `╰══════════════════⟫\n\n`;
            for (const [cat, cmds] of categories) {
                t += `╭──〈 \`${getCategoryIcon(cat)} ${toSmallCaps(cat)}\` 〉──╮\n│\n`;
                for (const c of cmds)
                    t += `│ ➣  *${toSmallCaps(c)}*\n`;
                t += `╰───────────●\n\n`;
            }
            return t.trim();
        }
    },
    // Style 2 — softer bracket frame with ➜ arrows
    {
        render({ info, categories, prefix }) {
            let t = `╭─⟪ ✦ *${info.bot}* ✦ ⟫─╮\n`;
            t += `┃ ➜  sᴛᴀᴛᴜs : ᴏɴʟɪɴᴇ 🟢\n`;
            t += `┃ ➜  ᴘʀᴇғɪx : ${info.prefix}\n`;
            t += `┃ ➜  ᴜᴘᴛɪᴍᴇ : ${info.uptime}\n`;
            t += `┃ ➜  ᴄᴍᴅs : ${info.total}\n`;
            t += `╰────────────────╯\n\n`;
            for (const [cat, cmds] of categories) {
                t += `⟪ ${getCategoryIcon(cat)} *${toSmallCaps(cat)}* ⟫\n`;
                for (const c of cmds)
                    t += `  ➜  ${toSmallCaps(c)}\n`;
                t += `\n`;
            }
            return t.trim();
        }
    },
    // Style 3 — diamond frame with ➛ arrows
    {
        render({ info, categories, prefix }) {
            let t = `◈━━━━━━━━━━━━━━━━◈\n`;
            t += `   *${info.bot}*\n`;
            t += `◈━━━━━━━━━━━━━━━━◈\n`;
            t += `➛  sᴛᴀᴛᴜs  : ᴀᴄᴛɪᴠᴇ 🟢\n`;
            t += `➛  ᴘʀᴇғɪx  : ${info.prefix}\n`;
            t += `➛  ᴜᴘᴛɪᴍᴇ  : ${info.uptime}\n`;
            t += `➛  ᴄᴍᴅs    : ${info.total}\n\n`;
            for (const [cat, cmds] of categories) {
                t += `「 ${getCategoryIcon(cat)} *${toSmallCaps(cat)}* 」\n`;
                for (const c of cmds)
                    t += `   ➛ ${toSmallCaps(c)}\n`;
                t += `\n`;
            }
            return t.trim();
        }
    }
];
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export default {
    command: 'menu',
    aliases: ['help', 'commands', 'h', 'list'],
    category: 'general',
    description: 'Show all commands',
    usage: '.menu [command]',
    async handler(sock, message, args, context) {
        const { chatId, channelInfo } = context;
        const prefix = config.prefixes[0];
        const imagePath = path.join(process.cwd(), 'assets/thumb.png');
        if (args.length) {
            const searchTerm = args[0].toLowerCase();
            let cmd = commandHandler.commands.get(searchTerm);
            if (!cmd && commandHandler.aliases.has(searchTerm)) {
                const mainCommand = commandHandler.aliases.get(searchTerm);
                cmd = commandHandler.commands.get(mainCommand);
            }
            if (!cmd) {
                return sock.sendMessage(chatId, {
                    text: `❌ Command "${args[0]}" not found.\n\nUse ${prefix}menu to see all commands.`,
                    ...channelInfo
                }, { quoted: message });
            }
            const text = `╭━━━━━━━━━━━━━━⬣
┃ 📌 *COMMAND INFO*
┃
┃ ⚡ *Command:* ${prefix}${cmd.command}
┃ 📝 *Desc:* ${cmd.description || 'No description'}
┃ 📖 *Usage:* ${cmd.usage || `${prefix}${cmd.command}`}
┃ 🏷️ *Category:* ${cmd.category || 'misc'}
┃ 🔖 *Aliases:* ${cmd.aliases?.length ? cmd.aliases.map((a) => prefix + a).join(', ') : 'None'}
┃
╰━━━━━━━━━━━━━━⬣`;
            if (fs.existsSync(imagePath)) {
                return sock.sendMessage(chatId, {
                    image: { url: imagePath },
                    caption: text,
                    ...channelInfo
                }, { quoted: message });
            }
            return sock.sendMessage(chatId, { text, ...channelInfo }, { quoted: message });
        }
        const style = pick(menuStyles);
        const text = style.render({
            title: config.botName,
            prefix,
            info: {
                bot: config.botName,
                prefix: config.prefixes.join(', '),
                total: commandHandler.commands.size,
                version: config.version || "6.0.0",
                time: formatTime(),
                uptime: formatUptime()
            },
            categories: commandHandler.categories
        });
        if (fs.existsSync(imagePath)) {
            await sock.sendMessage(chatId, {
                image: { url: imagePath },
                caption: text,
                ...channelInfo
            }, { quoted: message });
        }
        else {
            await sock.sendMessage(chatId, { text, ...channelInfo }, { quoted: message });
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
