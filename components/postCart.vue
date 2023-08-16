<template>
  <nuxt-link :to="`/posts/${item.slug}`" class="rounded-xl cursor-pointer flex flex-col h-full">
    <div class="w-full overflow-hidden rounded-xl h-2/3">
      <img class="zoom object-cover w-full h-full" :src="item.image.url" alt="">
    </div>
    <div class="p-3 flex flex-col gap-y-2">
      <h3 class="font-bold text-lg">{{ item.title }}</h3>
      <p class="text-gray-700 text-sm">{{ item.excerpt }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props:['item']
}
</script>

<style>

</style>