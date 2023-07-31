<template>
  <nuxt-link :to="`/posts/${item.slug}`" class="border-slate-100 border-2 rounded-xl cursor-pointer flex flex-col">
    <div class="w-full overflow-hidden rounded-xl h-2/4">
      <img class="zoom object-cover w-full h-full" :src="item.image.url" alt="">
    </div>
    <div class="p-3 flex flex-col gap-y-2 items-center">
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