const taskInput = document.querySelector(".form-control"); 
const addBtn = document.querySelector(".btn-primary");     
const taskList = document.querySelector(".list-group");    

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();

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

    // toggle completed class when checkbox changes
    checkbox.addEventListener("change", () => {
      span.classList.toggle("completed", checkbox.checked);
    });

    // put checkbox and text inside list item
    div.appendChild(checkbox);
    div.appendChild(span);

    //delete button
    const delBtn=document.createElement("button");
    delBtn.className="btn btn-sm btn-danger ";
    delBtn.textContent="Delete";


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
