import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import http from "http";
import command from "../discord/command.js";
command();
http
  .createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
  })
  .listen(3000, () => {
    console.log(`Server running at 3000`);
  });

dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  console.log(interaction.user);
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "who_are_you") {
    await interaction.reply("i am all in one assistance of ava!");
  }
  if (interaction.commandName === "hi_there") {
    await interaction.reply("hello, how are you!");
  }
  if (interaction.commandName === "how_may_i_help_you") {
    await interaction.reply(
      "please raise a ticket for better resolution from our team thank you!"
    );
  }
});
client.on("messageCreate", async (message) => {
  console.log(message, "message");
  // Ignore messages from bots or without prefix
  // if (message.author.bot || !message.content.startsWith("?")) return;
  if (message.author.bot) return;

  // Get the command name and arguments from the message
  // const args = message.content.slice(1).trim().split(/ +/);
  // const commandName = args.shift().toLowerCase();

  const commandName = message.content;

  if (commandName === "who are you") {
    await message.channel.send("I am all in one assistance of ava!");
  }
  if (commandName === "hi there") {
    await message.channel.send("Hello, how are you!");
  }
  if (commandName === "how may i help you") {
    await message.channel.send(
      "please raise a ticket for better resolution from our team thank you!"
    );
  }
});

client.login(process.env.TOKEN);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
