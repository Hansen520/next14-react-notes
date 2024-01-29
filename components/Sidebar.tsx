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
import { useTranslations, NextIntlClientProvider, useMessages } from "next-intl";


export default function Sidebar() {
  const t = useTranslations("Basic");
  const messages = useMessages();

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
          {/* 动态渲染国际化必须要有这个，不然会报错 */}
          <NextIntlClientProvider
            messages={{
              Basic: messages.Basic,
            }}
          >
            <SideSearchField />
          </NextIntlClientProvider>
          <EditButton noteId={null}>{t("new")}</EditButton>
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
