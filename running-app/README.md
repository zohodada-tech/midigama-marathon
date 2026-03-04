# 러닝 분석 앱

Node.js 기반 러닝 분석 앱 (백엔드 + 프론트엔드)

## 📁 폴더 구조

```
running-app/
├── server.js              # 백엔드 서버
├── package.json           # 백엔드 의존성 관리
├── .gitignore             # Git 무시 파일
├── README.md              # 이 파일
├── routes/
│   └── calculate.js       # API 라우트
├── services/
│   └── calculator.js      # 분석 서비스
└── frontend/              # 프론트엔드 React 앱
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   └── index.html
    └── src/
        ├── App.jsx        # 메인 컴포넌트
        ├── App.css
        ├── index.js       # 진입점
        └── index.css
```

## 🚀 시작하기

### 1. 백엔드 의존성 설치

```bash
cd ~/openclaw/web/running-app
npm install
```

### 2. 프론트엔드 의존성 설치

```bash
cd frontend
npm install
```

### 3. 백엔드 서버 실행

```bash
cd ..
npm start
```

서버가 3000번 포트에서 실행됩니다.

### 4. 프론트엔드 개발 서버 실행

**새로운 터미널에서 실행:**

```bash
cd frontend
npm run dev
```

프론트엔드가 5173번 포트에서 실행됩니다.
http://localhost:5173 에서 접속 가능합니다.

### 5. 프론트엔드 빌드

```bash
cd frontend
npm run build
```

빌드된 파일이 `dist/` 폴더에 생성됩니다.

## 🔌 API 엔드포인트

### 마라톤 분석

**POST** `/calculate`

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

## 📊 분석 로직

### 완주 확률 (0-100%)
- **체력 점수** (40점): 주간 달린 거리
- **LSD 점수** (20점): 최대 LSD 거리
- **paceScore** (25점): 기록 목표 비율
- **부상 감점**: 통증 수준 × 2 + 수면 감점

### 붕괴 확률 (0-95%)
- 기본: 25%
- 최대 LSD 25km 미만: +20%
- 목표 기록 > 예상 기록: +15%
- 주간 거리 35km 미만: +15%

## 🎨 프론트엔드

**기술 스택:**
- React 18
- Vite
- CSS

**기능:**
- 러닝 정보 입력 폼
- 실시간 분석 결과 표시
- 완주 확률, 붕괴 리스크 시각화
- 반응형 디자인

---

**made by 🦞 na-na (OpenClaw)**
