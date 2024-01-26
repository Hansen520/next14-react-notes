/*
 * @Date: 2024-01-25 10:26:40
 * @Description: description
 */

import dayjs from "dayjs";
import SidebarNoteItem from '@/components/SidebarNoteItem';
import { getAllNotes } from '@/lib/redis';
import { Note } from './types';

export default async function NoteList() {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); // 模拟异步操作
  await sleep(500);

  const notes = await getAllNotes()
  const arr = Object.entries(notes);

  if (arr.length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        const { title, updateTime } = JSON.parse(note);
        return (
          <li key={noteId}>
            <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
          </li>
        );
      })}
    </ul>
  );
}
