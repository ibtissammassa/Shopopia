<template>
  <div>
    <div></div>
  </div>
</template>

<script>
export default {
    data(){
      return{
        phone: this.$settings.header_top.phone,
        message: this.$settings.header_top.message,
        backgroundcolor : this.$settings.header_top.header_color.background,
        color: this.$settings.header_top.header_color.color,
        isPhone: this.$settings.header_top.show.phone,
        isMessage: this.$settings.header_top.show.message,
        isLanguage: this.$settings.header_top.show.language,
        isCurrency: this.$settings.header_top.show.currency
      }
    }
}
</script>

<style>

</style>