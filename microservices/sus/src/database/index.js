const mongoose = require('mongoose');

// Iniciar conexão com o banco de dados.
mongoose.connect('mongodb://localhost:27017/sus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});