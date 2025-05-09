// Seleccionar elementos del DOM
const ingresarTarea = document.getElementById('ingresar-tarea')
const botonAgregar = document.getElementById('boton-agregar')
const listaTareas = document.getElementById('lista-tareas')

// Obtener tareas del localStorage
function obtenerTareasLocalStorage() {
  const tareas = localStorage.getItem('tareas')
  if (tareas !== null) {
    return JSON.parse(tareas)
  } else {
    return []
  }
}

// Guardar tareas en localStorage
function guardarTareasLocalStorage(tareas) {
  localStorage.setItem('tareas', JSON.stringify(tareas))
}

// Mostrar tareas en el DOM
function mostrarTareas() {
  const tareas = obtenerTareasLocalStorage()
  listaTareas.innerHTML = ''

  tareas.forEach((texto, index) => {
    const tareaDiv = document.createElement('div')
    tareaDiv.className = 'tarea'

    const textoTarea = document.createElement('p')
    textoTarea.className = 'texto-tarea'
    textoTarea.textContent = texto

    const botonesDiv = document.createElement('div')
    botonesDiv.className = 'botones-tarea'

    const btnOk = document.createElement('button')
    btnOk.className = 'btn_ok'
    btnOk.textContent = '✔︎'
    btnOk.onclick = () => completarTarea(index)

    const btnEliminar = document.createElement('button')
    btnEliminar.className = 'btn_eliminar'
    btnEliminar.textContent = '✘'
    btnEliminar.onclick = () => eliminarTarea(index)

    botonesDiv.appendChild(btnOk)
    botonesDiv.appendChild(btnEliminar)
    tareaDiv.appendChild(textoTarea)
    tareaDiv.appendChild(botonesDiv)
    listaTareas.appendChild(tareaDiv)
  })
}

// Marcar tarea como completada visualmente
function completarTarea(index) {
  const tareasDOM = document.querySelectorAll('.tarea')
  tareasDOM[index].classList.toggle('completada')
}

// Eliminar tarea
function eliminarTarea(index) {
  const tareas = obtenerTareasLocalStorage()
  tareas.splice(index, 1)
  guardarTareasLocalStorage(tareas)
  mostrarTareas()
}

// Crear una nueva tarea
function nuevaTarea() {
  const texto = ingresarTarea.value.trim()
  if (texto === '') return

  const tareas = obtenerTareasLocalStorage()
  tareas.push(texto)
  guardarTareasLocalStorage(tareas)
  ingresarTarea.value = ''
  mostrarTareas()
}

// Eventos
botonAgregar.addEventListener('click', nuevaTarea)
ingresarTarea.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') nuevaTarea()
});

// Mostrar tareas al cargar
window.addEventListener('load', mostrarTareas)


