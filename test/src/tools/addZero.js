/**
 * @param  {number}  num
 *
 * @returns {string} 0?\d
 */
const addZero = num => {
  return num >= 10 ? String(num) : "0" + num;
};

export default addZero;
