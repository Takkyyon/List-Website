const textarea = document.querySelector('textarea')
const add_button = document.getElementById('add_button')
const task_container = document.querySelector('.task_container')

let task_list = []

function initial_load() {
    if (!localStorage.getItem('tasks')) {return}
    task_list = JSON.parse(localStorage.getItem('tasks')).task_list
    update_ui()
}

initial_load()

function add_task() {
    const task = textarea.value
    if (!task) {return}

    console.log(`Add Task: ${task}`)
    task_list.push(task)
    textarea.value = '' // resets the textarea field
    update_ui()
}

function edit_task(index) {
    textarea.value = task_list[index]
    task_list = task_list.filter((element, element_index) => {
        if (index === element_index) {return false}
        return true
    })
    update_ui()
}

function delete_task(index) {
    task_list = task_list.filter((element, element_index) => {
        if (index === element_index) {return false}
        return true
    })
    update_ui()
}

function update_ui() {
    let newInnerHTML = ''

    task_list.forEach((task_element, task_index) => {
        newInnerHTML += `
        <div class="tasks">
                <p>${task_element}</p>
                <div class="button_container">
                    <button class="icon_button" onclick='edit_task(${task_index})'><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="icon_button" onclick='delete_task(${task_index})'><i class="fa-regular fa-xmark"></i></button>
                </div>
            </div>
            `
    })

    task_container.innerHTML = newInnerHTML

    // To save to local storage
    localStorage.setItem('tasks', JSON.stringify({ task_list }))
}

add_button.addEventListener('click', add_task)