"use client"
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { LockIcon } from './LockIcon';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { Login } from '../server/loginAction';

const LoginModal = () => {
    const[key,setKey]=useState("")
    const router = useRouter();
    const[login,setLogin] = useState(false)
    const handelCheck = async(e) =>{
        e.preventDefault()
        if(key !== ""){
            setLogin(false)
           const response = await Login(key)
           if(response !== null){
            setLogin(true)
            router.push(`/todo`)
           }else{
            alert("Invalid Key")
           }
        }
    }
    return (
        <div
            className='w-1 h-2'
        >
            <Modal
                isOpen={true}
                placement="top-center"
                backdrop='blur'
                hideCloseButton
            >
                <ModalContent>
                    <motion.div initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}>
                        <ModalHeader className="flex flex-col gap-1">Authentication</ModalHeader>
                        <ModalBody>
                            <Input
                                endContent={
                                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Key"
                                onChange={(e) => setKey(e.target.value)}
                                placeholder="Enter your key"
                                type="password"
                                variant="bordered"
                            />

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => router.push('/create')} color="danger" variant="flat" >
                                Create Key
                            </Button>
                            <Button isLoading={login} onClick={(e)=>handelCheck(e)} color="primary" >
                                Check it
                            </Button>
                        </ModalFooter>

                    </motion.div>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default LoginModal