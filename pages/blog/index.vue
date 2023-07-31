<template>
  <div class="px-10 py-8">
    <h3 class="text-2xl pb-3 font-bold">Our Blog :</h3>
    <hr>
    <div v-if="items" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-4">
        <postCart v-for="item in items" :key="item.id" :item="item"/>
    </div>
    <loading v-else/>
    <fromShop/>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard.vue';
export default {
  components: { ProductCard },
    data(){
        return{
            items: null
        }
    },
    async fetch(){
        try{
                const params = { type: 'POST' };
                const { data } = await this.$storeino.pages.search(params);
                this.items = [];
                this.items = data.results;
            }catch(e){
                console.log({e});
            }
    }
}
</script>

<style>

</style>