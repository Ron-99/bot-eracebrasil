const axios = require('axios');
exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.some(role => role.name === 'Presidente da E-Race' || role.name === 'Vice Presidente da E-Race'))
        {return;}

    const data = {
        name: args[0],
        newName: args[1],
        updated_by: 3
    };
    const { data: driver, status } = await axios.patch(`https://api.e-racebrasil.com.br/driver/name/newname`, data);

    if (status === 200) {
        message.channel.send(`Alterado o nome do piloto de ${args[0]} para ${driver.data.name} com Sucesso!`);
    } else {
        message.channel.send('Ocorreu um erro, não foi possível alterar o nome do piloto, por favor tente novamente mais tarde ou contate um de nossos administradores');
    }
};

exports.help = {
    name: 'nome',
    aliases: [],
    description: 'Alterar o nome de um piloto',
    usage: 'nome'
};