import {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  IntentsBitField,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
  TextInputStyle,
} from "discord.js";
import { commands } from "./commands/parent.js";

import { configDotenv } from "dotenv";
import { setPrefix } from "./commands/message/setPrefix.js";
configDotenv();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// create commands
client.commands = new Collection();
commands.map((i) => {
  client.commands.set(i.data.name, i);
});

// handle slash event
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

const guildPrefixes = new Map();
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const prefix = guildPrefixes.get(message.guild.id) || "$";

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "setprefix") {
      setPrefix(message, guildPrefixes, args);
    }

    if (command === "pilihan") {
      const row = new ActionRowBuilder({
        components: [
          {
            custom_id: "custom adsad",
            label: "Click me",
            style: ButtonStyle.Primary,
            type: ComponentType.Button,
          },
        ],
      });

      await message.reply({ content: "Silakan pilih:", components: [row] });
      return;
    }

    message.reply(`gunakan ${prefix}help untuk melihat command`);
  }
});

client.login(process.env.TOKEN_DISCORD);
