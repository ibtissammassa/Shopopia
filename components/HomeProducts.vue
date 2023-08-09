<template>
  <div  class="lg:px-10 px-6 py-7 gap-y-7 flex flex-col justify-center">
    <h2 class="text-2xl md:text-3xl font-bold">{{ title }}</h2>
    <div class="grid lg:grid-cols-4 gap-1 md:grid-cols-3 grid-cols-1">
        <productCard v-for="item in items" :key="item.id" :item="item"/>
    </div>
  </div>
</template>

<script>
export default {
    props:['title','items'],
}
</script>

<style>

</style>