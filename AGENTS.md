<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All public content (trips, FAQs, contact, policies, gallery) lives in `src/content/*`; components never hardcode business content, so a future admin/CMS can replace these files.
- No admin panel, staff login or CMS routes — out of scope per the brief.
- Booking is enquiry-based (`siteConfig.liveBookingEnabled = false`); never simulate a confirmed booking or a sent enquiry without a real backend.
- Empty contact/social/WhatsApp values in `src/content/site.ts` hide those elements.
