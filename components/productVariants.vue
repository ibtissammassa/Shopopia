<template>
    <div class="flex gap-y-4 flex-col">
        <div v-for="(option, i) in options" :key="i" class="flex gap-y-2 flex-col">
            <h4 class="font-bold text-lg">{{ option.name }} :</h4>
            <div v-if="option.style=='COLOR'" class="flex flex-row gap-x-2">
                <div v-for="(val, ii) in option.values" :key="ii" >
                    <button class="rounded-full p-3.5" :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == val._id ? 'border-2 border-primary p-2': 'border border-gray-300'" @click="setVariant(i+1, val._id)" :id="val._id" :style="`background-color:${val.value2}`"><small></small></button>
                </div>
            </div>
            <div v-else-if="option.style=='IMAGE'" class="flex gap-x-3">
                <div v-for="(val, ii) in option.values" :key="ii" class="w-1/5">
                    <img :src="images[ii].src" class="rounded-xl w-full h-full bg-gray-50 shadow-md" :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == val._id ? 'border-2 border-primary': 'border-gray-200 border'" @click="setVariant(i+1, val._id)" :id="val._id"/>
                </div>
            </div>
            <div v-else-if="option.style=='LIST'" class="">
                <select v-model="selectedOption" @change="handleSelectChange" name="" id="" class="block w-1/3 p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500">
                    <option :value="val.value1" v-for="(val, ii) in option.values" :key="ii">{{ val.value1 }}</option>
                </select>
            </div>
            <div v-else-if="option.style=='RADIO'" class="flex gap-x-3 rounded-lg bg-gray-100 p-4">
                <div v-for="(val, ii) in option.values" :key="ii" class="flex gap-x-1 items-center justify-center">
                    <input @change="setVariant(i+1, val._id)" type="radio" name="radio" id="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                    <label class="text-lg">{{ val.value1 }}</label>
                </div>
            </div>
            <div v-else-if="option.style=='CHECK'" class="flex gap-x-3 rounded-lg bg-gray-100 p-4">
                <div v-for="(val, ii) in option.values" :key="ii" class="flex gap-x-1 items-center justify-center">
                    <input @change="setVariant(i+1, val._id)" type="checkbox" name="" id="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                    <label class="text-lg">{{ val.value1 }}</label>
                </div>
            </div>
            <div v-else-if="option.style=='SIZE'" class="flex gap-x-3">
                <div v-for="(val, ii) in option.values" :key="ii" class="border px-2.5 shadow-md bg-gray-50 text-black items-center p-2 cursor-pointer rounded-xl" :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == val._id ? 'bg-primary text-white border-primary': 'border-gray-200'" @click="setVariant(i+1, val._id)">
                    {{ val.value1 }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['options','variants','images'],
    data() {
        return {
            selected: this.variants[0],
            selectedOption: this.options.find(opt => opt.style === 'LIST') ? this.options.find(opt => opt.style === 'LIST').values[0].value1 : null,
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
        handleSelectChange() {
            const selectedOption = this.options.find(opt => opt.style === 'LIST').values.find(val => val.value1 === this.selectedOption);
            if (selectedOption) {
                this.setVariant(1 , selectedOption._id);
            }
        },
    },
}
</script>

<style scoped>
    
</style>