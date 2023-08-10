<template>
  <div class="pt-9 flex flex-col gap-y-2 items-center lg:px-16">
    <collectionsBar :category="slug"/>
    <div v-if="item" class="pb-10 px-6 md:px-16 lg:px-10 gap-y-8 flex flex-col justify-center">
      <h2 class="text-2xl md:text-3xl font-bold">{{ item.name }} :</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-x-5 justify-center">
        <Category v-for="item in items" :key="item.id" :item="item"/>
      </div>
    </div>
    <loading v-else/>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items: [],
            item: null,
            slug: this.$route.params.slug
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