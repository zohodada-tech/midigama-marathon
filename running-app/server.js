// 메인 서버 파일
const express = require('express');
const cors = require('cors');
const calculateRoutes = require('./routes/calculate');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트
app.use('/api', calculateRoutes);

// 루트 경로
app.get('/', (req, res) => {
    res.json({ 
        message: '러닝 분석 서버',
        endpoints: {
            '/api/analyze': 'POST - 러닝 분석',
            '/api/records': 'GET - 레이스 기록 조회'
        }
    });
});

// 404 처리
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`🚀 러닝 분석 서버가 포트 ${PORT}에서 실행 중`);
    console.log(`📍 API 엔드포인트: http://localhost:${PORT}/api`);
});

module.exports = app;
