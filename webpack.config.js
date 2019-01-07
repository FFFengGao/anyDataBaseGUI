const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/main.hmr.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new CopyWebpackPlugin([{ from: '/src/public/*', to: '/dist/public' }])
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  }
}
