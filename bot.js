var Discord = require('discord.js');
var fs = require('fs');
var hist = "";
var solitarieChannel;
var utilityCaneel;

const { token } = require('./auth.json');
const client = new Discord.Client();

client.login(token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on("message", msg => {
    message = msg.content;
    if (message.substring(0, 1) == '!') {
        switch (message.substring(1)) {

            case ("help"):
                fs.readFile('help.txt', function (err, data) {
                    console.log(typeof data);
                    msg.reply(data.toString());
                });
                break;

            case ("init"):
                solitarieChannel = msg.channel;
                msg.channel.messages.fetch({limit: 100}).then(messages => {
                    console.log(`${messages.size} procuradas.`);
                    for (var mess of messages) {
                        msg = mess.message.content;
                        if (msg.content.substring(1) == "…" || msg.content.substring(1) == "...") {
                            hist = [msg.content.substring(0, 1), hist].join('');
                        }
                    }
                });
                break;

            case ("set"):
                utilityChannel = msg.channel;
                msg.react('🆗')
                    .then(console.log)
                    .catch(console.error);
                break;

            case ("print"):
                client.sendMessage({ to: msg.channel, message: hist });
                break;

            case ("clear"):
                if (msg.channel == utilityChannel) {
                    console.log("clearing");
                    client.getMessages({ channelID: channelID, limit: 100 }, function (err, messageArray) {
                        var deleteArr = [];
                        for (var msg of messageArray) {
                            if (!(msg.content.substring(1) == "…" || msg.content.substring(1) == "...")) {
                                deleteArr.push(msg.id);
                                console.log(deleteArr);
                            }
                        }
                        client.deleteMessages({ channelID: channelID, messageIDs: deleteArr }, function (err, resp) {
                            console.log(err);
                            console.log(resp);
                        });
                    });
                }
                break;

            default:
                message.react(":❎:");
        }
    }

    else if (message.substring(1) == "…" || message.substring(1) == "...") {
        if (channel == solitarieChannel) {
            var reply = message.substring(0, 1);
            hist = [hist, reply].join("");
        }
    }
});