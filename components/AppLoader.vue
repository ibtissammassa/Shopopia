<template>
  <StoreinoAppLoader :placement="placement"/>
</template>

<script>
 import StoreinoAppLoader from '~/template-core/components/StoreinoAppLoader.vue';
 
 export default {
    props: { placement: String },
    components: { StoreinoAppLoader }
 }
</script>

<style>

</style>