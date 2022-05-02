import React from "react"

export default function Todo({ todo, toggleTodo, handleClearTodo }) {
	return (
		<>
			<div className={todo.complete ? "todo complete" : "todo"}>
				{todo.name}
				<button
					className="todoBtn"
					onClick={() => {
						toggleTodo(todo.id)
					}}
				>
					Toggle
				</button>
				<button
					className="todoBtn"
					onClick={() => {
						handleClearTodo(todo.id)
					}}
				>
					Delete
				</button>
			</div>
		</>
	)
}
