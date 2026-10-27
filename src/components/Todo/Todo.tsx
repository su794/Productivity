import { FaTrashAlt } from "react-icons/fa";
import styles from './Todo.module.css';
import Button from '../Button/Button';
import type { Todo } from "../../types/todo";

export default function Todo({ todo, onUpdate, onDelete }: Todo) {
  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let status = ( e.target.checked ? 'completed' : 'active' );
    onUpdate({...todo, status});
}

const handleDelete = () => {
    onDelete(todo);
}
  return (
    <li key={todo.id} className={styles.todo}>
        <input className={styles.checkbox} type="checkbox" checked={ ( todo.status === 'completed' )} onChange={handleUpdate} />
        <label className={styles.text}>{ todo.text }</label>
        <span >
            {/* <button className={styles.icon} onClick={handleDelete}>
                <FaTrashAlt />
            </button> */}
            <Button className={styles.icon} text={<FaTrashAlt />} onClick={handleDelete} />
        </span>
    </li>
  )
}
