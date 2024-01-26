/*
 * @Date: 2024-01-26 16:10:39
 * @Description: description
 */
"use client";

// import SidebarNoteItem from "@/components/SidebarNoteItem";
import { useSearchParams } from "next/navigation";
import { Children } from 'react';

export default function SidebarNoteListFilter({ children }: { children: React.ReactNode}) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="notes-list">
      {/* {Object.entries(notes).map(([noteId, note]: any) => {
        const noteData = JSON.parse(note);
        if (!searchText || (searchText && noteData.title.toLowerCase().includes(searchText.toLowerCase()))) {
            return (
                <li key={noteId}>
                  <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
                </li>
              );
        }
        return null;
        
      })} */}
      {
        Children.map(children, (child: any, index) => {
            const title = child.props.title;
            if (!searchText || (searchText && title.toLowerCase().includes(searchText.toLowerCase()))) {
              return <li key={index}>{child}</li>
            }
            return null
        })
      }
    </ul>
  );
}
