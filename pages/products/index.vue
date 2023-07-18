<template>
    <div class="px-16 py-8 flex flex-col">
        <div class="flex flex-row justify-evenly">
            <nuxt-link :to="`/shop/${item.slug}`" v-for="item in categories" :key="item.id" class=" text-center hover-bg-primary hover-color-white ease-in duration-300 w-28 text-black font-semibold bg-gray-200 border-gray-300 text-sm py-2.5 px-0.5 border rounded-full mb-4">
                {{item.name}}
            </nuxt-link>
        </div>
        <h2 class="text-2xl font-bold pl-6 mt-5">{{ title }}</h2>
        <div class="grid grid-cols-4">
            <productCard v-for="item in products" :key="item.id" :item="item"/>
        </div>
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
        this.categories = await this.getCategories();
    },
    methods: {
        async getProducts(filter){
          try{
            const { data } = await this.$storeino.products.search(filter)
            return data.results
          }catch(e){
            console.log({e});
          }
        },
        async getCategories(){
            try{
                const { data } = await this.$storeino.collections.search()
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