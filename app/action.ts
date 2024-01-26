"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function saveNote(prevState: string, formData: FormData) {
  const noteId = formData.get("noteId") as string; // Get the note ID from the form data
  const data = JSON.stringify({
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  });

  await sleep(500)

  if (noteId) {
    updateNote(noteId, data); // Update existing note
    revalidatePath("/", "layout"); // Revalidate the home page cache
    // redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(data);
    revalidatePath("/", "layout"); // Revalidate the home page cache
    // redirect(`/note/${res}`);
  }
  return { message: `Add Success!` }
}

export async function deleteNote(prevState: string, formData: FormData) {
  const noteId = formData.get("noteId") as string; // Get the note ID from the form data
  delNote(noteId);
  revalidatePath("/", "layout"); // Revalidate the home page cache
  redirect("/");
}
