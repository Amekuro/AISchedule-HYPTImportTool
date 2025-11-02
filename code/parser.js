function scheduleHtmlParser(strings) {
  // 解析从 provider 获取的 JSON 字符串
  const data = JSON.parse(strings);

  /**
   * 解析周数字符串，支持单双周、范围周、不连续周
   * @param {string} weeksStr - 例如 "1-17周(单)", "1-4,6-13周", "9周"
   * @returns {number[]} - 返回周数数组
   */
  function parseWeeks(weeksStr) {
    const weeks = new Set(); // 使用 Set 避免重复周数
    // 首先移除 "周" 字，方便处理
    const cleanedStr = weeksStr.replace(/周/g, '');

    const ranges = cleanedStr.split(',');
    ranges.forEach(range => {
      let step = 1; // 默认为每周
      let weekPart = range;

      // 检查单双周
      if (range.includes('(单)')) {
        step = 2;
        weekPart = range.replace('(单)', '');
      } else if (range.includes('(双)')) {
        step = 2;
        weekPart = range.replace('(双)', '');
      }

      // 处理周数范围
      if (weekPart.includes('-')) {
        let [start, end] = weekPart.split('-').map(Number);
        // 如果是双周，确保起始周是偶数
        if (step === 2 && range.includes('(双)') && start % 2 !== 0) {
          start++;
        }
        // 如果是单周，确保起始周是奇数
        if (step === 2 && range.includes('(单)') && start % 2 === 0) {
          start++;
        }
        
        for (let i = start; i <= end; i += step) {
          weeks.add(i);
        }
      } else if (weekPart) { // 处理单个周
        weeks.add(Number(weekPart));
      }
    });
    return Array.from(weeks); // 将 Set 转换为数组
  }

  /**
   * 解析节次字符串，例如 "1-2"
   * @param {string} sectionsStr 
   * @returns {number[]}
   */
  function parseSections(sectionsStr) {
    const sections = [];
    // 移除 "节" 字（如果有的话）
    const cleanedStr = sectionsStr.replace(/节/g, '');
    const [start, end] = cleanedStr.split('-').map(Number);
    for (let i = start; i <= end; i++) {
      sections.push({ section: i });
    }
    return sections;
  }

  // 解析数据并生成最终的课程表数组
  const result = data.map(item => ({
    name: item.kcmc,
    position: item.cdmc,
    teacher: item.xm,
    weeks: parseWeeks(item.zcd),
    day: Number(item.xqj),
    sections: parseSections(item.jcs)
  }));

  // 使用 JSON 字符串去重，适用于教务系统返回完全相同的课程条目
  const uniqueResult = Array.from(new Set(result.map(JSON.stringify))).map(JSON.parse);

  return uniqueResult;
}
