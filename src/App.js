import React, { useState, useRef, useEffect } from "react"
import TodoList from "./TodoList"
import { v4 as uuidv4 } from "uuid"
import "./App.css"

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

	return (
		<div className="app">
			<h1>Todo List</h1>
			<div className="todoList">
				<TodoList todos={todos} toggleTodo={toggleTodo} />
			</div>
			<form>
				<input ref={todoNameRef} type="text" />
				<button onClick={handleAddTodo}>Add Todo</button>
			</form>
			<button onClick={handleClearTodos} className="btn">
				Clear Complete
			</button>
			<p>({todos.filter((todo) => !todo.complete).length} Left To Do)</p>
		</div>
	)
}

export default App
