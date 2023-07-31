<template>
  <div>
    <BannerHome/>
    <HomeCategories/>
    <HomeProducts v-if="showProducts1" :title="title1" :items="items1"/>
    <HomeProducts v-if="showProducts2" :title="title2" :items="items2"/>
    <HomePosts :items="posts" />
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
            items1:[],
            items2:[],
            posts:[]
        }
    },
    async fetch(){
      const filter = { status: 'PUBLISH',limit: 3 };
        if(this.$settings.home.products1.products.length > 0){
            this.items1 = this.$settings.home.products1.products;
        }else{
            this.items1 = await this.getProducts(filter);
        }

        if(this.$settings.home.products2.products.length > 0){
          this.items2 = this.$settings.home.products2.products;
        }else{
          this.items2 = await this.getProducts(filter);
        }

        this.posts = await this.getPosts();
    },
    methods: {
        async getProducts(filter){
          try{
            const { data } = await this.$storeino.products.search(filter)
            return data.results
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