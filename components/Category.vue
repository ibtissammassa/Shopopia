<template>
    <nuxt-link :to="item.childrens.length > 0 ? `/collections/${item.slug}` : `/shop/${item.slug}`" class="cursor-pointer overflow-hidden flex justify-center md:h-64 rounded-xl relative text-center">
        <img :src="item.image.src" class="zoom w-full rounded-2xl object-cover">
        <h4 class="font-medium text-base mt-6 absolute bg-gray-700 rounded-full p-3 px-3.5" :style="`color:${textColor}`">{{ item.name }}</h4>
    </nuxt-link>  
</template>

<script>
export default {
    props:['item'],
    data(){
        return{
            textColor: this.$settings.home.categories.textColor,
        }
    }
}
</script>

<style scoped>
    .zoom:hover{
        transform: scale(1.2);
    }
</style>