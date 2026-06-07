"use client";
import { ContentListPage } from "@/components/admin/content-list-page";
export default function ArticlesPage() {
  return <ContentListPage type="ARTICLE" label="Article" newHref="/xp-cms/articles/new" editHref={(id) => `/xp-cms/articles/${id}/edit`} />;
}
