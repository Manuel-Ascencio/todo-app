const dayNum = document.getElementById("dayNum");
const month = document.getElementById("month");
const year = document.getElementById("year");
const day = document.getElementById("day")

const textInput = document.getElementById("textInput");
const add = document.querySelector(".add");
const removeAll = document.querySelector(".remove")


const tasksContainer = document.getElementById("tasksContainer");

const setDate = () => {
    const date = new Date();
    dayNum.textContent = date.toLocaleString("es", { day: "numeric" });
    day.textContent = date.toLocaleString("es", { weekday: "long" });
    year.textContent = date.toLocaleString("es", { year: "numeric" });
    month.textContent = date.toLocaleString("es", { month: "long" });
    day.style.textTransform="capitalize";
    month.style.textTransform="capitalize";

}
setDate()

textInput.onkeyup = () => {
    let entry = textInput.value;
    if(entry.trim() != 0){
        add.classList.add("active");
    }else{
        add.classList.remove("active")
    }
}

const addTask = (event) => {
    event.preventDefault();
}

const saveTasks = () => {
    const task = {
        input_task: textInput.value
    }
    if(localStorage.getItem("tasks") === null){
        let array = [];
        array.push(task);
        localStorage.setItem("tasks", JSON.stringify(array));
    }else{
        let get_task = JSON.parse(localStorage.getItem("tasks"));
        get_task.push(task);
        localStorage.setItem("tasks", JSON.stringify(get_task));
    }

    showTasks()
    textInput.value = "";
}

const showTasks = () => {
    let inputTaks = JSON.parse(localStorage.getItem("tasks"));
    tasksContainer.innerHTML = "";
    for(let i = 0; i < inputTaks.length; i++){
        let input = inputTaks[i].input_task;
        tasksContainer.innerHTML += `
        <div class="task">
        <input type="checkbox" class="check">
        <p class="description">${input}</p>
        <button class="delete" onclick="removeTask('${input}')">
            <img src="imagenes/svg/delete.svg" alt="" width="20px" class="remove">
        </button>
        </div>
        `
    }
    if(inputTaks.length > 0){
        removeAll.classList.add("active")
    }else{
        removeAll.classList.remove("active")
    }
}

const removeTask = (task) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i = 0; i < tasks.length; i++){
        if(task === tasks[i].input_task){
            tasks.splice(i, 1)
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
};

add.addEventListener("click", () => {
    if(!textInput.value || !textInput.value.trim()){
        window.alert("Ingresa una tarea");
    }else{
        saveTasks()
    }
})

removeAll.onclick = () => {
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}