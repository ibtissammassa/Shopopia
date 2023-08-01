<template>
  <div class="px-10 py-8">
    <h3 class="text-2xl pb-3 font-bold">{{ title }}</h3>
    <hr>
    <div v-if="items">
        <div v-if="items.length>0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6">
            <postCart v-for="item in items" :key="item.id" :item="item"/>
        </div>
        <div v-else class="flex justify-center items-center flex-col gap-y-3 py-16">
          <p class="text-sm text-gray-600">{{ emptyText }}</p>
      </div>
    </div>
    <loading v-else/>
    <fromShop v-if="showProducts"/>
  </div>
</template>

<script>
export default {
    data(){
        return{
            items: null,
            title: this.$settings.blog.title,
            emptyText: this.$settings.blog.emptyText,
            showProducts: this.$settings.blog.show.products
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