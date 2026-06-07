"use client";
import { ContentListPage } from "@/components/admin/content-list-page";

export default function BlogsPage() {
  return (
    <ContentListPage
      type="BLOG"
      label="Blog"
      newHref="/xp-cms/blogs/new"
      editHref={(id) => `/xp-cms/blogs/${id}/edit`}
    />
  );
}
