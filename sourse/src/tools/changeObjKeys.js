/**
 * @description 镜像源对象并修改键值
 *
 * @param {object} obj // 源对象
 * @param {object} keysObj // 新旧键值对照对象
 *
 * @returns {object} newObj
 *
 * @example  changeObjKeys({x:1},{x:'y'}) => ({y:1})
 */

const changeObjKeys = (obj, keysObj) =>
  Object.fromEntries(Object.entries(obj).map(ele => [keysObj[ele[0]], ele[1]]));

export default changeObjKeys;
