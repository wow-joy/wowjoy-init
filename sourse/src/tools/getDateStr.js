import getYMD from "./getYMD";
import addZero from "./addZero";

/**
 * @param  {date obj}  date// 日期对象
 * @param  {string}  format @default 'yyyy-mm-dd'// 格式化
 *
 * @returns  {string} yyyy-mm-dd // 1970-01-01
 */
const getDateStr = (date, format = "yyyy-mm-dd") => {
  const [Y, M, D] = getYMD(date);
  const [yyyy, mm, dd] = [Y, addZero(M), addZero(D)];
  return format
    .replace(/yyyy/i, yyyy)
    .replace(/mm/i, mm)
    .replace(/dd/i, dd);
};

export default getDateStr;
