export function PolicyPage({ title, body }: { title: string; body: string[] }) {
  return (
    <article className="container-site max-w-3xl py-12">
      <p className="eyebrow">Policy · Draft</p>
      <h1 className="heading-lg mt-2">{title}</h1>
      <div className="mt-8 space-y-4 text-muted-foreground">{body.map((p) => <p key={p}>{p}</p>)}</div>
    </article>
  );
}
