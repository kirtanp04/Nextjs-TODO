import React, { useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { deleteTodo, updateTodo } from '../server/addTodo';


const Todo = ({ todo,todoData }) => {
    const [showDelay, setShowDelay] = React.useState(true)
    const[loading,setLoading] = React.useState(false)
    const[updatedData,setUpdatedData] = React.useState({
        title:"",
        task:"",
        status:""
    })
    const handelUpdate = async(e,id) => {
        e.preventDefault()
        setLoading(true)
        const response = await updateTodo(updatedData,id)
        if(response){
            await todoData()
            setUpdatedData({
                title:"",
                task:"",
                status:""
            })
            setLoading(false)
        }
    }
    const handelDelete = async(e,id) => {
        e.preventDefault()
        setLoading(true)
        const response = await deleteTodo(id)
        if(response){
            await todoData()
            setLoading(false)
        }
        
    }
    useEffect(() => {
        setTimeout(() => {
            setShowDelay(false)
        }, 10000)
    }, [])

    return (
        <div>
            <Table
                color="default"
                selectionMode="single"
                defaultSelectedKeys={["2"]}
                aria-label="Example static collection table"
                fullWidth={false}
                className='shadow-xl'
            >
                <TableHeader>
                    <TableColumn>Titlle</TableColumn>
                    <TableColumn>Task</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        todo.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <motion.p initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: "spring", delay: showDelay ? index * 0.5 : 0 }} exit={{ opacity: 0, scale: 0 }}>
                                            {item.title}
                                        </motion.p>
                                    </TableCell>
                                    <TableCell>
                                        <motion.p initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: "spring", delay: showDelay ? index * 0.5 : 0 }} exit={{ opacity: 0, scale: 0 }}>
                                            {item.task}
                                        </motion.p>
                                    </TableCell>
                                    <TableCell>
                                        <motion.p initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: "spring", delay: showDelay ? index * 0.5 : 0 }} exit={{ opacity: 0, scale: 0 }}>
                                            {item.date}
                                        </motion.p>
                                    </TableCell>
                                    <TableCell>
                                        <motion.p initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: "spring", delay: showDelay ? index * 0.5 : 0 }} exit={{ opacity: 0, scale: 0 }}>
                                            <Chip color={item.status === "pending" ? "danger" : "success"}>
                                                {item.status}
                                            </Chip>
                                        </motion.p>
                                    </TableCell>
                                    <TableCell>
                                        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: "spring", delay: showDelay ? index * 0.5 : 0 }} exit={{ opacity: 0, scale: 0 }}>

                                            <Popover placement="top" backdrop='opaque' offset={10} showArrow>
                                                <PopoverTrigger>
                                                    <Chip radius="md">Update</Chip>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <div className="px-1 py-2">
                                                        <div className="text-small font-bold">Update Todo.</div>
                                                        <div className="text-tiny flex flex-col gap-1 mt-2 ">
                                                            <Input type="text" name='title' onChange={(e)=>setUpdatedData({ ...updatedData, title: e.target.value })} variant="bordered" placeholder={item.title} value={updatedData.title} />
                                                            <Textarea name='task' onChange={(e)=>setUpdatedData({ ...updatedData, task: e.target.value })} variant="bordered" placeholder={item.task} value={updatedData.task} />
                                                            <RadioGroup
                                                                orientation="horizontal"
                                                                defaultChecked={item.status}
                                                                defaultValue={item.status}
                                                                onChange={(e) => setUpdatedData({ ...updatedData, status: e.target.value })}
                                                            >
                                                                <Radio value="pending">pending</Radio>
                                                                <Radio value="completed">completed</Radio>
                                                            </RadioGroup>
                                                            <Button isLoading={loading} color="default" onClick={(e) => handelUpdate(e, index)}>Update</Button>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>

                                            <Chip className='ml-2' radius="md" variant="bordered" onClick={(e) => handelDelete(e, index)}>Delete</Chip>
                                        </motion.div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default Todo