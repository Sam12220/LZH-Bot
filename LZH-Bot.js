// Main file - Made by Sam1222

const Discord = require('discord.js')
const client = new Discord.Client()

const config = require("./data/config.json");
client.config = config;



function download(url,path){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(`./download/${path}`))
}



client.on('message', async message => {
	let args = message.content.slice(config.prefix.length).trim().split(' ')
	let cmd = args.shift().toLowerCase()

	if (message.author.bot) {return}


	if (message.attachments.first()) {

		try {
			delete require.cache[require.resolve(`./commands/attachment/download.js`)]

			let attachment = message.attachments.first()//.url

			let attachmentFile = require(`./commands/attachment/download.js`)
			attachmentFile.run(client, message, args, attachment)

		} catch(e) {
			console.log(e.stack);
		}
	}


	if (!message.content.startsWith(config.prefix)) {return}


	try {
		delete require.cache[require.resolve(`./commands/${cmd}.js`)]

		let commandFile = require(`./commands/${cmd}.js`)
		commandFile.run(client, message, args)

	} catch(e) {
		console.log(e.stack);
	}
})

client.on('ready', function() {
	console.log('Launched!')
	client.user.setPresence({ activity: { type: "PLAYING", name: 'discord.js' },  status: 'online' })
	client.user.setAvatar('./textures/bot.png')
})



client.login(process.env.TOKEN)


