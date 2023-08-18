<template>
    <div>
        <AppLoader placement="BEFORE_FOOTER"></AppLoader>
        <footer >
            <div class="lg:px-16 px-6 py-8 flex w-full justify-between border-t bg-slate-50 border-slate-50 flex-col gap-y-5">
                <div class="flex md:flex-row gap-y-4 w-full gap-x-16 flex-col">
                    <div class="flex flex-col gap-y-6 pt-6 md:w-2/5">
                        <h1 class="font-bold text-primary text-2xl md:text-4xl">{{ $settings.footer.title }}</h1>
                        <p class="text-sm text-gray-700">{{ description }}</p>
                        <div class="flex flex-col gap-y-4">
                            <h3>{{ title }}</h3>
                            <div class="grid grid-cols-3 w-2/3 h-24 mt-4 gap-3">
                                <div :class="item.show ? 'block' : 'hidden'" v-for="item in payments" :key="item.name" class="bg-white rounded-xl border-2 flex justify-center items-center" width="58" height="40">
                                    <div>
                                        <img class="" :src="item.img">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-x-24 gap-y-1 flex-col md:flex-row">
                        <div v-if="$settings.footer.menu.menu1" class="gap-y-3 flex flex-col pt-9">
                            <h3 @click="toggleMenu(1)" class="flex gap-x-1 items-center cursor-pointer">{{ $settings.footer.menu.title1 }}<svg class="-mr-1 h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg></h3>
                            <nuxt-link :class="showmenu1?'':'hidden'" class="hover-color-primary transform" :to="item.url" v-for="item in $settings.footer.menu.menu1.items" :key="item.id">{{ item.text }}</nuxt-link>
                        </div>
                        <div v-if="$settings.footer.menu.menu2" class="gap-y-3 flex flex-col pt-9">
                            <h3 @click="toggleMenu(2)" class="flex gap-x-1 items-center cursor-pointer">{{ $settings.footer.menu.title2 }}<svg class="-mr-1 h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg></h3>
                            <nuxt-link :class="showmenu2?'':'hidden'" class="hover-color-primary transform" :to="item.url" v-for="item in $settings.footer.menu.menu2.items" :key="item.id">{{ item.text }}</nuxt-link>
                        </div>
                        <div v-if="$settings.footer.menu.menu3" class="gap-y-3 flex flex-col pt-9">
                            <h3 @click="toggleMenu(3)" class="flex gap-x-1 items-center cursor-pointer">{{ $settings.footer.menu.title3 }}<svg class="-mr-1 h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg></h3>
                            <nuxt-link :class="showmenu3?'':'hidden'" class="hover-color-primary transform" :to="item.url" v-for="item in $settings.footer.menu.menu3.items" :key="item.id">{{ item.text }}</nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="gap-y-2 flex flex-col items-center">
                    <h3>{{ titlemedia }}</h3>
                    <div class="flex justify-start gap-x-2">
                        <div v-for="item in socials" :key="item.name" class="bg-white rounded-xl border-2 flex justify-center items-center" width="7" height="7" :class="!item.url.length>0 ? 'hidden' : ''">
                            <nuxt-link class="w-2/3" :to="item.url">
                                <img class="p-1" :src="item.img">
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-primary text-white text-center py-3 text-sm">{{ $settings.footer.copyright.text }}</div>
        </footer>
        <AppLoader placement="AFTER_FOOTER"></AppLoader>
    </div>
  
</template>

<script>
export default {
    data(){
        return{
            description : this.$settings.footer.description,
            windowWidth: 0,
            showmenu1: (this.windowWidth < 768)?false:true,
            showmenu2: (this.windowWidth < 768)?false:true,
            showmenu3: (this.windowWidth < 768)?false:true,
            title: this.$settings.footer.payment.title,
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
    mounted() {
        this.getWindowWidth();
        window.addEventListener('resize', this.getWindowWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWindowWidth);
    },
    methods:{
        toggleMenu(n){
            switch (n) {
                case 1:
                    this.showmenu1 = !this.showmenu1;
                    break;
                case 2:
                    this.showmenu2 = !this.showmenu2;
                    break;
                case 3:
                    this.showmenu3 = !this.showmenu3;
                    break;
                default:break;
            }
        },
        getWindowWidth() {
            this.windowWidth = window.innerWidth;
            this.showmenu1 = (this.windowWidth < 768)?false:true;
            this.showmenu2 = (this.windowWidth < 768)?false:true;
            this.showmenu3 = (this.windowWidth < 768)?false:true;
        },
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