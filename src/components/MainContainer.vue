<template>
    <FilterPanel @filter="(filterDict) => changeFilterOptions(filterDict)"></FilterPanel>
    <ToDoList
     :itemArr="toDoItems"
     :filterOptions="filterOptions"
     @deleteItem="(itemId) => deleteItem(itemId)"
     />
    <ControlPanel 
    @item="(itemDict) => addItem(itemDict)"
    />
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref} from "vue"
import ControlPanel from "./ControlPanel.vue"
import ToDoList from "./ToDoList.vue";
import FilterPanel from "./FilterPanel.vue";
const toDoItems = ref([])

const deleteItem = (id) => {
    console.log("In deleteItem", id)
    const newToDoItems = toDoItems.value.filter((item) => item.id !== id)
    toDoItems.value = newToDoItems
    sendData()
}

const addItem = (item) => {
    const newToDoItems = [...toDoItems.value, item]
    console.log("In addItem",newToDoItems)
    toDoItems.value = newToDoItems
    sendData()        
}

const sendData = () =>{ //data 
        fetch("http://localhost:3000/data", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(toDoItems.value)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}
    

const sortItems = (arr, filterOption, getPropertyToFilterOn) => {
    const newArr = [...arr];
    console.log("in sort items", filterOption)

    if(filterOption){
        newArr.sort((a,b) => {
            const aVal = getPropertyToFilterOn(a)
            const bVal = getPropertyToFilterOn(b)
            if(aVal > bVal) return 1;
            else if (aVal < bVal) return -1;
            return 0;
        })
    }
    else{
        newArr.sort((a,b) => {
            const aVal = getPropertyToFilterOn(a)
        const bVal = getPropertyToFilterOn(b)
            if(aVal > bVal) return -1;
            else if (aVal < bVal) return 1;
            return 0;
        })
    }

    return newArr
}

onMounted(() => {
    console.log("In onMounted")
    //get data from localhost:3000/data
    fetch("http://localhost:3000/data")
    .then(response => response.json())
    .then(data => {
        console.log("data=", data)
        //convert the startTimes and deadlines to Date objects using map
        const newToDoItems = data.map((item) => {
            return {
                ...item,
                startTime: new Date(item.startTime),
                deadline: new Date(item.deadline)
            }
        })
        console.log("newToDoItems=", newToDoItems)
        toDoItems.value = newToDoItems
    })

})


const filterOptions = reactive({
    statusFilter : "",
    descriptionFilter: "",
    sortOption : ""
})

const sortOptions = ["Date Ascending", "Date Descending","Status Ascending", "Status Descending"]
const changeFilterOptions = (newFilterOptions) => {
    console.log("FilterOptions=", newFilterOptions)
    Object.assign(filterOptions,newFilterOptions)

    const sortOption = filterOptions.sortOption
    console.log("Sortoption =", filterOptions.sortOption)
    let dateAscending = sortOptions[0]
    let dateDescending = sortOptions[1]
    let statusAscending = sortOptions[2]
    let statusDescending = sortOptions[3]

    switch(sortOption){
        case dateAscending:
            toDoItems.value = sortItems(toDoItems.value, true, (a) => a.deadline)
            break;
        case dateDescending:
            toDoItems.value = sortItems(toDoItems.value, false, (a) => a.deadline)
            break;
        case statusAscending:
            toDoItems.value = sortItems(toDoItems.value, true, (a) => a.status)
            break;
        case statusDescending:
            toDoItems.value = sortItems(toDoItems.value, false, (a) => a.status)
            break;
    }

    //toDoItems.value = sortItems(toDoItems.value, filterOptions.dateAscending, (a) => a.deadline)
    //toDoItems.value = sortItems(toDoItems.value, filterOptions.ascending, (a) => a.status )
    

}

</script>

<style scoped>
.toDoList{
    padding-top: 10px;
    width: 650px;
}

</style>