import React, { useState, useRef, useEffect } from "react"
import TodoList from "./TodoList"
import { v4 as uuidv4 } from "uuid"
import "./App.css"
// import Todo from "./Todo"

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
	const [todos, setTodos] = useState([])
	const todoNameRef = useRef()

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if (storedTodos) setTodos(storedTodos)
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
	}, [todos])

	function toggleTodo(id) {
		const newTodos = [...todos]
		const todo = newTodos.find((todo) => todo.id === id)
		todo.complete = !todo.complete
		setTodos(newTodos)
	}

	function handleAddTodo(e) {
		const name = todoNameRef.current.value
		if (name === "") return
		setTodos((prevTodos) => {
			return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
		})
		todoNameRef.current.value = null
	}

	function handleClearTodos() {
		const newTodos = todos.filter((todo) => !todo.complete)
		setTodos(newTodos)
	}

	function handleClearTodo(id) {
		const newTodos = todos.filter((todo) => todo.id !== id)
		setTodos(newTodos)
	}

	function changeTheme() {
		document.body.classList.toggle("dark")
	}

	return (
		<div className="app">
			<div className="appHeader">
				<button onClick={changeTheme}>
					<img
						src={
							"https://cdn-icons-png.flaticon.com/512/606/606807.png"
						}
						length={15}
						width={15}
						alt=""
					/>
					Change Theme
				</button>
			</div>
			<h1>Todo List</h1>
			<form>
				<input ref={todoNameRef} type="text" />
				<button onClick={handleAddTodo} className="addTodoBtn">
					Add Todo
				</button>
			</form>
			<p>({todos.filter((todo) => !todo.complete).length} Left To Do)</p>
			<div className="todoList">
				<TodoList
					todos={todos}
					toggleTodo={toggleTodo}
					handleClearTodo={handleClearTodo}
				/>
			</div>
			<button onClick={handleClearTodos} className="btn">
				Clear Complete
			</button>
		</div>
	)
}

export default App
