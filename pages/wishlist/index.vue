<template>
  <div class="px-16 py-8 flex flex-col">
    <h3 class="text-2xl pb-3 font-bold">My Wishlist</h3>
    <hr>
    <div class="grid grid-cols-4" v-if="items.length">
        <productCard v-for="item in items" :key="item.id" :item="item"/>
    </div>
    <loading v-else/>
  </div>
</template>

<script>
export default {
    data(){
        return{
            items: []
        }
    },
    async fetch(){
        const ids = this.$store.state.wishlist.map(item => item._id);
        if(ids.length > 0){
                try{
                    const {data} = await this.$storeino.products.search({ '_id-in': ids});
                    this.items = data.results;
                }catch(e){
                    console.log({e});
                }
            }
    }
}
</script>

<style>

</style>