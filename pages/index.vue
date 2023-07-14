<template>
  <div>
    <component :is="'style'">
            :root{ 
              --primaryColor: {{ primaryColor }};
              --secondaryColor: {{ secondaryColor }};
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
            secondaryColor: this.$settings.colors.secondaryColor,
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
  .text-primary{
    color: var(--primaryColor);
  }
  .hover-bg-secondary:hover{
    background-color: var(--secondaryColor);
  }
  .text-secondary{
    color: var(--secondaryColor);
  }

</style>