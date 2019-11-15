const Express = require("express")
const Path = require("path")
const BodyParser = require("body-parser")
const Bot = require("./discord-bot/main")

const App = Express()

const port = 5000
var botStarted = false;
var bot;

App.use(BodyParser.urlencoded({extended: true}));

App.get('/', (req, res) => {
    res.sendFile(Path.join(`${__dirname}/index.html`));
});

App.post('/getInputForm', (req, res) => {
    const channelName = req.body.channel;
    const message = req.body.message;
    if (channelName == "" || message == "") return;
    if (!bot) return;
    let sendMessage = require(__dirname + "/discord-bot/web-commands/sendMessage.js");
    sendMessage(bot, channelName, message);
    res.redirect(`http://localhost:${port}`)
    res.end();
});

App.post('/startBot', (req, res) => {
    if (botStarted == false) {
        bot = Bot();
        botStarted = true;
    }
    res.redirect(`http://localhost:${port}`);
    res.end();
});

const server = App.listen(port, () => {
    console.log(`Express Running -> PORT ${port}`)
});