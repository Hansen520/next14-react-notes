/*
 * @Date: 2024-01-25 10:26:40
 * @Description: description
 */
import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import dayjs from "dayjs";
import SidebarNoteItem from "@/components/SidebarNoteItem";
import { getAllNotes } from "@/lib/redis";
import { Note } from "./types";

export default async function NoteList() {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); // 模拟异步操作
  await sleep(500);

  const notes = await getAllNotes();

  if (Object.entries(notes).length == 0) {
    return <div>{"No notes created yet!"}</div>;
  }
  // const arr = Object.entries(notes);

  // if (arr.length == 0) {
  //   return <div className="notes-empty">{"No notes created yet!"}</div>;
  // }

  return (
    <SidebarNoteListFilter>
      {Object.entries(notes).map(([noteId, note]) => {
        return <SidebarNoteItem key={noteId} noteId={noteId} note={JSON.parse(note)} />;
      })}
    </SidebarNoteListFilter>
    // <ul className="notes-list">
    //   {arr.map(([noteId, note]) => {
    //     const { title, updateTime } = JSON.parse(note);
    //     return (
    //       <li key={noteId}>
    //         <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
    //       </li>
    //     );
    //   })}
    // </ul>
  );
}
