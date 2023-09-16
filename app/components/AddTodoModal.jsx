"use client"
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { AddTodo } from '../server/addTodo';
const AddTodoModal = ({ isOpen, setAddModal, todoData }) => {
    const [title, setTitle] = useState("")
    const [task, setTask] = useState("")
    const [loading, setLoading] = useState(false)
    const handelClick = async (e) => {
        e.preventDefault()
        if (title !== "" && task !== "") {
            setLoading(true)
            const response = await AddTodo(title, task)
            if (response === true) {
                todoData()
                setTitle("")
                setTask("")
                setLoading(false)
                setAddModal(false)
            } else {
                setLoading(false)
                alert("server error")
            }
        }


    }
    return (
        <div>

            <Modal
                isOpen={isOpen}
                placement="top-center"
                backdrop='blur'
                hideCloseButton
            >
                <ModalContent>
                    <motion.div

                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        exit={{ opacity: 0, scale: 0 }}
                    >

                        <ModalHeader className="flex flex-col gap-1">Add Todo</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Title"
                                placeholder="Enter your todo title"
                                variant="bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Input
                                label="Task"
                                placeholder="Enter your todo task"
                                type="text"
                                variant="bordered"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                            />

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => setAddModal(false)} color="danger" variant="flat" >
                                Close
                            </Button>
                            <Button onClick={(e) => handelClick(e)} isLoading={loading} color="primary" >
                                Make Todo
                            </Button>
                        </ModalFooter>
                    </motion.div>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default AddTodoModal