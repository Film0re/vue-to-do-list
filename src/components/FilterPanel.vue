<template>
    <div class="container">
        <label>
            Filter By:
        </label>
        <select id="statusFilter" v-model="statusFilter">
            <option v-for="option in statusOptions">{{ option }} </option> 
        </select>

        <input class="search" placeholder="Search" id = "descriptionFilter" v-model="descriptionFilter"/>
        <label> 
            Sort By:
        </label>
        <select id="sortOptions" v-model="sortOption">
            <option v-for="option in sortOptions">{{ option }}</option>
        </select>
    </div>
</template>

<script setup>
import { ref, watch } from "vue"
const statusOptions = ["All","To-Do","In-Progress", "Completed"]
const statusFilter = ref(statusOptions[0])

const sortOptions = ["Date Ascending", "Date Descending","Status Ascending", "Status Descending"]
const sortOption = ref(sortOptions[0])

const descriptionFilter = ref("");

watch([statusFilter,descriptionFilter, sortOption], () => pushFilterOptionsToParent())

const emit = defineEmits(["filter"])
const pushFilterOptionsToParent = () =>{
    console.log(
        {
        statusFilter: statusFilter.value.toLowerCase(),
        descriptionFilter: descriptionFilter.value,
        sortByOption: sortOption
    })

    emit("filter", 
    {
        statusFilter: statusFilter.value.toLowerCase(),
        descriptionFilter: descriptionFilter.value,
        sortOption: sortOption
    })
}

</script>

<style scoped>
.container{
    border-style: groove;
    background-color: cyan;
    padding: 10px;
}

.search{
    margin-left: 20px;
}

</style>