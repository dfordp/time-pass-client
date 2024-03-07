import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { FaCheck, FaTrash } from 'react-icons/fa';


const Page = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(''); 
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    const token = Cookies.get('Authorization');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);


  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/task/getTasksByUser/${userId}`, {
        headers: {
          'Authorization': `${Cookies.get('Authorization')}`
        },
        withCredentials: true
      });
      setTasks(response.data)
    };
    fetchTasks();
  }, []);


  const handleAdd = async () => { 
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/task/createTask`,{
        task : input,
        userId : localStorage.getItem('userId')
    }, {
        headers: {
          'Authorization': `${Cookies.get('Authorization')}`
        },
        withCredentials: true
      });
    console.log(response.data);
    setTasks(prevTasks => [...prevTasks, response.data]);
    setInput('');
  }


  const handleComplete = async (taskId) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/task/updateTask/${taskId}`, {
        isComplete : true,
      }, {
        headers: {
          'Authorization': `${Cookies.get('Authorization')}`
        },
        withCredentials: true
      });
      console.log(response.data);
      setTasks(tasks.map(task => task._id === taskId ? {...task, isComplete: true} : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
  
  const handleDelete = async (taskId) => {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/task/deleteTask/${taskId}`, {
      headers: {
        'Authorization': `${Cookies.get('Authorization')}`
      },
      withCredentials: true
    });
    console.log(response.data);
    setTasks(tasks.filter(task => task._id !== taskId));
  }


  return (
    <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex flex-row justify-center mt-16">
            To-Do List
        </h1>
        <div className='my-10 flex flex-row justify-between items-center outline outline-2 w-[500px] h-[50px] rounded-md mx-auto px-2'>
            <input placeholder='Add your task' onChange={(e)=>{setInput(e.target.value)}} className='w-full outline-none'/>
            <button type='submit' onClick={handleAdd} className='w-8 h-[30px] bg-black text-white rounded-md justify-end'>+</button>
        </div>
        {tasks.map((task, index) => (
            <div key={index} className='flex flex-row justify-center my-2'>
            {!task.isComplete &&
                <div className='bg-gray-100 w-[500px] h-[50px] rounded-md font-semibold flex flex-row justify-between items-center px-2'>
                    <FaCheck opacity={0.25} onClick={() => handleComplete(task._id)}/>
                    {task.task}
                    <FaTrash opacity={0.25} onClick={() => handleDelete(task._id)}/>
                </div>      
            } 
          </div>
        ))}
        <div className='flex flex-row justify-center font-semibold my-6'>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Completed Tasks
            </h3>
        </div>
        {tasks.map((task, index) => (
            <div key={index} className='flex flex-row justify-center my-2'>
            {task.isComplete &&
                <div className='bg-gray-100 opacity-60 w-[500px] h-[50px] rounded-md font-semibold flex flex-row justify-between items-center px-2'>
                    <FaCheck opacity={0.25} onClick={() => handleComplete(task._id)}/>
                    {task.task}
                    <FaTrash opacity={0.25} onClick={() => handleDelete(task._id)}/>
                </div>      
            } 
          </div>
        ))}
    </div>
  )
}

export default Page;

