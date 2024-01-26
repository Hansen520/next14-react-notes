/*
 * @Date: 2024-01-25 10:26:40
 * @Description: description
 */
import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import dayjs from "dayjs";
import SidebarNoteItem from "@/components/SidebarNoteItem";
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader';
import { getAllNotes } from "@/lib/redis";
import { Note } from "./types";

export default async function NoteList() {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); // 模拟异步操作
  await sleep(500);

  const notes = await getAllNotes();

  if (Object.entries(notes).length == 0) {
    return <div>{"No notes created yet!"}</div>;
  }

  return (
    <SidebarNoteListFilter notes={Object.entries(notes).map(([noteId, note]) => {
      const noteData = JSON.parse(note) as Note;
      return {
        noteId,
        note: noteData,
        header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />,
      };
    })} />
  );
}
