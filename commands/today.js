const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("today")
    .setDescription("Replay today's announcements"),
  async execute(interaction) {
    interaction.editReply("Today's announcements will be replayed here. (Not implemented yet.")
  },
};
