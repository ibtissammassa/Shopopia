<template>
    <div class="flex ">
        <div v-if="show.sidebar" class=" w-1/3 px-8 pt-5 border-r flex flex-col gap-y-2">
            <div v-if="show.collections" class="flex flex-col gap-y-3">
                <h3 class="font-bold text-lg">{{ titles.collections }}</h3>
                <div v-if="collections" class="flex flex-col gap-y-2">
                   <div v-for="(item, i) in collections" :key="i"  :class="!item.parent ? 'block' : 'hidden'">
                        <div class="flex items-center">
                            <input class="w-4 h-4 mx-1" :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(item.slug) >= 0" @change="setParams($event, 'collections.slug-in', item.slug)" :id="item.slug" type="checkbox"/>
                            <label class="cursor-pointer text-sm capitalize text-gray-800" :for="item.slug">{{ item.name }}</label>
                        </div>
                        <div v-if="item.childrens.length >0">
                            <div v-for="(child, i) in getChildrens(item.childrens)" :key="i">
                                <div class="flex items-center">
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
                <div v-if="filters && filters.sizes" class="grid grid-cols-5">
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
                <div v-if="filters && filters.colors" class="grid grid-cols-6">
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

        <div class="lg:px-4 py-3 flex flex-col w-full">
            <div class="flex flex-col gap-y-2">
                <h4 class="text-sm pt-2 text-gray-900"><nuxt-link to="/">Home</nuxt-link> / <nuxt-link to="/shop" class="text-gray-500">Products</nuxt-link></h4>
                <div v-if="products">
                    <div v-if="products.length>0" class="grid md:grid-cols-3 grid-cols-2">
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
            products:[],
            collections:[],
            brands: [],
            filters: null,
            query: {},
            param: [],
            params: {search: this.$route.query.search, 'collections.slug-in': [], sort: { createdAt: -1 } },
            lastParams: {search: this.$route.query.search, 'collections.slug-in': [], sort: { createdAt: -1 } },
        }
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
            let filter={}
            filter['_id'] = childrensIds.map(c=>c);
            try{
                let childrens={};
                const { data } = await this.$storeino.collections.search(filter);
                childrens = data.results;
                return childrens;
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