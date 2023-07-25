<template>
  <div class="px-16 py-8 flex flex-col">
    <h3 class="text-2xl pb-3 font-bold">{{ title }}</h3>
    <hr>
    <div v-if="items">
        <div class="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3" v-if="items.length">
            <productCard v-for="item in items" :key="item.id" :item="item"/>
        </div>
        <div v-else class="flex justify-center items-center flex-col py-16">
            <p class="text-2xl text-gray-800">{{ empty }}</p>
        </div>
    </div>
    <loading v-else/>
    <div class="flex justify-between">
        <nuxt-link v-if="showBackToShop" to="/products">
            <button class="my-2 hover:bg-slate-300 hover-color-primary hover:border-slate-300 ease-in duration-400 w-32 text-white font-bold border-secondary text-sm py-2 px-2.5 border-2 rounded-full bg-secondary">
                {{ backToShop }}
            </button>
        </nuxt-link>
        <button v-if="items && items.length>0" @click.stop="addAllToCart" class="my-2 hover-bg-secondary ease-in duration-400 w-32 text-white font-bold border-white text-sm py-2.5 px-2.5 border-2 rounded-full bg-primary flex">
            <svg fill="white" width="30" height="20" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="cart"><path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z"></path></svg>
            <div>{{ addToCart }}</div>
        </button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            items: null,
            title: this.$settings.wishlist.text.title,
            empty: this.$settings.wishlist.text.empty,
            backToShop: this.$settings.wishlist.text.backToShop,
            showBackToShop: this.$settings.wishlist.show.backToShop,
            showAddToCart: this.$settings.wishlist.show.addToCart,
            addToCart: this.$settings.wishlist.text.addToCart
        }
    },
    methods:{
        addAllToCart(){
            for(const item of this.items){
                let cartItem ={
                    _id : item._id,
                    quantity : item.quantity.value ? item.quantity.value : item.quantity.default,
                    price : item.price.salePrice,
                }
                this.$tools.call('ADD_TO_CART', cartItem);
                this.$tools.call('REMOVE_FROM_WISHLIST', item);
            }
            setTimeout(() => {
                window.location.href = '/cart';
            }, 200);
        }
    },
    async fetch(){
        const ids = this.$store.state.wishlist.map(item => item._id);
        if(ids.length > 0){
                try{
                    const {data} = await this.$storeino.products.search({ '_id-in': ids});
                    this.items = [];
                    this.items = data.results;
                }catch(e){
                    console.log({e});
                }
            }else{
               this.items = []; 
            }    
    },
    watch:{
        async "$store.state.wishlist.length"(){
           this.$fetch();
        },
    },
}
</script>

<style>

</style>