const venom = require('venom-bot');

// Criando a sessão do Venom-Bot
venom
  .create({
    session: 'salon_ester', // Nome da sessão
    multidevice: true, // Suporte para dispositivos múltiplos (MD)
    autoClose: 0, // Mantém a sessão aberta indefinidamente
  })
  .then((client) => start(client))
  .catch((error) => {
    console.log('Erro ao iniciar o Venom:', error);
  });

// Função principal do bot
function start(client) {
  console.log('Bot do Salão Ester iniciado com sucesso!');

  // Função para verificar se o bot está conectado periodicamente
  setInterval(() => {
    client.isConnected().then((isConnected) => {
      if (!isConnected) {
        console.log('Sessão desconectada, tentando reconectar...');
        venom.create().then((newClient) => start(newClient));
      }
    });
  }, 60000); // Verifica a cada 60 segundos

  // Escuta mensagens recebidas
  client.onMessage((message) => {
    console.log(`Mensagem recebida de ${message.from}: ${message.body}`);

    // Saudação inicial
    if (message.body.toLowerCase() === 'oi' && !message.isGroupMsg) {
      client
        .sendText(
          message.from,
          `Olá! Seja bem-vindo(a) ao *Salão Ester* ✨.\nEm que posso te ajudar hoje?\n\n*Envie "menu" para ver as opções disponíveis.*`
        )
        .then((result) => {
          console.log('Mensagem de saudação enviada com sucesso:', result);
        })
        .catch((error) => {
          console.error('Erro ao enviar saudação:', error);
        });
    }

    // Menu principal
    if (message.body.toLowerCase() === 'menu' && !message.isGroupMsg) {
      client
        .sendText(
          message.from,
          `*Menu de Opções do Salão Ester:*\n\n1️⃣ Ver Serviços\n2️⃣ Agendar Horário\n3️⃣ Ver Promoções\n4️⃣ Contato\n\n*Envie o número correspondente para continuar.*`
        )
        .then((result) => {
          console.log('Menu enviado com sucesso:', result);
        })
        .catch((error) => {
          console.error('Erro ao enviar menu:', error);
        });
    }

    // Opção 1: Ver Serviços
    if (message.body === '1' && !message.isGroupMsg) {
      client
        .sendText(
          message.from,
          `*Lista de Serviços Disponíveis:*\n\n💇‍♀️ Corte Feminino - R$50\n💇‍♂️ Corte Masculino - R$40\n💅 Manicure - R$30\n💆‍♀️ Hidratação - R$60\n🎨 Coloração - R$80\n\nDeseja agendar? Envie "2".`
        )
        .then((result) => {
          console.log('Lista de serviços enviada com sucesso:', result);
        })
        .catch((error) => {
          console.error('Erro ao enviar serviços:', error);
        });
    }

    // Opção 2: Agendar Horário
    if (message.body === '2' && !message.isGroupMsg) {
      client
        .sendText(
          message.from,
          `*Agendamento de Horários:*\n\nPor favor, envie as seguintes informações:\n\n1️⃣ Nome Completo\n2️⃣ Serviço Desejado\n3️⃣ Data e Hora Preferida\n\nNossa equipe confirmará seu agendamento em breve.`
        )
        .then((result) => {
          console.log('Instruções de agendamento enviadas com sucesso:', result);
        })
        .catch((error) => {
          console.error('Erro ao enviar agendamento:', error);
        });
    }

    // Opção 3: Ver Promoções
    if (message.body === '3' && !message.isGroupMsg) {
      client
        .sendText(
          message.from,
          `*Promoções da Semana no Salão Ester:*\n\n🌟 Corte + Hidratação - R$90\n🌟 Manicure + Pedicure - R$50\n🌟 Coloração + Hidratação - R$120\n\nAproveite! Promoções válidas até domingo.`
        )
        .then((result) => {
          console.log('Promoções enviadas com sucesso:', result);
        })
        .catch((error) => {
          console.error('Erro ao enviar promoções:', error);
        });
    }

    // Opção 4: Contato
    if (message.body === '4' && !message.isGroupMsg) {
      client
        .sendText(
          message.from,
          `*Contato do Salão Ester:*\n\n📞 Telefone: (XX) 1234-5678\n📍 Endereço: Rua das Flores, 123, Centro\n⏰ Horário de Funcionamento: Segunda a Sábado, das 9h às 19h.\n\nEstamos aguardando sua visita!`
        )
        .then((result) => {
          console.log('Contato enviado com sucesso:', result);
        })
        .catch((error) => {
          console.error('Erro ao enviar contato:', error);
        });
    }
  });

  // Reconexão automática em mudanças de estado
  client.onStateChange((state) => {
    console.log('Estado da conexão:', state);
    if (['CONFLICT', 'UNPAIRED', 'UNLAUNCHED'].includes(state)) {
      venom.create().then((newClient) => start(newClient));
    }
  });

  // Função para capturar erros
  client.onError((error) => {
    console.error('Erro no bot:', error);
    venom.create().then((newClient) => start(newClient));
  });
}
