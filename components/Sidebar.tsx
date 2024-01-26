/*
 * @Date: 2024-01-25 09:35:17
 * @Description: description
 */
import React, { Suspense } from "react";
import Link from "next/link";
import { getAllNotes } from "@/lib/redis";
import SidebarNoteList from "./SidebarNoteList";
import EditButton from "@/components/EditButton";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SideSearchField from '@/components/SideSearchField';
import { Note } from "./types";

export default async function Sidebar() {
  const notes = await getAllNotes();
  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <img className="logo" src="/logo.svg" width="22px" height="20px" alt="" role="presentation" />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SideSearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          {/* 骨架屏幕自己写的 */}
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
