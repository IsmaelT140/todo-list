import React from "react"

export default function Todo({ todo, toggleTodo, handleClearTodo }) {
	return (
		<>
			<div className={todo.complete ? "todo complete" : "todo"}>
				{todo.name}
				<section>
					<button
						className="todoBtn toggleBtn"
						onClick={() => {
							toggleTodo(todo.id)
						}}
					>
						{"\u2714"}
					</button>
					<button
						className="todoBtn"
						onClick={() => {
							handleClearTodo(todo.id)
						}}
					>
						{"\u2716"}
					</button>
				</section>
			</div>
		</>
	)
}
