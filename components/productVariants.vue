<template>
  <div class="flex gap-y-4 flex-col">
    <div v-for="(option, i) in options" :key="i" class="flex gap-y-2 flex-col">
        <h4 class="font-bold text-lg">{{ option.name }} :</h4>
        <div v-if="option.key == 'color'" class="flex flex-row gap-x-2">
            <div v-for="(val, ii) in option.values" :key="ii" >
                <button class="rounded-full p-3.5" :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == val._id ? 'border-2 border-primary p-2': ''" @click="setVariant(i+1, val._id)" :id="val._id" :style="`background-color:${val.value2}`"><small></small></button>
            </div>
        </div>
        <div v-else class="flex flex-row gap-x-2">
            <div v-for="(val, ii) in option.values" :key="ii" >
                <button class="rounded-full px-3 py-1 text-base" :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == val._id ? 'border-2 border-primary': 'border'" @click="setVariant(i+1, val._id)" :id="val._id"><small>{{ val.value2 }}</small></button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:['options','variants'],
    data() {
        return {
            selected: this.variants[0],
        }
    },
    methods: {
        setVariant(index, value) {
            let index1 ,index2;
            if(index == 1){ index1=2; index2=3; }
            if(index == 2){ index1=1; index2=3; }
            if(index == 3){ index1=1; index2=2; }

            if(this.options.length == 3){
                this.selected = this.variants.find(variant => variant[`option${index}`].value == value && variant[`option${index1}`].value == this.selected[`option${index1}`].value && variant[`option${index2}`].value == this.selected[`option${index2}`].value);
            }else if(this.options.length == 2){
                this.selected = this.variants.find(variant => variant[`option${index}`].value == value && variant[`option${index1}`].value == this.selected[`option${index1}`].value);
            }else{
                this.selected = this.variants.find(variant => variant[`option${index}`].value == value);
            }
            this.$emit('selected', this.selected);
        },
    },
}
</script>

<style scoped>
    
</style>