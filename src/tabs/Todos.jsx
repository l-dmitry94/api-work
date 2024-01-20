import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  onDeleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }))
  }

  onSubmit = value => {
    const todo = {
      text: value,
      id: nanoid(),
    };
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };
  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {todos.map((item, index) => (
            <GridItem key={item.id}>
              <Todo onDeleteTodo={this.onDeleteTodo} todo={item} index={index + 1}/>
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
