<template>
  <div>
    <div v-for="(option, i) in options" :key="i" :class="option.key" class="bg-gray-50 border">
        <h4>{{ option.name }}</h4>
        <div>
            <div v-for="(val, ii) in option.values" :key="ii" class="option mx-1">
                <button class="text-5xl font-bold" :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == val._id ? 'active': ''" @click="setVariant(i+1, val._id)" :id="val._id" :style="`${option.key == 'color' ? `background-color:${val.value2}` : ''}`"><small>{{ val.value1 }}</small></button>
            </div>
        </div>
    </div>
    <div>{{ selected.price }}</div>
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

<style>

</style>