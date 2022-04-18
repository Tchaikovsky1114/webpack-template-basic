// 전역 모듈 호출
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
  //파일을 읽어들이기 시작하는 진입점을 설정한다.
  entry: './js/main.js',

  //결과물(번들)을 반환하는 설정
  output: {
    //node.js에서 필요로하는 절대 경로르 설정해주어야 한다.
    //resolve 메서드는 인수들의 경로를 합쳐준다.
    //dirname 또한 전역변수이며 현재 파일이 있는 그 경로를 지칭한다.
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true
  },
  module: {
    rules: [
      {
        // .scss, .css 확장자를 찾게 해준다.
        test:/\.s?css$/,
        // js에서 css를 해석할 수 있게 해주는 css-loader
        // 해석된 내용을 삽입해주는 style-loader
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },
  //번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}