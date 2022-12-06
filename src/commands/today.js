const { SlashCommandBuilder, Colors, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
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
    var nitroStatus = (interaction.member.premiumSince ? true : false);

    const Monday_embed = new EmbedBuilder()
      .setColor(Colors.White)
      .setTitle("Monday 12/5 — Wumpus’ Fishing Village")
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

    const Tuesday_embed = new EmbedBuilder()
      .setColor(Colors.White)
      .setTitle("Tuesday 12/6 — Oh ho ho, Holiday Activities")
      .setTimestamp()
      .setImage("https://cdn.discordapp.com/attachments/1044405873067438210/1044410030688055367/Snowsgiving2022_Pattern.png")
      .setDescription(
        `
Tis the season for (Snows)giving, and we’re dropping snowy Activities just for fun! (not a Quest)

:snowsgiving2022_bobbleleague: **Bobble League (on Ice!)** is now available to everyone.
For our :nitro: Nitro subscribers, you can also enjoy **Chess or Checkers** and **Sketch Heads** with a snowy theme.

Pop into any voice channel and hit the :rocket: to check them out.

:wum_love: Support Crisis Text Line when you shop exclusive Snowsgiving merch. We're up to ${donation_in_dollars} in donations! [Visit Merch Store](https://discordmerch.com/collections/snowsgiving-2022)
`)

    var config = {
      embedToShow: Tuesday_embed
    }

    var JSON = {}
    if (interaction.member.voice.channel && nitroStatus) {
      if (config.embedToShow["data"]["title"].includes("Tuesday")) {
        var getInvite = await getBubbleLeagueCode(interaction.member.voice.channel.id);
        if (getInvite.includes("Error") !== true) {
          JSON.components = [new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setLabel("Play Bobble League!")
              .setStyle(ButtonStyle.Link)
              .setEmoji("🏒")
              .setURL(await getBubbleLeagueCode(interaction.member.voice.channel.id))
          )];
        }
      }

      JSON.embeds = [config.embedToShow];
    } else {
      JSON.embeds = [config.embedToShow];
    }


    interaction.editReply(JSON);
  },
};

async function getBubbleLeagueCode(vcId) {
  return new Promise(async (resolve, reject) => {
    var appId = "947957217959759964";

    try {
      await fetch(`https://discord.com/api/v10/channels/${vcId}/invites`, {
        method: 'POST',
        body: JSON.stringify({
          max_age: 86400,
          max_uses: 0,
          target_application_id: appId,
          target_type: 2,
          temporary: false,
          validate: null,
        }),
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
        .then((invite) => {
          if (invite.error || !invite.code) resolve("Error: ", invite)
          if (Number(invite.code) === 50013) resolve("Error: ", invite)
          resolve(`https://discord.com/invite/${invite.code}`)
        });
    } catch (error) {
      resolve("Error: ", error)
    }
  })

}