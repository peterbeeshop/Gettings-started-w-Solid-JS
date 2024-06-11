import { Component, createSignal } from 'solid-js'
import './index.css'
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
    const [text, setText] = createSignal<string>('')
    const [isDialogOpen, setIsDialogOpen] = createSignal(false);
    const [isErrors, setIsErrors] = createSignal(false);

    const addTodo = () => {
        if (text() !== '') {
            setTodos([...todos(), {id: Math.floor(Math.random() * 100), title: text(), isCompleted: false}])
            setText('');
        }else {
            setIsErrors(!isErrors());
            console.log('here', isErrors())
        }
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
      <div class='container'>
        <h2>Todos</h2>
       <div>
        <input type='text' value={text()} onInput={(e) => setText(e.currentTarget.value)} />
        {isErrors() && <p style={{color: 'red'}}>Enter a title</p>}
       </div>
        <button onClick={addTodo}>Create Todo</button>
        <h3>My Todos</h3>
        {
            todos().map(todo => {
                const {id, title, isCompleted} = todo;
                return (
                    <>
                        <AlertDialog todo={todo} todos={todos} setTodos={setTodos} isDialogOpen={isDialogOpen} setIsDailogOpen={setIsDialogOpen} />
                        <div class='todo-container'>
                            <input onClick={() => toggleIsTodoComplete(id)} type='checkbox' id={title} checked={isCompleted} />
                            {isCompleted? <h3><s>{title}</s></h3> : <h3>{title}</h3>}
                            <PencilIcon onclick={() => {
                                setIsDialogOpen(!isDialogOpen());
                                console.log('isDialogOpen', isDialogOpen());
                            }} color='info' />
                            <DeleteIcon onclick={() => deleteTodo(id)} color='error' />
                        </div>
                    </>
                )
            })
        }
      </div>
    )
  }
  
  export default Todo