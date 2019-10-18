const discord = require('discord.js');
const splashy = new discord.Client();
const config = require('./config.json');
let prefix = config.prefix;

splashy.on('ready', () => {
    console.log(`Splashy is online in ${splashy.guilds.size} Discord Server`);
    let statuses = [
        `s.help`,
        `Most advanced Rainbow Role Bot`,
        `Splashy Is in ${splashy.guilds.size} discord servers!`
  
    ]
    setInterval(function(){
      let GAMES = statuses[Math.floor(Math.random() * statuses.length)];
      splashy.user.setPresence({ game: { name: GAMES }, type: 0, status: 'dnd' });
    }, 10000)
});


splashy.on('message', msg => {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(' ');
    const cmd = args.shift().toLowerCase();
    const Role = args.join(" ");
    const random = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    const rRole = msg.guild.roles.find(role => role.name === Role);




    function SplashyRianbow() {
        let random = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        let rRole = msg.guild.roles.find(role => role.name === Role);
        if (!Role) return msg.channel.send('Please specify a role');
        if (!rRole) return msg.channel.send('Cant find the specified role');
        rRole.edit({color: random}).catch(e => {
        })
    };

    if(cmd === 'rainbow'){
        if (!Role) return msg.channel.send('Please specify a role');
        if (!rRole) return msg.channel.send('Cant find the specified role');
            setInterval(() => { SplashyRianbow(); }, config.Interval)
            msg.channel.send({
                embed: {
                    color: msg.member.displayColor,
                    author: { name: "Splashy Support Discord Server", url: 'https://discord.gg/HRh4jyW', icon_url: msg.guild.iconURL  },
                    description: `I have enabled color changing role for ***${Role}***`
                }
            })
    }
    if(cmd === 'help'){
        msg.author.send({
            embed: {
                color: 0x41e81b,
                author: { name: "Splashy Support Discord Server.", url: 'https://discord.gg/HRh4jyW', icon_url: msg.guild.iconURL },
                description: `${prefix}rainbow <role>\n${prefix}help - Shows this command...`
            }
        })
    }

    });

splashy.on('guildCreate', guild => {
console.log(`New guild joined ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members`);
let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }
    let channel = splashy.channels.get(guild.systemChannelID || channelID);
    channel.send({
        embed: {
            color: 0x41e81b,
            author: { name: "Splashy Support Discord Server." },
            description: 'Bot Infomation.',
            fields: [{
                name: "Thank you for adding me to your server",
                value: "From Splashy Developers."
            },
            {
                name: "Support Discord Server:",
                value: '[HERE](https://discord.gg/HRh4jyW)',
                inline: true
            }, 
            {
                name: "Bot Prefix:",
                value: config.prefix,
                inline: true
            },
            {
                name: "Developer:",
                value: "Jinx#4395",
                inline: true
            }]
        }
    });
});
splashy.on('guildDelete', guild => {
console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

splashy.login(config.token);