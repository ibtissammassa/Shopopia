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
        <Nuxt keep-alive/>
        <FooterElem/>
    </div>
</template>

<script>
export default {
    head(){
      return{
        htmlAttrs: {
                lang: this.$store.state.language.code,
                dir: this.$store.state.language.code == 'AR' ? 'rtl' : 'ltr'
            }
      }
    },
    data(){
        return{
            primaryColor: this.$settings.colors.primaryColor,
            secondaryColor: this.$settings.colors.secondaryColor,
        }
    },
    
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
  .bg-secondary{
    background-color: var(--secondaryColor);
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
  .border-primary{
    border-color: var(--primaryColor);
  }
  .border-secondary{
    border-color: var(--secondaryColor);
  }
  .zoom:hover{
        transform: scale(1.2);
  }
  .hover-bg-primary:hover{
    background-color: var(--primaryColor);
  }
  .hover-color-white:hover{
    color: white;
  }
  .hover-color-primary:hover{
    color: var(--primaryColor);
  }
  .hover-bg-white:hover{
    background-color: white;
  }
  .hover-border-primary:hover{
    border-color: var(--primaryColor);
  }
  .focus-bg-primary:focus{
    background-color: var(--primaryColor);
  }
</style>