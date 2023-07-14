<template>
  <header class="flex items-center px-10 py-2 justify-between">
    <div v-if="showLogo">
        <nuxt-link to="/">
            <img :src="logo_src" class="h-16 w-44">
        </nuxt-link>
    </div>
    <div v-if="showMenu" class="flex justify-between w-3/12">
        <div v-for="item in menu" :key="item.id">
            <nuxt-link :to="item.url">{{item.text}}</nuxt-link>
        </div>
    </div>
    <SearchBar v-if="showSearch" :search_placeholder="search_placeholder"/>
    <div v-if="showAccount || showCart" class="gap-x-4 flex">
       <div v-if="showAccount">
            <nuxt-link to="/Account" class="flex items-center gap-x-1">
                <svg width="30" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="account"><path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"></path></svg>
                <div>Account</div>
            </nuxt-link>
        </div>
        <div v-if="showCart">
            <nuxt-link to="/Cart" class="flex items-center gap-x-1">
                <svg width="30" height="20" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="cart"><path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z"></path></svg>
                <div>Cart</div>
            </nuxt-link>
        </div> 
    </div>
  </header>
</template>

<script>
export default {
    data(){
        return{
            logo_src: this.$settings.header.logo.src,
            showLogo: this.$settings.header.show.logo,
            showMenu: this.$settings.header.show.menu,
            menu: this.$settings.header.menu.header_menu.items,
            showSearch: this.$settings.header.show.search,
            search_placeholder: this.$settings.header.search_placeholder,
            showAccount: this.$settings.header.show.account,
            showCart: this.$settings.header.show.cart
        }
    }
}
</script>

<style>

</style>