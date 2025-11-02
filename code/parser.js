function scheduleHtmlParser(strings) {
  // 解析 JSON 数据
  const data = JSON.parse(strings);

  // 将周数字符串转换为数组
  function parseWeeks(weeksStr) {
    const weeks = [];
    const ranges = weeksStr.split(',');
    ranges.forEach(range => {
      // 清理非数字和破折号的字符
      const cleanedRange = range.replace(/[^\d-]/g, '');
      if (cleanedRange.includes('-')) {
        const [start, end] = cleanedRange.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          weeks.push(i);
        }
      } else {
        weeks.push(Number(cleanedRange));
      }
    });
    return weeks;
  }

  // 将节次字符串转换为数组
  function parseSections(sectionsStr) {
    const sections = [];
    const [start, end] = sectionsStr.split('-').map(Number);
    for (let i = start; i <= end; i++) {
      sections.push(i);
    }
    return sections;
  }

  // 解析数据并生成结果
  const result = data.map(item => ({
    name: item.kcmc,
    position: item.cdmc,
    teacher: item.xm,
    weeks: parseWeeks(item.zcd),
    day: Number(item.xqj),
    sections: parseSections(item.jcs)
  }));

  // 使用 JSON 字符串去重
  const uniqueResult = Array.from(new Set(result.map(JSON.stringify))).map(JSON.parse);

  return uniqueResult; // 返回处理后的结果
}