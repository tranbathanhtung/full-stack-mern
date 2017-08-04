

module.exports = {
  entry: './src/client.js',
  output: {
    filename: './public/js/bundle.js',
    //path: path.resole(__dirname,'public')
  },
  watch: true,
  module: {
    loaders: [
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015','stage-1']
        }
      }
    ]
  }
};
