<template>
  <div class="py-4">
    <h4 class="text-sm pb-2 pl-10 text-gray-900"><nuxt-link to="/">Home</nuxt-link> / <nuxt-link to="/blog" class="text-gray-500">Blog</nuxt-link></h4>
    <h3 class="text-4xl px-10 font-bold">{{ title }}</h3>
    <div v-if="items" class="flex lg:flex-row-reverse flex-col">
        <div v-if="sidebar" class="lg:w-1/3 px-7 lg:pt-5 flex flex-col gap-y-2 w-full z-50 bg-white h-fit">
            <div class="lg:hidden flex justify-between items-center py-5 border-b mb-2">
                <div class="flex items-center gap-x-1.5">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M10 14L4 5V3h16v2l-6 9v6l-4 2z"/></g></svg>
                    <h3 class="text-lg">Filter posts</h3>
                </div>
                <svg @click="sidebar=false" class="w-4 h-4 cursor-pointer" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,379.7,33,256,33z    M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8   l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76   l-75.9-75c-3.1-3.1-3.1-8.2,0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7   c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z"/></g></svg>
            </div>
            <div class="flex flex-col gap-y-3">
                <h3 class="font-bold text-lg">Categories</h3>
                <div v-if="categories" class="flex flex-col gap-y-2">
                   <div v-for="(item, i) in categories" :key="i">
                        <div class="flex items-center gap-x-1">
                            <input class="w-4 h-4 mx-1" @change="setParams($event, 'collections.slug-in', item.slug)" :id="item.slug" type="checkbox"/>
                            <label class="cursor-pointer text-sm capitalize text-gray-800" :for="item.slug">{{ item.name }}</label>
                        </div>
                    </div>
                </div>
                <loading v-else/>
            </div>
            <fromShop class="py-2" v-if="showProducts"/>
        </div>
        <div class="lg:border-l px-6 lg:w-full">
            <div :class="!sidebar ? 'justify-between' : 'justify-start'" class="flex bg-slate-100 rounded-md p-3 px-5 my-5 mx-3">
                <button v-if="!sidebar" class="text-sm flex items-center gap-x-1.5" @click="sidebar=true">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M10 14L4 5V3h16v2l-6 9v6l-4 2z"/></g></svg>
                    <p>Filter Posts</p>
                </button>
                <select class="outline-none cursor-pointer bg-slate-100" v-model="params.sort">
                    <option class="p-5" v-for="(sort,i) in sorts" :key="i" :value="sort.field">{{ sort.name }}</option>
                </select>
            </div>
            <div v-if="items.length>0" class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                <postCart v-for="item in items" :key="item.id" :item="item"/>
            </div>
            <div v-else class="flex justify-center items-center flex-col gap-y-3 py-16">
              <p class="text-sm text-gray-600">{{ emptyText }}</p>
            </div>
        </div>
    </div>
    <loading v-else/>
  </div>
</template>

<script>
export default {
    data(){
        return{
            items: null,
            title: this.$settings.blog.title,
            emptyText: this.$settings.blog.emptyText,
            showProducts: this.$settings.blog.show.products,
            sidebar:(this.windowWidth < 1024)?false:true,
            categories:null,
            params: { 'categories.slug-in': [], sort: { createdAt: -1 }, type: 'POST' },
            lastParams: { 'categories.slug-in': [], sort: { createdAt: -1 }, type: 'POST' },
            sorts: [
                { field: { 'name': 1 }, name: 'name_asc' },
                { field: { 'name': -1 }, name: 'name_desc' },
                { field: { createdAt: -1 }, name: 'newest' },
                { field: { createdAt: 1 }, name: 'oldest' }
            ],
        }
    },
    mounted() {
        this.getWindowWidth();
        window.addEventListener('resize', this.getWindowWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWindowWidth);
    },
    methods:{
        getWindowWidth() {
            this.windowWidth = window.innerWidth;
            this.sidebar=(this.windowWidth < 1024)?false:true;
        },
        async getCategories(){
            this.categories = [];
            try{
                const { data } = await this.$storeino.categories.search({});
                this.categories = data.results;
            }catch(e){
                console.log({e});
            }
        },
        setParams(e, key, value){
            if(e.target.checked) {
                if(!this.params[key]) this.params[key] = this.$set(this.params, key, []);
                this.params[key].push(value);
            }else {
                this.params[key] = this.params[key].filter(item => item !== value);
            }
            switch(key){
                case 'categories.slug-in': this.param = [...new Set(...this.param, value)];break;
            }
        },
        async getItems(){
            this.items = [];
            try{
                this.lastParams = this.$tools.copy(this.params);
                const { data } = await this.$storeino.pages.search(this.params);
                this.items = data.results
            }catch(e){
                console.log({e});
            }
        },
    },
    watch: {
        params: {
            handler(val) {
                if(JSON.stringify(val) !== JSON.stringify(this.lastParams)){
                    this.getItems();
                }
            },
            deep: true
        }
    },
    async fetch(){
        await this.getItems();
        await this.getCategories();
    }
}
</script>

<style>

</style>