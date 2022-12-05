const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("settings")
    .setDescription("Settings command for bot")
    .addSubcommand((subcommand) =>
        subcommand
            .setName("set-announcement-channel")
            .setDescription("Sets your current channel to receive Snowsgiving Bot Announcements")
        )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("enable-announcements")
            .setDescription("Re-enables Snowsgiving Bot announcements & quest completion messages in this server")
        )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("disable-announcements")
            .setDescription("Disables Snowsgiving Bot announcements & quest completion messages in this server")
    ),
  async execute(interaction) {

    if (interaction.options.getSubcommand() === "set-announcement-channel") {
        interaction.editReply("Not implemented yet 1");
    } else if (interaction.options.getSubcommand() === "enable-announcements") {
        interaction.editReply("Not implemented yet 2");
    } else if (interaction.options.getSubcommand() === "disable-announcements") {
        interaction.editReply("Not implemented yet 3");
    } else {
        interaction.editReply("Not implemented yet 4");
    }
  },
};
