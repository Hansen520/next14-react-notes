/*
 * @Date: 2024-01-25 09:35:17
 * @Description: description
 */
import React, { Suspense } from "react";
import Link from "next/link";
import SidebarNoteList from "./SidebarNoteList";
import EditButton from "@/components/EditButton";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SideSearchField from "@/components/SidebarSearchField";
import Image from 'next/image'
import SidebarImport from '@/components/SidebarImport';

export default function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <Image className="logo" src="/logo.svg" width="22" height="20" alt="" role="presentation" />
            <strong>我的云笔记</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          {/* 动态渲染国际化必须要有这个，不然会报错 */}
          <SideSearchField />
          <EditButton noteId={null}>新建</EditButton>
        </section>
        <nav className="sidebar-nav">
          {/* 骨架屏幕自己写的 */}
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
          <SidebarImport />
        </nav>
      </section>
    </>
  );
}
