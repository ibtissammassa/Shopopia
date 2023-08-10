<template>
    <div class="lg:px-16 py-8 flex flex-col items-center">
        <collectionsBar/>
        <div class="flex flex-col gap-y-2">
            <h2 class="md:text-2xl text-lg font-bold pl-6 mt-5">{{ title }}</h2>
            <div v-if="products.length" class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
                <productCard v-for="item in products" :key="item.id" :item="item"/>
            </div>
            <loading v-else/>
        </div>
    </div>
  
</template>

<script>
export default {
    data(){
        return{
            title: this.$settings.shop.title,
            products:[],
            categories:[],
        }
    },
    async fetch(){
        const filter = { status: 'PUBLISH'};
        this.products = await this.getProducts(filter);
    },
    watch:{
        async "$route.query.search"(){
            const filter = { status: 'PUBLISH'};
            this.products = await this.getProducts(filter);
        }
    },
    methods: {
        async getProducts(filter){
          try{
              const search = this.$route.query.search;
              console.log(search);
            if(search){
                const params = { search: search, page: 1, limit: 5 }
                const { data } = await this.$storeino.products.search(params);
                return data.results;
            }
            const { data } = await this.$storeino.products.search(filter)
            return data.results
          }catch(e){
            console.log({e});
          }
        }
    }
}
</script>

<style>

</style>