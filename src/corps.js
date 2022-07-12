const help = require('./help'); 
const fs = require('fs');

let serversList = new Map();
const copyList = new Map();


/**
 * @param {string} cmdName
 */
function handleCommand(message, cmdName, args) {

    const serverId = message.guildId;
    
    if (!serversList.has(serverId))
        serversList.set(serverId, new Map());

    
    switch (cmdName) {

        case "help" :
            message.channel.send(help);
            break;

        case "list":
        case "liste":
        case "listeuh":
            list(message);
            break;
        
        case "add" :
            add(args, message);
            break;

        case "remove" :
            remove(args, message);
            break;

        case "clear":
            clear(message);
            break;
        
        case "backup":
            backup(message);
            break;
        
        default:
            message.channel.send("Commande non définie.")
            break;
    }
}


function list(message){
    const map = serversList.get(message.guildId);
    if (map.size === 0) return message.channel.send("La liste est vide.");
    let rep ="";
    for (const [key, value] of map)
        rep += `**${value}** ${key}\n`;
    message.channel.send(rep);
}

/**
 * @param {Array<string>} args
 */


function add(args, message){
    const map = serversList.get(message.guildId);
    const articles = args.join(" ").split(/;\s*/); //propre
    for (let article of articles) {
        if (article === "") continue;
        const matches = article.match(/^\s*(\d+)\s+(.*)/); //très propre
        let nb = 1;
        if (matches !== null) {
            nb = parseInt(matches[1]);
            article = matches[2];
        }
        
        const nombreInit = map.get(article) ?? 0;
        map.set(article,nombreInit + nb);
    }
    message.channel.send("Vos articles ont bien été ajoutés.");

    list(message);

}

function remove(args, message){

    const map = serversList.get(message.guildId);

    if (map.size === 0) return message.channel.send("La liste est vide.");

    const articles = args.join(" ").split(/;\s*/); //propre

    for (let article of articles) {
        if (article === "") continue;
        if (!map.has(article)) message.channel.send(`${article} n'est pas trouvé dans la liste`);
        else map.delete(article);
    }
    message.channel.send("Vos articles ont bien été retirés.");    
}

function clear(message){

    const map = serversList.get(message.guildId);
    if (map.size === 0) return message.channel.send("La liste est déjà vide.");
    copyList.set(message.guildId, map);
    serversList.set(message.guildId, new Map());
    message.channel.send("La liste a bien été supprimmée.");
}

function backup(message){
    const map = copyList.get(message.guildId);   
    serversList.set(message.guildId, map);
    message.channel.send("Le backup a bien été effectué.");
}


//Sauvegarde de la liste

const filePath = "./save.json"

function save(){
    const obj = [...serversList].map(([key, value]) => [key, [...value]]);
    fs.writeFile(filePath, JSON.stringify(obj), (err) => {
        if (err) throw err;
    });
}

function read() {
    fs.readFile(filePath, (err, data) => {
        if (err) return;

        const obj = JSON.parse(data.toString());
        serversList = new Map(obj.map(([key, value]) => [key, new Map(value)]));
    });
}

read()

setInterval(save ,1000*10);

module.exports = handleCommand;
