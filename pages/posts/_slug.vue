<template>
  <div v-if="item">
    <div class="px-9 gap-y-5 py-8 flex flex-col">
      <h2 class="md:text-3xl text-lg font-bold text-center">{{ item.title }}</h2>
      <div class="w-full overflow-hidden rounded-xl h-1/4">
        <img class="object-cover w-full h-full" :src="item.image.url" alt="">
      </div>
      <div class="flex flex-col gap-y-4">
        <p class="text-gray-700 text-base">{{ item.excerpt }}</p>
        <div class="flex flex-col gap-y-4" v-html="item.content"></div>
        <div v-if="showCreator && showCreatedDate" class="flex flex-col gap-y-1">
          <p v-if="showCreator" class="font-bold">{{ creatorTitle }} {{ item.publisher.firstname }} {{ item.publisher.lastname }}</p>
          <p v-if="showCreatedDate" class="italic">{{ item.createdAt.slice(0, 10) }}</p>
        </div>
      </div>
    </div>
    <relatedPosts v-if="showRelated" :item="item"/>
  </div>
  <loading v-else/>
</template>

<script>
export default {
  data(){
    return{
      item: null,
      showRelated: this.$settings.post.show.related,
      showCreator: this.$settings.post.show.creator,
      showCreatedDate: this.$settings.post.show.date,
      creatorTitle: this.$settings.post.creator.title
    }
  },
  async fetch(){
    try {
      const { slug } = this.$route.params;
      const { data } = await this.$storeino.pages.get({ slug, type: 'POST' })
      this.item = data;
    } catch (e) {
      console.log({e});
    }
  }
}
</script>

<style>

</style>