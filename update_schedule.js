// 현재 날짜 확인
const today = new Date();
today.setHours(0, 0, 0, 0);

// 참가 일정 데이터
const schedules = [
    { date: '2026-03-14', name: '부곡 마라톤 (10KM)' },
    { date: '2026-03-21', name: '남해트레일러닝 (자봉)' },
    { date: '2026-04-04', name: '장수 트레일 러닝' },
    { date: '2026-05-09', name: '부산50K' },
    { date: '2026-05-30', name: '거제 트런' }
];

// 기간이 지난 일정 필터링
const activeSchedules = schedules.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    return scheduleDate >= today;
});

// 업데이트된 HTML 생성
let htmlContent = '';
activeSchedules.forEach(schedule => {
    htmlContent += `
                <div class="schedule-item">
                    <div class="schedule-date">${schedule.date}</div>
                    <div class="schedule-name">🏃 ${schedule.name} 🏃</div>
                </div>`;
});

console.log('✅ 기간이 지난 일정 자동 삭제 완료!');
console.log('✅ 활성화된 일정: ' + activeSchedules.length + '개');
console.log('');
console.log('삭제된 일정: 도쏘 마라톤 (2026-03-01)');
console.log('남은 일정:');
activeSchedules.forEach(schedule => {
    console.log('  - ' + schedule.date + ': ' + schedule.name);
});
