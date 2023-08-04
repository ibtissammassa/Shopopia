<template>
  <div class="px-8 py-8 flex flex-col">
    <h3 class="text-2xl pb-3 font-bold">{{ title }}</h3>
    <hr>
    <div v-if="items">
        <div v-if="items.length>0" class="mt-5 flex flex-col">
            <cartItem class="mb-3 rounded-xl border-gray-300 border p-5" v-for="item in items" :key="item.id" :item="item" :total="total"/>
            <div class="flex justify-between p-5">
                <h3 class="font-bold text-2xl">Total :</h3>
                <h3 class="font-bold text-red-500 text-2xl">{{ total }}{{ $store.state.currency.symbol }}</h3>
            </div>
        </div>
        <div v-else class="flex justify-center items-center flex-col py-16">
            <p class="text-2xl text-gray-800">{{ empty }}</p>
        </div>
    </div>
    <loading v-else/>
    <div class="flex justify-between">
        <nuxt-link v-if="showBackToShop" to="/products">
            <button class="my-2 hover-bg-primary hover-color-white ease-in duration-400 w-32 text-primary font-bold border-primary text-sm py-2 px-2.5 border-2 rounded-full">
                {{ backToShop }}
            </button>
        </nuxt-link>
        <nuxt-link v-if="items && items.length>0" to="/checkout">
            <button class="my-2 hover-bg-secondary ease-in duration-400 w-32 text-white font-bold border-white text-sm py-2.5 px-2.5 border-2 rounded-full bg-primary">
                {{ checkout }}
            </button>
        </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            items: null,
            total:0,
            title: this.$settings.cart.text.title,
            empty: this.$settings.cart.text.empty,
            backToShop: this.$settings.cart.text.backToShop,
            checkout: this.$settings.cart.text.checkout,
            showBackToShop: this.$settings.cart.show.backToShop
        }
    },
    methods:{
        totalPrice(){
            this.total = this.items.reduce((total, item) => total + (item.price * item.quantity.value), 0); 
        },
    },
    watch:{
        async "$store.state.cart.length"(){
           this.$fetch();
        },
        items:{
            deep: true,
            handler(){
                this.totalPrice();
            }
        }
    },
    async fetch(){
         const ids = this.$store.state.cart.map(item => item._id);
            if(ids.length > 0){
                    try{
                        const {data} = await this.$storeino.products.search({ '_id-in': ids});
                        const products = data.results;
                        this.items = [];
                        for(const item of this.$store.state.cart){
                            const cartItem = {};
                            const product = products.find(p => p._id === item._id);
                            cartItem._id = product._id;
                            cartItem.slug = product.slug;
                            cartItem.name = product.name;
                            cartItem.price = product.price.salePrice;
                            cartItem.description = product.description;
                            cartItem.quantity = product.quantity;
                            cartItem.quantity.value = item.quantity;
                            cartItem.image = product.images.length > 0 ? product.images[0].src : '';
                            cartItem.total = cartItem.price * cartItem.quantity.value;
                            this.items.push(cartItem);
                        }
                        this.totalPrice();
                    }catch(e){
                        console.log({e});
                    }
            }else{
                this.items = [];
            }
            
    },
   
}
</script>

<style>

</style>