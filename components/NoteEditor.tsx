/*
 * @Date: 2024-01-25 17:08:29
 * @Description: 客户端组件时的一个注意事项，那就是不要使用 async/await，可能会出现报错：
 */
"use client";

import { useState } from "react";
import NotePreview from "@/components/NotePreview";
import { useFormStatus, useFormState } from "react-dom";
import { deleteNote, saveNote } from "../app/action";
import SaveButton from '@/components/SaveButton';
import DeleteButton from '@/components/DeleteButton';

const initialState = {
    message: null,
};

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody, 
}: {
  noteId: string;
  initialTitle: string;
  initialBody: string;
}) {
  const { pending } = useFormStatus();

  /* 表单的应用 */
  const [saveState, saveFormAction] = useFormState(saveNote as () => any, initialState);
  const [delState, delFormAction] = useFormState(deleteNote as () => any, initialState);

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          {/* 通过这边的name获取表单的信息 */}
          <input type="hidden" name="noteId" value={noteId} />
          {/* <button className="note-editor-done" disabled={pending} type="submit" formAction={saveNote} role="menuitem">
            <img src="/checkmark.svg" width="14px" height="10px" alt="" role="presentation" />
            Done
          </button>
          {!isDraft && (
            <button className="note-editor-delete" disabled={pending} formAction={deleteNote} role="menuitem">
              <img src="/cross.svg" width="10px" height="10px" alt="" role="presentation" />
              Delete
            </button>
          )} */}
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="note-editor-menu">
            {saveState?.message}
            {saveState?.errors && saveState.errors[0].message}
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea name="body" value={body} id="note-body-input" onChange={(e) => setBody(e.target.value)} />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
