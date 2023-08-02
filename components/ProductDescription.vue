<template>
  <div>
        <div v-if="product.html.length>0" class="text-gray-900 rounded-md text-base gap-y-2 flex flex-col" v-html="product.html"></div>
        <div v-else class="flex justify-center items-center flex-col py-7">
            <p class="text-xl text-gray-800">No Description</p>
        </div>
        <AppLoader placement="AFTER_DESCRIPTION"></AppLoader>
  </div>
</template>

<script>
export default {
    props:['product'],

}
</script>

<style>

</style>