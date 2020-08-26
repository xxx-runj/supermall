import Toast from "./Toast";

const obj = {};

//安装toast插件实际上就是执行导出对象的install函数
//该函数默认传入参数Vue
obj.install = function(Vue) { 
    // 1，创建组件构造器
    const toastConstructor = Vue.extend(Toast);
    //  2，根据组件构造器，可以用new创建出来一个组件对象
    const toast = new toastConstructor();
    // 3，将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    // 4，toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
};

export default obj;
