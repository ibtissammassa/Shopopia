<template>
    <div class="flex md:items-center md:justify-between flex-col md:flex-row justify-center gap-y-3">
        <div class="flex items-center md:justify-center md:gap-x-5 justify-start gap-x-6">
            <img width="90" height="80" class="rounded-xl border bg-slate-100" :src="item.image" alt="">
            <div>
                <h4 class="font-medium text-lg lg:text-xl">{{ item.name }}</h4>
                <p class="text-gray-700 text-xs lg:text-sm">{{ item.description }}</p>
            </div>
        </div>
        <div class="flex items-center justify-between md:gap-x-10">
           <ProductQuantity :showItemsLeft="showItemsLeft" @quantitySelected="quantitySelected" :quantity="item.quantity"/>
            <div class="flex flex-col justify-center items-center">
                <h3 class="text-sm">{{ value }} x {{ item.price }} {{ $store.state.currency.symbol }}</h3>
                <h2 class="font-bold text-red-600 text-lg">{{ totalPrice }}{{ $store.state.currency.symbol }}</h2>
            </div> 
            <div>
                <svg @click="removeFromCart" class="cursor-pointer hover:fill-red-600" width="30" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z"></path></svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['item','total'],
    data(){
        return{
            showItemsLeft: false,
            totalPrice: this.item.total,
            value: this.item.quantity.value || this.item.quantity.default || 1,
        }
    },
    methods:{
        quantitySelected(quantity){
            this.item.quantity.value = quantity;
            this.value = quantity;
            this.totalPrice = this.item.price * quantity;
            let item = this.$store.state.cart.find(i => i._id == this.item._id && this.item )
            this.$tools.call('ADD_TO_CART', { ...item, quantity: quantity });
        },
        async removeFromCart(){
            this.$tools.call('REMOVE_FROM_CART', this.item);
        }
    },
}
</script>

<style>

</style>