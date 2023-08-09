<template>
  <div>
    <AppLoader placement="BEFORE_TOP_HEADER"/>
    <div class="px-10 py-2 text-sm flex flex-col gap-y-2 md:flex-row md:justify-between items-center" :style="backgroundColor.length > 1 ? `background: linear-gradient(to right,${backgroundColor}); color:${textColor}`: `background-color:${backgroundColor}; color:${textColor}`">
      <div class="flex items-center gap-x-2" v-if="showPhone">
        <svg :fill="`${textColor}`" width="13" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.314 28.323" style="enable-background:new 0 0 28.314 28.323" xml:space="preserve"><path d="m27.728 20.384-4.242-4.242a1.982 1.982 0 0 0-1.413-.586h-.002c-.534 0-1.036.209-1.413.586L17.83 18.97l-8.485-8.485 2.828-2.828c.78-.78.78-2.05-.001-2.83L7.929.585A1.986 1.986 0 0 0 6.516 0h-.001C5.98 0 5.478.209 5.101.587L.858 4.83C.729 4.958-.389 6.168.142 8.827c.626 3.129 3.246 7.019 7.787 11.56 6.499 6.499 10.598 7.937 12.953 7.937 1.63 0 2.426-.689 2.604-.867l4.242-4.242c.378-.378.587-.881.586-1.416 0-.534-.208-1.037-.586-1.415zm-5.656 5.658c-.028.028-3.409 2.249-12.729-7.07C-.178 9.452 2.276 6.243 2.272 6.244L6.515 2l4.243 4.244-3.535 3.535a.999.999 0 0 0 0 1.414l9.899 9.899a.999.999 0 0 0 1.414 0l3.535-3.536 4.243 4.244-4.242 4.242z"/></svg>
        <a :href="`tel:${phoneNumber}`">+{{ phoneNumber }}</a>
      </div>
      <div v-if="showMessage">
        <p>{{ message }}</p>
      </div>
      <div v-if="showLanguage || showCurrency" class="flex gap-x-2 py-0.5 text-xs" v-click-outside="onClickOutside">
        <toggleButton @toggle="togglelang" v-if="showLanguage" :element="language" :allelements="allLanguages" :toggle="lang" :lang="lang" :textColor="textColor" :backgroundColor="backgroundColor"/>
        <toggleButton @toggle="togglecurr" v-if="showCurrency" :element="currency" :allelements="allCurrencies" :toggle="curr"/>
      </div>
    </div>
    <AppLoader placement="AFTER_TOP_HEADER"/>
  </div>
</template>

<script>
export default {
    data() {
        return {
            phoneNumber: this.$settings.header_top.phone,
            message: this.$settings.header_top.message,
            backgroundColor: this.$settings.header_top.header_color.background,
            textColor: this.$settings.header_top.header_color.color,
            showPhone: this.$settings.header_top.show.phone,
            showMessage: this.$settings.header_top.show.message,
            showLanguage: this.$settings.header_top.show.language,
            showCurrency: this.$settings.header_top.show.currency,
            language: this.$store.state.language,
            currency: this.$store.state.currency,
            allLanguages: this.$settings.store_languages,
            allCurrencies: this.$settings.store_currencies,
            lang: false,
            curr: false
        };
    },
    methods: {
        togglelang() {
            this.lang = !this.lang;
        },
        togglecurr() {
            this.curr = !this.curr;
        },
        onClickOutside() {
            this.curr = false;
            this.lang = false;
        }
    },
    computed: {},
}
</script>

<style scoped>

</style>
