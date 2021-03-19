const { Client } = require("discord.js");
const guildMemberAdd = require("./handlers/guildMemberAdd/index.js");
const pingHandler = require("./handlers/message/ping.js");
const client = new Client();
const { Player } = require("discord-player");
// Create a new Player (you don't need any API Key)
const player = new Player(client);
// To easily access the player
client.player = player;
const TOKEN = "ODE5Nzc3NzUxOTI1MzkxMzgw.YErjhg.ENz-stwlkORM5isgzOmpdPYMJvA";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user
    .setActivity("Beta mode(Do not use)", { type: "WATCHING" })
    .then((presence) => console.log(presence))
    .catch(console.error);
});

// Create an event listener for new guild members
client.on("guildMemberAdd", guildMemberAdd);

client.on("message", (msg) => {
  if (!msg.guild) return;
console.log(msg.content.includes("fuck"))
  if (msg.content === "ping") {
    pingHandler(msg);
  }
});


client.login(TOKEN);