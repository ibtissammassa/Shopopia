<template>
    <nuxt-link :to="`/shop/${item.slug}`" class="cursor-pointer overflow-hidden flex justify-center md:h-64 rounded-xl relative">
        <img :src="item.image.src" class="zoom w-full rounded-2xl">
        <h4 class="text-white font-medium text-2xl mt-6 absolute">{{ item.name }}</h4>
    </nuxt-link>  
</template>

<script>
export default {
    props:['item']
}
</script>

<style scoped>
    .zoom:hover{
        transform: scale(1.2);
    }
</style>