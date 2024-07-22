// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Listeners
cargarEventListeners();

function cargarEventListeners(){
  // dispara evento agregar carrito
  cursos.addEventListener('click', comprarCurso);
  // dispara evento eliminar del carrito
  carrito.addEventListener('click', eliminarCurso);
  // Al vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}
// Funciones
function comprarCurso(e){
  e.preventDefault();
  // delegation para agregar carrito
  if(e.target.classList.contains('agregar-carrito')){
     const curso = e.target.parentElement.parentElement;
     leerDatosCurso(curso);
  }
}
// Lee los datos del curso
function leerDatosCurso(curso){
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  }
  insertarCarrito(infoCurso);
}
//Inserta los productos en el carrito
function insertarCarrito(curso){
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width=100>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${curso.id}
      ">X</a>
    </td>
  `;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}
// Elimina el curso del Carrito
function eliminarCurso(e) {
  e.preventDefault();

  let curso,
      cursoId;
  if(e.target.classList.contains('borrar-curso') ) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector('a').getAttribute('data-id');
  }
  eliminarCursoLocalStorage(cursoId);
}
// Elimina los cursos en el carrito en el DOM
function vaciarCarrito(){
  // forma rapida
  // listaCursos.innerHTML = '';
  // forma rapida (recomendada)
  while(listaCursos.firstChild){
    listaCursos.removeChild(listaCursos.firstChild);
  }


  vaciarLocalStorage();

  return false;
}
// Almacena Cursos en el carrito a Local Storage
function guardarCursoLocalStorage(curso) {
  let cursos;
  // toma el valor de un arreglo con datos de LS o vacio
  cursos = obtenerCursosLocalStorage();
  // el curso seleccionado se agrega al localStorage
  cursos.push(curso);

  localStorage.setItem('cursos',JSON.stringify(cursos) );

}

function obtenerCursosLocalStorage(){
  let cursosLS;

  if(localStorage.getItem('cursos') === null ) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'));
  }
  return cursosLS;
}

function leerLocalStorage() {
  let cursosLS;

  cursosLS = obtenerCursosLocalStorage();

  cursosLS.forEach(function(curso){

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${curso.imagen}" width=100>
      </td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}
        ">X</a>
      </td>
    `;
    listaCursos.appendChild(row);
  });

}

function eliminarCursoLocalStorage(curso) {

  let cursosLS;

  cursosLS = obtenerCursosLocalStorage();

  cursosLS.forEach(function(cursoLS, index){
      // console.log(typeof cursoLS.id);
      // console.log(typeof curso);
    if(cursoLS.id === curso) {
      cursosLS.splice(index, 1);
      console.log("true");
    }
  });
  console.log(cursosLS);
  localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

function vaciarLocalStorage(){
  localStorage.clear();
}
