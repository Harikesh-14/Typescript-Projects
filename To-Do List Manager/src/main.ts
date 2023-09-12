import './style.css'

interface Todo {
    title: string,
    isCompleted: boolean,
    readonly id: string
}

const tasks: Todo[] = []

const todoContainer = document.getElementById('todoContainer') as HTMLDivElement
const taskInput = document.getElementById('taskInput') as HTMLInputElement
const myForm = document.getElementById('myForm') as HTMLFormElement

const deleteTask = (id: string) => {
    const index = tasks.findIndex((item) => {
        item.id === id
    })
    tasks.splice(index, 1)
    renderTodo(tasks) // rendering the whole todos again
}

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
    const todoDiv: HTMLDivElement = document.createElement('div')
    todoDiv.className = "task"

    const checkBoxAndPDiv: HTMLDivElement = document.createElement('div')
    checkBoxAndPDiv.className = "checkBoxAndP"

    const todoCheck: HTMLInputElement = document.createElement('input')
    todoCheck.setAttribute('type', 'checkbox')
    todoCheck.className = "taskCheck"
    todoCheck.checked = isCompleted // giving it the default value to be false

    todoCheck.addEventListener('change', () => {
        todoTaskName.className = todoCheck.checked ? "textCut" : "taskText"
        todoDiv.className = todoCheck.checked ? "disabledBackground" : "task"

        tasks.find((item) => {
            if(item.id === id){
                item.isCompleted = todoCheck.checked
            }
        })
    })

    const todoTaskName: HTMLParagraphElement = document.createElement('p')
    todoTaskName.className = "taskText"
    todoTaskName.className = todoCheck.checked ? "textCut" : "taskText"
    todoDiv.className = todoCheck.checked ? "disabledBackground" : "task"
    todoTaskName.textContent = title

    const deleteBtn: HTMLButtonElement = document.createElement('button')
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
    deleteBtn.className = "deleteBtn"

    deleteBtn.addEventListener ('click', () => deleteTask(id)) // function to delete a task

    checkBoxAndPDiv.append(todoCheck, todoTaskName)

    // appending all the elements in todoDiv
    todoDiv.append(checkBoxAndPDiv, deleteBtn)

    // appending todoDiv to the todoContainer
    todoContainer.append(todoDiv)
}

const renderTodo = (todos: Todo[]) => {
    todoContainer.innerText = "" // Emptying the todo container before adding a new task

    // accessing all the elements of the todos array using forEach() function
    todos.forEach((item) => {
        // calling this function to generate the whole tasks container
        generateTodoItem(item.title, item.isCompleted, item.id)
    })
}

myForm.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault()

    // creating an object of the todo with 3 basic properties
    const todo: Todo = {
        title: taskInput.value,
        isCompleted: false,
        id: String(Math.round(Math.random() * 100000))
    }

    tasks.push(todo) // pushing the objects in the array 'tasks'

    taskInput.value = "" // erasing the written text of the input field

    // Calling render todo function to display all the added tasks
    renderTodo(tasks)
})