/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
                             } = {}) {
  return {
    totalWeek: 19,
    startSemester: '',
    startWithSunday: false,
    showWeekend: true,
    forenoon: 4,
    afternoon: 4,
    night: 2,
    sections: [
      {
        section: 1,
        startTime: '08:05',
        endTime: '08:50',
      },
      {
        section: 2,
        startTime: '09:00',
        endTime: '09:45',
      },
      {
        section: 3,
        startTime: '10:00',
        endTime: '10:45',
      },
      {
        section: 4,
        startTime: '10:55',
        endTime: '11:40',
      },
      {
        section: 5,
        startTime: '14:25',
        endTime: '15:10',
      },
      {
        section: 6,
        startTime: '15:20',
        endTime: '16:05',
      },
      {
        section: 7,
        startTime: '16:15',
        endTime: '17:00',
      },
      {
        section: 8,
        startTime: '17:10',
        endTime: '17:55',
      },
      {
        section: 9,
        startTime: '19:30',
        endTime: '20:15',
      },
      {
        section: 10,
        startTime: '20:25',
        endTime: '21:10',
      },
    ],
  }

}