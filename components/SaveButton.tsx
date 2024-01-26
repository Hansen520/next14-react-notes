/*
 * @Date: 2024-01-26 13:52:19
 * @Description: description
 */
import { useFormStatus } from 'react-dom'

export default function EditButton({ formAction }: { formAction: any }) {
  const { pending } = useFormStatus()
  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      <img
        src="/checkmark.svg"
        width="14px"
        height="10px"
        alt=""
        role="presentation"
      />
      {pending ? 'Saving' : 'Done'}
    </button>
  );
}