<template>
  <div v-if="item">
    <div class="px-9 gap-y-5 py-8 flex flex-col">
      <h2 class="md:text-3xl text-lg font-bold text-center">{{ item.title }}</h2>
      <div class="w-full px-20 py-2 overflow-hidden rounded-xl h-1/5">
        <img class="object-cover rounded-xl w-full h-full" :src="item.image.url" alt="">
      </div>
      <div class="flex flex-col gap-y-4">
        <p class="text-gray-700 text-base">{{ item.excerpt }}</p>
        <div class="flex flex-col gap-y-4" v-html="item.content"></div>
        <div v-if="showCreator && showCreatedDate" class="flex flex-col gap-y-1">
          <p v-if="showCreator" class="font-bold">{{ creatorTitle }} {{ item.publisher.firstname }} {{ item.publisher.lastname }}</p>
          <p v-if="showCreatedDate" class="italic">{{ item.createdAt.slice(0, 10) }}</p>
        </div>
      </div>
      <div class="gap-y-2 flex flex-col items-center">
          <h3 class="font-bold text-lg">Share</h3>
          <div class="flex justify-start gap-x-2">
              <div v-for="item in socials" :key="item.name" class="bg-slate-100 rounded-xl border-2 flex justify-center items-center" width="7" height="7" :class="!item.url.length>0 ? 'hidden' : ''">
                  <nuxt-link class="w-2/3" :to="item.url">
                      <img class="p-1" :src="item.img">
                  </nuxt-link>
              </div>
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
      creatorTitle: this.$settings.post.creator.title,
      socials:[
                {
                    name: 'facebook',
                    url:'https://www.facebook.com/sharer.php?u={url}',
                    img:'https://storeno.b-cdn.net/stores/8-2023/1691061174889.png'
                },
                {
                    name: 'twitter',
                    url:'https://twitter.com/intent/tweet?url={url}&text={title}',
                    img: 'https://storeno.b-cdn.net/stores/8-2023/1691061174798.png'
                },
                {
                    name: 'whatsapp',
                    url:'https://api.whatsapp.com/send?text={title}%20{url}',
                    img: 'https://storeno.b-cdn.net/stores/8-2023/1691061174902.png'
                },
                {
                    name: 'linkedin',
                    url:'https://www.linkedin.com/sharing/share-offsite/?url={url}',
                    img: 'https://storeno.b-cdn.net/stores/8-2023/1691061174914.png'
                }
            ]
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