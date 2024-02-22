import { configDotenv } from "dotenv";
configDotenv();

import { REST, Routes } from "discord.js";
import { commands } from "./commands/parent.js";

const regCommands = commands.map((i) => {
  return {
    ...i.data,
  };
});

console.log(regCommands);

// create slash
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN_DISCORD);
(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: regCommands,
      }
    );

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
