const { MessageEmbed } = require("discord.js");
module.exports = function (msg) {
  console.log(msg);
  if (msg.content === "nigga") {
    // msg.reply(msg.author.displayAvatarURL());

    const embed = new MessageEmbed()
      .setTitle("Warning #1 For Swearing")
      .setColor(0xff0000)
      .setDescription(msg.author.displayAvatarURL());

    msg.channel.send(embed);
  }
};
