const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Utils = require('../utils/utils');

const utils = new Utils();

exports.run = async (_, message, args) => {

    const { data } = await axios.get(`https://api.e-racebrasil.com.br/season/rank/1`);
    const { data: results } = await axios
        .get(`https://api.e-racebrasil.com.br/classification/drivers-points?rank=${args[0]}&season=${data[0].number}`);

    let firstDrivers = "```POSIÇÃO|   NOME   |    EQUIPE  |PONTOS \n  ";
    for (let i = 0; i < results.length; i++) {
        
            firstDrivers += `${(i+1).toString().length == 1 ? `0${(i+1)}` : (i+1)}    ${utils.fullWithSpaces(results[i].driver.toString().substring(0,9))}   ${utils.fullWithSpaces(results[i].team.toString().substring(0,10))}  ${results[i].points.toString().length == 1 ? `0${results[i].points}` : results[i].points}\n  `;
        
    }
    firstDrivers += "```";

    const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .addFields(
            {
                name: `CLASSIFICAÇÃO DA ${args[0].toUpperCase()} 🏆`,
                value: firstDrivers
            }
        );
    message.channel.send(exampleEmbed);
};

exports.help = {
    name: 'classificação',
    aliases: ['classificacao', 'classification'],
    description: 'Ver os 10 primeiros colocados na temporada atual',
    usage: 'classificação'
};