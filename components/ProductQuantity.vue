<template>
    <div class="flex w-full gap-x-4 items-center">
        <div class="flex items-center text-center ">
            <button @click="inc(-1)" class="border-b border-t border-l border-primary rounded-bl-full rounded-tl-full py-2 px-4">-</button>
            <div class="flex">
                <label class="relative border-primary border-t  border-b py-2 h-full">
                    <span class="px-5 py-4 text-center ">{{ value }}</span>
                    <input :min="quantity.min" :max="quantity.instock" class="px-2 text-center absolute outline-none inset-0 bg-opacity-0 w-full h-full" v-model="value" type="number">
                </label>
            </div>
            <button @click="inc(1)" class="border-b border-t border-r border-primary rounded-br-full rounded-tr-full py-2 px-4 ">+</button>
        </div>
        <div v-if="showItemsLeft">
            Only <span :style="`color:${itemsLeftColor}`">{{ quantity.instock }} items</span> left! Don't miss it.
        </div>
    </div>
    
</template>

<script>
export default {
    props:['quantity'],
    data(){
        return{
            value: this.quantity.value || this.quantity.default || 1,
            showItemsLeft: this.$settings.product.show.leftItems,
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