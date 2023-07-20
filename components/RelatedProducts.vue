<template>
  <div class="my-14">
    <h2 class="text-2xl font-bold mb-2 pl-8">Related Products</h2>
    <div class="grid grid-cols-4">
        <ProductCard v-for="item in items" :key="item.id" :item="item"/> 
    </div>
  </div>
</template>

<script>
export default {
    props:['item'],
    data(){
        return{
            items: [],
        }
    },
    async fetch(){
      try{
          const ids = this.item.collections.map(c=>c._id);
          const { data } = await this.$storeino.products.search({
              "_id-ne": this.item._id,
              "collections._id-in": ids,
              limit:8
            })
          this.items = data.results;
          if(!this.items.length){
            const { data } = await this.$storeino.products.search({status: 'PUBLISH',limit: 8});
            this.items = data.results;
          }
      }catch(e){
        console.log({e});
      }
  }
}
</script>

<style>

</style>