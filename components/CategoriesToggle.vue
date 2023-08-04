<template>
  <div class="absolute py-7 px-9 bg-white rounded-lg left-40 top-16 border shadow-lg w-2/4 z-50">
    <h3 class="text-lg pb-3 font-medium">{{ title }}</h3>
    <hr>
    <div class="grid grid-cols-2 gap-x-16 gap-y-7 py-6" v-if="items.length">
        <nuxt-link :to="`/shop/${item.slug}`" v-for="item in items" :key="item.id" class="flex bg-slate-100 items-center gap-x-5 rounded-lg overflow-hidden " :class="$store.state.language.code=='AR' ? 'flex-row-reverse' : ''">
            <img width="50" height="40" :src="item.image.src" alt="">
            <div class="">
                <h4 class="font-medium hover:text-blue-600 text-lg">{{ item.name }}</h4>
                <p class="text-xs text-gray-500">{{ item.description }}</p>
            </div>
        </nuxt-link>
    </div>
    <loading v-else/>
  </div>
</template>

<script>
export default {
    data(){
        return{
            items: [],
            title: this.$settings.header.categories.title
        }
    },
    async fetch(){
      try{
          const filter = {};
          if(this.$settings.header.collections.length > 0){
            this.items = this.$settings.header.collections;
          }else{
            const { data } = await this.$storeino.collections.search(filter)
            this.items = data.results;
          }
      }catch(e){
        console.log({e});
      }
  },
}
</script>

<style>

</style>