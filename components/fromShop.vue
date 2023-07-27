<template>
    <div class="mt-14">
        <h2 class="text-2xl font-bold mb-2 pl-8">From Shop :</h2>
        <div class="grid md:grid-cols-4 grid-cols-2">
            <ProductCard v-for="item in products" :key="item.id" :item="item"/> 
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            products: [],
        }
    },
    async fetch(){
        try{
                const { data } = await this.$storeino.products.search({limit: 4});
                this.products = data.results;
            }catch(e){
                console.log({e});
            }
    }
}
</script>

<style>

</style>