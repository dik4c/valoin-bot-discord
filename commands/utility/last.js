import { SlashCommandBuilder } from "discord.js";

// Ekspor objek konfigurasi
const data = new SlashCommandBuilder().setName("last").setDescription("lorem");

// Ekspor fungsi execute
async function execute(interaction) {
  await interaction.reply(`haiasdasdasdadsnakjsdhnw`);
}

export const lastFunction = {
  data,
  execute,
};
