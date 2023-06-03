<template>
    <div class="list">
    <ToDoItem v-for="item in filteredItems"
    :status="item.status"
    :start-time="item.startTime"
    :deadline="item.deadline"
    :description="item.description"
    :id="item.id"
    @deleteButton="(item) => $emit('deleteItem', item)"
    >
    <!-- The same could be accomplished using v-bind="item"-->
    </ToDoItem>
    </div>
</template>

<script setup>

import ToDoItem from './ToDoItem.vue';
import {computed, ref} from "vue"
defineEmits("deleteItem")

    const props = defineProps({
        itemArr : Array,
        filterOptions : Object
    })

    const filteredItems = computed(() => {
        let outputArr = [...props.itemArr]
        console.log("Filter options in computed=",props.filterOptions)

        let description = props.filterOptions.descriptionFilter

        console.log("descript=", description)

        if(props.filterOptions.descriptionFilter){
            console.log(props.filterOptions.descriptionFilter)
            //This aboslute monstrosity of a line is simply filtering by description without case sensitivity
            outputArr = outputArr.filter(task => 
            task.description.toLowerCase().includes(props.filterOptions.descriptionFilter.toLowerCase()))
        }

        if(props.filterOptions.statusFilter && props.filterOptions.statusFilter !== "all"){
            console.log(props.filterOptions.statusFilter)
            outputArr = outputArr.filter(task => task.status === props.filterOptions.statusFilter)
        }
        
        console.log("outputArr=", outputArr)
        console.log("itemarr=", props.itemArr)


        return outputArr
    })

</script>

<style scoped>
.list{
    border-style:dotted;
    overflow-y: auto;
    height: 200px;
    background-color: lightgreen;
}
</style>
