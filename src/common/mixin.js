import BackTop from "components/content/backTop/BackTop.vue"
export const backTopMixin = {
    data() {
        return {
            isShowBackTop: "false",
        }
    },
    components: {
        BackTop,
    },
    methods: {
        backClick() {
            // 拿到scroll组件对象,就可以访问该组件对象里面的数据和方法
            //this.$refs.scroll拿到scroll组件
            //this.$refs.scroll.scroll拿到scroll组件里new BScroll()得到的对象
            //该对象下有一个scrollTo(x坐标，y坐标，时间(多少ms返回顶部))方法
            //this.$refs.scroll.scroll.scrollTo(0, 0, 500)

            //这样写是因为在Scroll.vue组件里已经封装了一个scrollTo方法
            this.$refs.scroll.scrollTo(0, 0, 500);
        }
    }
};
