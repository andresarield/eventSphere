// const path = require('path');

// module.exports = {
//     entry: './src/index.js', // Entry point for the application
//     output: {
//         path: path.join(__dirname, 'dist'), // Output directory
//         filename: 'bundle.js', // Output file name
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/, // Match .js files
//                 exclude: /node_modules/, // Exclude node_modules
//                 use: {
//                     loader: 'babel-loader', // Use babel-loader for .js files
//                 },
//             },
//             {
//                 test: /\.css$/, // Match .css files
//                 use: ['style-loader', 'css-loader'], // Use these loaders for .css files
//             },
//         ],
//     },
//     devServer: {
//         static: {
//             directory: path.join(__dirname, 'public'), // Serve files from the public folder
//         },
//         port: 3000, // Port for the dev server
//     },
//     mode: 'development', // Set mode to development
// };

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
