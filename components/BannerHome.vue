<template>
  <div :style="`background-image: url(${backgroundImage});height: 35rem;`" class="flex flex-col justify-center h-fit">
    <h1>{{ title1 }}</h1>
    <h1>{{ title2 }}</h1>
    <p>{{ description }}</p>
    <button class="w-32 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
        Shop now
    </button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            title1: this.$settings.home.main.title1,
            title2: this.$settings.home.main.title2,
            description: this.$settings.home.main.description,
            backgroundImage: this.$settings.home.main.background.image.src
        }
    }
}
</script>

<style>
    
</style>