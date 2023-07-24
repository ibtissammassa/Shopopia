<template>
    <div class="px-16 py-8 flex flex-col">
        <collectionsBar/>
        <h2 class="text-2xl font-bold pl-6 mt-5">{{ title }}</h2>
        <div class="grid grid-cols-4">
            <productCard v-for="item in products" :key="item.id" :item="item"/>
        </div>{{ $store.state.cart }}
    </div>
  
</template>

<script>
export default {
    data(){
        return{
            title: this.$settings.shop.title,
            products:[],
            categories:[]
        }
    },
    async fetch(){
        const filter = { status: 'PUBLISH'};
        this.products = await this.getProducts(filter);
    },
    methods: {
        async getProducts(filter){
          try{
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