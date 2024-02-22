export const setPrefix = (message, guildPrefixes, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.reply("Anda tidak memiliki izin untuk mengubah prefix.");
  }

  const newPrefix = args[0];

  if (!newPrefix) {
    return message.reply("anda belum menyantumkan prefix baru");
  }

  guildPrefixes.set(message.guild.id, newPrefix);
  return message.reply(`Prefix berhasil diubah menjadi: ${newPrefix}`);
};
