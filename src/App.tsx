import React, { FC, ChangeEvent, useState } from 'react'
import './App.css'
import { TodoTask } from './Components/TodoTask';
import { ITask } from './Interfaces';


const App: FC = () => {

	const [task, setTask] = useState<string>("");
	const [deadline, setDeadline] = useState<number>(0);
	const [measurement, setMeasurement] = useState<string>("");
	const [todoList, setTodoList] = useState<ITask[]>([]);

	const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
		if (event.target.name === 'task') {
			setTask(event.target.value)
		} else if (event.target.name === 'deadline') {
			setDeadline(Number(event.target.value))
		} else{
			setMeasurement(event.target.value)
		}
	}

	const addTask = (): void => {
		const newTask = { taskName: task, deadline: deadline, measurement: measurement }
		setTodoList([...todoList, newTask]);
		setTask("");
		setDeadline(0);
		setMeasurement("")
	}

	const completeTask = (taskNameToDelete: string): void => {
		setTodoList(todoList.filter((task) => {
			return task.taskName != taskNameToDelete
		}))
	}

	return (
		<div className="App">
			<div className='header'>
				<div className='inputContainer'>
					<h2>My shopping list</h2>
					<input
						type="text"
						placeholder='Product...'
						name="task"
						value={task}
						onChange={handleChange}
					/>
					<input
						type="number"
						placeholder='Deadline (in Days)...'
						name='deadline'
						value={deadline}
						onChange={handleChange}
					/>
					<label htmlFor = "measurement"></label>
					<select
						id="measurement"
						name='measurement'
						value={measurement}
						onChange={handleChange}
					>
						<option value="">--measurement--</option>
						<option value = "g">g</option>
						<option value="kg">kg</option>
						<option value="item(s)">item(s)</option>
						<option value="pack(s)">pack(s)</option>
						</select>
				
				<button onClick={addTask}>Add product</button>
				</div>
			</div>
			<div className='todoList'>
				{todoList.map((task: ITask, key: number) => {
					return <TodoTask key={key} task={task} completeTask = {completeTask} />
				})}
			</div>
		</div>
	)
}

export default App
