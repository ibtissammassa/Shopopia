<template>
  <div class="px-16 py-8 flex flex-col">
    <h3 class="text-2xl pb-3 font-bold">My Wishlist</h3>
    <hr>
    <div v-if="items">
        <div class="grid grid-cols-4" v-if="items.length">
            <productCard v-for="item in items" :key="item.id" :item="item"/>
        </div>
        <div v-else class="flex justify-center items-center flex-col py-16">
            <p class="text-2xl text-gray-800">Your wishlist is empty!</p>
        </div>
    </div>
    <loading v-else/>
    <nuxt-link to="/products">
        <button class="my-2 hover-bg-primary hover-color-white ease-in duration-400 w-32 text-primary font-bold border-primary text-sm py-2 px-2.5 border-2 rounded-full">
            Back To Shop
        </button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
    data(){
        return{
            items: null,
        }
    },
    async fetch(){
        const ids = this.$store.state.wishlist.map(item => item._id);
        if(ids.length > 0){
                try{
                    const {data} = await this.$storeino.products.search({ '_id-in': ids});
                    this.items = [];
                    this.items = data.results;
                }catch(e){
                    console.log({e});
                }
            }else{
               this.items = []; 
            }    
    },
    watch:{
        async "$store.state.wishlist.length"(){
           this.$fetch();
        },
    },
}
</script>

<style>

</style>