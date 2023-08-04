<template>
  <div class="py-6 lg:px-10 gap-y-4 flex flex-col" v-if="item">
    <h4 v-if="$store.state.language.code=='AR'" class="pl-9 text-sm text-gray-500 py-3"> <span class="text-black">{{ item.name }}</span> / <nuxt-link to="/products">Products</nuxt-link> / <nuxt-link to="/">Home</nuxt-link></h4>
    <h4 v-else class="pl-9 text-sm text-gray-500 py-3"><nuxt-link to="/">Home</nuxt-link> / <nuxt-link to="/products">Products</nuxt-link> / <span class="text-black">{{ item.name }}</span></h4>
    
    <div class="pl-9 flex lg:flex-row flex-col lg:gap-x-14 rounded-xl gap-y-7 items-start w-full px-6">
      
      <div class="flex flex-col-reverse gap-x-4 gap-y-3 lg:w-7/12 w-full relative">
        <div v-if="variant" class="flex gap-y-3 gap-x-3 ">
          <div @click="setImage(i)" :class="image.src == img.src ? 'border-slate-200 bg-slate-200' : 'opacity-70 bg-slate-100'" class="rounded-xl border shadow-lg bg-slate-100 cursor-pointer w-2/12 " v-for="(img,i) in item.images" :key="i">
            <img class="w-full px-1" :src="img.src" alt="">
          </div>
        </div>
        <div v-else  class="rounded-xl border shadow-lg bg-slate-100 cursor-pointer w-2/12 ">
          <img class="w-full px-1" :src="item.images[0].src" alt="">
        </div>

        <div class="w-full bg-slate-200 rounded-xl border-slate-200 border shadow-lg cursor-zoom-in p-8">
          <img class="w-full zoom" :src="image ? image.src : item.images[0].src" alt="">
        </div>
        <svg v-if="$store.state.wishlist.find(i=>i._id==item._id)" @click.stop="removeFromWishlist" fill="red" class="bg-red-200 rounded-full absolute p-2 top-4 hover:bg-red-300 right-4" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512" id="heart"><path d="M349.6 64c-36.4 0-70.718 16.742-93.6 43.947C233.117 80.742 198.8 64 162.4 64 97.918 64 48 114.221 48 179.095c0 79.516 70.718 143.348 177.836 241.694L256 448l30.164-27.211C393.281 322.442 464 258.61 464 179.095 464 114.221 414.082 64 349.6 64zm-80.764 329.257l-4.219 3.873-8.617 7.773-8.616-7.772-4.214-3.869c-50.418-46.282-93.961-86.254-122.746-121.994C92.467 236.555 80 208.128 80 179.095c0-22.865 8.422-43.931 23.715-59.316C118.957 104.445 139.798 96 162.4 96c26.134 0 51.97 12.167 69.11 32.545L256 157.661l24.489-29.116C297.63 108.167 323.465 96 349.6 96c22.603 0 43.443 8.445 58.686 23.778C423.578 135.164 432 156.229 432 179.095c0 29.033-12.467 57.459-40.422 92.171-28.784 35.74-72.325 75.709-122.742 121.991z"></path></svg>
        <svg v-else @click.stop="addToWishlist" class="rounded-full absolute  bg-white p-2 top-4 hover:bg-red-300 right-4" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512" id="heart"><path d="M349.6 64c-36.4 0-70.718 16.742-93.6 43.947C233.117 80.742 198.8 64 162.4 64 97.918 64 48 114.221 48 179.095c0 79.516 70.718 143.348 177.836 241.694L256 448l30.164-27.211C393.281 322.442 464 258.61 464 179.095 464 114.221 414.082 64 349.6 64zm-80.764 329.257l-4.219 3.873-8.617 7.773-8.616-7.772-4.214-3.869c-50.418-46.282-93.961-86.254-122.746-121.994C92.467 236.555 80 208.128 80 179.095c0-22.865 8.422-43.931 23.715-59.316C118.957 104.445 139.798 96 162.4 96c26.134 0 51.97 12.167 69.11 32.545L256 157.661l24.489-29.116C297.63 108.167 323.465 96 349.6 96c22.603 0 43.443 8.445 58.686 23.778C423.578 135.164 432 156.229 432 179.095c0 29.033-12.467 57.459-40.422 92.171-28.784 35.74-72.325 75.709-122.742 121.991z"></path></svg>
      </div>

      <div class="flex flex-col gap-y-4 justify-center lg:w-1/2 w-full">
        
        <h2 class="font-bold text-2xl lg:text-4xl">{{ item.name }}</h2>
        <p class="text-gray-700 text-sm">{{ item.seo.description }}</p>
        <div class="flex">
            <span v-for="(star,i) in 5" :class="star <= item.review.rating ? ' text-yellow-500 ': 'text-gray-400'" :key="i">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-5 h-5 translate"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path></svg>
            </span>
        </div>
      
        <hr>
        <h3 class="font-bold text-3xl md:text-5xl">{{ !variant ? item.price.salePrice : variant.price.salePrice}}<span class="text-sm">{{ $store.state.currency.symbol }}</span></h3>
        
        <hr>
        <productVariants v-if="variant" :options="item.options" :variants="item.variants" @selected="variantSelected"/>
        <hr>
        <ProductQuantity :showItemsLeft="showItemsLeft" v-if="(showAddToCart || showBuyNow) && !addedToCart" @quantitySelected="quantitySelected" :quantity="quantity"/>
        
        <AppLoader placement="BEFORE_ADD_TO_CART"></AppLoader>
        <div v-if="showAddToCart || showBuyNow" class="flex flex-row gap-x-4 ">
          <button @click.stop="buy" v-if="showBuyNow" class=" hover-bg-secondary ease-in duration-400 w-32 text-white font-bold border-white text-base py-2 px-2.5 border-2 rounded-full bg-primary">
                  {{ buyNow }}
          </button>
          <button @click.stop="addToCart" v-if="showAddToCart && !addedToCart" class=" hover-bg-primary hover-color-white ease-in duration-400 w-32 text-primary font-bold border-primary text-base py-2 px-2.5 border-2 rounded-full">
                  {{ addToCartText }}
          </button>
          <button @click.stop="removeFromCart" v-else-if="showAddToCart && addedToCart" class="hover:bg-slate-300 hover-color-primary ease-in duration-400 w-32 text-white font-bold border-secondary bg-secondary text-base py-2 px-2.5 border-2 rounded-full">
                  In Cart!
          </button>
        </div>
        <AppLoader placement="AFTER_ADD_TO_CART"/>
        <AppLoader placement="REPLACE_BUYNOW"/>
        <div v-if="showFreeDelivery || showReturnDelivery" class="rounded-xl border-slate-200 border-2">
          <div v-if="showFreeDelivery" class="border-b flex flex-col py-4 px-3 gap-y-0">
            <div class="flex items-center gap-x-3">
              <svg width="35" height="40" :fill="itemsLeftColor" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 512" id="delivery-truck"><path d="M472.3,221.3l-59.1-54.7A69.906,69.906,0,0,0,365.7,148H335.5v-6.1a50.018,50.018,0,0,0-50-50H67.2a50.018,50.018,0,0,0-50,50V365.8a10.029,10.029,0,0,0,10,10H58.4a53.141,53.141,0,0,0,104.8,0H349.4a53.141,53.141,0,0,0,104.8,0h30.5a10.029,10.029,0,0,0,10-10V272.7A69.617,69.617,0,0,0,472.3,221.3ZM458.7,236H399.5V181.2l.1.1ZM67.2,111.9H285.5a30.088,30.088,0,0,1,30,30V178h0v78.4h0v1.4H37.2V141.9A30.088,30.088,0,0,1,67.2,111.9Zm43.6,288.2A33.1,33.1,0,1,1,143.9,367,33.139,33.139,0,0,1,110.8,400.1Zm0-86.3a53.282,53.282,0,0,0-52,42H37.2v-78H315.5v78H162.8A53.2,53.2,0,0,0,110.8,313.8Zm291,86.3A33.1,33.1,0,1,1,434.9,367,33.139,33.139,0,0,1,401.8,400.1Zm73-44.3h-21a53.19,53.19,0,0,0-104,0H335.5V256.4h0V168h30.2a52.829,52.829,0,0,1,13.8,1.9V236a20.059,20.059,0,0,0,20,20h72.4a49.287,49.287,0,0,1,2.9,16.7Z"></path><path d="M110.8 338.5a28.4 28.4 0 1 0 28.4 28.4A28.445 28.445 0 0 0 110.8 338.5zm0 36.9a8.4 8.4 0 1 1 8.4-8.4A8.451 8.451 0 0 1 110.8 375.4zM401.8 338.5a28.4 28.4 0 1 0 28.4 28.4A28.445 28.445 0 0 0 401.8 338.5zm0 36.9a8.4 8.4 0 1 1 8.4-8.4A8.451 8.451 0 0 1 401.8 375.4zM155.3 212.4a9.993 9.993 0 0 0 7.1 3h0a10.327 10.327 0 0 0 7.1-2.9l48.1-48.1a9.97 9.97 0 0 0-14.1-14.1l-41 41L142.6 171a9.97 9.97 0 1 0-14.2 14z"></path></svg>
              <p class="font-semibold">{{ freeDelivery }}</p>
            </div>
            <p class="text-xs pl-9 text-gray-700">{{ freeDeliveryDescription }}</p>
          </div>
          <div v-if="showReturnDelivery" class="flex flex-col py-4 px-3 gap-y-0">
            <div class="flex items-center gap-x-3">
              <svg width="35" height="40" :fill="itemsLeftColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="delivery"><path d="M28.598 55.655c-.939 0-2.125-.318-4.5-1.626a38.277 38.277 0 0 1-3.9-2.471l-5.515 1.654a1 1 0 0 1-.889-.16 20.838 20.838 0 0 1-6.717-8.669 1 1 0 0 1 .857-1.381 23.406 23.406 0 0 0 8.365-2.116 22.969 22.969 0 0 0 2.65-1.455 25.473 25.473 0 0 1 3.722-2.166 23.192 23.192 0 0 1 2.458-.91c.075-.02.201-.054.364-.102l.167-.052c.161-.05.31-.097.665-.19.337-.087.79-.197 1.35-.312a12.684 12.684 0 0 1 3.877-.316 8.33 8.33 0 0 1 1.716.309c.742.222 1.407.493 2.05.754a20.157 20.157 0 0 0 2.117.77 9.647 9.647 0 0 0 1.9.343c.637.061 1.43.137 1.774.979a1.993 1.993 0 0 1-.187 1.737 4.256 4.256 0 0 1-4.813 2.185c-.276-.042-.527-.09-.758-.144a9.314 9.314 0 0 0 1.078.668 9.412 9.412 0 0 0 4.6 1.083l3.02-.001a1 1 0 0 1 .994.898 4.143 4.143 0 0 1-.405 2.356c-.95 1.842-3.33 2.778-6.012 2.398a111.52 111.52 0 0 1-6.3 4.565 6.719 6.719 0 0 1-3.5 1.366 4.658 4.658 0 0 1-.228.006Zm-8.211-6.198a1 1 0 0 1 .595.197 36.237 36.237 0 0 0 4.08 2.623c2.6 1.431 3.315 1.392 3.658 1.375a4.791 4.791 0 0 0 2.49-1.03 109.901 109.901 0 0 0 6.53-4.75.995.995 0 0 1 .808-.194c1.924.374 3.738-.162 4.312-1.274a1.765 1.765 0 0 0 .132-.338h-1.939a11.35 11.35 0 0 1-9.552-4.84 9.416 9.416 0 0 0-1.285.001c-.18.013-.33.028-.43.04a1 1 0 0 1-.23-1.987c.12-.014.3-.032.522-.048a11.622 11.622 0 0 1 2.094.047l.019.002a7.64 7.64 0 0 1 2.137.597 8.381 8.381 0 0 0 2.085.605 3.006 3.006 0 0 0 1.094.073 2.772 2.772 0 0 0 1.525-1.017 11.408 11.408 0 0 1-2.148-.4 22.116 22.116 0 0 1-2.32-.84c-.627-.256-1.219-.496-1.87-.691a6.286 6.286 0 0 0-1.308-.232 10.877 10.877 0 0 0-3.311.283c-.518.106-.937.208-1.248.288-.305.08-.432.12-.57.162l-.191.06c-.19.056-.337.096-.397.111a21.826 21.826 0 0 0-2.176.808 23.957 23.957 0 0 0-3.425 2 24.98 24.98 0 0 1-2.925 1.61 25.22 25.22 0 0 1-7.648 2.167 18.82 18.82 0 0 0 5.106 6.283L20.1 49.5a.997.997 0 0 1 .287-.042Z"></path><path d="M51 46H39.59a1 1 0 0 1 0-2H50V13H17v29.12a1 1 0 0 1-2 0V12a1 1 0 0 1 1-1h35a1 1 0 0 1 1 1v33a1 1 0 0 1-1 1Z"></path><path d="M37.5 21h-8a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1Zm-7-2h6v-6h-6Z"></path></svg>
              <p class="font-semibold">{{ returnDelivery }}</p>
            </div>
            <p class="text-xs pl-9 text-gray-700">{{ returnDeliveryDescription }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-x-2">
      <button @click="showDescription" :class="description ? 'text-white bg-primary' : '' " class="my-2 hover-bg-primary hover-color-white ease-in duration-400 w-32 text-primary font-bold border-primary text-sm py-2 px-2.5 border-2 rounded-full">
          Description
      </button>
      <button @click="showReviews" :class="reviews ? 'text-white bg-primary' : '' " class="my-2 hover-bg-primary hover-color-white ease-in duration-400 w-32 text-primary font-bold border-primary text-sm py-2 px-2.5 border-2 rounded-full">
          Reviews
      </button>
    </div>

    <div class="px-4">
      <ProductDescription v-if="description" :product="item"/>
      <ProductReviews :product="item" v-if="reviews"/>
    </div>
    <Upsell :item="item.upsell"/>
    <RelatedProducts :item="item" v-if="showRelated"/>
  </div>
  <loading v-else/>
</template>

<script>
export default {
    data() {
        return {
            item: null,
            quantity: {},
            image: null,
            variant: null,
            showAddToCart: this.$settings.product.show.addToCart,
            addToCartText: this.$settings.product.addToCart.text,
            showBuyNow: this.$settings.product.show.buyNow,
            buyNow: this.$settings.product.buyNow.text,
            showRelated: this.$settings.product.show.related,
            showItemsLeft: this.$settings.product.show.leftItems,
            itemsLeftColor: this.$settings.product.itemsLeft.color,
            showFreeDelivery: this.$settings.product.show.freeDelivery,
            freeDelivery: this.$settings.product.freeDelivery.text,
            showReturnDelivery: this.$settings.product.show.returnDelivery,
            returnDelivery: this.$settings.product.returnDelivery.text,
            freeDeliveryDescription: this.$settings.product.freeDelivery.description,
            returnDeliveryDescription: this.$settings.product.returnDelivery.description,
            addedToCart: false,
            description: true,
            reviews: false
        }
    },
    async fetch() {
        const { slug } = this.$route.params;
        try{
            const { data } = await this.$storeino.products.get({ slug })
            this.item = data;
            console.log("----------------------------")
            console.log(this.item)
            console.log("----------------------------")
            this.quantity = this.item.quantity;
            // Set default variant if exists
            if(this.item.variants.length > 0) this.variantSelected(this.item.variants[0]);
            for(const item of this.$store.state.cart){
                if(item._id === this.item._id)this.addedToCart=true;
            }
        }catch(e){
            // Redirect to error page if product not exists
            this.$nuxt.error({ statusCode: 404, message: 'product_not_found' })
        }
    },
    watch:{
        async "$store.state.cart.length"(){
            this.$fetch();
        },
    },
    methods: {
      quantitySelected(quantity){
            this.item.quantity.value = quantity;
        },
        addToCart(){
            let cartItem={}
            cartItem = {
                _id: this.item._id,
                quantity: this.item.quantity.value ? this.item.quantity.value : this.item.quantity.default,
                price: this.item.price.salePrice,
                variant: this.variant ? { _id: this.variant._id } : null
            }
            this.$tools.call('ADD_TO_CART',cartItem);
            this.$fetch()
        },
        removeFromCart(){
            this.$tools.call('REMOVE_FROM_CART', this.item);
            this.addedToCart = false;
        },
        buy() {
            // Add to cart and redirect to checkout
            this.addToCart();
            setTimeout(() => {
                window.location.href = '/checkout';
            }, 500);
        },
        showDescription(){
          this.description = true;
          this.reviews = false;
        },
        showReviews(){
          this.reviews = true;
          this.description = false;
        },
        setImage(i){
          this.image = this.$tools.copy(this.item.images[i]);
        },
        variantSelected(variant) {
            this.variant = variant;
            if(variant.imageId && this.item.images.length > 0){
                let index = this.item.images.findIndex(i=>i._id == variant.imageId);
                if(index == -1) index = 0;
                this.image = this.item.images[index];
            }else if(this.item.images.length > 0){
                this.image = this.item.images[0];
            }
            this.quantitySelected(this.item.quantity.value);
            this.instock = variant.instock;
        },
        addToWishlist(){
            this.$tools.call('ADD_TO_WISHLIST', this.item);
        },
        removeFromWishlist(){
            this.$tools.call('REMOVE_FROM_WISHLIST', this.item);
        },
    },

}
</script>

<style scoped>
  .zoom:hover{
    transform: scale(1.1);
  }
  .text-white{
    color: white;
  }
</style>