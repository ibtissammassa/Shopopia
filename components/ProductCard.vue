<template>
    <div class="p-5 cursor-pointer flex flex-col gap-y-2 w-full" >
        <div class="relative rounded-xl w-full bg-slate-100 mb-2 items-center justify-center flex h-3/4 overflow-hidden">
            <nuxt-link :to="`/products/${item.slug}`">
                <img class="zoom" :src="item.images.length > 0 ? item.images[0].src : null" alt="">
            </nuxt-link>
            <div v-if="discount" class="p-2 h-10 rounded-br-2xl flex items-center justify-center bg-red-600 text-white absolute top-0 left-0 z-10">
                <b>-{{discount.value}} {{ discount.type == 'percentage' ? '%' : this.$store.state.currency.symbol }}</b>
            </div>
            <svg v-if="$store.state.wishlist.find(i=>i._id==item._id)" @click.stop="removeFromWishlist" fill="red" class="bg-red-200 rounded-full absolute p-2 top-4 hover:bg-red-300 right-4" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512" id="heart"><path d="M349.6 64c-36.4 0-70.718 16.742-93.6 43.947C233.117 80.742 198.8 64 162.4 64 97.918 64 48 114.221 48 179.095c0 79.516 70.718 143.348 177.836 241.694L256 448l30.164-27.211C393.281 322.442 464 258.61 464 179.095 464 114.221 414.082 64 349.6 64zm-80.764 329.257l-4.219 3.873-8.617 7.773-8.616-7.772-4.214-3.869c-50.418-46.282-93.961-86.254-122.746-121.994C92.467 236.555 80 208.128 80 179.095c0-22.865 8.422-43.931 23.715-59.316C118.957 104.445 139.798 96 162.4 96c26.134 0 51.97 12.167 69.11 32.545L256 157.661l24.489-29.116C297.63 108.167 323.465 96 349.6 96c22.603 0 43.443 8.445 58.686 23.778C423.578 135.164 432 156.229 432 179.095c0 29.033-12.467 57.459-40.422 92.171-28.784 35.74-72.325 75.709-122.742 121.991z"></path></svg>
            <svg v-else @click.stop="addToWishlist" class="rounded-full absolute  bg-white p-2 top-4 hover:bg-red-300 right-4" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512" id="heart"><path d="M349.6 64c-36.4 0-70.718 16.742-93.6 43.947C233.117 80.742 198.8 64 162.4 64 97.918 64 48 114.221 48 179.095c0 79.516 70.718 143.348 177.836 241.694L256 448l30.164-27.211C393.281 322.442 464 258.61 464 179.095 464 114.221 414.082 64 349.6 64zm-80.764 329.257l-4.219 3.873-8.617 7.773-8.616-7.772-4.214-3.869c-50.418-46.282-93.961-86.254-122.746-121.994C92.467 236.555 80 208.128 80 179.095c0-22.865 8.422-43.931 23.715-59.316C118.957 104.445 139.798 96 162.4 96c26.134 0 51.97 12.167 69.11 32.545L256 157.661l24.489-29.116C297.63 108.167 323.465 96 349.6 96c22.603 0 43.443 8.445 58.686 23.778C423.578 135.164 432 156.229 432 179.095c0 29.033-12.467 57.459-40.422 92.171-28.784 35.74-72.325 75.709-122.742 121.991z"></path></svg>
        </div>
        <nuxt-link :to="`/products/${item.slug}`" class="flex justify-between font-bold relative">
            <h3 class="text-sm md:text-base ">{{ item.name }}</h3>
            <div class="flex flex-col items-center text-sm md:text-base">
                <h3 >{{ Math.floor(item.price.salePrice) }}<span class="text-sm">{{ $store.state.currency.symbol }}</span></h3>
                <span class="text-xs text-red-600 line-through" v-if="item.price.comparePrice != item.price.salePrice">
                    {{ item.price.comparePrice }}{{ $store.state.currency.symbol }}
                </span>
            </div>
        </nuxt-link>
        <p class="text-gray-700 text-xs">{{ item.seo.description }}</p>
        <button v-if="!addedToCart" @click="addToCart" class="my-2 hover-bg-primary hover-color-white ease-in duration-400 w-1/2 text-primary font-bold border-primary md:text-sm text-xs py-2 px-2.5 border-2 rounded-full items-end">
                {{ $settings.productCard.addToCart }}
        </button>
        <button v-if="addedToCart" @click.stop="removeFromCart" class="hover-color-primary my-2 bg-secondary ease-in duration-400 w-1/2 text-white font-bold md:text-sm text-xs py-2 px-2.5 border-2 rounded-full border-secondary hover:bg-slate-300">
               {{ $settings.productCard.inCart }}
        </button>
    </div>
</template>

<script>
export default {
    props:['item','upsell'],
    data(){
        return{
            addedToCart: false,
            cartItem: null,
            discount: this.upsell ? this.upsell.discount : null
        }
    },
    fetch(){
        for(const item of this.$store.state.cart){
                if(item._id === this.item._id)this.addedToCart=true;
            }
        if(this.discount){
            if(this.item.type == 'simple'){
                if(this.discount.type == 'percentage'){
                        this.item.price.salePrice = this.item.price.salePrice - (this.item.price.salePrice * this.discount.value / 100)
                        this.item.price.comparePrice = this.item.price.comparePrice
                }else{
                    this.item.price.salePrice = this.item.price.salePrice - this.discount.value
                    this.item.price.comparePrice = this.item.price.comparePrice
                }
            }
        }
    },
    watch:{
        async "$store.state.cart.length"(){
            this.$fetch();
        },
        
    },
    methods:{
        addToWishlist(){
            this.$tools.call('ADD_TO_WISHLIST', this.item);
        },
        removeFromWishlist(){
            this.$tools.call('REMOVE_FROM_WISHLIST', this.item);
        },
        addToCart(){
            let item ={
                _id : this.item._id,
                quantity : this.item.quantity.value ? this.item.quantity.value : this.item.quantity.default,
                price : this.item.price.salePrice,
            }
            this.$tools.call('ADD_TO_CART', item);
            this.$fetch();
        },
        removeFromCart(){
            this.$tools.call('REMOVE_FROM_CART', this.item);
            this.addedToCart = false;
        }
        
    }
}
</script>

<style scoped>
 
</style>