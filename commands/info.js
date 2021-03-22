const { MessageEmbed } = require('discord.js');
const { embedColor, discord, owner } = require('../config');
const { version } = require('../package.json');
const { noBotPerms } = require('../utils/errors');

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('EMBED_LINKS')) return noBotPerms(message, 'EMBED_LINKS');

    const infoEmbed = new MessageEmbed()
        .setTitle(client.user.username)
        .setDescription('Este bot é utilizado para podermos gerenciar e analisar nossas corridas da E-Racebrasil')
        .setColor(embedColor)
        .addField('Autor do Bot', `<@${owner}>`)
        .addField('Bot Version', version)
        .setFooter('© 2021 Desenvolvido por Ronaldo Gomes');

    message.channel.send(infoEmbed);
};

exports.help = {
    name: 'info',
    aliases: ['botinfo'],
    description: 'View bot information.',
    usage: 'info'
};