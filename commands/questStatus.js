const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quest-status")
    .setDescription("Shows the status of all of your quests, complete or otherwise"),
  async execute(interaction) {
    interaction.editReply("Quest status will be shown here. (Not implemented yet.)");
  },
};
