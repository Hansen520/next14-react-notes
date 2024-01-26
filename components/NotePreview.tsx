/*
 * @Date: 2024-01-25 16:23:04
 * @Description: 
 * marked 是一个把 markdown 转换为 HTML 的库，
 * sanitize-html 用于清理 HTML，比如删除一些不良的写法，转义特殊字符等
 */
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const allowedTags = sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3"]);
const allowedAttributes = Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
  img: ["alt", "src"],
});

export default function NotePreview({ children }: { children: string}) {
    return (<div className="note-preview">
        <div className="text-with-markdown"
            dangerouslySetInnerHTML={{
                __html: sanitizeHtml(marked(children || '') as string, {
                    allowedTags,
                    allowedAttributes,
                })
            }}
        />
    </div>)
}