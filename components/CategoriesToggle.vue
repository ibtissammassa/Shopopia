<template>
  <div class="absolute py-7 px-9 bg-white rounded-lg left-40 top-16 border shadow-lg w-2/4 z-50">
    <h3 class="text-lg pb-3 font-medium">Our Categories</h3>
    <hr>
    <div class="grid grid-cols-2 gap-x-16 gap-y-7 py-6">
        <nuxt-link :to="`/shop/${item.slug}`" v-for="item in items" :key="item.id" class="flex bg-slate-100 items-center gap-x-5 rounded-lg overflow-hidden">
            <img width="50" height="40" :src="item.image.src" alt="">
            <div class="">
                <h4 class="font-medium hover:text-blue-600 text-lg">{{ item.name }}</h4>
                <p class="text-xs text-gray-500">{{ item.description }}</p>
            </div>
        </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            items: [],
        }
    },
    async fetch(){
      try{
        const filter = {};
        const { data } = await this.$storeino.collections.search(filter)
        this.items = data.results;
      }catch(e){
        console.log({e});
      }
  },
}
</script>

<style>

</style>