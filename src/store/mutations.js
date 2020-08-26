export default {
    countAddOne(state, payload) {
        payload.count++;
    },
    addNewToCart(state, payload) {
        payload.checked = false;
        state.cartList.push(payload);
    },
    checkedClick(state, payload) {
        let count = 0;
        for (let item of state.cartList) {
            if (item.iid === payload.iid) {
                item.checked = !item.checked;                
            }
            if (item.checked) {
                count++
            }
        }
        state.isAllIn = (count == state.cartList.length);
    },
    allInCheck(state) {
        //如果购物车有商品，才可以选中全选按钮
        if (state.cartList.length) {
            state.isAllIn = !state.isAllIn;
            if (state.isAllIn) {
                for (let item of state.cartList) {
                    item.checked = true;
                }
            } else {
                for (let item of state.cartList) {
                    item.checked = false;
                }
            }
        }               
    }
};
