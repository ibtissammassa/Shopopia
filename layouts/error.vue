<template>
  <div class="flex flex-col justify-center items-center gap-y-9 py-14">
    <h2 class="text-5xl font-bold text-gray-800">{{title}}</h2>
    <p class="text-gray-800">{{ description }}</p>
    <img v-if="customPicture" class="w-1/6" :src="image.src" alt="">
    <img v-else src="../assets/images/bonbon-line-error-404.png" class="w-1/6" alt="">
    <div class="flex justify-center">
        <nuxt-link to="/" class=" text-center zoom ease-in duration-300 w-28  font-semibold border-gray-300 text-sm py-3 px-1 border rounded-full mb-4 bg-gray-200 text-gray-600">
            {{ backHome }}
        </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            title:this.$settings.error.title,
            description: this.$settings.error.description,
            backHome: this.$settings.error.homeButton,
            image: this.$settings.error.picture,
            customPicture: this.$settings.error.customPicture
        }
    }
}
</script>

<style>

</style>