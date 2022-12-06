/**
- This command doesn't exist on discord version of bot, but this was suggested by an user from Discord Town Hall Server :)
*/

const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("throw-snowball")
        .setDescription("Throw snowballs at your friends!")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to throw snowballs at")
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("user");

        const embed = new EmbedBuilder()
            .setDescription(`You threw a snowball at ${user}!`)
            .setColor(Colors.White)
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });

        await user.send({
            content: `You got snowballed by ${interaction.user}!`,
        })

    },
};
