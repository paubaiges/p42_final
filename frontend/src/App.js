import React, {useState, useRef, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import TodoList from './TodoList';
import axios from 'axios';


const LOCAL_STORAGE_KEY = 'todoApps.todos'

function App() {
  const [todos, setTodos] = useState([{id: Math.floor(Math.random() * 100), name: 'Todo 1', complete: true}])
  let valores = [{id:1, valor:14, pista: "PISTA 1"},{id:2, valor:23, pista: "PISTA 2"}]
  obtenerLocalStorage()
  const pistas = [{Pista: 1, select: false}, {Pista: 2, select:false}, {Pista: 3, select:false}]
  
  const obtenerUsuarios = async() =>{
    try{
      const respuesta = await axios.get("http://127.0.0.1:5000/list_users")

      console.log(respuesta.data)
    }
    catch(error){
      console.log(error)
    }
  }
  function añadirUsuarios(e){
    const name = todoNameRef.current.value 
    try{
      axios.get("http://127.0.0.1:5000/signup_user/" + name)

      
    }
    catch(error){
      console.log(error)
    }
    todoNameRef.current.value = null 
  }

  function playPista(e){
    const name = todoNameRef.current.value 
    var checks = document.querySelectorAll(".valores");
    var pista = ""
  
      checks.forEach((e) => {
        if (e.checked == true){
          console.log(e.value)
          var elemento = document.createElement("li");
          elemento.className = "";
          pista = e.value;
          
        }
      });
    console.log(e.value)
    try{
      
      axios.get("http://127.0.0.1:5000/play_pista/" + name + "/" + pista )
  
    }
    catch(error){
      console.log(error)
    }
    //todoNameRef.current.value = null 
  }
  //añadirUsuarios("Lola")
  obtenerUsuarios()
  //Dentro de data tendremos la info
  
    const todoNameRef = useRef();

  function fake_axios_post(){
    console.log('axios post');
  }

  ///Guardar valores en la pagina cuando refrescas useEffect
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)

    // axios post
    fake_axios_post()
    
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(valores))
  }, [valores])

  ///Hace que pueda canviar el ojeto seleccionado
  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
/*
  ///Añade lo que pones por pantalla
  function handleAddTodo(e) {
    const name = todoNameRef.current.value 
    if (name == '') return 
    setTodos(prevTodos => {
      return [...prevTodos, {id: Math.floor(Math.random() * 100), name: name, complete: false}]
    })
    todoNameRef.current.value = null 
  }*/
  //Nova 
  function handleAddTodo(e) {
    const name = todoNameRef.current.value 
    valores.push({ id: Math.floor(Math.random() * 1000), valor: name , pista: "PISTA 3"});
    console.log(valores);
    ordenarRanking(valores)
    guardarLocalStorage(valores)
    obtenerLocalStorage()
    todoNameRef.current.value = null 
  }
  function handleClearTodos(){
    const newTodos = todos.filter (todo => !todo.complete)
    setTodos(newTodos)
    
  }

  function goToRanking(){
    
  }
 //Ordena ranking
  function ordenarRanking(list){
    list.sort((a, b) => (a.valor < b.valor) ? 1 : -1)
    console.log(list);
  }

  function guardarLocalStorage(list){
    localStorage.setItem("fichero", JSON.stringify(list));
  }

  function obtenerLocalStorage(){
    valores = JSON.parse(localStorage.getItem("fichero"))
  }
/*
  async function hacerPeticion() {
    // Realiza la petición
    const miFetch = await fetch('https://127.0.0.1:5000/list_users');
    // Transforma la respuesta. En este caso lo convierte a JSON
    const json = await miFetch.json();
    // Imprimo por consola
    console.log(json);
  }
  */

/*
  function verifica_seleccion(check){
    if(!check.checked){
        check.checked=1;
    }
  }*/
  return (
    <>
      <head>
        <link rel="stylesheet" href="style.css"/>
      </head>
      <h1> Beat Me </h1>
      < TodoList todos = {todos} toogleTodo= {toggleTodo}/>
      <form name="f1">
        <audio controls>
          <source src="audio1.mp3" type="audio/mp3"/>
          Tu navegador no soporta audio HTML5.
        </audio>  
        <input type="checkbox" id="check1" name="check1" /*onchange={verifica_seleccion(this)}*/ value="Check1" class="valores"/>Check1
        <audio controls>
          <source src="audio1.mp3" type="audio/mp3"/>
          Tu navegador no soporta audio HTML5.
        </audio>
        <input type="checkbox" id="check2" name="check2" /*onchange={verifica_seleccion(this)}*/ value="Check2" class="valores"/>Check2
        <audio controls>
          <source src="audio1.mp3" type="audio/mp3"/>
          Tu navegador no soporta audio HTML5.
        </audio>
        <input type="checkbox" id="check3" name="check3" /*onchange={verifica_seleccion(this)}*/ value="Check3" class="valores"/>Check3
        <input type="submit" value="Enviar"/>
      </form>
      <video controls>
        <source src="hola.mp4" type="video/mp4" />
        Su navegador no reproduce el video
      </video>
      <input ref={todoNameRef} type="text" />
      <button onClick={añadirUsuarios}> Sign Up </button>
      <button onClick={playPista}> Play </button>
      <button onClick={goToRanking}> Ranking </button>
      <div>{todos.filter(todo => !todo.complete).length}</div>
      <Popup trigger={<button> Trigger</button>} position="right center">
        < TodoList todos = {todos} toogleTodo= {toggleTodo}/>
      </Popup>
    </>
  )

}

export default App;
