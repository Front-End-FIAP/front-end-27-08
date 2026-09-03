import { useState, useEffect } from 'react'


const Tarefas = () => {



    //HOOK useState - manipula o estado da variavel e guarda os dados
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    const [campo, setCampo] = useState('');

    //HOOK -useEffect - realiza um efeito colateral, no exemplo validor ira carregar automaticamente
    //as tarefas cadastradas.

    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    }, [tarefas]);

    // funcao adicionar tarefa

    const adicionarTarefa = (e) => {
        e.preventDefault();
        if (!campo.trim()) return;
        // OBJETO NOVA TAREFA
        const novaTarefa = {
            id: Date.now(),
            text: campo,
        };
        //SPREAD - PEGA O VALOR ANTERIOR E ADICIONA O NOVO VALOR
        setTarefas([...tarefas, novaTarefa]);
        //LIMPA A TELA
        setCampo('');
    }
    // funcao remover tarefa
    const removerTarefa = (id) => {
        const apagarTarefa = tarefas.filter((tarefa) => tarefa.id !== id);
        setTarefas(apagarTarefa);
    }

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-10 bg-red-400 rounded-4xl shadow-lg border border-black">
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Minha Lista de Tarefas</h2>


                <form onSubmit={adicionarTarefa} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={campo}
                        onChange={(e) => setCampo(e.target.value)}
                        placeholder="Digite uma nova tarefa..."
                        className="flex-1 px-4 border-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent text-gray-700"
                    />
                    <button type="submit" className="bg-red-500 hover:bg-green-600 font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer">

                        Adicionar
                    </button>
                </form>

                <ul className="space-y-3">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa.id} className="flex items center justify-between p-3 bg-red-300 border border-black rounded-2xl shadow-xl hover:bg-red-500 transition-colors">
                            <span className="text-gray-700">{tarefa.text}</span>
                            {/* arrow function (função seta) que encapsula a execução de outra função. 
            Ela garante que removerTarefa só seja executada quando o evento acontecer (como um clique de botão), 
            e não assim que a página carregar.
            */}
                            <button onClick={() => removerTarefa(tarefa.id)}
                                className="bg-red-500 hover:bg-red-800 text-white font-bold py-1 px-3 rounded transition-colors cursor-pointer"
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>

                {tarefas.length === 0 && <p className="text-center text-red-700 italic mt-4">Nenhuma tarefa salva.</p>}
            </div>


        </>
    )
}



export default Tarefas
