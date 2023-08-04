<template>
  <div class="lg:px-16 py-8 flex flex-col items-center">
    <collectionsBar :category="category"/>
    <h2 class="text-2xl font-bold pl-6 mt-5">Our {{ category }} Products !</h2>
    <div v-if="products">
      <div v-if="products.length>0" class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
          <productCard v-for="item in products" :key="item.id" :item="item"/>
      </div>
      <div v-else class="flex justify-center items-center flex-col gap-y-3 py-16">
          <p class="text-xl text-gray-800">No Product In This Category</p>
          <p class="text-sm text-gray-600">Comming Soon ...</p>
      </div>
    </div>
    <loading v-else/>
    <div class="flex justify-center">
        <nuxt-link :to="`/products`" class=" text-center zoom ease-in duration-300 w-28  font-semibold border-gray-300 text-sm py-3 px-1 border rounded-full mb-4 bg-gray-200 text-gray-600">
            All Products
        </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            category: this.$route.params.slug,
            products:null,
        }
    },
    async fetch(){
        const category = await this.getCategory();
        this.products = await this.getProducts(category);
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
        async getCategory(){
            const { slug } = this.$route.params;
            try{
                const { data } = await this.$storeino.collections.get({slug})
                return data;
            }catch(e){
                console.log({e});
          }
        }
    }
}
</script>

<style scoped>
  .zoom:hover{
        transform: scale(1.1);
    }
</style>