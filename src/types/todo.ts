export interface TodoProps {
  id: string;
  text: string;
  todo?: string;
  status?: string;
}

export type TodoItemProps = {
  todo: TodoProps;
  onUpdate: (updatedTodo: TodoProps) => void;
  onDelete: (deletedTodo: TodoProps) => void;
  
};

export type AddTodoProps = {
  onAdd: (todo: TodoProps) => void;
}