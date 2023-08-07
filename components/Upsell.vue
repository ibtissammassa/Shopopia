<template>
  <div class="mt-4" v-if="item">
    <h2 class="text-2xl font-bold mb-2 pl-8">{{ $settings.product.upsells.title }}</h2>
    <div class="grid md:grid-cols-4 grid-cols-2">
        <ProductCard v-for="product in item.products" :key="product.id" :item="product" :upsell="item"/> 
    </div>
  </div>
</template>

<script>
export default {
    props:['item']
}
</script>

<style>

</style>