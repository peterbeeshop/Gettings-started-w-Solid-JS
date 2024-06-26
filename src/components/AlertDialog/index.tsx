import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@suid/material";
import { TransitionProps } from "@suid/material/transitions";
import { Accessor, createSignal, JSXElement} from "solid-js";
import {ITodo} from "../Todo";

interface IDialog {
  todo: ITodo;
  todos: Accessor<ITodo[]>;
  setTodos: (value: ITodo[] | ((prev: ITodo[]) => ITodo[])) => void;
  isDialogOpen: Accessor<boolean>;
  setIsDailogOpen: (isDialogOpen: boolean) => void;
}
  
const Transition = function Transition(
  props: TransitionProps & {
    children: JSXElement;
  }
) {
  return <Slide direction="up" {...props} />;
};
  
  export default function AlertDialog({todo, todos, setTodos, isDialogOpen, setIsDailogOpen}: IDialog) {
    const [updatedTitle, setUpdatedTitle] = createSignal('');

    const handleClose = () => {
      setIsDailogOpen(!isDialogOpen);
    };

    const updateTodoTitle = (id: number) => {
      const updatedTodos = todos().map(todo => todo.id === id ? {...todo, title: updatedTitle()}: todo);
      setTodos(updatedTodos)
      setIsDailogOpen(!isDialogOpen);
    }
  
    return (
      <div>
        <Dialog
          open={isDialogOpen()}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle class='text-start'>{"Update Todo item"}</DialogTitle>
          <DialogContentText class="text-center" id="alert-dialog-slide-description">{todo.title}</DialogContentText>
          <DialogContent>
            <input 
              class='border-2 rounded border-slate-500 pl-2 outline-0 mr-4' 
              type="text" 
              value={updatedTitle()} 
              onInput={(e) => setUpdatedTitle(e.currentTarget.value)} 
            />
          </DialogContent>
          <div class='flex items-center justify-center'>
            <Button color="inherit" onClick={handleClose}>Cancel</Button>
            <Button disabled={updatedTitle() === ''} onClick={() => updateTodoTitle(todo.id)}>Update</Button>
          </div>
        </Dialog>
      </div>
    );
  }
  