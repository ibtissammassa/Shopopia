<template>
  <div>
    <BannerHome/>
    <HomeCategories/>
    <HomeProducts v-if="showProducts1" :title="title1" :items="items1"/>
    <HomeProducts v-if="showProducts2" :title="title2" :items="items2"/>
    <HomeProducts v-if="showProducts3" :title="title3" :items="items3"/>
    <HomeProducts v-if="showProducts4" :title="title4" :items="items4"/>
    <HomePosts v-if="showPosts" :title="titlepost" :items="posts" />
    <HomeServices v-if="showServices"/>
  </div>
</template>

<script>
  export default {
    data(){
        return{
            showProducts1: this.$settings.home.show.products1,
            title1: this.$settings.home.products1.title,
            showProducts2: this.$settings.home.products2.title,
            title2: this.$settings.home.products2.title,
            showProducts3: this.$settings.home.products3.title,
            title3: this.$settings.home.products3.title,
            showProducts4: this.$settings.home.products4.title,
            title4: this.$settings.home.products4.title,
            items1:[],
            items2:[],
            items3:[],
            items4:[],
            posts:[],
            showPosts: this.$settings.home.show.posts,
            titlepost: this.$settings.home.posts.title,
            showServices: this.$settings.home.show.services
        }
    },
    async fetch(){
      const filter = { status: 'PUBLISH',limit: 4 };
      
        if(this.$settings.home.products1.collections.length > 0){
          filter['collections._id-in'] = this.$settings.home.products1.collections.map(c=>c._id);
          this.items1 = await this.getProducts(filter);
        }else if(this.$settings.home.products1.products.length > 0){
            this.items1 = this.$settings.home.products1.products;
        }else{
            this.items1 = await this.getProducts(filter);
        }

        if(this.$settings.home.products2.collections.length > 0){
          filter['collections._id-in'] = this.$settings.home.products2.collections.map(c=>c._id);
          this.items2 = await this.getProducts(filter);
        }else if(this.$settings.home.products2.products.length > 0){
          this.items2 = this.$settings.home.products2.products;
        }else{
          this.items2 = await this.getProducts(filter);
        }

        if(this.$settings.home.products3.collections.length > 0){
          filter['collections._id-in'] = this.$settings.home.products3.collections.map(c=>c._id);
          this.items3 = await this.getProducts(filter);
        }else if(this.$settings.home.products3.products.length > 0){
          this.items3 = this.$settings.home.products3.products;
        }else{
          this.items3 = await this.getProducts(filter);
        }

        if(this.$settings.home.products4.collections.length > 0){
          filter['collections._id-in'] = this.$settings.home.products4.collections.map(c=>c._id);
          this.items4 = await this.getProducts(filter);
        }else if(this.$settings.home.products4.products.length > 0){
          this.items4 = this.$settings.home.products4.products;
        }else{
          this.items4 = await this.getProducts(filter);
        }

        if(this.$settings.home.posts.items.length > 0){
          this.posts = this.$settings.home.posts.items;
        }else{
          this.posts = await this.getPosts();
        }
    },
    methods: {
        async getProducts(filter){
          try{
            const { data } = await this.$storeino.products.search(filter);
            return data.results;
          }catch(e){
            console.log({e});
          }
        },
        async getPosts(){
          try{
            const { data } = await this.$storeino.pages.search({type: 'POST', limit: 3});
            return data.results;
          }catch(e){
            console.log({e});
          }
        }
    }
}
</script>

<style>
  
</style>