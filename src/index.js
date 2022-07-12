const { Client } = require('discord.js');
const dotenv = require('dotenv');
const handleCommand = require("./corps");

dotenv.config();

const client = new Client({intents: ["GUILDS" , "GUILD_MESSAGES", "GUILD_MEMBERS"]});
client.login(process.env.DISCORDJS_BOT_TOKEN);
client.on('ready', () => {
    console.log('CamBot (Pipo ?) est dans la place !');
});

const PREFIX = ".";


client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    
    if (message.content === PREFIX) return;


    if (message.content.startsWith(PREFIX)) {
        const [ cmdName, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/ +/);

        if (cmdName.startsWith(PREFIX)) return;
        
        handleCommand(message,cmdName, args); // Main function of corps.js

    } 
    
    else { //TROLL SECTION STARTS HERE
        
        const matches = message.content.match(/(\w+) va nous danser/);

        if (matches !== null) {
            const username = matches[1];
            message.channel.send("La danse du Limousin !");
        }

    } //TROLL SECTION FINISHES HERE
});