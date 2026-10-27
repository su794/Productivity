interface TodoProps {
  id: string;
  text: string;
  todo: string;
  status: string;
}

export type Todo = {
  todo: TodoProps;
  onUpdate: (updatedTodo: TodoProps) => void;
  onDelete: (deletedTodo: TodoProps) => void;
};