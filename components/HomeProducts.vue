<template>
  <div  class="px-10 py-7 gap-y-7 flex flex-col justify-center">
    <h2 class="text-3xl font-bold">{{ title }}</h2>
    <div class="flex justify-evenly flex-row w-full">
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