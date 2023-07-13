<template>
  <div>
    <component :is="'style'">
            :root{ 
              --primaryColor: {{ primaryColor }}
            }
    </component>
    <headerTop/>
    <HeaderElem/>
    <BannerHome/>
  </div>
</template>

<script>
  export default {
    data(){
        return{
            primaryColor: this.$settings.colors.primaryColor,
        }
    }
}
</script>

<style>
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    transition: .2s linear;
    }
    
  .bg-primary{
        background-color: var(--primaryColor);
  }
</style>