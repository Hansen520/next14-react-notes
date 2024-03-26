/*
 * @Date: 2024-01-25 16:13:15
 * @Description: description
 */
import dayjs from "dayjs";
import NotePreview from "@/components/NotePreview";
import EditButton from "@/components/EditButton";

export default function Note({
  noteId,
  note,
}: {
  noteId: string;
  note: { title: string; content: string; updateTime: string };
}) {
  const { title, content, updateTime } = note;
  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            更新于 {dayjs(updateTime).format("YYYY-MM-DD HH:MM:ss")}
          </small>
          <EditButton noteId={noteId}>编辑</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}
