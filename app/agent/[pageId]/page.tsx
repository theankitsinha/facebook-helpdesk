import AgentPage from "@/components/AgentPage";

export default function Page({params}: { params: { pageId: string } }) {
    return (<AgentPage pageId={params.pageId}/>)
}