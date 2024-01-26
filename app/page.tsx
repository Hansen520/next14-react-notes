/*
 * @Date: 2024-01-24 18:01:39
 * @Description: description
 */
import Image from "next/image";
import styles from "./page.module.css";
import { getAllNotes } from '@/lib/redis';

export default function Home() {
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        点击左侧预览笔记或者新增笔记！
      </span>
    </div>
  );
}
