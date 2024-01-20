import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({todo, index, onDeleteTodo}) => {
  return (
    <TodoWrapper>
    <Text textAlign="center" marginBottom="20px">
      TODO {index}
    </Text>
    <Text>{todo.text}</Text>
    <DeleteButton type="button" onClick={() => onDeleteTodo(todo.id)}>
      <RiDeleteBinLine size={24} />
    </DeleteButton>
  </TodoWrapper>
  );
};
