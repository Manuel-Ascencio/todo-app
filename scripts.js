const dayNum = document.getElementById("dayNum");
const month = document.getElementById("month");
const year = document.getElementById("year");
const day = document.getElementById("day");

const textInput = document.getElementById("textInput");
const add = document.querySelector(".add");
const removeAll = document.querySelector(".remove");

const tasksContainer = document.getElementById("tasksContainer");

const setDate = () => {
  const date = new Date();
  dayNum.textContent = date.toLocaleString("en-us", { day: "numeric" });
  day.textContent = date.toLocaleString("en-us", { weekday: "long" });
  year.textContent = date.toLocaleString("en-us", { year: "numeric" });
  month.textContent = date.toLocaleString("en-us", { month: "long" });
  day.style.textTransform = "capitalize";
  month.style.textTransform = "capitalize";
};
setDate();

textInput.onkeyup = () => {
  let entry = textInput.value;
  if (entry.trim() != 0) {
    add.classList.add("active");
  } else {
    add.classList.remove("active");
  }
};

const addTask = (event) => {
  event.preventDefault();
};

const saveTasks = () => {
  const task = {
    input_task: textInput.value,
  };
  if (task.input_task !== "") {
    if (localStorage.getItem("tasks") === null) {
      let array = [];
      localStorage.setItem("tasks", JSON.stringify(array));
    } else {
      let get_task = JSON.parse(localStorage.getItem("tasks"));
      const repeated = get_task.filter(
        (element) => element.input_task.trim() == task.input_task.trim()
      );

      if (repeated.length > 0) {
        alert("This task is already added!!!");

        textInput.value = "";
        return;
      }
      get_task.push(task);
      localStorage.setItem("tasks", JSON.stringify(get_task));
    }
  }

  add.classList.remove("active");

  showTasks();
  textInput.value = "";
};
const showTasks = () => {
  let inputTaks = JSON.parse(localStorage.getItem("tasks"));
  tasksContainer.innerHTML = "";
  for (let i = 0; i < inputTaks.length; i++) {
    let input = inputTaks[i].input_task;
    tasksContainer.innerHTML += `
        <div class="task">
        <input type="checkbox" class="check">
        <p class="description">${input}</p>
        <button class="delete" onclick="removeTask('${input}')">
            <img src="images/svg/delete.svg" alt="" width="20px" class="remove">
        </button>
        </div>
        `;
  }

  for (let i = 0; i < tasksContainer.children.length; i++) {
    let text = tasksContainer.children[i].children[1].innerText;
    tasksContainer.children[i].children[0].addEventListener("change", () => {
      window.localStorage.setItem(
        text,
        tasksContainer.children[i].children[0].checked
      );
      showTasks();
    });

    tasksContainer.children[i].children[0].checked = eval(
      window.localStorage.getItem(text)
    );
    if (localStorage.getItem(text) == "true") {
      tasksContainer.children[i].children[1].classList.add("complete");
    } else if (localStorage.getItem(text) == "false") {
      tasksContainer.children[i].children[1].classList.remove("complete");
    }
  }

  if (inputTaks.length > 0) {
    removeAll.classList.add("active");
  } else {
    removeAll.classList.remove("active");
  }
};

const removeTask = (task) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks.length; i++) {
    if (task === tasks[i].input_task) {
      tasks.splice(i, 1);
    }
  }

  localStorage.removeItem(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
};

add.addEventListener("click", () => {
  if (!textInput.value || !textInput.value.trim()) {
    window.alert("Add a task!!!");
    textInput.value = "";
  } else {
    saveTasks();
  }
});

removeAll.onclick = () => {
  localStorage.clear();
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
};

saveTasks();
