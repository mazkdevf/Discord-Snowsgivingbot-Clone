const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quest-status")
    .setDescription("Shows the status of all of your quests, complete or otherwise"),
  async execute(interaction) {
    const response = await fetch("https://www.pledge.to/widgets/impact/2APgd47eNW1g7jZCJndQ5w?embedded_on=https%3A%2F%2Fdiscordmerch.com%2Fcollections%2Fsnowsgiving-2022").then(res => res).then(
      res => {
        return res.text();
      }
    );

    const $ = cheerio.load(response);
    const donation_in_dollars = $(".widget-title").text() + ".00";

    const embed = new EmbedBuilder()
      .setColor(Colors.White)
      .setTimestamp()
      .setTitle("View all of your complete and remaining quests!")
      .setDescription(
        `
:calendar_spiral: Here are your available quests to complete:
✅ Wumpus’ Fishing Village - Fish 3 emojis

⏰ Quest reset time: (10am PT): December 7/2022 10:00 PM

💝 **And don't forgot to try the following Snowsgiving drops!**
⭕ 12/7: New Bobble League (on ice!) activity **for everyone** & additional winter-themed Sketch Heads, Chess, and Checker activities **for Nitro users only.**

💗 Support Crisis Text Line when you shop exclusive Snowsgiving merch. We're up to ${donation_in_dollars} in donations! [Visit Merch Store](https://discordmerch.com/collections/snowsgiving-2022)
`);

    interaction.editReply({
      embeds: [embed]
    })
  },
};
