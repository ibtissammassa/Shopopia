<template>
  <div v-if="item" class="pt-16 pb-10 px-6 md:px-16 lg:px-10 gap-y-9 flex flex-col justify-center">
    <h2 class="text-2xl md:text-3xl font-bold">{{ item.name }} :</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-x-5 justify-center">
      <Category v-for="item in items" :key="item.id" :item="item"/>
    </div>
  </div>
  <loading v-else/>
</template>

<script>
export default {
    data() {
        return {
            items: [],
            item: null,
        }
    },
    async fetch(){
        this.items = [];
        try{
            const { data } = await this.$storeino.collections.get({ slug: this.$route.params.slug});
            this.item = data;
            const { data : { results } } = await this.$storeino.collections.search({ parent: data._id });
            this.items = results;
        }catch(e){
            console.log({e});
        }
    },
}
</script>

<style>

</style>