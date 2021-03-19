const { Client } = require("discord.js");
const guildMemberAdd = require("./handlers/guildMemberAdd/index.js");
const pingHandler = require("./handlers/message/ping.js");
const client = new Client();

const TOKEN = "";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user
    .setActivity("!help", { type: "WATCHING" })
    .then((presence) => console.log(presence))
    .catch(console.error);
});

// Create an event listener for new guild members
client.on("guildMemberAdd", guildMemberAdd);

client.on("message", (msg) => {
  if (!msg.guild) return;

  if (msg.content === "ping") {
    pingHandler(msg);
  }
});

client.login(TOKEN);
