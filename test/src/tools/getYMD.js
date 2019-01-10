/**
 * @param  {date obj}  date// 日期对象
 *
 * @returns  {array} [y,m,d] // [1970,1,1]
 */
const getYMD = date => {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
};
export default { getYMD };
