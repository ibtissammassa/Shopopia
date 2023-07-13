<template>
    <component :is="'style'">
            :root{ 
              --primaryColor: {{ primaryColor }}
            }
    </component>
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
    .bg-primary{
        background-color: var(--primaryColor);
    }
</style>