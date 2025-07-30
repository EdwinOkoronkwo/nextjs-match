
import Link from "next/link";
import { Button } from "@heroui/button";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
    return (
        <div className="p-8">
            <h1 className="text-4xl mb-4">Hello App</h1>

            <Button
                as={Link}
                href="/members"
                color="primary" variant="bordered" startContent={<FaRegSmile  size={20}/>} >
                Click me!
            </Button>
        </div>
    );
}
