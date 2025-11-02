async function scheduleHtmlProvider() {
  // 加载工具包，必须在开头调用
  await loadTool('AIScheduleTools')

  try {
    // 弹窗让用户输入学年
    const year = await AISchedulePrompt({
      titleText: '学年',
      tipText: '请输入本学年开始的年份，例如 2024-2025 学年第一学期，请输入 2024',
      defaultText: new Date().getFullYear().toString(), // 默认为当前年份
      validator: value => {
        // 正则表达式校验是否为4位数字
        if (!/^\d{4}$/.test(value)) {
          return '请输入正确的4位数字年份'
        }
        return false // 校验通过
      }
    })

    // 弹窗让用户输入学期
    const term = await AISchedulePrompt({
      titleText: '学期',
      tipText: '请输入本学期的学期(1->上学期, 2->下学期)',
      defaultText: '1',
      validator: value => {
        if (value === '1' || value === '2') {
          return false // 校验通过
        }
        return '请输入正确的学期（1 或 2）'
      }
    })

    // 根据用户输入的学期，转换为教务系统对应的 xqm 参数
    // 1 -> 3 (上学期)
    // 2 -> 12 (下学期)
    const xqm = term === '1' ? '3' : '12'

    // 构造新的请求体
    const body = `xnm=${year}&doType=app&xqm=${xqm}&kblx=2`

    // 发送新的 fetch 请求
    const res = await fetch("https://jw.hypt.edu.cn/kbcx/xskbcxMobile_cxXsgrkb.html", {
      "headers": {
        "accept": "*/*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest"
      },
      "body": body,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });

    // 解析返回的 JSON 数据
    const ret = await res.json()

    // 检查 kbList 是否存在且为数组
    if (ret && Array.isArray(ret.kbList)) {
        // 返回 kbList 的 JSON 字符串给 parser
        return JSON.stringify(ret.kbList)
    } else {
        // 如果没有课程数据，提示用户
        await AIScheduleAlert('未获取到课程数据，请检查学年学期是否正确或是否已登录教务系统。')
        return 'do not continue'
    }

  } catch (error) {
    // 捕获请求或解析过程中的错误
    console.error(error)
    await AIScheduleAlert('导入失败，请确保你已登录教务系统并重试。')
    return 'do not continue'
  }
}
