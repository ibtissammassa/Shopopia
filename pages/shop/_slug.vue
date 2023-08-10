<template>
  <div class="lg:px-16 py-8 flex flex-col items-center">
    <collectionsBar :category="slug"/>
    <div class="flex flex-col gap-y-2">
      <h2 class="text-2xl font-bold pl-6 mt-5">{{ this.$settings.shop.title }}</h2>
      <div v-if="products">
        <div v-if="products.length>0" class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            <productCard v-for="item in products" :key="item.id" :item="item"/>
        </div>
        <div v-else class="flex justify-center items-center flex-col gap-y-3 py-16">
            <p class="text-xl text-gray-800">{{ $settings.shop.noProducts.title }}</p>
            <p class="text-sm text-gray-600">{{ $settings.shop.noProducts.description }}</p>
        </div>
      </div>
      <loading v-else/>
    </div>
    <div v-if="$settings.shop.show.button" class="flex justify-center">
        <nuxt-link :to="`/shop`" class=" text-center zoom ease-in duration-300 w-28  font-semibold border-gray-300 text-sm py-3 px-1 border rounded-full mb-4 bg-gray-200 text-gray-600">
            {{ $settings.shop.allproducts.text }}
        </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            slug:this.$route.params.slug,
            category: null,
            products:null,
            categories: [],
        }
    },
    async fetch(){
        const { slug } = this.$route.params;
        try{
            const { data } = await this.$storeino.collections.get({ slug: this.$route.params.slug});
            this.category = data;
            if(this.category.childrens.length > 0){
              const { data : { results } } = await this.$storeino.collections.search({ parent: data._id });
              this.categories = results;
            }
        }catch(e){
            console.log({e});
          }
        this.products = await this.getProducts(this.category);
    },
    methods: {
        async getProducts(category){
          try{
            const id = category._id;
            const { data } = await this.$storeino.products.search({
                status: 'PUBLISH',
              "collections._id": id,
            })
            return data.results;
          }catch(e){
            console.log({e});
          }
        },
    }
}
</script>

<style scoped>
  .zoom:hover{
        transform: scale(1.1);
    }
</style>