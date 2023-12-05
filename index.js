import client from "./client.js";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
import http from "http";
import command from "./command.js";
command();
http
  .createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
  })
  .listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`);
  });

dotenv.config();
const conn = await mongoose.createConnection(process.env.MONGO_URI);
const us = await conn.collection("users");

const uid = [];
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!uid.includes(interaction.user.id)) {
    console.log("yes", uid);
    const user = await us.findOne({ discordId: interaction.user.id });
    if (user === null) {
      await interaction.reply(
        `you seems to be new user kindly please signup! ${process.env.SIGNUP}`
      );
      return;
    }
    uid.push(interaction.user.id);
  }
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "who_are_you") {
    await interaction.reply("i am all in one assistance of ava!");
  }
  if (interaction.commandName === "hi_there") {
    await interaction.reply(
      `hello, how are you ${interaction.user.globalName} ?`
    );
  }
  if (interaction.commandName === "how_may_i_help_you") {
    await interaction.reply(
      "please raise a ticket for better resolution from our team thank you!"
    );
  }
});
client.on("messageCreate", async (message) => {
  console.log(message);
  // if (message.author.bot || !message.content.startsWith("?")) return;
  if (message.author.bot) return;
  if (!uid.includes(message.author.id)) {
    console.log("yes", uid);
    const user = await us.findOne({ discordId: message.author.id });
    if (user === null) {
      await message.channel.send(
        `you seems to be new user kindly please signup! ${process.env.SIGNUP}`
      );
      return;
    }
    uid.push(message.author.id);
  }
  // Get the command name and arguments from the message
  // const args = message.content.slice(1).trim().split(/ +/);
  // const commandName = args.shift().toLowerCase();

  // const commandName = message.content;

  // if (commandName === "who are you") {
  //   await message.channel.send("I am all in one assistance of ava!");
  // }
  // if (commandName === "hi there") {
  await message.channel.send(
    `Hello, how are you ${message.author.globalName} ?`
  );
  // }
  // if (commandName === "how may i help you") {
  //   await message.channel.send(
  //     "please raise a ticket for better resolution from our team thank you!"
  //   );
  // }
});

client.login(process.env.TOKEN);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
