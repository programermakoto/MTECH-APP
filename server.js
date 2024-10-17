const express = require('express');
const cors = require('cors');

const app = express();

// CORSの設定
const corsOptions = {
    origin: 'https://lesson-commerce-app-with-stripe-iota.vercel.app', // 許可するオリジン
    methods: ['GET', 'POST'], // 許可するHTTPメソッド
    credentials: true // 認証情報を許可する場合はtrueにする
};

app.use(cors(corsOptions)); // CORSを適用

app.get('/api/portal', (req, res) => {
    res.json({ url: 'https://your-portal-url.com' }); // レスポンス
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
