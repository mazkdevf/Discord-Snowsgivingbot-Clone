const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("go-fishing-clone")
        .setDescription("Go fishing for some emojis!"),
    async execute(interaction) {
        var random_emojis = [
            "nothing",
            "nothing",
            "nothing",
            "<:Wumpuswaveshi:1044499587802599495>",
            "nothing",
            "nothing",
            "nothing",
            "<:HappyGraggle:1044499582073188442>",
            "nothing",
            "nothing",
            "nothing",
            "<:ReindeerClyde:1044499586493984840>",
            "nothing",
            "nothing",
            "nothing",
            "<:aWumpusWavesHi:1046782934092353647>",
            "nothing",
            "nothing",
            "nothing",
            "<:SnowAngel:1046783849893462146>",
            "nothing",
            "nothing",
            "nothing",
            "<:PhibiSled:1046784594147545108>",
            "nothing",
            "nothing",
            "nothing",
        ];

        var random_emoji = random_emojis[Math.floor(Math.random() * random_emojis.length)];

        var emoji_log = ":grey_question::grey_question::grey_question::grey_question::grey_question::grey_question:";
        var item_log = ":grey_question::grey_question::grey_question::grey_question::grey_question::grey_question::grey_question::grey_question::grey_question:";


        var desc = "";
        if (random_emoji == "nothing") {
            desc = `
Thanks for playing Wumpus’ Fishing Village. You didn’t catch anything this time, but you can try again. Use \`/go-fishing\` in any server that has the Snowsgiving Bot.

Happy Snowsfishing!

Fishing emoji log: ${emoji_log} [0/6]
Fishing item log: ${item_log} [0/10]`;
        } else {
            desc = `
            Amazing! You fished the ${random_emoji} emoji! You can use it in this server, and if you have Nitro you can use it across servers. sikee
            
            Fishing emoji log: ${emoji_log} [0/6]
            Fishing item log: ${item_log} [0/10]`;

        }

        const embed = new EmbedBuilder()
            .setColor(Colors.White)
            .setTimestamp()
            .setImage("https://cdn.discordapp.com/attachments/1044405873067438210/1044408060032073818/Snowsgiving2022_Fishing.png")
            .setDescription(desc);

        interaction.editReply({ embeds: [embed] })
    },
};
A