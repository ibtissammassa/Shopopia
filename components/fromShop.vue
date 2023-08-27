<template>
    <div>
        <h2 class="font-bold text-lg">{{ title }}</h2>
        <div class="flex flex-col gap-y-2 py-3">
            <nuxt-link :to="`/products/${item.slug}`" v-for="item in products" :key="item.id" class="rounded-xl border-gray-300 border p-3 flex items-center lg:justify-center justify-start gap-x-5">
                <img width="60" height="60" class="rounded-xl border bg-slate-100" :src="item.images.length > 0 ? item.images[0].src : null" alt="">
                <div>
                    <h4 class="font-medium text-base">{{ item.name }}</h4>
                    <p class="text-gray-700 text-xs ">{{ item.description }}</p>
                </div>
            </nuxt-link>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            products: [],
            title: this.$settings.blog.products.title
        }
    },
    async fetch(){
        try{
                const filter = { status: 'PUBLISH',limit: 4 };
                const { data } = await this.$storeino.products.search(filter);
                this.products = data.results;
            }catch(e){
                console.log({e});
            }
    }
}
</script>

<style>

</style>