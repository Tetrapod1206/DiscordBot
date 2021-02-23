var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var hist = "";
var solitarieChannel;
var utilityCaneel;

var bot = new Discord.Client({
    token:auth.token,autorun:true
});

bot.on('ready',() => {
    console.log('Logging in as ${bot.user.tag}!');
});

bot.on("message", function (user, userID, channelID, message, evt){
    if(message.substring(0,1) == '!'){
        switch(message.substring(1)){
            case("help"):
                fs.readFile('help.txt', function(err,data){
                    console.log(err);
                    bot.sendMessage({to:channelID, message:data});
                    console.log(data);
                });
                break;
            case("init"):
                solitarieChannel = channelID;
                bot.getMessages({channelID:channelID,limit:100},function (err,messageArray){       
                    for (var msg of messageArray){
                        if(msg.content.substring(1) == "…"||msg.content.substring(1) == "..."){
                            hist = [msg.content.substring(0,1),hist].join('');
                        }
                    }
                });
                break;

            case("set"):
                utilityChannel = channelID;
            //    message.react(":ok:");
                break;
            
            case("print"):
                bot.sendMessage({to: channelID, message:hist});
                break;

            case("clear"):
                if(channelID == solitarieChannel){
                    console.log("clearing");
                    bot.getMessages({channelID:channelID,limit:100},function (err,messageArray){      
                        var deleteArr = []; 
                        for (var msg of messageArray){
                            if(!(msg.content.substring(1) == "…"||msg.content.substring(1) == "...")){
                                deleteArr.push(msg.id);
                                console.log(deleteArr);
                            }
                        }
                        bot.deleteMessages({channelID : channelID, messageIDs : deleteArr},function (err,resp){
                            console.log(err);
                            console.log(resp);
                        });
                    });
                }
                break;

            default :
            //    message.react(":negative_squared_cross_mark:");
        }
    }

    else if(message.substring(1) == "…"||message.substring(1) == "..."){
        if(channelID == solitarieChannel){
            var reply = message.substring(0,1);
            hist = [hist,reply].join("");
        }
    }
});