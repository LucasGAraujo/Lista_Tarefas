import React, {useState, useEffect} from "react";
import './TodoList.css'
import  images from './assets/images.jpg'

function TodoList(){
    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) :[]);
    const [novoItem, setNovoItem] = useState([]);
    useEffect(() => {
        localStorage.setItem('Lista' , JSON.stringify(lista));
    },[lista])

    function adicionaitem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setLista([...lista,{text:novoItem,isCompleted:false}]);
        setNovoItem("");
        document.getElementById("input_entrada").focus();
    }
    function clicou(index){
        const listaAux =[...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }
    function deletatodos(){
        
        setLista("");
    }
    function deleta(index){
        const listaAux =[...lista];
        listaAux.splice(index,1);
        setLista(listaAux)
    }

    return (
        <div>
            <h1>Lista de tarefas</h1>
            <form onSubmit={adicionaitem}>
                <input 
                id="input_entrada"
               type="text"
               value={novoItem}
               onChange={(e) =>{setNovoItem(e.target.value)}}
               placeholder="Adicione uma tarefa" />
               <button type="submit" className="add">Adicione</button>
            </form>
            <div className="lista_tarefas">
                <div style={{textAlign:'center'}}>
                {
                    lista.length <1
                    ?
                    <img className="icon" src={images} />
                    :
                    lista.map((item, index) =>(
                    <div key={index}
                    className={item.isCompleted ? "item completo" : "item" }>
                    <span onClick={() =>{clicou(index)}}>{item.text}</span>  
                    <button onClick={() =>{deleta(index)}} className="del" >Delete</button> 
                    </div> 
                    ))
                }      
                {
                    lista.length > 0 &&
                    <button onClick={() =>{deletatodos()}} className="deleteall">Deletar todas Tarefas</button> 
                }
                
            </div>
            </div>

        </div>
    )
}
export default TodoList