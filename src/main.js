const tracing = require('./tracing');
const http = require('http');
const socketIo = require('socket.io');
const app = require('./controllers/ChatBotController');
const ChatBotService = require('./services/ChatBotService');

async function startServer() {
    try {        
        await tracing.initializeTracing();

        const server = http.createServer(app);
        const io = socketIo(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                allowedHeaders: ["*"],
                credentials: true
            }
        });

        io.on('connection', (socket) => {
            ChatBotService.handleConnection(socket);
        });

        server.listen(3001, () => {
            console.log('Servidor rodando na porta 3001');
        });
    } catch (error) {
        console.error('Falha ao iniciar o servidor:', error);
        process.exit(1);
    }
}

startServer();