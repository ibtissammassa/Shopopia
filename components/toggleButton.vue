<template>
  <div class="relative">
    <button @click="$emit('toggle')" type="button" :style="`background-color: ${backgroundColor}; color:${textColor}`" class="inline-flex justify-center rounded-md px-2.5 py-0.5 shadow-sm ring-1 ring-inset ring-gray-300" aria-expanded="true" aria-haspopup="true">
          {{ element.code }}
          <svg class="-mr-1 h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
        <div v-if="toggle" class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div v-for="elem in allelements" :key="elem.code" class="py-1" role="none">
            <a href="#" class="text-gray-700 block px-4 py-2 hover:bg-gray-100" role="menuitem" tabindex="-1">{{ elem.code }}</a>
          </div>
        </div>
  </div>
</template>

<script>
export default {
    props:['element','toggle','allelements'],
    methods:{
    }
}
</script>

<style>

</style>