<template>
  <div v-if="item" class="px-9 py-6">
    <h1 class="p-2 my-3 mx-2 text-3xl font-bold">{{ item.title }}</h1>
    <hr>
    <p class="p-2 mx-2 text-lg"><small>{{ item.excerpt }}</small></p>
    <hr>
    <div class="bg-white rounded-md p-2 my-3 mx-2" v-html="item.content"></div>
    <div class="flex justify-end">
        <nuxt-link to="/products">
            <button class="my-2 hover-bg-secondary ease-in duration-400 w-32 text-white font-bold border-white text-sm py-2.5 px-2.5 border-2 rounded-full bg-primary">
                Back To Shop
            </button>
        </nuxt-link>
    </div>
  </div>
  <loading v-else/>
</template>

<script>
export default {
    data(){
        return{
            item: null
        }
    },
    async fetch(){
        try{
            const { slug } = this.$route.params;
            const { data } = await this.$storeino.pages.get({ slug, type: 'PAGE' })
            this.item = data;

            if(this.item.image){ this.$store.state.seo.image = this.item.image.url; }
        }catch(e){
            console.log({e});
            // Redirect to error page if product not exists
            this.$nuxt.error({ statusCode: 404, message: 'post_not_found' })
        }
    },
}
</script>

<style>

</style>