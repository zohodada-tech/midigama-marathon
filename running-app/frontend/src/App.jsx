import React, { useState } from 'react'

function App() {
    const [weeklyDistance, setWeeklyDistance] = useState('')
    const [maxLSD, setMaxLSD] = useState('')
    const [halfTimeMinutes, setHalfTimeMinutes] = useState('')
    const [goalFullMinutes, setGoalFullMinutes] = useState('')
    const [painLevel, setPainLevel] = useState('')
    const [sleepHours, setSleepHours] = useState('')

    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    weeklyDistance: parseFloat(weeklyDistance),
                    maxLSD: parseFloat(maxLSD),
                    halfTimeMinutes: parseFloat(halfTimeMinutes),
                    goalFullMinutes: parseFloat(goalFullMinutes),
                    painLevel: parseFloat(painLevel) || 0,
                    sleepHours: parseFloat(sleepHours) || 7,
                }),
            })

            if (!response.ok) {
                throw new Error('분석 실패')
            }

            const data = await response.json()
            setResult(data)
        } catch (err) {
            setError('분석 중 오류가 발생했습니다.')
        } finally {
            setLoading(false)
        }
    }

    const getCompletionColor = (probability) => {
        if (probability >= 80) return '#4CAF50'
        if (probability >= 60) return '#8BC34A'
        if (probability >= 40) return '#FFEB3B'
        return '#F44336'
    }

    return (
        <div className="app">
            <h1>🏃‍♂️ 러닝 분석 앱</h1>
            <p className="subtitle">마라톤 완주 확률 & 붕괴 리스크 분석</p>

            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>주간 달린 거리 (km)</label>
                    <input
                        type="number"
                        value={weeklyDistance}
                        onChange={(e) => setWeeklyDistance(e.target.value)}
                        required
                        placeholder="예: 40"
                    />
                </div>

                <div className="form-group">
                    <label>최대 LSD (km)</label>
                    <input
                        type="number"
                        value={maxLSD}
                        onChange={(e) => setMaxLSD(e.target.value)}
                        required
                        placeholder="예: 25"
                    />
                </div>

                <div className="form-group">
                    <label>현재 하프 기록 (분)</label>
                    <input
                        type="number"
                        value={halfTimeMinutes}
                        onChange={(e) => setHalfTimeMinutes(e.target.value)}
                        required
                        placeholder="예: 100"
                    />
                </div>

                <div className="form-group">
                    <label>목표 풀 마라톤 기록 (분)</label>
                    <input
                        type="number"
                        value={goalFullMinutes}
                        onChange={(e) => setGoalFullMinutes(e.target.value)}
                        required
                        placeholder="예: 215"
                    />
                </div>

                <div className="form-group">
                    <label>통증 수준 (1-10)</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={painLevel}
                        onChange={(e) => setPainLevel(e.target.value)}
                        placeholder="예: 3"
                    />
                </div>

                <div className="form-group">
                    <label>수면 시간 (시간)</label>
                    <input
                        type="number"
                        min="0"
                        max="24"
                        value={sleepHours}
                        onChange={(e) => setSleepHours(e.target.value)}
                        placeholder="예: 7"
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? '분석 중...' : '분석 시작'}
                </button>
            </form>

            {error && <div className="error">{error}</div>}

            {result && (
                <div className="results">
                    <h2>📊 분석 결과</h2>

                    <div className="metric-card">
                        <h3 style={{ color: getCompletionColor(result.completionProbability) }}>
                            완주 확률: {result.completionProbability}%
                        </h3>
                        <p>마라톤 완주 확률</p>
                    </div>

                    <div className="metric-card">
                        <h3 style={{ color: result.collapseProbability > 60 ? '#F44336' : '#4CAF50' }}>
                            붕괴 리스크: {result.collapseProbability}%
                        </h3>
                        <p>붕괴 가능성</p>
                    </div>

                    <div className="metric-card">
                        <h3>{result.predictedFull}분</h3>
                        <p>예상 풀 마라톤 기록</p>
                    </div>

                    {result.collapseProbability > 60 && (
                        <div className="warning">
                            ⚠️ 붕괴 리스크가 높습니다. 즉시 휴식이 필요합니다.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default App
