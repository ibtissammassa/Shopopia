<template>
  <div class="px-10 py-8">
    <h3 class="text-2xl pb-3 font-bold">Our Blog :</h3>
    <hr>{{ items }}
    <div>
        
    </div>
    <div v-if="items">
        
    </div>
    <loading v-else/>
    <fromShop/>
  </div>
</template>

<script>
export default {
    data(){
        return{
            items: null
        }
    },
    async fetch(){
        try{
                const { data } = await this.$storeino.pages.search({ type: 'POST' });
                console.log(data);
                this.items = [];
                this.items = data.results;
                console.log(this.items);
            }catch(e){
                console.log({e});
            }
    }
}
</script>

<style>

</style>