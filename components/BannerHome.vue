<template>
  <div  v-if="showBanner" class="relative bg-cover flex flex-col justify-center h-fit ">
    <div :style="$settings.home.main.background.image ? `background-image: url(${$settings.home.main.background.image.src});height: 35rem;${transformImg}` : 'height: 35rem;'"  class="w-full h-full"></div>
    <div class="w-3/4 md:w-1/2 lg:gap-y-4 flex flex-col gap-y-3 absolute " :class="$store.state.language.code=='AR' ? 'md:pr-10 pr-6' : ' pl-6 md:pl-10'" >
      <h1 :style="`color:${$settings.home.main.title.color}`" class="text-4xl lg:text-6xl font-bold leading-normal leading-title">{{ title }}</h1>
      <p :style="`color:${$settings.home.main.description.color}`" class="text-base pb-4 lg:py-5 text-gray-800 lg:text-xl leading-6 md:leading-8">{{ description }}</p>
      <nuxt-link to="/shop" :style="`background-color:${$settings.home.main.shopNow.color.bg};color:${$settings.home.main.shopNow.color.text}`" class="w-32 lg:w-40 font-bold py-2 lg:py-4 lg:px-8 rounded-full text-center">
        {{ $settings.home.main.shopNow.text }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            title: this.$settings.home.main.title.text,
            description: this.$settings.home.main.description.text,
            showBanner: this.$settings.home.show.main,
            transformImg :this.$store.state.language.code=='AR' ? `transform: scaleX(-1);` : ``

        }
    }
}
</script>

<style scoped>
    .leading-title{
      line-height: 4rem;
    }
</style>