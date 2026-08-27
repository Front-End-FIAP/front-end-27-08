import {useState,useEffect} from 'react'

const Tarefas = () => {

    //HOOK useState - manipula o estado da variavel e guarda os dados
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    const {campo,setCampo}= useState('');

    //HOOK -useEffect - realiza um efeito colateral, no exemplo validor ira carregar automaticamente
    //as tarefas cadastradas.

    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    }, [tarefas]);

  return (
    <>
      
    </>
  )
}

export default Tarefas
