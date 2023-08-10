<template>
    <div class="md:flex md:flex-row grid grid-cols-3 gap-x-6">
        <nuxt-link :to="item.childrens.length > 0 ? `/collections/${item.slug}` : `/shop/${item.slug}`" v-for="item in categories" :key="item.id" :class="item.parent ? 'hidden' : 'block'">
            <div class=" text-center hover-bg-primary hover-color-white ease-in duration-300 lg:w-28 w-24 font-semibold border-gray-300 text-sm py-2.5 px-0.5 border rounded-full mb-4" :class="(category==item.slug ? 'bg-primary text-white' :'bg-gray-200 text-black')">
                {{item.name}}
            </div>
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
        const filter = { status: 'PUBLISH',};
        this.categories = await this.getCategories(filter);
    },
    methods: {
        async getCategories(filter){
            try{
                const { data } = await this.$storeino.collections.search({})
                return data.results
            }catch(e){
                console.log({e});
          }
        }
    }
}
</script>

<style>
    .text-white{
        color:white;
    }
</style>