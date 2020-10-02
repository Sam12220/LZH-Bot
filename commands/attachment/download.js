// Attachment File Download - Made by Sam1222 and RS

exports.run = async (client, message, args, attachment) => {

	const fs = require('fs')
	const request = require('request')
	const { exec } = require("child_process")



	let urlSplit = attachment.url.split('/')
	let file = urlSplit[urlSplit.length-1].split('.')

	var filenameEnd = file[file.length-1]
	file.pop()
	var filename = file.join('.')

	if (message.content == '-lh') {
		if (filenameEnd == 'arc' || filenameEnd == 'bin' || filenameEnd == 'kpbin') {
			download(attachment.url, `lhConvert/`, filename, filenameEnd ,'lhcompress', `download\\lhConvert\\${filename}.${filenameEnd}`)
		}
		if (filenameEnd == 'lh' || 'LH') {
			download(attachment.url, `lhConvert/`, filename, filenameEnd ,'lhdecompress', `download\\lhConvert\\${filename}`)
		}
	}



	function download(url, path, filename, filenameEnd, option, delPath) {
		request.get(url)
			.on('error', console.error)
			.pipe(fs.createWriteStream(`download/${path}/${filename}.${filenameEnd}`))
			.on('finish', function() {
				if (option == 'lhcompress') {
					lhcompress(`${filename}.${filenameEnd}`, delPath)
				}
				if (option == 'lhdecompress') {
					lhdecompress(`${filename}`, delPath)
				}
			})
	}

	function deleteFile(path) {
		console.log(`del ${path}`)

		exec(`del ${path}`, function (error, stdout, stderr) {
			if (error) {
				console.log(error.stack)
				console.log('Error code: ' + error.code)
				console.log('Signal received: ' + error.signal)
			}
		})
	}

	function sendBack(msg, path) {
		message.channel.send(`${msg}`, { files: [`${path}`] })
	}

	function lhcompress(file, delPath) {
		exec(`"./download/lhConvert/ntcompress.exe" "./download/lhConvert/${file}" -lh -o "./download/lhConvert/${file}.lh"`, function (error, stdout, stderr) {
			if (error) {
				console.log(error.stack)
				console.log('Error code: ' + error.code)
				console.log('Signal received: ' + error.signal)
			}
			console.log('Child Process STDOUT: ' + stdout)
			console.log('Child Process STDERR: ' + stderr)
			sendBack(`Conversion from ${file} to ${file}.lh successfully!` ,`./download/lhConvert/${file}.lh`)
			deleteFile(`${delPath}`)
			deleteFile(`${delPath}.lh`)
		})
	}

	function lhdecompress(file, delPath) {
		exec(`"./download/lhConvert/ntcompress.exe" "./download/lhConvert/${file}.lh" -x -o "./download/lhConvert/${file}"`, function (error, stdout, stderr) {
			if (error) {
				console.log(error.stack)
				console.log('Error code: ' + error.code)
				console.log('Signal received: ' + error.signal)
			}
			console.log('Child Process STDOUT: ' + stdout)
			console.log('Child Process STDERR: ' + stderr)
			sendBack(`Conversion from ${file}.lh to ${file} successfully!`, `./download/lhConvert/${file}`)
			deleteFile(`${delPath}`)
			deleteFile(`${delPath}.lh`)
			deleteFile(`${delPath}.LH`)
		})
	}



}