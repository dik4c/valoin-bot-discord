import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
} from "discord.js";

// utility
const select = new StringSelectMenuBuilder()
  .setCustomId("blindpick")
  .setPlaceholder("tentukan jumlah pemain!")
  .addOptions(
    new StringSelectMenuOptionBuilder()
      .setLabel("1")
      .setDescription("solo")
      .setValue("1"),
    new StringSelectMenuOptionBuilder()
      .setLabel("2")
      .setDescription("duo")
      .setValue("2"),
    new StringSelectMenuOptionBuilder()
      .setLabel("3")
      .setDescription("trio")
      .setValue("3"),
    new StringSelectMenuOptionBuilder()
      .setLabel("4")
      .setDescription("berempat")
      .setValue("4"),
    new StringSelectMenuOptionBuilder()
      .setLabel("5")
      .setDescription("berlima")
      .setValue("5")
  );

const data = new SlashCommandBuilder()
  .setName("blindpick")
  .setDescription("blind pick agent in valorant");

async function execute(interaction) {
  const row = new ActionRowBuilder().addComponents(select);

  await interaction.reply({
    content: "blind pick agent valorant ☠",
    components: [row],
  });

  const collectorFilter = (i) => i.user.id === interaction.user.id;
  try {
    const confirmation = await response.awaitMessageComponent({
      filter: collectorFilter,
      time: 60_000,
    });
  } catch (e) {
    await interaction.editReply({
      content: "Confirmation not received within 1 minute, cancelling",
      components: [],
    });
  }
}

export const blindpickFunction = {
  data,
  execute,
};
