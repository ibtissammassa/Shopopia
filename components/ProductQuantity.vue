<template>
    <div class="flex items-center" :class="showItemsLeft ? 'w-full gap-x-4' : ''">
        <div class="flex items-center text-center ">
            <button @click="inc(-1)" class="border-b border-t border-primary py-2 px-4" :class="$store.state.language.code == 'AR' ? 'rounded-br-full rounded-tr-full border-r' : 'rounded-bl-full rounded-tl-full border-l'">-</button>
            <div class="flex">
                <label class="relative border-primary border-t  border-b py-2 h-full">
                    <span class="md:px-5 md:py-4 px-4 py-1 text-xs text-center ">{{ value }}</span>
                    <input :min="quantity.min" :max="quantity.instock" class="md:px-2 text-center absolute outline-none inset-0 bg-opacity-0 w-full h-full" v-model="value" type="number">
                </label>
            </div>
            <button @click="inc(1)" class="border-b border-t border-primary py-2 px-4 " :class="$store.state.language.code == 'AR' ? 'rounded-bl-full rounded-tl-full border-l' : 'rounded-br-full rounded-tr-full border-r'">+</button>
        </div>
        <div v-if="showItemsLeft" class="text-sm md:text-base">
            Only <span :style="`color:${itemsLeftColor}`">{{ quantity.instock }} items</span> left! Don't miss it.
        </div>
    </div>
    
</template>

<script>
export default {
    props:['quantity','showItemsLeft'],
    data(){
        return{
            value: this.quantity.value || this.quantity.default || 1,
            itemsLeftColor: this.$settings.product.itemsLeft.color,
        }
    },
    watch:{
        value(val, old){
            if(val > this.quantity.instock) this.value = this.quantity.instock;
            if(val < this.quantity.min) this.value = this.quantity.default;
            if(isNaN(val)) this.value = this.quantity.default;
            this.$emit('quantitySelected',this.value);
        }
    },
    methods:{
        inc(inc){
            this.value = Number(this.value) + (Number(this.quantity.increment) * Number(inc));
        },
        
    }
}
</script>

<style>

</style>