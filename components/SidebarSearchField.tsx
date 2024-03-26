/*
 * @Date: 2024-01-26 15:47:34
 * @Description: description
 */
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
// import {useTranslations} from 'next-intl';

function Spinner({ active = true }) {
  return (
    <div
      className={["spinner", active && "spinner--active"].join(" ")}
      role="progressbar"
      aria-busy={active ? "true" : "false"}
    />
  );
}

export default function SidebarSearchField() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  // const t = useTranslations('Basic');

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    // 在加载的时候loading
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder="请输入您要搜索的篇章"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isPending && <Spinner active={isPending} />}
    </div>
  );
}
