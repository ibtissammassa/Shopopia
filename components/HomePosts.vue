<template>
  <div class="px-10 py-7 gap-y-5 flex flex-col justify-center">
    <h2 class="text-2xl md:text-3xl font-bold">Our Posts</h2>
    <div class="grid lg:grid-cols-3 gap-6 md:grid-cols-2 grid-cols-1">
        <PostCart v-for="item in items" :key="item.id" :item="item"/>
    </div>
    <div class="flex justify-center">
        <nuxt-link :to="`/blog`" class=" text-center zoom ease-in duration-300 w-28  font-semibold border-gray-300 text-sm py-1 px-1 border rounded-full mb-4 bg-gray-200 text-gray-600">
            More Posts
        </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    props:['items']
}
</script>

<style>

</style>