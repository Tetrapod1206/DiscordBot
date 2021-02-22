var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var bot = new Discord.Client({
    token:auth.token,autorun:true
});

bot.on('ready',() => {
    console.log('Logging in as ${bot.user.tag}!');
});

bot.on("message", function (user, userID, channelID, message, evt){
    if(message.substring(0,1) == '!'){
        var reply = message.substring(1);
        bot.sendMessage({to: channelID, message:reply + "..."});
    }
})