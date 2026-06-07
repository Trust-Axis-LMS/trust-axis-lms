"use client";
import { ContentListPage } from "@/components/admin/content-list-page";
export default function WhitepapersPage() {
  return <ContentListPage type="WHITEPAPER" label="Whitepaper" newHref="/xp-cms/whitepapers/new" editHref={(id) => `/xp-cms/whitepapers/${id}/edit`} />;
}
