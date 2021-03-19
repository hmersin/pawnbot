const { Client } = require("discord.js");
const Filter = require("bad-words");
const cache = require("memory-cache");

const guildMemberAdd = require("./handlers/guildMemberAdd/index.js");
const pingHandler = require("./handlers/message/ping.js");

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const client = new Client();
const filter = new Filter();

const MAXWARNINGS = 3;
const warnedPeople = new cache.Cache();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user
    .setActivity("Beta mode(Do not use)", { type: "WATCHING" })
    .then((presence) => console.log(presence))
    .catch(console.error);
});

const checkWarning = (id) => {
  return warnedPeople.get(id);
};

const increaseWarning = (id) => {
  let count = checkWarning(id) || 0;
  count++;
  warnedPeople.put(id, count);
  return count;
};

const kickUser = (msg) => {
  const member = msg.guild.member(msg.author);
  const user = member.user;
  if (member) {
    console.log("Kicking now", member);
    member
      .kick("Kicked due to foul language")
      .then(() => {
        warnedPeople.delete(msg.author.id);
        msg.channel.send(`Kicked due to foul language ${user.tag}`);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    console.log("That user isn't in this server!");
  }
};

// Create an event listener for new guild members
client.on("guildMemberAdd", guildMemberAdd);

client.on("message", (msg) => {
  if (!msg.guild) return;

  if (msg.content === "ping") {
    pingHandler(msg);
  }

  if (filter.isProfane(msg.content)) {
    const warningCount = increaseWarning(msg.author.id);
    const remainingCount = MAXWARNINGS - warningCount;

    if (remainingCount > 0) {
      msg.reply(
        `Warning ${warningCount}: Don't say things like that! Do it ${remainingCount} more time(s) and you are kicked!`
      );
    } else {
      msg.reply("You are kicked!!!");
      kickUser(msg);
    }
  }
});

client.login(TOKEN);
