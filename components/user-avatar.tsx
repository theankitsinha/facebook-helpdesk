import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react"

interface UserAvatarProps { 
    img?: string
    firstName: string
    lastName: string
    className?: string
}

const UserAvatar: FC<UserAvatarProps> = ({ img, firstName, lastName, className}) => {

    if(img) return <div className="relative h-8 w-8">
        <Image
            src={img}
            alt="user avatar"
            className="h-8 w-8 rounded-full"
        />
    </div>

    return (
        <div className={cn("bg-blue-400 h-8 w-8 flex items-center justify-center text-white text-sm rounded-full", className)}>
            <p>{firstName.charAt(0)}{lastName.charAt(0)}</p>
        </div>
    )
}

export default UserAvatar;