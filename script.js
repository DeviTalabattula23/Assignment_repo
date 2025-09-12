const taskInput = document.querySelector(".form-control"); 
const addBtn = document.querySelector(".btn-primary");     
const taskList = document.querySelector(".list-group"); 

//add task when pressing enter 
taskInput.addEventListener("keypress",(e)=>{
  if(e.key==="Enter"){
    addBtn.click();
  }
});


addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();

  //give alert if we try to add without text
  if(text===""){
    alert('You need to enter a task!');
    return;

  }

  if (text !== "") { 
    // create list item
    const li = document.createElement("li"); 
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    //left side check box and text
    const div=document.createElement("div");
    div.className="d-flex align-items-center";

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";

    // task text
    const span = document.createElement("span");
    span.textContent = text;

   //writing emoji
    const write=document.createElement("span");
    write.textContent="✍";

    // toggle completed class when checkbox changes
    checkbox.addEventListener("change", () => {
      span.classList.toggle("completed", checkbox.checked);
    });

    // put checkbox ,emoji and text inside list item
    div.appendChild(checkbox);
    div.appendChild(write);
    div.appendChild(span);
    
    //delete button
    const delBtn=document.createElement("button");
    delBtn.className="btn btn-sm btn-danger ";
    delBtn.textContent="Delete 🗑";


    //remove the task
    delBtn.addEventListener("click", () => {
      taskList.removeChild(li); // remove this task
    });

    li.appendChild(div);
    li.appendChild(delBtn);

    // add li to ul
    taskList.appendChild(li); 
    taskInput.value = ""; 
  }
});
