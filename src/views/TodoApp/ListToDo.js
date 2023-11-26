import React from "react";
import './ListTodo.scss';
import AddTodo from "./AddTodo";
import { toast } from 'react-toastify';
import { getConfig } from "@testing-library/react";
class ListTodo extends React.Component {

    state = {
        listTodos: [
            { id: 'todo1', title: 'Doing homework' },
            { id: 'todo2', title: 'Making video' },
            { id: 'todo3', title: 'Fixing bugs' },
        ],
        editTodo: {

        }
    }

    addNewTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo],
        })

        toast.success("Wow so easy!")
    }

    handleDeleteTodo = (todo) => {

        let currentTodos = this.state.listTodos;
        currentTodos = currentTodos.filter(item => item.id !== todo.id);
        this.setState({
            listTodos: currentTodos,
        })
        toast.success("Delete succcess")
    }

    handleEditTodo = (todo) => {
        let { editTodo, listTodos } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        if (isEmptyObj === false && editTodo.id === todo.id) {

            let listTodoCopy = [...listTodos];

            let objIndex = listTodoCopy.findIndex((item => item.id === todo.id));

            listTodoCopy[objIndex].title = editTodo.title;

            this.setState({
                listTodos: listTodoCopy,
                editTodo: {}
            })
            toast.success("Edit succcess")
            return;
        }
        this.setState({
            editTodo: todo
        })
    }

    handleOnChangeEditTodo = (event) => {
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = event.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }
    render() {

        let { listTodos, editTodo } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0
        return (
            <div className="list-todo-container">
                <AddTodo
                    addNewTodo={this.addNewTodo}
                />
                <div className="list-todo-content" >
                    {listTodos && listTodos.length > 0 &&
                        listTodos.map((item, index) => {
                            return (
                                <div className="todo-child" key={item.id}>
                                    {isEmptyObj === true ?
                                        <span>{index + 1} - {item.title}
                                        </span>
                                        :
                                        <>
                                            {editTodo.id === item.id ?
                                                <span>
                                                    {index + 1} -<input
                                                        value={editTodo.title}
                                                        onChange={(event) => this.handleOnChangeEditTodo(event)}
                                                    />
                                                </span>
                                                :
                                                <span>
                                                    {index + 1} - {item.title}
                                                </span>
                                            }
                                        </>

                                    }
                                    <button className="edit"
                                        onClick={() => {

                                            if (isEmptyObj === true) {
                                                this.handleEditTodo(item);
                                            } else {
                                                if (window.confirm(' Do you want save this ?')) {
                                                    this.handleEditTodo(item);
                                                };
                                            }
                                        }}
                                    >
                                        {isEmptyObj === false && editTodo.id === item.id ?
                                            'Save' : 'Edit'
                                        }
                                    </button>
                                    <button className="delete"
                                        onClick={() => { if (window.confirm('Do you want delete this ?')) { this.handleDeleteTodo(item) }; }}
                                    >Delete</button>

                                </div>
                            )
                        })
                    }



                </div>
            </div>
        )
    }

}
export default ListTodo;