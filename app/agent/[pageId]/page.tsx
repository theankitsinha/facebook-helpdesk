import AgentPage from "@/components/AgentPage";
import './page.component.css'

export default function Page({params}: { params: { pageId: string } }) {
    return (<AgentPage pageId={params.pageId}/>)
}