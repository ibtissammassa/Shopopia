<template>
  <div class="px-16 py-8 flex flex-col">
    <h3 class="text-2xl pb-3 font-bold">Shopping Cart</h3>
    <hr>
    <div v-if="items.length>0" class="mt-5 flex flex-col">
        <cartItem class="mb-3 rounded-xl border-gray-300 border p-5" v-for="item in items" :key="item.id" :item="item" :total="total"/>
        <div class="flex justify-between p-5">
            <h3 class="font-bold text-2xl">Total :</h3>
            <h3 class="font-bold text-red-500 text-2xl">{{ total }}{{ $store.state.currency.symbol }}</h3>
        </div>
    </div>
    <div v-else class="flex justify-center items-center flex-col py-16">
        <p class="text-2xl text-gray-800">Your cart is empty!</p>
    </div>
    <div class="flex justify-between">
        <nuxt-link to="/products">
            <button class="my-2 hover-bg-primary hover-color-white ease-in duration-400 w-32 text-primary font-bold border-primary text-sm py-2 px-2.5 border-2 rounded-full">
                Back To Shop
            </button>
        </nuxt-link>
        <nuxt-link v-if="items.length>0" to="/checkout">
            <button class="my-2 hover-bg-secondary ease-in duration-400 w-32 text-white font-bold border-white text-sm py-2.5 px-2.5 border-2 rounded-full bg-primary">
                Checkout
            </button>
        </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            items:[],
            total:0,
        }
    },
    methodes:{
        totalPrice(){
            this.total = this.items.reduce((total, item) => total + (item.price.salePrice * item.quantity.value), 0);
        },
    },
    watch:{
        async "$store.state.cart.length"(){
            this.totalPrice();
        },
    },
    async fetch(){
         const ids = this.$store.state.cart.map(item => item._id);
            if(ids.length > 0){
                    try{
                        const {data} = await this.$storeino.products.search({ '_id-in': ids});
                        this.items = data.results;
                        this.totalPrice();
                    }catch(e){
                        console.log({e});
                    }
            }
    },
   
}
</script>

<style>

</style>