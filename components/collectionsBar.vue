<template>
    <div class="flex flex-row justify-evenly">
        <nuxt-link :to="`/shop/${item.slug}`" v-for="item in categories" :key="item.id" class=" text-center hover-bg-primary hover-color-white ease-in duration-300 w-28  font-semibold border-gray-300 text-sm py-2.5 px-0.5 border rounded-full mb-4" :class="category==item.name ? 'bg-primary text-white' :'bg-gray-200 text-black'">
            {{item.name}}
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props:['category'],
    data(){
        return{
            categories:[]
        }
    },
    async fetch(){
        const filter = { status: 'PUBLISH'};
        this.categories = await this.getCategories();
    },
    methods: {
        async getCategories(){
            try{
                const { data } = await this.$storeino.collections.search()
                return data.results
            }catch(e){
                console.log({e});
          }
        }
    }
}
</script>

<style>

</style>