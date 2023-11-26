import React from "react";
import { toast } from 'react-toastify';
class AddTodo extends React.Component {

    state = {
        title: ''
    }

    handleOnChangeTitle = (event) => {
        this.setState({
            title: event.target.value

        })
    }

    handleAddTodos = () => {
        if (!this.state.title) {
            toast.error("Missing title's Todo")
            return;
        }
        let todo = {
            id: Math.floor(Math.random() * 100000),
            title: this.state.title,
        }
        this.props.addNewTodo(todo);
        this.setState({
            title: ''
        }
        )
    }


    render() {
        let { title } = this.state;
        return (
            <div className="add-todo">
                <input type="text" value={title}
                    onChange={(event) => this.handleOnChangeTitle(event)}
                />
                <button type="button" className="add"
                    onClick={() => this.handleAddTodos()}
                >ADD</button>
            </div>
        )
    }
}

export default AddTodo;