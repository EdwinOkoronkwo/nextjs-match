'use client'

import {useRouter} from "next/navigation";
import CardWrapper from "@/components/CardWrapper";
import {FaCheckCircle} from "react-icons/fa";

export default function RegisterSuccessPage() {
    const router = useRouter()
    return (
        <CardWrapper
            headerText={'You have successfully registered'}
            subHeaderText='You can now log into the app.'
            action={() => router.push('/login')}
            actionLabel={'Go to Login'}
            headerIcon={FaCheckCircle}
            />
    )
}
