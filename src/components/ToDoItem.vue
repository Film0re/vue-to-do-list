<template>
    <div class="item">
        <div> 
            {{ description }}
        </div>

        <div class="bot">
            <div class="innerBot date"> {{ startTime }} - {{  deadline.toLocaleString() }} </div>
            <div class="innerBot"> Status: {{ status }} </div>
            <button @click="() => $emit('deleteButton', props.id)"> Delete </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
    status : String,
    description : String,
    startTime : String,
    deadline : String,
    id : Number
})

const deleteButton = ref(true)
defineEmits(["deleteButton"])

</script>

<style scoped>
.item{
    border: 5px;
    border-color:lightcoral;
    border-style:solid;
    min-height: 40px;
    margin: 5px;
}

.date{
    font-size: 80%;

}

.innerBot{
    flex-basis: 50%;
}
.bot{
    display:flex;
    flex-basis: 100%;
    align-items:end;
}
</style>