# 러닝 분석 서버

Node.js 기반 러닝 분석 앱

## 📁 폴더 구조

```
running-app/
├── server.js              # 메인 서버
├── package.json           # 의존성 관리
├── .gitignore             # Git 무시 파일
├── README.md              # 이 파일
├── routes/
│   └── calculate.js       # API 라우트
└── services/
    └── calculator.js      # 분석 서비스
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
cd ~/openclaw/web/running-app
npm install
```

### 2. 서버 실행

```bash
npm start
```

### 3. 개발 모드

```bash
npm run dev
```

## 🔌 API 엔드포인트

### 마라톤 분석

**POST** `/api/marathon-analyze`

**요청:**
```json
{
  "weeklyDistance": 40,
  "maxLSD": 25,
  "halfTimeMinutes": 100,
  "goalFullMinutes": 215,
  "painLevel": 3,
  "sleepHours": 7
}
```

**응답:**
```json
{
  "completionProbability": 75,
  "collapseProbability": 30,
  "predictedFull": 210
}
```

### 하프 마라톤 기록 조회

**GET** `/api/marathon-records`

**응답:**
```json
[
  {
    "halfTime": 85,
    "name": "초보 하프"
  },
  {
    "halfTime": 100,
    "name": "일반 하프"
  },
  {
    "halfTime": 115,
    "name": "상급 하프"
  },
  {
    "halfTime": 130,
    "name": "전문 하프"
  }
]
```

### 기존 일반 분석

**POST** `/api/analyze`

```json
{
  "sport": "10k",
  "currentRecord": 35,
  "weeklyDistance": 35,
  "fatigue": 5,
  "weight": 70,
  "heartRate": 160
}
```

### 레이스 기록 조회

**GET** `/api/records`

```json
{
  "5k": 35,
  "10k": 60,
  "half": 100,
  "full": 200,
  "trail_21": 120,
  "trail_42": 240
}
```

## 📊 분석 로직

### 완주 확률 (0-100%)
- **체력 점수** (40점 만점): 주간 달린 거리
- **LSD 점수** (20점 만점): 최대 LSD 거리
- **paceScore** (25점 만점): 기록 목표와 예상 기록의 비율
- **부상 감점:** 통증 수준 × 2 + 수면 시간 6시간 미만 + 5점

### 붕괴 확률 (0-95%)
- 기본: 25%
- 최대 LSD 25km 미만: +20%
- 목표 기록 > 예상 기록: +15%
- 주간 거리 35km 미만: +15%

### 예상 풀 기록 계산
```
예상 풀 기록 = 하프 기록 × 2.1
```

## 📝 파라미터 설명

### 마라톤 분석
- `weeklyDistance`: 주간 달린 거리 (km)
- `maxLSD`: 최대 LSD 거리 (km)
- `halfTimeMinutes`: 현재 하프 마라톤 기록 (분)
- `goalFullMinutes`: 목표 풀 마라톤 기록 (분)
- `painLevel`: 통증 수준 (1-10, 기본: 0)
- `sleepHours`: 수면 시간 (시간, 기본: 7)

### 일반 분석
- `sport`: 종목 (5k, 10k, half, full, trail_21, trail_42)
- `currentRecord`: 현재 기록 (분 단위)
- `weeklyDistance`: 주간 달린 거리 (km)
- `fatigue`: 피로도 (1-10)
- `weight`: 체중 (kg)
- `heartRate`: 심박수 (평균)

## 🛠️ 개발

### 프로젝트 구조

- **services/**: 비즈니스 로직
  - `calculator.js`: 분석 함수
- **routes/**: API 라우트
  - `calculate.js`: 라우트 핸들러
- **server.js**: 메인 서버

### 확장하기

1. **분석 함수 추가**: `services/calculator.js`에 새 함수 추가
2. **라우트 추가**: `routes/calculate.js`에 새 엔드포인트 추가
3. **미들웨어 추가**: `server.js`에 미들웨어 등록

## 🎯 분석 등급

### 완주 확률
- **90% 이상**: 매우 높음
- **75% 이상**: 높음
- **60% 이상:** 보통
- **60% 미만:** 낮음

### 붕괴 확률
- **30% 미만:** 낮음
- **30-60%:** 중간
- **60% 이상:** 높음

---

**made by 🦞 na-na (OpenClaw)**
