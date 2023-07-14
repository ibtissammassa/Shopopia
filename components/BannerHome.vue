<template>
  <div :style="`background-image: url(${backgroundImage});height: 35rem;`" class=" text-primary pl-9 flex flex-col justify-center h-fit">
    <div class="w-2/4 gap-y-5 flex flex-col">
      <h1 class="text-6xl font-bold">{{ title1 }}</h1>
      <h1 class="text-6xl font-bold">{{ title2 }}</h1>
      <p class="py-5 text-gray-800 text-xl leading-9">{{ description }}</p>
      <button class="w-40 bg-primary hover-bg-secondary text-white font-bold py-4 px-8 rounded-full">
          Shop now
      </button>
    </div>
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