import {FC} from "react"

interface ChatInputProps {
}

const ChatInput: FC<ChatInputProps> = ({}) => {

    return <div className="mt-auto pt-2 px-4">
        <input id="name" name="name" type="text" placeholder="Message Ankit Sinha" required
               className="block w-full px-3 py-3 font-medium text-gray-900 border-2 border-gray-300 rounded-lg outline-none shadow-sm placeholder:text-gray-500 focus-within:border-blue-900 sm:text-sm sm:leading-6"/>
    </div>
}

export default ChatInput;