<template>
  <div class="pt-16 pb-10 px-16 lg:px-10 gap-y-9 flex flex-col justify-center">
    <h2 class="text-2xl md:text-3xl font-bold">{{ title }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 gap-x-10 lg:gap-x-5 justify-center">
      <Category v-for="item in items" :key="item.id" :item="item"/>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          showCategories: this.$settings.home.show.categories,
          title: this.$settings.home.categories.title,
          items: [],
        }
    },
    async fetch(){
      try{
          const filter = {};
          if(this.$settings.home.categories.collections.length > 0){
            this.items = this.$settings.home.categories.collections;
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

<style scoped>

</style>