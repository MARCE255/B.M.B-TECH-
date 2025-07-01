const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkh6NHRUbHBXUXZiRXFWU1NDNXBBS05sZ0E1THd2SVZUVTNWaWJTdU5Fbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGp2LzUxZUJhVGo0NWdBQmxBQTFFSURoZDZKOEp4U1dxbHJDdFlHS0FDND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTlg5RmFJWk1KQUEwb0RhVnZGMmRaamtWZ2IwUzBXc3RienV3bExLTjFzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsZlptY0tkVGg3Si9tZUNvSmI2TkVsa3ZsbFZmT1l3TllZdDZpaVNSajFJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVGVHBTVnY5aFgybzBPVWtZejRUNmhLNHBmZU5LS1FRbkh6TnMzZW03MzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhsTXlTL1hwdituWVAzcmQrSGMzbVIreFpwZi9ld1p3Skk2RDM4QXRNajg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0V5eWRYYmtmQXYvVVNKa0xSYUJlR2FCRDNTM1NrcHl1RjlOME1HK0RsOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2xSa2x2U0J1NDdVQmJUOVJOMXBCSnFOTXFNblZHVmJZR0twRnRZMyt6Yz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitDc1pGcHJKd1o5RjJ3aVBDRDhqck16Q3IzeEhTejFOQmhtcjZ0RnlwNy9PaDhJQ0lXaDNmQU1VazI1c3ZXdU8zZnhLVnhiTnV5SWJvRmM4SFJzc0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYzLCJhZHZTZWNyZXRLZXkiOiI4VUlYUzlFcUFycEVhdEh6amRVRWw0U1ZEai8yejVvVUYrLzIwTmVMMml3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY1MjM5ODYxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCM0ZCODAwQjc3MUQzRjNFQkI0NEQ2MDZGQzdBOTYzMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMzUxNjEwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJKUDg3VE1SSyIsIm1lIjp7ImlkIjoiMjU1NjUyMzk4NjE0Ojk3QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTA1MjUzMDg5MzMzMjc1Ojk3QGxpZCIsIm5hbWUiOiJOaWNvbGF1cyBEYW5pZWwgMiDwn5iI8J+YiPCfmIgifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01XWGxxa0RFSU9DanNNR0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRqMWgrVU13NmE3OGU2UTNWem5HVTRDa3ZGelBaRUtWZWc5NUtGeWlkZ289IiwiYWNjb3VudFNpZ25hdHVyZSI6IjhiQ3NBaEVSMzh4VnBxZlErWDRndExvcFRrMG80ZjFGaWtDNUIzNVBSdmZJdWdiQWVZak1sNExVd2hxcDQrb1pacm9wSGFyVkgzWWxla3FNSGd3QURnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJGVjE3OG9TWEdyZ3dzRW14a3FZeG5XVzllZzlPcmU1MEdnS2RVYkpJY1FNU1h4RDU2TFNKK1RmbzhCRVJWdHhwRnZpOVYxOHJvZ3U5RG8rZ3RqUkdEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY1MjM5ODYxNDo5N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYWTlZZmxETU9tdS9IdWtOMWM1eGxPQXBMeGN6MlJDbFhvUGVTaGNvbllLIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTEzNTE1NjksImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSjcyIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Nicolaus Daniel 2😈😈",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255652398614",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

