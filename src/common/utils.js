export function debounce(func, delay) {
    let timer = null ;//使用了闭包，所以这里的timer不会被当做垃圾回收
    return function(...args){
      if (timer){
        clearTimeout(timer)
      };
      timer = setTimeout(()=>{
        func.apply(this,args);   //这里使用箭头函数的this，指向的是上下文的this
      }, delay)
    }
}
   
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
   fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
   'M+': date.getMonth() + 1,
   'd+': date.getDate(),
   'h+': date.getHours(),
   'm+': date.getMinutes(),
   's+': date.getSeconds()
  };
  for (let k in o) {
   if (new RegExp(`(${k})`).test(fmt)) {
    let str = o[k] + '';
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
   }
  }
  return fmt;
 };

 function padLeftZero (str) {
  return ('00' + str).substr(str.length);
 };
