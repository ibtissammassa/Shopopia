<template>
  <div :style="`background-image: url(${backgroundImage});height: 35rem;`" class=" text-primary pl-10 flex flex-col justify-center h-fit">
    <div class="w-2/4 gap-y-5 flex flex-col">
      <h1 class="text-6xl font-bold leading-title">{{ title }}</h1>
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
            title: this.$settings.home.main.title,
            description: this.$settings.home.main.description,
            backgroundImage: this.$settings.home.main.background.image.src
        }
    }
}
</script>

<style scoped>
    .leading-title{
      line-height: 5rem;
    }
</style>