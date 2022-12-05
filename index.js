require("dotenv").config();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Client, GatewayIntentBits, ActivityType, Collection, EmbedBuilder, Routes, Partials, Colors } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ],
    partials: [Partials.Channel]
})

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.on("error", console.error);

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.once('ready', async () => {
    console.clear();
    console.log("Bot Online");
    console.log("Logged in as:", client.user.tag)

    const CLIENT_ID = client.user.id;

    const rest = new REST({
        version: "10"
    }).setToken(process.env.DISCORD_TOKEN);

    (async () => {
        try {

            await rest.put(Routes.applicationCommands(CLIENT_ID), {
                body: commands
            });
            console.log("Successfully registered application commands for Snowsgiving Bot.")
        } catch (err) {
            console.error(err);
        }
    })();

    client.user.setPresence({
        activities: [{ name: `Snowsgiving Bot`, type: ActivityType.Competing }],
        status: 'online',
    });

});

client.on('interactionCreate', async interaction => {
    if (!interaction.type === 2) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    await interaction.deferReply({ ephemeral: true });

    const ErrorEmbed = new EmbedBuilder()
        .setAuthor({ name: "Interaction Failed" })
        .setColor(Colors.Red)
        .setTimestamp()
        .setFooter({ text: "Snowsgiving Discord Bot", iconURL: client.user.displayAvatarURL() })

    client.user.setPresence({
        activities: [{ name: `Snowsgiving Bot`, type: ActivityType.Competing }],
        status: 'online',
    });

    try {
        await command.execute(interaction);
    } catch (err) {
        if (err) console.error(err);

        await interaction.editReply({
            embeds: [ErrorEmbed],
            ephemeral: true
        })
    }
});

client.login(process.env.DISCORD_TOKEN);