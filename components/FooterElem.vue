<template>
  <footer >
    <div class="px-16 py-12 flex w-full justify-between border-t bg-slate-50 border-slate-50">
        <div class="gap-y-6 w-1/2 flex flex-col">
            <img class="h-16 w-44" :src="logo_src" alt="">
            <p class="text-sm text-gray-700">{{ description }}</p>
            <div>
                <h3>{{ title }}</h3>
                <div class="grid grid-cols-3 w-2/3 h-24 mt-4 gap-3">
                    <div v-for="item in payments" :key="item.name" class="bg-white rounded-xl border-2 flex justify-center items-center" width="58" height="40">
                        <div v-if="item.show">
                            <img class="" :src="item.img">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="gap-y-3 flex flex-col">
            <h3>Categories</h3>
            <nuxt-link class="hover-color-primary transform" :to="`/shop/${item.slug}`" v-for="item in collections" :key="item.id">{{ item.name }}</nuxt-link>
        </div>
        <div class="gap-y-3 flex flex-col">
            <h3>{{ titlemedia }}</h3>
            <div v-for="item in socials" :key="item.name" class="hover-color-primary transform flex">
                <a class="" :href="item.url">{{ item.name }}</a>
            </div>
        </div>
    </div>
    <div class="bg-primary text-white text-center py-3">Copyright © 2023. All rights reserved. storeino.com</div>
  </footer>
</template>

<script>
export default {
    props:['logo_src'],
    data(){
        return{
            description : this.$settings.footer.description,
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
                    
                },
                {
                    name: 'twitter',
                    url:this.$settings.footer.socialmedia.url.twitter
                },
                {
                    name: 'instagram',
                    url:this.$settings.footer.socialmedia.url.instagram
                },
                {
                    name: 'youtube',
                    url:this.$settings.footer.socialmedia.url.youtube
                },
                {
                    name: 'whatsapp',
                    url:this.$settings.footer.socialmedia.url.whatsapp
                },
                {
                    name: 'linkedin',
                    url:this.$settings.footer.socialmedia.url.linkedin
                }
            ]
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