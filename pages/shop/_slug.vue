<template>
  <div class="px-16 py-8 flex flex-col">
    <collectionsBar :category="category"/>
    <h2 class="text-2xl font-bold pl-6 mt-5">Our {{ category }} Products !</h2>
    <div v-if="products.length>0" class="grid grid-cols-4">
        <productCard v-for="item in products" :key="item.id" :item="item"/>
    </div>
    <div v-else class="flex justify-center items-center flex-col gap-y-3 py-16">
        <p class="text-xl text-gray-800">No Product In This Category</p>
        <p class="text-sm text-gray-600">Comming Soon ...</p>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            category: this.$route.params.slug,
            products:[],
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

<style>

</style>