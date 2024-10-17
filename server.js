const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./auth'); // Certifique-se de que o caminho está correto
const { sequelize } = require('./config'); // Importa o Sequelize

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('frontend')); // Para servir arquivos estáticos, como HTML, CSS e JS

// Rota para a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html')); // Serve a página de login
});

// Rota para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verifique as credenciais (substitua isso pela sua lógica de autenticação real)
    if (username === 'admin' && password === 'senha') {
        // Gere um token JWT
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    return res.status(401).json({ error: 'Credenciais inválidas' });
});

// Rota para tarefas, protegida por autenticação
app.get('/tasks', authenticateToken, (req, res) => {
    // lógica para retornar tarefas (exemplo)
    res.json([
        { id: 1, title: 'Tarefa 1', status: 'pendente' },
        { id: 2, title: 'Tarefa 2', status: 'completa' }
    ]);
});

// Sincroniza o banco de dados e inicia o servidor
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });
