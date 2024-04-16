//5213132629257@s.whatsapp.net
const fs = require("fs")
require("./config.js")
if (!fs.existsSync("clientes.json")) fs.writeFileSync("clientes.json", "{}")
global.clientes = JSON.parse(fs.readFileSync('clientes.json', 'utf8'))

const clientes = () => {
    let clientes = Object.keys(global.clientes).sort()
    return clientes
}

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
const P = require("pino")
const fetch = require("node-fetch")
const chalk = require("chalk")
const inquirer = require("inquirer")
const {
    color
} = require("./lib/cores")

const {
    banner,
    getBuffer,
    getExtension,
    getRandom
} = require("./lib/funciones")
const moment = require("moment-timezone")
const hora = moment.tz("America/Mexico_City").format("HH:mm:ss")
const data = moment.tz("America/Mexico_City").format("DD/MM/YY")
const speed = require("performance-now")
const yts = require("yt-search")
const _ = require("lodash")
var cron = require('node-cron')
const {
    iori
} = require('./iori.js')

prefix = config.prefix
NombreBot = config.NombreBot
Apodo = config.Apodo
NumeroBot = config.NumeroBot

const girastamp = speed()
const latensi = speed() - girastamp

const vcard = "BEGIN:VCARD\n" +
    "VERSION:3.0\n" +
    "FN:Jorge-CodeErr0r\n" +
    "ORG:Code Err0r\n" +
    "TEL;type=CELL;type=VOICE;waid=5213131580430:+521 313 158 0430\n" +
    "END:VCARD"

async function laur() {


    const {
        state,
        saveCreds
    } = await useMultiFileAuthState("./qr-code")
    console.clear()
    console.log(banner.string)
    const conn = makeWASocket({
        logger: P({
            level: "silent"
        }),
        mobile: false,
        browser: [`[Chrome Linux (${NombreBot})]`],
        auth: state
    })

    if (conn.user == null) {
        let resposta = await inquirer.prompt([{
            type: "input",
            name: "numero",
            message: "Digite Su Numero: \nEjemplo: 5213131580430\n-->"
        }])

        let codigo = await conn.requestPairingCode(resposta.numero)
        console.log(`Digita Tu Numero: ${chalk.bold(codigo)}`)
    }


    conn.ev.on("creds.update", saveCreds)
    conn.ev.on("messages.upsert", async({
        messages
    }) => {
        try {
            const info = messages[0]
            if (!info.message) return
            await conn.readMessages([info.key.id])
            if (info.key && info.key.remoteJid == "status@broadcast") return
            const altpdf = Object.keys(info.message)
            const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]

            const content = JSON.stringify(info.message)
            const from = info.key.remoteJid

            // Body
            var body = (type === "conversation") ?
                info.message.conversation : (type == "imageMessage") ?
                info.message.imageMessage.caption : (type == "videoMessage") ?
                info.message.videoMessage.caption : (type == "extendedTextMessage") ?
                info.message.extendedTextMessage.text : ""

            const args = body.trim().split(/ +/).splice(1)
            const isCmd = /^[°•÷×™+✓_=|~!?@#%^.©^]/gi.test(body) ? body.match(/^[°•÷×™+✓_=|~!?@#%^.©^]/gi)[0] : "" //body.startsWith(prefix)
            const comando = isCmd ? body.slice(1).split(/ +/).shift().toLowerCase() : null

            bidy = body.toLowerCase()

            const getFileBuffer = async(mediakey, MediaType) => {
                const stream = await downloadContentFromMessage(mediakey, MediaType)

                let buffer = Buffer.from([])
                for await (let chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                return buffer
            }

            const isGroup = from.endsWith("@g.us")
            const tescuk = ["0@s.whatsapp.net"]
            const sender = isGroup ? info.key.participant : from
            const testat = bidy
            const pushname = info.pushName ? info.pushName : ""
            const groupMetadata = isGroup ? await conn.groupMetadata(from) : ""
            const groupName = isGroup ? groupMetadata.subject : ""
            const groupDesc = isGroup ? groupMetadata.desc : ""
            const groupMembers = isGroup ? groupMetadata.participants : ""
            const groupAdmins = isGroup ? _.map(_.filter(groupMembers, "admin"), "id") : ""
            const q = args.join(" ")


            const quoted = info.quoted ? info.quoted : info
            const mime = (quoted.info || quoted).mimetype || ""
            const NumeroBot = conn.user.id.split(":")[0] + "@s.whatsapp.net"
            const isBot = info.key.fromMe
            const isOwner = sender.includes(NumeroBot)
            const isBotGroupAdmins = groupAdmins.includes(NumeroBot) || false
            const isGroupAdmins = groupAdmins.includes(sender) || false

            const enviar = (texto) => {
                conn.sendMessage(from, {
                    text: texto
                }, {
                    quoted: info
                })
            }

            const react = (texto) => {
                conn.sendMessage(from, {
                    react: {
                        text: texto,
                        key: info.key
                    }
                })
            }

            const espere = (texto = '⌚') => {
                conn.sendMessage(from, {
                    react: {
                        text: texto,
                        key: info.key
                    }
                })
            }
            if (!isCmd && !isBot) {
                console.log(chalk.gray("~>"), `[${chalk.blue("Mensaje")}]`, "de", color(sender.split("@")[0]))
            } else if (isCmd && !isBot) {
                console.log(chalk.gray("~>"), `[${chalk.red("Comando")}]`, color(comando), "de",
                    color(sender.split("@")[0]))
            }

            switch (comando) {
                case 'useradd':
                case 'adduser':
                case 'nuevo':
                case 'agregar':
                case 'añadir':
                case 'delete':
                case 'eliminar':
                case 'info':
                case 'fecha':
                    await iori(info, comando, conn, q, args)
                    break
                case "dono":
                    await delay(3000)
                    try {
                        conn.sendMessage(sender, {
                            contacts: {
                                displayName: `${Apodo}`,
                                contacts: [{
                                    vcard
                                }]
                            }
                        })
                    } catch (e) {
                        console.log(e)
                    }
                    break

                case "tag":
                case "hidetag":
                    if (!isGroup) return enviar("Este comando só poderia ser utilizado em grupo.")
                    if (!isGroupAdmins) return enviar("Somente admins poderia utilizar esse comando.")
                    if (args.length < 1) return enviar("Diga oque irei citar...")
                    let mem = _.map(groupMembers, "id")
                    let options = {
                        text: q,
                        mentions: mem,
                        quoted: info
                    }
                    conn.sendMessage(from, options)
                    break

                case "reagir":
                    {
                        conn.sendMessage(from, {
                            react: {
                                text: "🐳",
                                key: info.key
                            }
                        })
                    }
                    break

                case "ping":
                    if (!isOwner) return enviar("Você não e meu dono...")
                    enviar(`☁️ Velocidade: ${latensi.toFixed(4)}`)
                    break

                default:

                    switch (testat) {

                        case "corno":
                            enviar("Você tá bravinha? tá?")
                            break

                        case "bom dia":
                            conn.sendMessage(from, {
                                react: {
                                    text: "☕",
                                    key: info.key
                                }
                            })
                            break

                    }

                    if (isCmd) {
                        enviar("Comando No Encontrado... 🐳")
                    }

            }

        } catch (e) {
            console.log(e)
        }
    })

    conn.ev.on("connection.update", (update) => {
        let {
            connection,
            lastDisconnect
        } = update

        if (connection === "open") {
            console.log(chalk.greenBright(`${NombreBot} 1.2.0 conectada ✓`))
            console.log(chalk.gray("Info"), color("Os: Baileys"))
            console.log(chalk.gray("Info"), color("Version: 1.2.0 (Lite)"))
            console.log(chalk.gray("Info"), color("Dev: Jorge-Codeerr0r"))
            console.log(chalk.gray("Buena Suerte!"))
            console.log(chalk.greenBright(`${clientes().length} Clientes Registrados En La Base De Datos`))
            cron.schedule('1 */8,16 12-15 * *', function() { //29 23 13-16 */1 *        30 23 12-16 * *
                console.clear()
                let listado = Object.keys(global.clientes).sort()
                listado.forEach(function(element, index) {
                    let fecha_termino = new Date(global.clientes[element].termino)
                    if (fecha_termino < new Date()) return
                    conn.sendMessage(element, {
                        text: `Hola *${global.clientes[element].nombre}*, Recuerda Que Tu Proximo Pago Es El *${global.clientes[element].termino}.*`
                    })
                });

            }).start();

        } else if (connection === "close") {
            console.log(chalk.dim("Ocurrio Un Error En La Conexion"))
            laur()
        }
        if (update.isNewLogin) {
            laur()
        }
    })

}
laur()