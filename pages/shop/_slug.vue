<template>
    <div class="flex lg:flex-row flex-col">
        <div v-if="show.sidebar && sidebar" class="lg:w-1/3 px-8 lg:pt-5 lg:border-r flex flex-col gap-y-2 w-full z-50 bg-white h-full">
            <div class="lg:hidden flex justify-between py-5 border-b mb-2">
                <div class="flex items-center gap-x-1.5">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M10 14L4 5V3h16v2l-6 9v6l-4 2z"/></g></svg>
                    <h3 class="text-lg">Filter products</h3>
                </div>
                <svg @click="sidebar=false" class="w-4 h-4 cursor-pointer" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,379.7,33,256,33z    M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8   l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76   l-75.9-75c-3.1-3.1-3.1-8.2,0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7   c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z"/></g></svg>
            </div>
            <div v-if="show.collections" class="flex flex-col gap-y-3">
                <h3 class="font-bold text-lg">{{ titles.collections }}</h3>
                <div v-if="collections" class="flex flex-col gap-y-2">
                   <div v-for="(item, i) in collections" :key="i"  :class="!item.parent ? 'block' : 'hidden'">
                        <div class="flex items-center gap-x-1">
                            <input :disabled="item.childrens.length>0 == 1" class="w-4 h-4 mx-1" :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(item.slug) >= 0" @change="setParams($event, 'collections.slug-in', item.slug)" :id="item.slug" type="checkbox"/>
                            <label class="cursor-pointer text-sm capitalize text-gray-800" :for="item.slug">{{ item.name }}</label>
                        </div>
                        <div v-if="item.childrens.length >0" class="flex flex-col gap-y-2 pl-5 py-2">
                            <div v-for="(child, i) in childrens[item.slug]" :key="i">
                                <div class="flex items-center gap-x-1">
                                    <input class="w-4 h-4 mx-1" :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(child.slug) >= 0" @change="setParams($event, 'collections.slug-in', child.slug)" :id="child.slug" type="checkbox"/>
                                    <label class="cursor-pointer text-sm capitalize text-gray-800" :for="child.slug">{{ child.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <loading v-else/>
                <hr class="my-2">
            </div>
            <div v-if="show.prices" class="flex flex-col gap-y-4">
                <h3 class="font-bold text-lg">{{ titles.prices }}</h3>
                <div v-if="filters && filters.prices" class="flex flex-col my-2" dir="ltr">
                    <priceRange @change="setParams" :min="filters.prices.min" :max="filters.prices.max" />
                </div>
                <loading v-else/>
                <hr class="my-2">
            </div>
            <div v-if="show.sizes" class="flex flex-col gap-y-4">
                <h3 class="font-bold text-lg">{{ titles.sizes }}</h3>
                <div v-if="filters && filters.sizes" class="grid lg:grid-cols-5 grid-cols-12">
                   <div v-for="(item, i) in filters.sizes" :key="i" class="flex items-center m-0.5  text-center rounded-md" :class="params['options.values.value1'] && params['options.values.value1'].indexOf(item.value1) >= 0 ? 'bg-primary text-white' : 'bg-gray-200' ">
                        <input hidden :id="item.value1" :checked="params['options.values.value1'] && params['options.values.value1'].indexOf(item.value1) >= 0" @change="setParams($event, 'options.values.value1', item.value1)" type="checkbox"/>
                        <label class="cursor-pointer px-2" :for="item.value1">{{ item.value1 }}</label>
                    </div> 
                </div>
                <loading v-else/>
                <hr class="my-2">
            </div>
            <div v-if="show.colors" class="flex flex-col gap-y-4">
                <h3 class="font-bold text-lg">{{ titles.colors }}</h3>
                <div v-if="filters && filters.colors" class="grid lg:grid-cols-6 grid-cols-12">
                    <div v-for="(item, i) in filters.colors" :key="i" class="flex items-center my-0.5 color-option" :class="params['options.values.value1'] && params['options.values.value1'].indexOf(item.value1) >= 0 ? 'active' : '' ">
                        <input hidden :id="item.value1" :checked="params['options.values.value1'] && params['options.values.value1'].indexOf(item.value1) >= 0" @change="setParams($event, 'options.values.value1', item.value1)" type="checkbox"/>
                        <label class="cursor-pointer rounded-full" :style="`background-color:${item.value2}`" :for="item.value1" :aria-label="item.value1"></label>
                    </div>
                </div>
                <loading v-else/>
                <hr class="my-2">
            </div>
            <div v-if="show.tags" class="flex flex-col gap-y-4">
                <h3 class="font-bold text-lg">{{ titles.tags }}</h3>
                <div v-if="filters && filters.tags" class="flex flex-col gap-y-1">
                    <div v-for="(tag, i) in filters.tags" :key="i" class="flex items-center px-2">
                        <input class="w-4 h-4 mx-1" :checked="params['tags-in'] && params['tags-in'].indexOf(tag) >= 0" :id="`tag_${tag}`" @change="setParams($event, 'tags-in', tag)" type="checkbox"/>
                        <label class="cursor-pointer capitalize text-gray-800 text-sm" :for="`tag_${tag}`">{{ tag }}</label>
                    </div>
                </div>
                <loading v-else/>
                <hr class="my-2">
            </div>
            <div v-if="show.brands" class="flex flex-col gap-y-4">
                <h3 class="font-bold text-lg">{{ titles.brands }}</h3>
                <div v-if="brands" class="flex flex-col gap-y-1">
                    <div v-for="(item, i) in brands" :key="i" class="flex items-center px-2">
                        <input class="w-4 h-4 mx-1" :id="item.slug" :checked="params['brand.slug-in'] && params['brand.slug-in'].indexOf(item.slug) >= 0" @change="setParams($event, 'brand.slug-in', item.slug)" type="checkbox"/>
                        <label class="cursor-pointer capitalize text-gray-800 text-sm" :for="item.slug">{{ item.name }}</label>
                    </div>
                </div>
                <loading v-else/>
                <hr class="my-2">
            </div>
        </div>

        <div class="px-4 py-3 flex flex-col lg:w-full">
            <div class="flex flex-col gap-y-2">
                <h4 class="text-sm py-2 pl-3 text-gray-900"><nuxt-link to="/">Home</nuxt-link> / <nuxt-link to="/shop" class="text-gray-500">Products</nuxt-link></h4>
                <div :class="!sidebar ? 'justify-between' : 'justify-end'" class="flex bg-slate-100 rounded-md p-3 px-5 mx-3">
                    <button v-if="!sidebar" class="text-sm flex items-center gap-x-1.5" @click="sidebar=true">
                       <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M10 14L4 5V3h16v2l-6 9v6l-4 2z"/></g></svg>
                        <p>Filter Products</p>
                    </button>
                    <button class="text-sm flex gap-x-1">
                        <p>Sort By</p>
                        <svg class="-mr-1 h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div v-if="products">
                    <div v-if="products.length>0" class="grid lg:grid-cols-3 grid-cols-2">
                        <productCard v-for="item in products" :key="item.id" :item="item"/>
                    </div>
                    <div v-else class="flex items-center flex-col gap-y-3 py-16">
                        <p class="text-xl text-gray-800">No products found</p>
                    </div>
                </div>
                <loading v-else/>
            </div>
        </div>
    </div>
  
</template>

<script>
export default {
    data(){
        return{
            titles: this.$settings.shop.sidebar.titles,
            show:this.$settings.shop.show,
            windowWidth: 0,
            sidebar:(this.windowWidth < 1024)?false:true,
            products:[],
            collections:[],
            childrens:{},
            brands: [],
            filters: null,
            query: {},
            param: [],
            params: {search: this.$route.query.search, 'collections.slug-in': [], sort: { createdAt: -1 } },
            lastParams: {search: this.$route.query.search, 'collections.slug-in': [], sort: { createdAt: -1 } },
        }
    },
    mounted() {
        this.getWindowWidth();
        window.addEventListener('resize', this.getWindowWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWindowWidth);
    },
    async fetch(){
        if(this.$route.params.slug){
            this.param = this.$route.params.slug.split(',');
            this.$route.params.slug.split(',').forEach(item => {
                this.params['collections.slug-in'].push(item);
            });
        }
        for (const key in this.$route.query) {
            if(!this.$route.query[key]) continue;
            switch (key) {
                case 'price-from': this.$set(this.params, 'price.salePrice-from', this.$route.query[key]);break;
                case 'price-to': this.$set(this.params, 'price.salePrice-to', this.$route.query[key]);break;
                case 'colors-size': this.$set(this.params, 'options.values.value1', this.$route.query[key].split(','));break;
                case 'tags': this.$set(this.params, 'tags-in', this.$route.query[key].split(','));break;
                case 'brands': this.$set(this.params, 'brand.slug-in', this.$route.query[key].split(','));break;
                case 'page': this.$set(this.params, 'page', this.$route.query[key]);break;
            }
        }
        this.lastParams = this.params;
        this.products = await this.getProducts();
        this.collections = await this.getCollections();
        this.filters = await this.getFilters();
        this.brands =  await this.getBrands();
        for (let i = 0; i < this.collections.length; i++) {
            if(this.collections[i].childrens.length>0){
                this.childrens[`${this.collections[i].slug}`] = await this.getChildrens(this.collections[i].childrens);
            }
        }
    },
    watch:{
        async "$route.query.search"(){
            this.products = await this.getProducts();
        },
        params: {
            async handler(val) {
                if(JSON.stringify(val) !== JSON.stringify(this.lastParams)){
                    this.products = await this.getProducts();
                }
            },
            deep: true
        },
    },
    methods: {
        getWindowWidth() {
            this.windowWidth = window.innerWidth;
            this.sidebar=(this.windowWidth < 1024)?false:true;
        },
        async getProducts(){
          try{
              const search = this.$route.query.search;
              console.log(search);
            if(search){
                const params = { search: search, page: 1, limit: 5 }
                const { data } = await this.$storeino.products.search(params);
                return data.results;
            }
            this.lastParams = this.$tools.copy(this.params);
            const { data } = await this.$storeino.products.search(this.params)
            return data.results
          }catch(e){
            console.log({e});
          }
        },
        async getCollections(){
            this.collections = [];
            try{
                const { data } = await this.$storeino.collections.search({});
                return data.results;
            }catch(e){
                console.log({e});
            }
        },
        async getFilters(){
            this.filters = null;
            try{
                const { data } = await this.$storeino.products.filters({});
                return data;
            }catch(e){
                console.log({e});
            }
        },
        async getBrands(){
            this.brands = [];
            try{
                const { data } = await this.$storeino.brands.search({});
                return data.results;
            }catch(e){
                console.log({e});
            }
        },
        setParams(e, key, value){
            if(key.indexOf('price') >= 0 || key.indexOf('page') >= 0){
                this.$set(this.params,key, e.target.value);
                return false;
            }else{
                if(e.target.checked) {
                    if(!this.params[key]) this.params[key] = this.$set(this.params, key, []);
                    this.params[key].push(value);
                } else {
                    this.params[key] = this.params[key].filter(item => item !== value);
                }
            }
            for (const key in this.params) {
                switch(key){
                    case 'collections.slug-in': this.param = this.params[key];break;
                    case 'price.salePrice-from': this.query['price-from'] = this.params[key];break;
                    case 'price.salePrice-to': this.query['price-to'] = this.params[key];break;
                    case 'options.values.value1': this.query['colors-size'] = this.params[key];break;
                    case 'tags-in': this.query['tags'] = this.params[key];break;
                    case 'brand.slug-in': this.query['brands'] = this.params[key];break;
                }
            }
            let url = `/shop/`;
            url += this.param.length > 0 ? [...new Set(this.param)].join(',') : '';
            for (const key in this.query) {
                url += url.indexOf('?') == -1 ? '?' : '&';
                if(typeof this.query[key] == 'object'){
                    url += `${key}=${this.query[key].join(',')}`;
                }else url += `${key}=${this.query[key]}`;
            }
            window.history.pushState({}, '', url);
        },
        async getChildrens(childrensIds){
            let filter={};
            filter['_id'] = childrensIds.map(c=>c);
            try{
                const { data } = await this.$storeino.collections.search(filter);
                return data.results;
            }catch(e){
                console.log({e});
            }
        }
    }
}
</script>

<style>
.color-option label{
    width: 24px;
    height: 24px;
    margin-left: 4px;
    margin-right: 4px;
    box-shadow: 0 0 0px 2px rgb(230, 230, 230);
}
.color-option.active label{
    color: transparent;
    box-shadow: 0 0 0px 2px white, 0 0 0px 4px var(--primaryColor);
    margin-left: 6px;
    margin-right: 6px;
    width: 20px;
    height: 20px;
}
</style>