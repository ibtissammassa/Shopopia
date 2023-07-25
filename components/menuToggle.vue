<template>
  <div class="absolute py-3 px-4 bg-white rounded-lg top-16 right-10 border shadow-lg z-50 flex flex-col gap-y-3 w-2/6">
        <nuxt-link :class="$route.path === '/' ? 'bg-slate-400 text-white' : ''" to="/" class="hover:bg-slate-300 text-slate-800 p-3 bg-slate-100 items-center rounded-lg">Home</nuxt-link>
        <nuxt-link :class="$route.path === `${item.url}`? 'bg-slate-400 text-white' : ''" v-for="item in menu" :key="item.id" class="hover:bg-slate-300 text-slate-800 p-3 bg-slate-100 items-center rounded-lg" :to="item.url">{{item.text}}</nuxt-link>
  </div>
</template>

<script>
export default {
    props:['menu','toggle']
}
</script>

<style>

</style>