const axios = require('axios');
const ChatBotRepository = require('../repositorys/ChatBotRepository');

let messages = ChatBotRepository.messages;
const ChatBotService = {
    getCoordinates: async (city) => {
        try {
            const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
            if (response.data.results && response.data.results.length > 0) {
                return {
                    latitude: response.data.results[0].latitude,
                    longitude: response.data.results[0].longitude,
                    name: response.data.results[0].name
                };
            }
            return null;
        } catch (error) {
            console.error("Erro ao obter coordenadas:", error);
            return null;
        }
    },

    getWeather: async (city) => {
        try {
            const coords = await ChatBotService.getCoordinates(city);
            if (!coords) return "Cidade não encontrada.";

            const response = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&timezone=auto`
            );

            const current = response.data.current_weather;
            return `Clima em ${coords.name}:
    🌡 Temperatura: ${current.temperature}°C
    💨 Velocidade do vento: ${current.windspeed} km/h
    🧭 Direção do vento: ${current.winddirection}°`;
        } catch (error) {
            console.error("Erro ao obter clima:", error);
            return "Não foi possível obter informações do clima para esta cidade.";
        }
    },

    handleConnection(socket) {
        console.log(`Socket conectado: ${socket.id}`);

        const welcomeMessage = `Bem-vindo ao ChatBot de Clima! 🌦️          

O que você deseja fazer?
[1] Consultar clima
[2] Sair`;

        socket.emit('receivedMessage', {
            author: "Bot",
            message: welcomeMessage
        });

        socket.emit('previousMessages', messages);

        socket.on('sendMessage', async (data) => {
            await this.handleMessage(data, socket, messages);
        });
    },

    async handleMessage(data, socket, messages) {
        messages.push(data);

        switch (data.message.trim()) {
            case '1':
                socket.emit('receivedMessage', {
                    author: "Bot",
                    message: "Digite o nome da cidade para consultar o clima:"
                });
                break;

            case '2':
                socket.emit('receivedMessage', {
                    author: "Bot",
                    message: "Obrigado por usar nosso serviço. Até mais! 👋"
                });
                break;

            default:
                if (messages.length > 1 && messages[messages.length - 2].message.trim() === '1') {
                    const weatherInfo = await ChatBotService.getWeather(data.message.trim());
                    socket.emit('receivedMessage', {
                        author: "Bot",
                        message: weatherInfo
                    });

                    socket.emit('receivedMessage', {
                        author: "Bot",
                        message: "\nO que mais deseja fazer?\n[1] Consultar clima\n[2] Sair"
                    });
                } else {
                    socket.broadcast.emit('receivedMessage', data);
                    socket.emit('receivedMessage', {
                        author: "Bot",
                        message: "Escolha uma opção:\n[1] Consultar clima\n[2] Sair"
                    });
                }
        }
    }
}

module.exports = ChatBotService;