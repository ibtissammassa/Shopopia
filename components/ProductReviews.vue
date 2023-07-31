<template>
    <div v-if="reviews">
        <div v-if="reviews.length>0" class="grid gap-cols-2 md:gap-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="item in reviews" :key="item.id" class="rounded-xl border-slate-300 border-2 p-3 flex flex-col gap-y-3">
                <div class="flex gap-x-5 items-center">
                    <img class="h-16 w-18 rounded-xl border-slate-200 bg-slate-200" v-for="(image, i) in item.images" :key="i" :src="image" alt="">
                    <div>
                        <h3 class="font-bold">{{ item.customer.firstname }} {{ item.customer.lastname }}</h3>
                        <div class="flex">
                            <span v-for="(star,i) in 5" :class="star <= item.rating ? ' text-yellow-500 ': 'text-gray-400'" :key="i">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4 translate"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path></svg>
                            </span>
                        </div>
                    </div>
                </div>
                <p class="text-gray-700 text-sm">{{ item.content }}</p>
            </div>
        </div>
        <div v-else class="flex justify-center items-center flex-col py-7">
            <p class="text-xl text-gray-800">No Reviews</p>
        </div>
    </div>
    <loading v-else/>
</template>

<script>
export default {
    props:['product'],
    data(){
        return{
            reviews: null
        }
    },
    async fetch(){
        const { data } = await this.$storeino.reviews.search({
            "product._id": this.product._id,
        })
        this.reviews = data.results;
    }
}
</script>

<style>

</style>