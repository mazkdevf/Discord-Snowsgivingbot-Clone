const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("today")
    .setDescription("Replay today's announcements"),
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
    .setImage("https://cdn.discordapp.com/attachments/1044405873067438210/1044408060032073818/Snowsgiving2022_Fishing.png")
    .setDescription(
`
Let's get Snowsgiving started with your first quest!

:fishing_pole_and_fish: Use the \`/go-fishing\` slash command.

The more you fish, the more prizes you can catch.
(If you have :nitro: [Nitro](https://discord.com/nitro?utm_source=bot&utm_medium=quest&utm_campaign=snowsgiving), you might get extra!)

:wum_love: Support Crisis Text Line when you shop exclusive Snowsgiving merch. We're up to ${donation_in_dollars} in donations! [Visit Merch Store](https://discordmerch.com/collections/snowsgiving-2022)

`)
interaction.editReply({ embeds: [embed] })
  },
};
