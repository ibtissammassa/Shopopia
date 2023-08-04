<template>
  <div class="absolute py-3 px-3 text-center bg-white w-full border shadow-lg z-50 flex flex-col gap-y-2">
        <nuxt-link :class="$route.path === `${item.url}`? 'bg-slate-300 ' : ''" v-for="item in menu.items" :key="item.id" class="hover:bg-slate-300 text-slate-800 p-3 bg-slate-100 items-center rounded-lg" :to="item.url">{{item.text}}</nuxt-link>
  </div>
</template>

<script>
export default {
    props:['toggle'],
    data(){
      return{
        menu: this.$settings.header.menu.mobile_menu,
      }
    }
}
</script>

<style>

</style>