const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help command for bot"),
  async execute(interaction) {
    interaction.editReply("Help will be shown here. (Not implemented yet.");
  },
};
