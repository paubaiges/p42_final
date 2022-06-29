import React, {useState, useRef, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import axios from 'axios';


const LOCAL_STORAGE_KEY = 'todoApps.todos'

function Home() {
  const [todos, setTodos] = useState([{id: Math.floor(Math.random() * 100), name: 'Todo 1', complete: true}])
  let otro
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
      window.location.href = '/game/'+ name + "/" + pista;
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

  function comprobar(checkbox){
    otro = checkbox.parentNode.querySelector("[type=checkbox]:not(#" + checkbox.id + ")");
 
    if (otro.checked){
        otro.checked = false;
    }
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
        <link rel="stylesheet" href="index.css"/>
      </head>
    

      <form name="f1">
        <div class="style">
          <h1> BEAT ME </h1>
        </div>
        
        <h2> Select the rhythm that you will perform: </h2>
        <div class='video1'>
          <video width="500" height="300" controls>
            <source src="video_home.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </div>
        

          <h2> Track 1</h2>

        <div class= 'check1'>
          <input type="checkbox" id="check1" name="check1" value="1" class="valores"/>
        </div>

          <h2> Track 2</h2>
        <div class= 'check2'>
          <input type="checkbox" id="check2" name="check2" value="2" class="valores"/>
        </div>

        <h2> Track 3</h2>

        <div class= 'check3'>
        <input type="checkbox" id="check3" name="check3" value="3" class="valores"/>
        </div>
        <h2> Track 4</h2>

        <div class= 'check4'>
        <input type="checkbox" id="check4" name="check4" value="4" class="valores"/>
        </div>
        <h2> Track 5</h2>

        <div class= 'check5'>
        <input type="checkbox" id="check5" name="check5" value="5" class="valores"/>
        </div>
        <h2> Track 6</h2>

        <div class= 'check6'>
        <input type="checkbox" id="check6" name="check6" value="6" class="valores"/>
        </div>
        <h2> Track 7</h2>

        <div class= 'check7'>
        <input type="checkbox" id="check7" name="check7" value="7" class="valores"/>
        </div>
        <h2> Track 8</h2>

        <div class= 'check8'>
        <input type="checkbox" id="check8" name="check8" value="8" class="valores"/>
        </div>
        <h2> Track 9</h2>

        <div class= 'check9'>
        <input type="checkbox" id="check9" name="check9" value="9" class="valores"/>
        </div>    
        <h2> Track 10</h2>

        <div class= 'check10'>
        <input type="checkbox" id="check10" name="check10" value="10" class="valores"/>
        </div>  
        <h2> Track 11</h2>

        <div class= 'check11'>
        <input type="checkbox" id="check11" name="check11" value="11" class="valores"/>
        </div>  
        <h2> Track 12</h2>

        <div class= 'check12'>
        <input type="checkbox" id="check12" name="check12" value="12" class="valores"/>
        </div>
        <h2> Track 13</h2>

        <div class= 'check13'>
        <input type="checkbox" id="check13" name="check13" value="13" class="valores"/>
        </div>
        <h2> Track 14</h2>

        <div class= 'check14'>
        <input type="checkbox" id="check14" name="check14" value="14" class="valores"/>
        </div>
  

      </form>
      <div class='user'>
        <input ref={todoNameRef} type="text" size="50" />
      </div>
      <div class='play'>
        <button onClick={playPista}> Play </button>
      </div>

    </>
  )

}

export default Home;
