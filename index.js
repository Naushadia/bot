import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import http from "http";
http
  .createServer((res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
  })
  .listen(3000, () => {
    console.log(`Server running at 3000`);
  });

dotenv.config();
// const client = new Client({ intents: [GatewayIntentBits.GuildMessages] });
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = [
  {
    name: "hi_there",
    description: "intro",
  },
  {
    name: "who_are_you",
    description: "query",
  },
  {
    name: "how_may_i_help_you",
    description: "question",
  },
];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  console.log(interaction.user,"created");
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "who_are_you") {
    await interaction.reply("i am all in one assistance of ava!");
  }
  if (interaction.commandName === "hi_there") {
    await interaction.reply("hello, how are you!");
  }
  if (interaction.commandName === "how_may_i_help_you") {
    await interaction.reply(
      // client.on("messageCreate", async (message) => {
      //   console.log(message,"message");
      //   // Ignore messages from bots or without prefix
      //   if (message.author.bot || !message.content.startsWith("?")) return;

      //   // Get the command name and arguments from the message
      //   const args = message.content.slice(1).trim().split(/ +/);
      //   const commandName = args.shift().toLowerCase();

      //   // Execute the command based on the name
      //   if (commandName === "who_are_you") {
      //     await message.channel.send("I am all in one assistance of ava!");
      //   }
      //   if (commandName === "hi_there") {
      //     await message.channel.send("Hello, how are you!");
      //   }
      //   if (commandName === "how_may_i_help_you") {
      //     await message.channel.send(
      "please raise a ticket for better resolution from our team thank you!"
    );
  }
});

client.login(process.env.TOKEN);

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
