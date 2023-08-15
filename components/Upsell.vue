<template>
    <div class="grid md:grid-cols-4 grid-cols-2" v-if="item">
        <ProductCard v-for="product in item.products" :key="product.id" :item="product" :upsell="item"/> 
    </div>
</template>

<script>
export default {
    props:['item']
}
</script>

<style>

</style>