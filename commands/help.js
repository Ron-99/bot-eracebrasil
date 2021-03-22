const { MessageEmbed } = require('discord.js');
const { owner, prefix, embedColor, discord } = require('../config');
const { noBotPerms } = require('../utils/errors');

exports.run = async (client, message, args) => {

    let perms = message.guild.me.permissions;
    if (!perms.has('EMBED_LINKS')) return noBotPerms(message, 'EMBED_LINKS');

    let cmds = Array.from(client.commands.keys());
    let cmd = args[0];

    let cmdName = client.commands.get('help', 'help.name');

    if (cmd) {

        let cmdObj = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        if (!cmdObj) return;
        let cmdHelp = cmdObj.help;

        let cmdHelpEmbed = new MessageEmbed()
            .setTitle(`${cmdHelp.name} | Help Information`)
            .setDescription(cmdHelp.description)
            .addField('Usage', `\`${cmdHelp.usage}\``, true)
            .setColor(embedColor);

        if (cmdHelp.aliases.length) cmdHelpEmbed.addField('Aliases', `\`${cmdHelp.aliases.join(', ')}\``, true);

        return message.channel.send(cmdHelpEmbed);
    }

    const helpCmds = cmds.map(cmd => {
        return '`' + cmd + '`';
    });

    const helpEmbed = new MessageEmbed()
        .setTitle('Ajuda')
        .setDescription(`Veja informações utilizando nosso bot ${client.user}. \n (Execute o commando \`${prefix + cmdName} <command>\` para alguma ajuda em um comando especifico).`)
        .addField('Prefixo atual', prefix)
        .addField('Commandos do bot', helpCmds.join(' | '))
        .addField('Encontrou algum problema?', `Por favor, reporte o problema para <@${owner}> via mensagem direta no discord`)
        .setColor(embedColor);

    message.channel.send(helpEmbed);
};

exports.help = {
    name: 'help',
    aliases: ['h', 'halp'],
    description: 'View all commands and where to receive bot support.',
    usage: 'help'
};