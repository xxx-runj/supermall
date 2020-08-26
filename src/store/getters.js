export default {
    cartLength(state) {
        return state.cartList.length;
    },
    cartList(state) {
        return state.cartList;
    },
    allIn(state) {
        return state.isAllIn;
    },
    checkedLength(state) {
        state.cartList.filter(item => {
            return item.checked;
        }).length;
    }
};
