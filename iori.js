//require('../main.js')
/*
const path = require("path")
const chalk = require("chalk");
const yts = require("yt-search")
const ytdl = require('ytdl-core')
const {
    smsg,
    fetchBuffer,
    getBuffer,
    buffergif,
    getGroupAdmins,
    formatp,
    tanggal,
    formatDate,
    getTime,
    isUrl,
    sleep,
    clockString,
    runtime,
    fetchJson,
    jsonformat,
    delay,
    format,
    logic,
    generateProfilePicture,
    parseMention,
    getFile,
    getRandom,
    msToTime,
    downloadMediaMessage,
    convertirMsADiasHorasMinutosSegundos
} = require('../libs/fuctions')
const {
    ytmp4,
    ytmp3,
    ytplay,
    ytplayvid
} = require('../libs/youtube')
const {
    sizeFormatter
} = require('human-readable')
const formatSize = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`
});

*/
//let fetch = require('node-fetch')
//let getLink = require('mediafire-getlink')
//let request = require('request')
//let axios = require('axios')
//let cherio = require("cheerio")
let fs = require('fs')
const {
    exec
} = require('child_process');

const {
    default: makeWASocket,
    MessageType,
    Presence,
    MessageOptions,
    downloadContentFromMessage,
    fetchLatestBaileysVersion,
    Mimetype,
    useMultiFileAuthState,
    DisconnectReason,
    Browsers,
    delay
} = require("@whiskeysockets/baileys")

let url_saldos = 'https://3724-103-88-234-133.ngrok.io/'

function caducidad(hoy, termino) {
    var fecha1 = new Date(termino)
    var fecha2 = new Date(hoy)
    var difference = fecha1.getTime() - fecha2.getTime() //Math.abs(fecha1 - fecha2);
    var days = parseInt(difference / (1000 * 60 * 60 * 24))
    var hours = parseInt(difference / (1000 * 60 * 60) % 60)
    var minutes = parseInt(difference / (1000 * 60) % 60)
        //console.log(difference / (1000 * 60))
    return [days, hours, minutes]
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatear_fecha(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' + [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

async function iori(m, command, conn, text, args) {
    const from = m.key.remoteJid
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let argumentos = text.replace(/[* ]/g, '|').split("|")
    const isGroup = from.endsWith("@g.us")
    const isBot = m.key.fromMe
    const enviar = async(txt) => {
        conn.sendMessage(from, {
            text: txt
        }, {
            quoted: m
        })
    }

    const react = (txt) => {
        conn.sendMessage(from, {
            react: {
                text: txt,
                key: m.key
            }
        })
    }
    const espere = (txt = '⌛') => {
        conn.sendMessage(from, {
            react: {
                text: txt,
                key: m.key
            }
        })
    }
    const terminado = (txt = '✅') => {
        conn.sendMessage(from, {
            react: {
                text: txt,
                key: m.key
            }
        })
    }



    let fecha = formatear_fecha(new Date())
        //if (!text) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝙽𝙻𝙰𝙲𝙴 ${command} 𝙵𝙰𝙻𝚃𝙰𝙽𝚃𝙴, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝙴𝙽 𝙴𝙽𝙻𝙰𝙲𝙴/𝙻𝙸𝙽𝙺*\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*#${command} url_link*`
    switch (command) {
        case 'useradd':
        case 'adduser':
        case 'nuevo':
        case 'agregar':
        case 'añadir':
        case 'editar':
            espere()
            await delay(2000)
            if (!isBot && global.clientes[from].cuenta != 'admin') return await enviar('*❌Xd ESte Comando Solo Lo Puede Usar El Bot*')
            if (!m.message.extendedTextMessage?.contextInfo.participant) return enviar("*❌Debes Etiquetar Un Msj De Quien Deseas Agregar*")
            if (!text) return await enviar('*❌Xd No Enviaste Ninguna Informacion Del Usuario A Agregar*')
            if (argumentos[0].length < 4) return await enviar('*❌El Nombre De Usuario Debe Contener Al Menos 4 Digitos*')
            var cliente = `${m.message.extendedTextMessage?.contextInfo.participant}`
            if (global.clientes[cliente]) {
                global.clientes[cliente].nombre = text
                enviar(`*✅Usuario Editado Correctamente*\n👤Nombre: *${global.clientes[cliente].nombre}*\nCuenta: *${global.clientes[cliente].cuenta}*\n⌛Proximo Pago: *${global.clientes[cliente].termino}*`)
                //react('❌')
            } else {
                global.clientes[cliente] = {
                    nombre: text,
                    cuenta: 'cliente',
                    inicio: fecha,
                    termino: fecha
                }
                enviar(`*✅Usuario Creado Correctamente*\n👤Nombre: *${global.clientes[cliente].nombre}*\nCuenta: *${global.clientes[cliente].cuenta}*\n⌛Proximo Pago: *${global.clientes[cliente].termino}*`)
            }
            fs.writeFileSync('clientes.json', JSON.stringify(global.clientes))
                //await conn.sendMessage(from, {image: {url: '/home/jorge/Descargas/202310124932461077200936960.png'}, mimetype: 'image/jpeg', fileName: `imagen.jpeg`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
            await delay(2000)
            terminado()
            break;
        case 'delete':
        case 'eliminar':
            espere()
            await delay(2000)
            if (!isBot && global.clientes[from].cuenta != 'admin') return await enviar('*❌Xd ESte Comando Solo Lo Puede Usar El Bot*')
            if (!m.message.extendedTextMessage?.contextInfo.participant) return enviar("*❌Debes Etiquetar Un Msj De Quien Deseas Agregar*")
            if(global.clientes[m.message.extendedTextMessage?.contextInfo.participant]){
                delete global.clientes[m.message.extendedTextMessage?.contextInfo.participant]
                fs.writeFileSync('clientes.json', JSON.stringify(global.clientes))
                enviar('*✅Usuario Eliminado Correctamente*')
            }else{
                enviar('*❌El Usuario No Se Encuentra Registrado*')
            }
             await delay(2000)
            terminado()
            break
        case 'info':
            espere()
            await delay(2000)
        if (!isBot && global.clientes[from].cuenta != 'admin') return await enviar('*❌Xd ESte Comando Solo Lo Puede Usar El Bot*')
            if (!m.message.extendedTextMessage?.contextInfo.participant) return enviar("*❌Debes Etiquetar Un Msj De Quien Deseas Agregar*")
            var cliente = `${m.message.extendedTextMessage?.contextInfo.participant}`

            var expi = global.clientes[cliente].termino
            let fecha_termino = new Date(global.clientes[cliente].termino)
            if (fecha_termino < new Date(fecha)) expi = `Pago Vencido*\n*${global.clientes[cliente].termino}`
            if(global.clientes[m.message.extendedTextMessage?.contextInfo.participant]){
                enviar(`*Tus Datos*\n👤Nombre: *${global.clientes[cliente].nombre}*\nCuenta: *${global.clientes[cliente].cuenta}*\n⌛Proximo Pago: *${expi}*`)
            }else{
                enviar(`*❌El Usuario No Se Encuentra Registrado*`)
            }
            await delay(2000)
            terminado()
        break
        case 'fecha':
            espere()
            await delay(2000)
            if (!isBot && global.clientes[from].cuenta != 'admin') return await enviar('*❌Xd ESte Comando Solo Lo Puede Usar El Bot*')
            if (!m.message.extendedTextMessage?.contextInfo.participant) return enviar("*❌Debes Etiquetar Un Msj De Quien Deseas Agregar*")
            if (!text) return await enviar('*❌Xd No Enviaste Ninguna Fecha*')
            if (argumentos[0].length < 10) return await enviar('*❌La Fecha Debe Contener Al Menos 10 Digitos*')
            var cliente = `${m.message.extendedTextMessage?.contextInfo.participant}`
            if (global.clientes[cliente]) {
                global.clientes[cliente].termino = formatear_fecha(new Date(text))
                enviar(`*✅Usuario Editado Correctamente*\n👤Nombre: *${global.clientes[cliente].nombre}*\nCuenta: *${global.clientes[cliente].cuenta}*\n⌛Proximo Pago: *${global.clientes[cliente].termino}*`)
                fs.writeFileSync('clientes.json', JSON.stringify(global.clientes))
            }else{
                enviar(`*❌El Usuario No Se Encuentra Registrado*`)
            }
            await delay(2000)
            terminado()
        break
        default:
            break;
    }
}
module.exports = {
    iori
}