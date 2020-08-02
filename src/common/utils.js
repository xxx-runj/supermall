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