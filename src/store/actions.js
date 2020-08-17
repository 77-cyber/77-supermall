import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      //1、查找之前的数组中是否有该商品
      let oldProduce = context.state.cartList.find(item => item.iid===payload.iid)
      if(oldProduce){
        context.commit(ADD_COUNTER,oldProduce);
        resolve('当前的商品数量+1')
      }else{
        payload.count = 1;
        //context.state.cartList.push(payload);
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
  }
}