import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react"
import UserAvatar from "./user-avatar";

interface MessagesProps { }

const Messages: FC<MessagesProps> = ({ }) => {

    return <div id="messages" className="flex flex-col-reverse gap-4 px-6 overflow-y-auto scrollbar-hide">
        <div>
            <div id="chat-message" className=''>
                <div className={cn("flex items-end justify-start")}>
                    <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2 order-2 items-start')}>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-md shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-md shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-md shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn("ml-1 text-xs text-gray-600")}>
                            <span className="font-medium">Amit RG</span> - Mar 05, 2:22AM
                        </span>
                    </div>

                    <div className={cn('mb-6 relative w-8 h-8 order-1')}>
                        <UserAvatar firstName="Amit" lastName="RG" />
                    </div>
                </div>
                <div className={cn("flex items-start justify-end")}>
                    <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2 order-1 items-end')}>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-md shadow-sm text-gray-900')}>
                            yes, Availabel{' '}
                        </span>
                        <span className={cn("ml-1 text-xs text-gray-600")}>
                            <span className="font-medium">Admin</span> - Mar 05, 2:22AM
                        </span>
                    </div>

                    <div className={cn('mt-1 relative w-6 h-6 order-2')}>
                        <UserAvatar firstName="Admin" lastName="Dept" />
                    </div>
                </div>
                
                <div className={cn("flex items-end justify-start")}>
                    <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2 order-2 items-start')}>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn("ml-1 text-xs text-gray-600")}>
                            <span className="font-medium">Amit RG</span> - Mar 05, 2:22AM
                        </span>
                    </div>

                    <div className={cn('mb-6 relative w-8 h-8 order-1')}>
                        <UserAvatar firstName="Amit" lastName="RG" />
                    </div>
                </div>
                <div className={cn("flex items-start justify-end")}>
                    <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2 order-1 items-end')}>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            yes, Availabel{' '}
                        </span>
                        <span className={cn("ml-1 text-xs text-gray-600")}>
                            <span className="font-medium">Admin</span> - Mar 05, 2:22AM
                        </span>
                    </div>

                    <div className={cn('mt-1 relative w-6 h-6 order-2')}>
                        <UserAvatar firstName="Admin" lastName="Dept" />
                    </div>
                </div>
                <div className={cn("flex items-end justify-start")}>
                    <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2 order-2 items-start')}>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn("ml-1 text-xs text-gray-600")}>
                            <span className="font-medium">Amit RG</span> - Mar 05, 2:22AM
                        </span>
                    </div>

                    <div className={cn('mb-6 relative w-8 h-8 order-1')}>
                        <UserAvatar firstName="Amit" lastName="RG" />
                    </div>
                </div>
                <div className={cn("flex items-start justify-end")}>
                    <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2 order-1 items-end')}>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            yes, Availabel{' '}
                        </span>
                        <span className={cn("ml-1 text-xs text-gray-600")}>
                            <span className="font-medium">Admin</span> - Mar 05, 2:22AM
                        </span>
                    </div>

                    <div className={cn('mt-1 relative w-6 h-6 order-2')}>
                        <UserAvatar firstName="Admin" lastName="Dept" />
                    </div>
                </div>
                <div className={cn("flex items-end justify-start")}>
                    <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2 order-2 items-start')}>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            is Available{' '}
                        </span>
                        <span className={cn("ml-1 text-xs text-gray-600")}>
                            <span className="font-medium">Amit RG</span> - Mar 05, 2:22AM
                        </span>
                    </div>

                    <div className={cn('mb-6 relative w-8 h-8 order-1')}>
                        <UserAvatar firstName="Amit" lastName="RG" />
                    </div>
                </div>
                <div className={cn("flex items-start justify-end")}>
                    <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2 order-1 items-end')}>
                        <span className={cn('px-4 py-2 inline-block text-sm font-medium bg-white rounded-xl shadow-sm text-gray-900')}>
                            yes, Availabel{' '}
                        </span>
                        <span className={cn("ml-1 text-xs text-gray-600")}>
                            <span className="font-medium">Admin</span> - Mar 05, 2:22AM
                        </span>
                    </div>

                    <div className={cn('mt-1 relative w-6 h-6 order-2')}>
                        <UserAvatar firstName="Admin" lastName="Dept" />
                    </div>
                </div>

            </div>
        </div>
    </div>
}

export default Messages;