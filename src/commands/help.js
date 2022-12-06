const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help command for bot"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setDescription(`
You've come to the right place for help! Click the links (or buttons) below for support.

:question: **Snowsgiving Help Center Article:** https://dis.gd/snowsgiving22
    
:gift_heart: **Support this year's charity (Crisis Text Line) when you shop exclusive Snowsgiving merch:** https://discordmerch.com/collections/snowsgiving-2022
    
:robot: **Encountered issues with the Bot? Submit a ticket here:** https://dis.gd/bugreport`)
      .setColor(Colors.White)
      .setTimestamp();

      interaction.editReply({ embeds: [embed] });

  },
};
