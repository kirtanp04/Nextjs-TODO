"use client"
import React, { useEffect, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useParams, useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import Todo from '@/app/components/Todo';
import AddTodoModal from '@/app/components/AddTodoModal';
import { logOut } from '@/app/server/addTodo';



const Page = () => {
    // const params = useParams()
    const [todo,setTodo] = useState([])
    const [addModal, setAddModal] = useState(false)
    // const { name } = params
    const router = useRouter()
    const todoData = async() =>{
        const data = await fetch('/api/gettodo',{
            next:{
                tags:['todo'],
                revalidate:2
            },
            cache: 'force-cache' 
        })
        const response = await data.json()
        if(response){

            setTodo(response.data.todo)
        }
    }
    const handelLogout = async(e) =>{
        e.preventDefault()
        const res = await logOut()
        if(res === true){
            router.push('/')
        }
    }
    useEffect(()=>{
        todoData()
    },[])
    return (
        <>
            <div className='h-screen'>
                <motion.div initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, type: "spring" }}>
                    <Navbar maxWidth='full'>
                        <NavbarBrand>
                            <motion.p
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, type: "spring", delay: 0.5 }}
                                className="font-bold text-3xl text-center font-serif text-white">NextJS Todo</motion.p>
                        </NavbarBrand>

                        <NavbarContent justify="end">
                            <NavbarItem>
                                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, type: "spring", delay: 0.5 }}>
                                    <Button as={Link} onClick={(e)=>handelLogout(e)} color="warning" variant="solid">
                                        Logout
                                    </Button>
                                </motion.div>
                            </NavbarItem>
                        </NavbarContent>
                    </Navbar>
                </motion.div>


                <div className='max-w-6xl mx-auto flex flex-col gap-4' style={{
                    marginTop: "100px"
                }}>
                    <motion.div
                            
                        initial={{
                            scale: 0,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.9,
                            type: "spring",
                            delay: 0.5
                        }}
                        className='w-2' >
                        <Button className='shadow-xl' color="warning" variant="solid" onClick={() => setAddModal(true)}>Add New Task</Button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, type: "spring" }}
                    >
                        <Todo todo={todo} todoData={todoData} />

                    </motion.div>
                </div>
            </div>
            <AddTodoModal todoData={todoData} isOpen={addModal} setAddModal={setAddModal} />
        </>
    )
}

export default Page