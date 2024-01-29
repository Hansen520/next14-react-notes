/*
 * @Date: 2024-01-25 15:29:53
 * @Description: 使用 Suspense，数据加载不会阻塞页面，也就是说在笔记列表还在加载的时候，用户依然可以与页面其他部分进行交互，比如点击 New 按钮新建笔记。
 */
export default function NoteListSkeleton() {
    return (
      <div>
        <ul className="notes-list skeleton-container">
          <li className="v-stack">
            <div
              className="sidebar-note-list-item skeleton"
              style={{height: '5em'}}
            />
          </li>
          <li className="v-stack">
            <div
              className="sidebar-note-list-item skeleton"
              style={{height: '5em'}}
            />
          </li>
          <li className="v-stack">
            <div
              className="sidebar-note-list-item skeleton"
              style={{height: '5em'}}
            />
          </li>
          <li className="v-stack">
            <div
              className="sidebar-note-list-item skeleton"
              style={{height: '5em'}}
            />
          </li>
          <li className="v-stack">
            <div
              className="sidebar-note-list-item skeleton"
              style={{height: '5em'}}
            />
          </li>
        </ul>
      </div>
    );
  }