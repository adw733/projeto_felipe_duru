const express = require('express');
const cors = require('cors');
const app = express();
const port = 3333;

// Middleware
app.use(cors());
app.use(express.json());

// Mock login endpoint
app.post('/auth/login', (req, res) => {
  const { email, senha } = req.body;
  
  // Lista de usuários válidos baseada nos seeders
  const validUsers = [
    { email: 'gerente.compras@email.com', senha: '123456' },
    { email: 'gerente.vendas@email.com', senha: '123456' },
    { email: 'coordenador.compras@email.com', senha: '123456' },
    { email: 'coordenador.vendas@email.com', senha: '123456' },
    { email: 'analista.compras@email.com', senha: '123456' },
    { email: 'analista.vendas@email.com', senha: '123456' },
    { email: 'assistente.compras@email.com', senha: '123456' },
    { email: 'assistente.vendas@email.com', senha: '123456' }
  ];
  
  const user = validUsers.find(u => u.email === email && u.senha === senha);
  
  if (user) {
    res.json({
      success: true,
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 1,
        email: user.email,
        nome: user.email.split('@')[0].replace('.', ' ').toUpperCase()
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Credenciais inválidas'
    });
  }
});

// Mock endpoints para dados necessários
app.get('/menus-perfis', (req, res) => {
  res.json([]);
});

app.get('/menus', (req, res) => {
  res.json([]);
});

app.get('/perfis', (req, res) => {
  res.json([]);
});

app.get('/health', (req, res) => {
  res.json({ message: 'Mock backend funcionando', status: 'ok' });
});

app.use((req, res) => {
  res.json({ message: 'Mock backend funcionando', endpoint: req.path });
});

app.listen(port, () => {
  console.log(`Mock backend rodando na porta ${port}`);
  console.log('Usuários disponíveis:');
  console.log('- gerente.compras@email.com / 123456');
  console.log('- gerente.vendas@email.com / 123456');
  console.log('- coordenador.compras@email.com / 123456');
  console.log('- coordenador.vendas@email.com / 123456');
  console.log('- analista.compras@email.com / 123456');
  console.log('- analista.vendas@email.com / 123456');
  console.log('- assistente.compras@email.com / 123456');
  console.log('- assistente.vendas@email.com / 123456');
});