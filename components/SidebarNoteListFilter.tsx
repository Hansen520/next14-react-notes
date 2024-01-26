/*
 * @Date: 2024-01-26 16:10:39
 * @Description: description
 */
"use client";

// import SidebarNoteItem from "@/components/SidebarNoteItem";
import { useSearchParams } from "next/navigation";
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent';

export default function SidebarNoteListFilter({ notes }: { notes: any}) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="notes-list">
      {notes.map((noteItem: { noteId: string, note: any, header: any }) => {
        const {noteId, note, header} = noteItem;
        if (!searchText || (searchText && note.title.toLowerCase().includes(searchText.toLowerCase()))) {
          return (
            <SidebarNoteItemContent
              key={noteId}
              id={noteId}
              title={note.title}
              expandedChildren={
                <p className="sidebar-note-excerpt">
                  {note.content.substring(0, 20) || <i>(No content)</i>}
                </p>
              }>
                {header}
            </SidebarNoteItemContent>
          )
        }
        // 没有匹配的剩余部分返回null
        return null
      })}
    </ul>
  );
}
