/*
 * @Date: 2024-01-25 13:51:46
 * @Description: 客户端组件， 笔记列表的每一项item的内容
 */
"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  expandedChildren?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedId = pathname.split("/")[1] || null;

  const [isPending] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === selectedId;

  const itemRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    // 标题不一样则增加flash
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current && itemRef.current.classList.add("flash");
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        // 移除类名
        itemRef.current?.classList.remove("flash");
      }}
      className={["sidebar-note-list-item", isExpanded ? "note-expanded" : ""].join(" ")}
    >
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending ? "var(--gray-80)" : isActive ? "var(--tertiary-blue)" : "",
          border: isActive ? "1px solid var(--primary-border)" : "1px solid transparent",
        }}
        onClick={() => {
          const sidebarToggle: any = document.getElementById("sidebar-toggle");
          if (sidebarToggle) {
            sidebarToggle.checked = true;
          }
          router.push(`/note/${id}`);
        }}
      >
        打开笔记预览
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <img src="/chevron-down.svg" width="10px" height="10px" alt="Collapse" />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
}
