// from https://github.com/getAlby/lightning-browser-extension/blob/master/src/common/lib/utils.ts#L12
export const base64ToHex = (str: string) => {
  const hex = [];
  for (
    let i = 0, bin = atob(str.replace(/[ \r\n]+$/, ''));
    i < bin.length;
    ++i
  ) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = '0' + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join('');
};
