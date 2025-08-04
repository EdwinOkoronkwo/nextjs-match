import React from 'react'
import {Button} from "@heroui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {signIn} from "next-auth/react";

export default function SocialLogin() {
    const onSubmit = (provider: 'google' | 'github') => {
        signIn(provider, {
            callbackUrl: '/members'
        })
    }
    return (
        <div className={'flex items-center w-full gap-2'}>
            <Button
                size={'lg'}
                fullWidth={true}
                variant={'bordered'}
                onPress={() => onSubmit('google')}
            >
                <FcGoogle size={20}/>

            </Button>

            <Button
                size={'lg'}
                fullWidth={true}
                variant={'bordered'}
                onPress={() => onSubmit('github')}
            >
                <FaGithub size={20}/>

            </Button>
        </div>
    )
}
