import { Component, createSignal } from 'solid-js'
import DeleteIcon from "@suid/icons-material/Delete";
import PencilIcon from "@suid/icons-material/Create";
import AlertDialog from '../AlertDialog';
export interface ITodo {
    id: number;
    title: string;
    isCompleted: boolean;
}

const Todo: Component = () => {
    const [todos, setTodos] = createSignal<ITodo[]>([]);
    const [text, setText] = createSignal('')
    const [isDialogOpen, setIsDialogOpen] = createSignal(false);
    
    const addTodo = () => {
        setTodos([...todos(), {id: Math.floor(Math.random() * 100), title: text(), isCompleted: false}])
        setText('');
    }

    const toggleIsTodoComplete = (id: number) => {
        const updatedTodos = todos().map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted}: todo);
        setTodos(updatedTodos);
    }

    const deleteTodo = (id: number) => {
        const updatedTodo = todos().filter(todo => todo.id !== id);
        setTodos(updatedTodo);
    }

    return (
      <div>
        <h2 class='text-2xl py-4 text-center'>Todo App</h2>
        <input 
            class='border-2 rounded border-slate-500 pl-2 outline-0 mr-4' 
            placeholder='Enter title...' 
            type='text' 
            value={text()} 
            onInput={(e) => setText(e.currentTarget.value)} 
        />
        <button
            class={`p-1 rounded ${text() === '' ? 'bg-slate-200' : 'bg-[#0DA5E9]'}`}
            disabled={text() === ''}
            onClick={addTodo}
        >
            Create Todo
        </button>
        <h3 class='text-red-500 text-center text-xl mt-5'>My Todos</h3>
        {
            todos().map(todo => {
                const {id, title, isCompleted} = todo;
                return (
                    <>
                        <AlertDialog todo={todo} todos={todos} setTodos={setTodos} isDialogOpen={isDialogOpen} setIsDailogOpen={setIsDialogOpen} />
                        <div class='flex mt-2'>
                            <input class='mr-2' onClick={() => toggleIsTodoComplete(id)} type='checkbox' id={title} checked={isCompleted} />
                            {isCompleted? <h3 class='text-lg'><s>{title}</s></h3> : <h3 class='text-lg'>{title}</h3>}
                            <PencilIcon class='ml-8' onclick={() => setIsDialogOpen(!isDialogOpen())} color='info' />
                            <DeleteIcon class='ml-2' onclick={() => deleteTodo(id)} color='error' />
                        </div>
                    </>
                )
            })
        }
      </div>
    )
  }
  
  export default Todo