// 处理时间年月日
export const getDate = function (day: number): string {
    let dd = new Date();
    dd.setDate(dd.getDate() + day); //获取AddDayCount天后的日期
    let y = dd.getFullYear(),
        m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1), // 获取当前月份的日期，不足10补0
        d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
}

// 处理时间年月日时分秒
export const getDateTime  = function(date: Date): string {
    let year = date.getFullYear();
    let month = ('00' + (date.getMonth() + 1)).slice(-2);
    let day = ('00' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
