import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

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

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
const command = async (req, res) => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};

export default command;
