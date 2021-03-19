client.on("message", (msg) => {
  if (!msg.guild) return;

  if (msg.content.includes("fuck")) {
    msg.channel.send("Warning")
    pingHandler(msg);
  }
});