document.addEventListener("DOMContentLoaded", () =>{
    const storeTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storeTasks){
        storeTasks.forEach((task) => tasks.push(task))
        updateTaskList();
        updateStats()
    }
})


let tasks = [];
const saveTasks = () =>{
    localStorage.setItem('tasks',  JSON.stringify(tasks))
}


const addtask = () => {
    const taskinput =document.getElementById('taskinput')
    const text = taskinput.value.trim()

    if(text){
        tasks.push({ text: text , completed: false});
        taskinput.value ="";
        updateTaskList();
        updateStats();
        saveTasks()
    }
    
};




const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks() 
    
};

const deleteTask = (index) =>{
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks()        
};



const editTask = (index) => {
const taskinput =document.getElementById('taskinput')
taskinput.value = tasks[index].text;
tasks.splice(index,1);
updateTaskList();
updateStats();
saveTasks()

};


const updateStats = () => {
    const completeTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks / totalTasks) * 100;

    const progressBar = document.getElementById('progress');
    progressBar.style.width = ` ${progress}% `;

   document.getElementById('number').innerText =`${completeTasks} / ${totalTasks}`

   if(tasks.length && completeTasks == totalTasks) {
    blatefat();
   }
  
};



const updateTaskList = () => {
    const tasklist  = document.getElementById('task-list');
    tasklist.innerHTML = "";

    tasks.forEach((task, index) => {
        const listitem =document.createElement("li");

        listitem.innerHTML = `
        
        <div class="taskitem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox"  ${task.completed  ? "checked"  : ""}/>
                    <p>${task.text} </p>

                </div>

                <div class="icon">
                    <i class="fas fa-edit"  onclick="editTask(${index})"></i>
                    <i class="fas fa-times" onclick="deleteTask(${index})"></i>
                </div>
            </div>
            
        `;

        listitem.addEventListener('change', () => toggleTaskComplete(index));
        tasklist.append(listitem);
    });


};

document.getElementById('newtask').addEventListener('click', function(e) {
    e.preventDefault()

    addtask()
});


const blatefat = () =>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});

}