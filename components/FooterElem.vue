<template>
    <div>
        <AppLoader placement="BEFORE_FOOTER"></AppLoader>
        <footer >
            <div class="md:px-16 px-6 py-10 flex w-full justify-between border-t bg-slate-50 border-slate-50 flex-col">
                <div class="gap-y-6 w-full md:w-1/2 flex flex-col">
                    <img class="h-16 w-44" :src="logo_src" alt="">
                    <p class="text-sm text-gray-700">{{ description }}</p>
                    <div>
                        <h3>{{ title }}</h3>
                        <div class="grid grid-cols-3 w-2/3 h-24 mt-4 gap-3">
                            <div :class="item.show ? 'block' : 'hidden'" v-for="item in payments" :key="item.name" class="bg-white rounded-xl border-2 flex justify-center items-center" width="58" height="40">
                                <div>
                                    <img class="" :src="item.img">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gap-y-3 flex flex-col">
                        <h3 @click="toggleMenu" class="flex gap-x-1 items-center cursor-pointer">Categories<svg class="-mr-1 h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg></h3>
                        <nuxt-link v-if="showmenu" class="hover-color-primary transform md:block" :to="`/shop/${item.slug}`" v-for="item in collections" :key="item.id">{{ item.name }}</nuxt-link>
                    </div>
                </div>
                <div class="gap-y-2 flex flex-col items-center">
                    <h3>{{ titlemedia }}</h3>
                    <div class="flex justify-start gap-x-2">
                        <div v-for="item in socials" :key="item.name" class="bg-white rounded-xl border-2 flex justify-center items-center" width="7" height="7" :class="!item.url.length>0 ? 'hidden' : ''">
                            <nuxt-link class="w-full" :to="item.url">
                                <img class="p-2" :src="item.img">
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-primary text-white text-center py-3">Copyright © 2023. All rights reserved. storeino.com</div>
        </footer>
        <AppLoader placement="AFTER_FOOTER"></AppLoader>
    </div>
  
</template>

<script>
export default {
    props:['logo_src'],
    data(){
        return{
            description : this.$settings.footer.description,
            showmenu: false,
            title: this.$settings.footer.payment.title,
            collections:[],
            titlemedia: this.$settings.footer.socialmedia.title,
            payments:[
                {
                    name:'Visa',
                    show:this.$settings.footer.payment.visa,
                    img:"https://storeno.b-cdn.net/stores/7-2023/1689610768197.png"
                },
                {
                    name:'Mastercard',
                    show:this.$settings.footer.payment.mastercard,
                    img:'https://storeno.b-cdn.net/stores/7-2023/1689610768175.png'
                },
                {
                    name:'Paypal',
                    show:this.$settings.footer.payment.paypal,
                    img:'https://storeno.b-cdn.net/stores/7-2023/1689610768185.png'
                },
                {
                    name:'Apple Pay',
                    show:this.$settings.footer.payment.applepay,
                    img:'https://storeno.b-cdn.net/stores/7-2023/1689610768104.png'
                },
                {
                    name:'Amazon Pay',
                    show:this.$settings.footer.payment.amazonpay,
                    img:'https://storeno.b-cdn.net/stores/7-2023/1689610536902.png'
                },
                {
                    name:'Google Pay',
                    show:this.$settings.footer.payment.googlepay,
                    img:'https://storeno.b-cdn.net/stores/7-2023/1689610768158.png'
                }
            ],
            socials:[
                {
                    name: 'facebook',
                    url:this.$settings.footer.socialmedia.url.facebook,
                    img:'https://storeno.b-cdn.net/stores/8-2023/1691061174889.png'
                },
                {
                    name: 'twitter',
                    url:this.$settings.footer.socialmedia.url.twitter,
                    img: 'https://storeno.b-cdn.net/stores/8-2023/1691061174798.png'
                },
                {
                    name: 'instagram',
                    url:this.$settings.footer.socialmedia.url.instagram,
                    img: 'https://storeno.b-cdn.net/stores/8-2023/1691061174820.png'
                },
                {
                    name: 'youtube',
                    url:this.$settings.footer.socialmedia.url.youtube,
                    img: 'https://storeno.b-cdn.net/stores/8-2023/1691061242202.png'
                },
                {
                    name: 'whatsapp',
                    url:this.$settings.footer.socialmedia.url.whatsapp,
                    img: 'https://storeno.b-cdn.net/stores/8-2023/1691061174902.png'
                },
                {
                    name: 'linkedin',
                    url:this.$settings.footer.socialmedia.url.linkedin,
                    img: 'https://storeno.b-cdn.net/stores/8-2023/1691061174914.png'
                }
            ]
        }
    },
    methods:{
        toggleMenu(){
            this.showmenu = !this.showmenu;
        }
    },
    async fetch(){
      try{
        const filter = {};
        const { data } = await this.$storeino.collections.search(filter)
        this.collections = data.results;
      }catch(e){
        console.log({e});
      }
  },
}
</script>

<style scoped>
    h3{
        font-weight: bolder;
        font-size: 1.125rem;
    }
    .transform:hover{
        transform:translate(10px, 0px)
    }
</style>