/*
 * @Date: 2024-01-29 09:29:31
 * @Description: description
 */
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("Basic");
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("initText")}</span>
    </div>
  );
}
