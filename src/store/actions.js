export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // payload:新添加的商品
            //1,查找之前数组中是否有该商品，没有则返回undefined
            let findItem = context.state.cartList.find(
                item => item.iid === payload.iid
            );
            if (findItem) {
                context.commit("countAddOne", findItem);
                resolve('本商品数量加一')
            } else {
                context.commit("addNewToCart", payload);
                resolve('添加新商品到购物车成功')
            };
            
        });
    }
};
