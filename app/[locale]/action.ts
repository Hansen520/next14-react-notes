"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z } from 'zod';

const schema = z.object({
    title: z.string(), // Define your form data validation here
    content: z.string().min(1, '请填写内容').max(100, '字数最多100')
})

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function saveNote(prevState: string, formData: FormData) {
  const noteId = formData.get("noteId") as string; // Get the note ID from the form data
  const data = {
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
        errors: validated.error.issues,
    }
  }
  await sleep(500)

  if (noteId) {
    updateNote(noteId, JSON.stringify(data)); // Update existing note
    revalidatePath("/", "layout"); // Revalidate the home page cache
    // redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(JSON.stringify(data));
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
