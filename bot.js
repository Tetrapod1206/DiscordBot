var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var hist = "";
var solitarieChannel;

var bot = new Discord.Client({
    token:auth.token,autorun:true
});

bot.on('ready',() => {
    console.log('Logging in as ${bot.user.tag}!');
});

bot.on("message", function (user, userID, channelID, message, evt){
    if(message.substring(0,1) == '!'){
        switch(message.substring(1)){
            case("set"):
                bot.getMessages({channelID:channelID,limit:100},function (err,messageArray){       
                    for (var msg of messageArray){
                        if(msg.content.substring(1) == "…"||msg.content.substring(1) == "..."){
                            hist = [msg.content.substring(0,1),hist].join('');
                        }
                        console.log(msg.content.substring(1));
                    }
                    bot.sendMessage({to: channelID, message:hist});
                    solitarieChannel = channelID;
                });
                break;

            case("clear"):
                if(channelID == solitarieChannel){
                    bot.getMessages({channelID:channelID,limit:100},function (err,messageArray){       
                        for (var msg of messageArray){
                            if(!(msg.content.substring(1) == "…"||msg.content.substring(1) == "...")){
                                bot.deleteMessage(channelID,msg.id);
                            }
                        }
                    });
                }
                break;

            default :
                bot.sendMessage({to: channelID, message:"Wrong channel"});
        }
    }

    else if(message.substring(1) == "…"||message.substring(1) == "..."){
        if(channelID == solitarieChannel){
            var reply = message.substring(0,1);
            hist = [hist,reply].join("");
            bot.sendMessage({to: channelID, message:hist});
        }
    }
});