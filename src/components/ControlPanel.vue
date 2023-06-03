<template>
    <form class = "ControlPanel">
        <div class = "item">
            <label> Status: </label>
            <select id="status" v-model="status">
                <option v-for="option in statusOptions"> {{ option }}</option>
            </select>

        </div>
        <div>
            <label> Description: </label>
            <input id="description" v-model="description" placeholder="Enter task description" />
        </div>

        <div class = "item">  
            <label> End Time: </label>
            <input type="datetime-local" v-model="deadline"> 
        </div>
        <div style="flex-basis:100%">
            <button @click = "getToDoItemDict"> Submit </button>
        </div>
    </form>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
const statusOptions = ["To-Do","In-Progress", "Completed"]
const status = ref(statusOptions[0])
const description = ref("")
const deadline = ref("")
const emit = defineEmits(['item'])
const id = ref(0)

watch([id], () => {
    fetch("http://localhost:3000/id", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify([id.value])
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})

onMounted(() => {
    //Read in the id from id.txt
    fetch("http://localhost:3000/id")
    .then(response => response.json())
    .then(data => id.value = data)
    .catch(err => console.log(err))
})



const getToDoItemDict = (e) => {
    e.preventDefault()
    const curDate= new Date()
    let start_str = curDate.toLocaleString()
    let deadlineStr = deadline.value

    //If the user never chose a value, default to tomorrow
    if(!deadlineStr){
        const tomorrow = curDate
        tomorrow.setDate(tomorrow.getDate() + 1)
        deadlineStr = tomorrow.toLocaleString()
    }
    else{
        deadlineStr = new Date(deadlineStr).toLocaleString()
    }

    emit("item",
    {
        status: status.value.toLowerCase(),
        description: description.value,
        startTime: start_str,
        deadline: deadlineStr,
        id: id.value
    }
)
    id.value += 1
    //console.log(itemDict)
}

</script>



<style scoped>
.ControlPanel{
    background-color:antiquewhite;
    display:grid;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    padding: 10px;
    border: 8px;
    border-color: black;
    border-style:ridge;
}

.item{
    flex-basis: 100%;
    align-items: left;
    align-content: center;
    padding:5px;
}

</style>