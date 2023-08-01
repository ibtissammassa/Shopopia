<template>
    <div>
        <div v-if="posts.length > 0" class="px-8">
            <h2 class="text-2xl font-bold mb-2 pl-8">{{ relatedTitle }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6 gap-6">
                <PostCart v-for="item in posts" :key="item.id" :item="item"/> 
            </div>
        </div>
        <div class="flex justify-center">
            <nuxt-link :to="`/blog`" class=" text-center zoom ease-in duration-300 w-28 font-semibold border-gray-300 text-sm py-2 px-1 border rounded-full mb-4 bg-gray-200 text-gray-600">
                {{ allPostsText }}
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props:['item'],
    data(){
        return{
            posts: [],
            relatedTitle: this.$settings.post.related.title,
            allPostsText: this.$settings.post.related.allPosts,
        }
    },
    async fetch(){
        try{
          const ids = this.item.categories.map(c=>c._id);
          const { data } = await this.$storeino.pages.search({
              "_id-ne": this.item._id,
              "categories._id-in": ids
            })
          this.posts = data.results
     }catch(e){
        console.log({e});
      }
    }
}
</script>

<style>

</style>