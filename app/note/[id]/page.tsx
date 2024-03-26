/*
 * @Date: 2024-01-25 10:37:17
 * @Description: description
 */
import Note from "@/components/Note";
import { getNote } from "@/lib/redis";

export default async function Page({ params }: { params: { id: string } }) {
  // 动态路由 获取笔记 id
  const noteId = params.id;
  const note = await getNote(noteId);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(500); // 模拟加载时间

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">欢迎，请从左边视图中选择一份笔记查阅</span>
      </div>
    );
  }
  return <Note noteId={noteId} note={note} />;
}
