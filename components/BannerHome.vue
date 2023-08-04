<template>
  <div :class="$store.state.language.code=='AR' ? 'items-end' : ''" v-if="showBanner" class="relative bg-cover text-primary flex flex-col justify-center h-fit ">
    <div :style="$store.state.language.code=='AR' ? `background-image: url(${backgroundImage});height: 35rem;transform: scaleX(-1);` : `background-image: url(${backgroundImage});height: 35rem;`" class="w-full h-full"></div>
    <div class="w-3/4 md:w-1/2 lg:gap-y-4 flex flex-col gap-y-3 absolute" :class="$store.state.language.code=='AR' ? 'items-end md:pr-16 pr-6' : ' pl-6 md:pl-10'">
      <h1 class="text-4xl lg:text-6xl font-bold leading-normal leading-title">{{ title }}</h1>
      <p class="text-base pb-4 lg:py-5 text-gray-800 lg:text-xl leading-6 md:leading-8">{{ description }}</p>
      <nuxt-link to="/products" class="w-32 lg:w-40 bg-primary hover-bg-secondary text-white font-bold py-2 lg:py-4 lg:px-8 rounded-full text-center">
        {{ $settings.home.main.shopNow }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            title: this.$settings.home.main.title,
            description: this.$settings.home.main.description,
            backgroundImage: this.$settings.home.main.background.image.src,
            showBanner: this.$settings.home.show.main
        }
    }
}
</script>

<style scoped>
    .leading-title{
      line-height: 4rem;
    }
</style>