/**
 *   Base64字符串转 file
 */
function dataURLtoFile(base64) {
  let dataurl, mime;
  dataurl = base64.replace(/^data:.*;base64,/, "");
  mime = base64.match(/^data:(.*);/)[1];

  let bstr = atob(dataurl);

  let bl = bstr.length;

  let u8arr = new Uint8Array(bl);
  while (bl--) {
    u8arr[bl] = bstr.charCodeAt(bl);
  }
  return new Blob([u8arr], { type: mime });
}
export default dataURLtoFile;
