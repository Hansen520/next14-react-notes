/*
 * @Date: 2024-01-25 17:47:57
 * @Description: description
 */
"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";
import { join } from "path";
import dayjs from "dayjs";

const schema = z.object({
  title: z.string(), // Define your form data validation here
  content: z.string().min(1, "请填写内容").max(100000, "字数最多100"),
});

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
    };
  }
  await sleep(500);

  if (noteId) {
    updateNote(noteId, JSON.stringify(data)); // Update existing note
    revalidatePath("/", "layout"); // Revalidate the home page cache
    // redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(JSON.stringify(data));
    revalidatePath("/", "layout"); // Revalidate the home page cache
    // redirect(`/note/${res}`);
  }
  return { message: `Add Success!` };
}

export async function deleteNote(prevState: string, formData: FormData) {
  const noteId = formData.get("noteId") as string; // Get the note ID from the form data
  delNote(noteId);
  revalidatePath("/", "layout"); // Revalidate the home page cache
  redirect("/");
}

/* 导入文件操作 */
export async function importFile(formData: FormData) {
  const file = formData.get("file") as File;

  // Is Empty
  if (!file) {
    return { error: "File is required." };
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dayjs().format("YYYY-MM-DD")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir); // Check if the directory exists. If not, create it.
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return { error: "Failed to create directory." };
    }
  }

  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, "");
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);
    console.log(uniqueSuffix, mime.getExtension(file.type), 91);
    // 调用接口，写入数据库
    const res = await addNote(JSON.stringify({
      title: filename,
      content: buffer.toString('utf-8')
    }))

    // 清除缓存
    revalidatePath('/', 'layout');

    return { fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res }
  } catch(e) {
    console.error(e);
    return { error: "Failed to write file." }
  }
}
