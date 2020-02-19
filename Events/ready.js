module.exports = (client) => {
    console.log("[START UP] Bot Is Ready");
    client.user.setPresence({
        game: {
            name: 'You',
            type: "Watching"
        }
    });
}