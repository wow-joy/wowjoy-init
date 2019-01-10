/**
 * @description 从源对象中筛选出目标键值的对象
 *
 * @param {object} obj // 源对象
 * @param {array} keys // 键值列表
 *
 * @returns {object} newObj
 */
const filterKeys = (obj, keys) => {
  const newObj = {};
  keys.forEach(ele => {
    newObj[ele] = obj[ele];
  });
  return newObj;
};
export default filterKeys;
