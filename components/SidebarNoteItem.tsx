/*
 * @Date: 2024-01-25 13:51:46
 * @Description: 服务端组件
 */
import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader';
import { Note } from "./types";

export default function SidebarNoteItem({ noteId, note }: { noteId: string; note: Note }) {
  const { title, content = "", updateTime } = note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={<p className="sidebar-note-excerpt">{content.substring(0, 20) || <i>(no content)</i>}</p>}
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
}
