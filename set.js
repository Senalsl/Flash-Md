const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUxpd04zVXRUbEZITkJSM0ROZnZ1V1BjR0tJVjBiN2ZpUmxZRjk4akgzOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUnFUMzdRc1J1cW5xTWVWNnVRcWpvRDZYSUljakpob0tha0tudDBQd0hBOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLUFJlSVZiYXQ5aVB4UkRqdGRUdjUyc3JRYnppQnNZcG9mTVYrbnI1M204PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2bWNkbEJuSlVTN3gvcGJkcTBENG54T1JpT1lDU1RaVktEN2owVks1ZWwwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNIM1VrS3ArOVJhS0t2bzZIZzJENHFiTjRMSHAxL2J6MVFaWjVOVjJGM1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJ2bGZHV3lCTjYydkZmY20vQit1Y2R0bkhyKzF6L0hiWXo2czdORTgxQVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUI3MjROSHVPelBCOHdtd1poWng1UGl1TWtUTHNLQ01iMEpFdTRNZGdIYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZk1lNURhNXNGU3VYdHJ5dnFRY3QvalFlNEdwSFNzYzQ2SFd5WkIwbTFBaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InppVUw5d2hHMmVxRjIzMHNhV3M3SWs2eFhFRFM3YmJTUVlUa0R4TVo0RVFUeWduNWtFVDZ3cmNwRDVLb3FOM1ZWMmFJV3MrNTI4dXR0QkgybGszT0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY2LCJhZHZTZWNyZXRLZXkiOiI4YWlVZ0FOZWlFZk5HMTdUVWltK1Jad0VobmQ0QmxBVTJFNUdjZEllcStNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJIcmRtNW9DQVJ2LTdaU1ZlcElqV1hnIiwicGhvbmVJZCI6ImNmZDlhMDNmLWQ2MTItNGVmYS1hY2NmLTdlYWQ1YTFhYTIyMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPcEhoSzVjb2x1UGx1bnd2Z3phSGxuczMreVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRkhmNUllNEU5Y2VaanVtTlM3WjBCaWxxOVY0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkszQTk5RU0yIiwibWUiOnsiaWQiOiI5NDc4NDY2Njc4MjoyMkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJDaGFtaWthIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNdTg2cFlGRUl5ZW9ySUdHQWtnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJpeEJ3d3RDOVM4TDc4ekwyRHRuUWl5ZnFuZk1IREZVRFhKTFBsTEF1TVYwPSIsImFjY291bnRTaWduYXR1cmUiOiJnalVKbHQvWGNFdjFyY3Nlc2ZLY040bytBaWR3dGZGcU5CclQ4azdNRUdIbEczMjlOWDJDRUhsbUtkSXhUcUQ5OVJHZ3dUWk9JT0tlTUFFQnp0Y2FEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVjM2MGtrWWdlNDVYWSs4YjFybmF5Kzh6emtuTStNek1tN3krOXdyZEsyQVBOOHUyL2pZd1dQK3luQ1FFWUJ4VDlicGJDbWRMeC9CUzVvb0tLaHdaREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc4NDY2Njc4MjoyMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZc1FjTUxRdlV2QysvTXk5ZzdaMElzbjZwM3pCd3hWQTF5U3o1U3dMakZkIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE2MDMxMjU3fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Senesh⃤Cm",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "94784666782", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Senesh_Chamika',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
