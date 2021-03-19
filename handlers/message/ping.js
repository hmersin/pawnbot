const { MessageEmbed } = require("discord.js");
module.exports = function (msg) {
  console.log(msg);
  if (msg.content === "ping") {
    // msg.reply(msg.author.displayAvatarURL());

    const embed = new MessageEmbed()
      .setTitle("Pong!")
      .setColor(0xff0000)
      .setDescription(msg.author.displayAvatarURL());

    msg.channel.send(embed);
  }
};
