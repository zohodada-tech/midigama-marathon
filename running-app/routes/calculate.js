// 러닝 분석 라우트
const express = require("express");
const router = express.Router();
const { calculateMarathon } = require("../services/calculator");

// 마라톤 분석 엔드포인트
router.post("/", (req, res) => {
    try {
        const result = calculateMarathon(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Calculation failed" });
    }
});

module.exports = router;
