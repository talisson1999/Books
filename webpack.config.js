
const path = require('path');

module.exports = {
  entry: './src/index.js', // Arquivo de entrada
  output: { // Essa parte deve estar no nível principal do objeto
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};