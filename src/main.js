const http = require('http');
const socketIo = require('socket.io');
const app = require('./controllers/ChatBotController');
const ChatBotService = require('./services/ChatBotService');

const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
        origin: "*", // Permite qualquer origem
        methods: ["GET", "POST"], // Métodos permitidos
        allowedHeaders: ["*"], // Cabeçalhos permitidos (opcional)
        credentials: true
    }
});

io.on('connection', (socket) => {
    ChatBotService.handleConnection(socket);
});

server.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});