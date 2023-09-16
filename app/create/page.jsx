"use client"
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react"
import { MailIcon } from '../components/MailIcon'
import { LockIcon } from '../components/LockIcon'
import{motion} from "framer-motion"
import {signIn} from "next-auth/react"
import { useRouter } from 'next/navigation'
const Page = () => {
    const[email, setEmail] = useState("")
    const[key,setKey]=useState("")
    const router = useRouter()

    const handelClick = async(e) =>{
        e.preventDefault()
        const res = await signIn("credentials",{
            redirect:false,
            email,
            password:key,
        })
        if(res.error === 'CredentialsSignin'){
            alert("Key exists")
        }else{
            router.push("/")
        }
        
        
    }

    return (
        <div>
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
                        <ModalHeader className="flex flex-col gap-1">Create Authenticate Key</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                               
                                label="Name"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your name"
                                variant="bordered"
                            />
                            <Input
                                endContent={
                                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="New key"
                                placeholder="Enter your key"
                                onChange={(e) => setKey(e.target.value)}
                                type="password"
                                variant="bordered"
                            />
                            
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" >
                                Back
                            </Button>
                            <Button onClick={(e)=>handelClick(e)} color="primary" >
                                Create
                            </Button>
                        </ModalFooter>
                    </motion.div>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Page