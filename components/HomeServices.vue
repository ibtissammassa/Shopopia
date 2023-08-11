<template>
    <div class="md:px-10 px-6 py-7 gap-y-4 flex flex-col justify-center">
        <h2 class="text-2xl md:text-3xl font-bold">{{ title }}</h2>
        <div class="grid md:grid-cols-4 gap-3 grid-cols-2">
            <ServiceCart v-for="item in items" :key="item.title" :item="item"/>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title: this.$settings.home.services.title,
            items:[
                {
                    title:this.$settings.home.services.shipping.title,
                    description:this.$settings.home.services.shipping.description,
                    img:'https://storeno.b-cdn.net/stores/8-2023/1691664999638.png',
                    url:this.$settings.home.services.shipping.url
                },
                {
                    title:this.$settings.home.services.support.title,
                    description:this.$settings.home.services.support.description,
                    img:'https://storeno.b-cdn.net/stores/8-2023/1691664999590.png',
                    url:this.$settings.home.services.support.url
                },
                {
                    title:this.$settings.home.services.return.title,
                    description:this.$settings.home.services.return.description,
                    img:'https://storeno.b-cdn.net/stores/8-2023/1691664999553.png',
                    url:this.$settings.home.services.return.url,
                },
                {
                    title:this.$settings.home.services.payment.title,
                    description:this.$settings.home.services.payment.description,
                    img:'https://storeno.b-cdn.net/stores/8-2023/1691664999283.png',
                    url:this.$settings.home.services.payment.url,
                }
            ]
        }
    }
}
</script>

<style>

</style>