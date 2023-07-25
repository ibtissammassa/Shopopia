<template>
    <header class="relative" v-click-outside="onClickOutside">
        <div class="border-slate-200 border-b flex items-center px-10 py-2 justify-between">
            <div v-if="showLogo">
                <nuxt-link to="/">
                    <img :src="logo_src" class="h-14 w-36 lg:h-16 lg:w-44">
                </nuxt-link>
            </div>
            <div v-if="showMenu" class="justify-between w-3/12 hidden lg:flex">
                <button @click="toggleCategories" v-if="showCategories" class="flex justify-center items-center hover:border-b-2 hover:border-blue-500 py-2" :class="categories?'border-b-2 border-blue-500':''">
                    <div>Categories</div>
                    <svg class="-mr-1 h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div v-for="item in menu" :key="item.id" class="py-2">
                    <nuxt-link :to="item.url">{{item.text}}</nuxt-link>
                </div>
            </div>
            <SearchBar class="hidden lg:block" v-if="showSearch" :search_placeholder="search_placeholder"/>
            <div v-if="showWishlist || showCart" class="md:gap-x-6 gap-x-3 flex items-center">
                <div v-if="showWishlist">
                    <nuxt-link to="/wishlist" class="flex items-center justify-center gap-x-1 hover:border-b-2 hover:border-blue-500 py-2">
                        <div class="relative">
                            <svg class="font-bold" xmlns="http://www.w3.org/2000/svg" width="35" height="25" viewBox="0 0 512 512" id="heart"><path d="M349.6 64c-36.4 0-70.718 16.742-93.6 43.947C233.117 80.742 198.8 64 162.4 64 97.918 64 48 114.221 48 179.095c0 79.516 70.718 143.348 177.836 241.694L256 448l30.164-27.211C393.281 322.442 464 258.61 464 179.095 464 114.221 414.082 64 349.6 64zm-80.764 329.257l-4.219 3.873-8.617 7.773-8.616-7.772-4.214-3.869c-50.418-46.282-93.961-86.254-122.746-121.994C92.467 236.555 80 208.128 80 179.095c0-22.865 8.422-43.931 23.715-59.316C118.957 104.445 139.798 96 162.4 96c26.134 0 51.97 12.167 69.11 32.545L256 157.661l24.489-29.116C297.63 108.167 323.465 96 349.6 96c22.603 0 43.443 8.445 58.686 23.778C423.578 135.164 432 156.229 432 179.095c0 29.033-12.467 57.459-40.422 92.171-28.784 35.74-72.325 75.709-122.742 121.991z"></path></svg>
                            <div class="rounded-full bg-red-500 absolute text-white right-0 top-3 text-xs px-1">{{ $store.state.wishlist.length }}</div>
                        </div>  
                        <div class="hidden md:block">Wishlist</div>
                    </nuxt-link>
                </div>
                <div v-if="showCart">
                    <nuxt-link to="/cart" class="flex items-center gap-x-1 hover:border-b-2 hover:border-blue-500 py-2">
                        <div class="relative">
                            <svg width="30" height="25" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="cart"><path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z"></path></svg>
                            <div class="rounded-full bg-red-500 absolute text-white right-0 top-3 text-xs px-1">{{ $store.state.cart.length }}</div>
                        </div>
                        <div class="hidden md:block">Cart</div>
                    </nuxt-link>
                </div>
                <MenuButton @toggleMenu="toggleMenu" class="lg:hidden"/>
            </div>
        </div>
        <categoriesToggle v-if="categories"/>
        <menuToggle v-if="menutoggle" :menu="menu"/>
  </header>
</template>

<script>
export default {
    props:['logo_src'],
    data(){
        return{
            showLogo: this.$settings.header.show.logo,
            showMenu: this.$settings.header.show.menu,
            menu: this.$settings.header.menu.header_menu.items,
            showSearch: this.$settings.header.show.search,
            search_placeholder: this.$settings.header.search_placeholder,
            showWishlist: this.$settings.header.show.wishlist,
            showCart: this.$settings.header.show.cart,
            showCategories: this.$settings.header.show.categoriesMenu,
            categories:false,
            menutoggle: false
        }
    },
    methods:{
        toggleCategories(){
            this.categories = !this.categories;
        },
        onClickOutside(){
            this.categories = false;
            this.menutoggle = false;
        },
        toggleMenu(){
            this.menutoggle = !this.menutoggle;
        }
    }
}
</script>

<style>

</style>