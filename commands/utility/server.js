import { SlashCommandBuilder } from "discord.js";

// Ekspor objek konfigurasi
const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Provides information about the server.");

// Ekspor fungsi execute
async function execute(interaction) {
  await interaction.reply(
    `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`
  );
}

export const serverFunction = {
  data,
  execute,
};
