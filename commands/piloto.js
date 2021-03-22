const axios = require('axios');
const { MessageEmbed } = require('discord.js');

exports.run = async (_, message, args) => {
    const { data: driverInfo } = await axios.get(`https://api.e-racebrasil.com.br/driver?name=${args[0]}`);
    const { data: wins } = await axios.get(`https://api.e-racebrasil.com.br/driver/${driverInfo[0].id}/wins`);
    const { data: results } = await axios
        .get(`https://api.e-racebrasil.com.br/driver/${driverInfo[0].id}/races`);

    let lastestRaces = "```POSIÇÃO|MELHOR T.|PONTOS|PISTA \n  ";
    for (let i = 0; i < results.length; i++) {
        if (i < 5) {
            lastestRaces += `${results[i].position.toString().length == 1 ? `0${results[i].position}` : results[i].position}    ${results[i].best_time == '-' ? '--------' : results[i].best_time}   ${results[i].points.toString().length == 1 ? `0${results[i].points}` : results[i].points}    ${results[i].track}\n  `
        }
    }
    lastestRaces += "```"

    const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .addFields(
            {
                name: driverInfo[0].driver.toUpperCase(),
                value: `Piloto ${driverInfo[0].team} da ${driverInfo[0].rank}`
            },
            {
                name: "PÓDIOS",
                value: `${wins.first ? wins.first : 0} 🥇  ${wins.second ? wins.second : 0} 🥈  ${wins.third ? wins.third : 0} 🥉`
            },
            {
                name: "ÚLTIMAS 5 CORRIDAS",
                value: lastestRaces
            }
        )
    message.channel.send(exampleEmbed);
}

exports.help = {
    name: 'piloto',
    aliases: [],
    description: 'Ver as últimas informações de um determinado piloto',
    usage: 'piloto'
};