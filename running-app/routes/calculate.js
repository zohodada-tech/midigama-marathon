// 러닝 분석 라우트
const express = require('express');
const router = express.Router();
const { calculateMarathon } = require('../services/calculator');

// 하프 마라톤 기록 목록
router.get('/marathon-records', (req, res) => {
    const records = [
        { halfTime: 85, name: '초보 하프' },
        { halfTime: 100, name: '일반 하프' },
        { halfTime: 115, name: '상급 하프' },
        { halfTime: 130, name: '전문 하프' }
    ];
    res.json(records);
});

// 마라톤 분석 엔드포인트
router.post('/marathon-analyze', (req, res) => {
    try {
        const { weeklyDistance, maxLSD, halfTimeMinutes, goalFullMinutes, painLevel, sleepHours } = req.body;

        // 유효성 검사
        if (!weeklyDistance || !maxLSD || !halfTimeMinutes || !goalFullMinutes) {
            return res.status(400).json({ error: '필수 파라미터가 누락되었습니다.' });
        }

        // 분석 수행
        const result = calculateMarathon({
            weeklyDistance: parseFloat(weeklyDistance),
            maxLSD: parseFloat(maxLSD),
            halfTimeMinutes: parseFloat(halfTimeMinutes),
            goalFullMinutes: parseFloat(goalFullMinutes),
            painLevel: parseFloat(painLevel) || 0,
            sleepHours: parseFloat(sleepHours) || 7
        });

        res.json(result);
    } catch (error) {
        console.error('분석 오류:', error);
        res.status(500).json({ error: '분석 중 오류가 발생했습니다.' });
    }
});

// 기존 일반 분석 엔드포인트 (유지)
router.post('/analyze', (req, res) => {
    try {
        const { sport, currentRecord, weeklyDistance, fatigue, weight, heartRate } = req.body;

        // 유효성 검사
        if (!sport) {
            return res.status(400).json({ error: '종목을 선택해주세요.' });
        }

        if (currentRecord === undefined || currentRecord === null) {
            return res.status(400).json({ error: '기록을 입력해주세요.' });
        }

        // 여기에 기존 분석 로직을 추가
        res.json({ 
            message: '일반 분석 기능은 여기에 구현할 수 있습니다.',
            probability: 0,
            risk: 0
        });
    } catch (error) {
        console.error('분석 오류:', error);
        res.status(500).json({ error: '분석 중 오류가 발생했습니다.' });
    }
});

// 레이스 기록 조회 엔드포인트
router.get('/records', (req, res) => {
    const records = {
        '5k': 35,
        '10k': 60,
        'half': 100,
        'full': 200,
        'trail_21': 120,
        'trail_42': 240
    };
    res.json(records);
});

module.exports = router;
