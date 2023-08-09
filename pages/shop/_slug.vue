<template>
  <div class="lg:px-16 py-8 flex flex-col items-center">
    <collectionsBar :category="slug"/>
    <h2 class="text-2xl font-bold pl-6 mt-5">{{ this.$settings.shop.title }}</h2>
    <div v-if="categories && categories.length > 0" class="pt-8 pb-10 px-6 md:px-16 lg:px-10 gap-y-5 flex flex-col justify-center">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-x-5 justify-center">
        <Category v-for="item in categories" :key="item.id" :item="item"/>
      </div>
    </div>
    <div v-else-if="products">
      <div v-if="products.length>0" class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
          <productCard v-for="item in products" :key="item.id" :item="item"/>
      </div>
      <div v-else class="flex justify-center items-center flex-col gap-y-3 py-16">
          <p class="text-xl text-gray-800">{{ $settings.shop.noProducts.title }}</p>
          <p class="text-sm text-gray-600">{{ $settings.shop.noProducts.description }}</p>
      </div>
    </div>
    <loading v-else/>
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