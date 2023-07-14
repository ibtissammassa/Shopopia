<template>
  <div class="py-20 px-10 gap-y-9 flex flex-col justify-center">
    <h2 class="text-3xl font-bold">{{ title }}</h2>
    <div class="flex justify-evenly gap-x-7">
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