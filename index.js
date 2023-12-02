import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import http from "http";

const server = http
  .createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
  })
  .listen(3000, () => {
    console.log(`Server running at 3000`);
  });

dotenv.config();
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
