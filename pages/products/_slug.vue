<template>
  <div class="py-6 px-10 gap-y-7 flex flex-col">
    <h4 class="pl-24 text-sm text-gray-500"><nuxt-link to="/">Home</nuxt-link> / <nuxt-link to="/products">Products</nuxt-link> / <span class="text-black">{{ item.name }}</span></h4>
    <div class="flex flex-row gap-x-14 rounded-xl items-center justify-center">
      <div class="w-2/5 bg-slate-100 rounded-xl border-slate-100 border shadow-md cursor-zoom-in">
        <img class="w-full zoom" :src="item.images[0].src" alt="">
      </div>
      <div class="flex flex-col gap-y-6 justify-center w-2/5">
        <h2 class="font-bold text-4xl">{{ item.name }}</h2>
        <p class="text-gray-700 text-sm">{{ item.seo.description }}</p>
        <hr>
        <h3 class="font-bold text-5xl">{{ item.price.salePrice }}<span class="text-sm">{{ $store.state.currency.symbol }}</span></h3>
        <hr>
        <ProductQuantity/>
        <div class="flex flex-row gap-x-4">
          <button class="my-2 hover-bg-secondary ease-in duration-400 w-32 text-white font-bold border-white text-base py-2.5 px-2.5 border-2 rounded-full bg-primary">
                  Buy Now
          </button>
          <button class="my-2 hover-bg-primary hover-color-white ease-in duration-400 w-32 text-primary font-bold border-primary text-base py-2 px-2.5 border-2 rounded-full">
                  Add to cart
          </button>
        </div>
      </div>
    </div>
    <div>
      
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            item: null,

        }
    },
    async fetch() {
        const { slug } = this.$route.params;
        try{
            const { data } = await this.$storeino.products.get({ slug })
            this.item = data;


        }catch(e){
            // Redirect to error page if product not exists
            this.$nuxt.error({ statusCode: 404, message: 'product_not_found' })
        }
    },
    watch:{
    },
    methods: {
        
    },

}
</script>

<style scoped>
  .zoom:hover{
    transform: scale(1.1);
  }
</style>