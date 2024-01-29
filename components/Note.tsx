/*
 * @Date: 2024-01-25 16:13:15
 * @Description: description
 */
import dayjs from "dayjs";
import NotePreview from "@/components/NotePreview";
import EditButton from "@/components/EditButton";
import {useTranslations} from 'next-intl';

export default function Note({
  noteId,
  note,
}: {
  noteId: string;
  note: { title: string; content: string; updateTime: string };
}) {
  const { title, content, updateTime } = note;
  const t = useTranslations('Basic');
  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            Last updated at {dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}
          </small>
          <EditButton noteId={noteId}>{t('edit')}</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}
