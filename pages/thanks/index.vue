<template>
  <div class="flex flex-col justify-center items-center gap-y-5 py-14">
    <h1 class="text-8xl font-bold text-gray-800">{{ title }}</h1>
    <p class="text-gray-800">{{ description }}</p>
    <nuxt-link to="/shop">
            <button class="my-2 hover-bg-secondary ease-in duration-400 w-32 text-white font-bold border-white text-sm py-2.5 px-2.5 border-2 rounded-full bg-primary">
                {{ backToShop }}
            </button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
    data(){
        return{
            title : this.$settings.thanks.title,
            description: this.$settings.thanks.description,
            backToShop: this.$settings.thanks.backToShop
        }
    }
}
</script>

<style>

</style>