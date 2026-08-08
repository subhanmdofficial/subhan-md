/*
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  𝐒ᴜʙʜᴀɴ-𝐌ᴅ — Core Library                                      ║
 * ║  Owner: ᴍ sᴜʙʜᴀɴ ᴀʟɪ                                        ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from 'fs';
import axios from 'axios';
const GITHUB_USERNAME = 'subhanmdofficial';
const SESSION_PREFIX = 'SUBHAN-MD~';
/**
 * Save credentials from GitHub Gist to session/creds.json
 * @param {string} txt - Gist ID with SUBHAN-MD~ prefix
 */
async function SaveCreds(txt) {
    const __dirname = path.dirname(__filename);
    const gistId = txt.startsWith(SESSION_PREFIX) ? txt.slice(SESSION_PREFIX.length) : txt;
    const gistUrl = `https://gist.githubusercontent.com/${GITHUB_USERNAME}/${gistId}/raw/creds.json`;
    try {
        const response = await axios.get(gistUrl);
        const data = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        const sessionDir = path.join(process.cwd(), 'session');
        if (!fs.existsSync(sessionDir)) {
            fs.mkdirSync(sessionDir, { recursive: true });
        }
        const credsPath = path.join(sessionDir, 'creds.json');
        fs.writeFileSync(credsPath, data);
    }
    catch (error) {
        console.error('❌ Error downloading or saving credentials:', error.message);
        if (error.response) {
            console.error('❌ Status:', error.response.status);
            console.error('❌ Response:', error.response.data);
        }
        throw error;
    }
}
export default SaveCreds;
