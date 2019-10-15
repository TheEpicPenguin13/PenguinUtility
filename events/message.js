function getArguments(command) {
    let arguments = [];
    command += " ";
    let newArg = "";
    for (let i = 0; i < command.length; i++) {
        if (command[i] != " ") {
            newArg += command[i];
        } else {
            arguments.push(newArg);
            newArg = "";
        }
    }
    return arguments;
}

module.exports = (client, message) => {
    // If author is a bot say NO
    if (message.author.bot) return;
    // If message doesn't contain prefix say NO
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    let a = message.content.substr(1);
    const args = getArguments(a);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);

    // If cmd don't exist say NO
    if (!cmd) return;

    cmd.run(client, message, args);
};
