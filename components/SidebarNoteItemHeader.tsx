/*
 * @Date: 2024-01-25 15:05:24
 * @Description: 客户端组件
 */
"use client";
import dayjs from 'dayjs';

export default function SidebarNoteItemHeader({title, updateTime}: { title: string, updateTime: string }) {
  return (
      <header className="sidebar-note-header">
          <strong>{title}</strong>
          <small>{dayjs(updateTime).format('YYYY-MM-DD HH:MM:ss')}</small>
      </header>
  );
}