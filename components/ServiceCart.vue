<template>
    <nuxt-link :to="item.url" class="rounded-xl border border-slate-100 bg-slate-50 shadow-sm items-center justify-center flex p-5 px-6 h-full gap-x-1.5">
        <div class="w-1/3">
            <img class="w-fit" :src="item.img" alt="">
        </div>
        <div class="flex flex-col gap-y-1">
            <h3 class="font-semibold text-sm">{{ item.title }}</h3>
            <p class="text-gray-700 text-xs">{{ item.description }}</p>
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