export const parseCookie = (cookie: string): object => {

  let result = {};
  
  // split cookies
  const cookiesArr = cookie?.split('; ');

  // split cookies values and add then to result object
  for(let i = 0; i < cookiesArr.length ; i++) {
    let arr = cookiesArr[i].split('=');
    Object.defineProperty(result, `${arr[0]}`, {value: arr[1], enumerable: true});
  }

  return result;
}