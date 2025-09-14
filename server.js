// ファイル名: server.js

// Node.js 標準の http モジュールを読み込む
const http = require('http');

// サーバーを作成
const server = http.createServer((req, res) => {
  // レスポンスのヘッダ（文字コードをUTF-8に設定）
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

  // ブラウザに表示する文字
  res.end('こんにちは！これはNode.jsサーバーです');
});

// ポート3000番で待ち受け
server.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で起動しました');
});
