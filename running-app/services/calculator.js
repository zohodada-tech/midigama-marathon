// 러닝 분석 서비스
const calculateMarathon = (data) => {
    const { weeklyDistance, maxLSD, halfTimeMinutes, goalFullMinutes, painLevel, sleepHours } = data;

    // 1. 체력 점수 (40점 만점)
    const enduranceScore = Math.min((weeklyDistance / 50) * 40, 40);

    // 2. LSD 점수 (20점 만점)
    const lsdScore = Math.min((maxLSD / 30) * 20, 20);

    // 3. 예상 풀 기록 계산
    const predictedFull = halfTimeMinutes * 2.1;
    const ratio = goalFullMinutes / predictedFull;

    // 4. paceScore 점수 (25점 만점)
    let paceScore = 0;
    if (ratio >= 1.05) paceScore = 25;
    else if (ratio >= 1.0) paceScore = 20;
    else if (ratio >= 0.95) paceScore = 15;
    else paceScore = 10;

    // 5. 부상 감점
    let deduction = painLevel * 2;
    if (sleepHours < 6) deduction += 5;

    // 6. 총 점수 계산
    const totalScore = enduranceScore + lsdScore + paceScore - deduction;

    // 7. 완주 확률 계산
    const completionProbability = Math.max(
        Math.min((totalScore / 85) * 100, 100),
        0
    );

    // 8. 붕괴 확률 계산
    let collapseProbability = 25;
    if (maxLSD < 25) collapseProbability += 20;
    if (ratio < 1.0) collapseProbability += 15;
    if (weeklyDistance < 35) collapseProbability += 15;

    return {
        completionProbability: Math.round(completionProbability),
        collapseProbability: Math.min(collapseProbability, 95),
        predictedFull: Math.round(predictedFull)
    };
};

module.exports = { calculateMarathon };
