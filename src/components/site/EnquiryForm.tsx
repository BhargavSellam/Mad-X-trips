import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional(),
  interest: z.string().trim().max(150).optional(),
  dates: z.string().trim().max(100).optional(),
  groupSize: z.string().trim().max(10).optional(),
  departure: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(50).optional(),
  message: z.string().trim().min(5, "Please add a short message").max(2000),
});

type Field = { name: keyof z.infer<typeof schema>; label: string; type?: string; required?: boolean; group?: boolean };

export function EnquiryForm({ group = false, defaultInterest = "" }: { group?: boolean; defaultInterest?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "not-connected">("idle");

  const fields: Field[] = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "interest", label: group ? "Destination or event type" : "Trip of interest" },
    { name: "dates", label: "Preferred dates" },
    { name: "groupSize", label: "Group size", type: "number" },
    { name: "departure", label: "Departure location", group: true },
    { name: "budget", label: "Budget (optional)", group: true },
  ];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // honeypot
    const fd = new FormData(e.currentTarget);
    if (fd.get("company")) return;
    const res = schema.safeParse(Object.fromEntries(fd));
    if (!res.success) {
      setErrors(Object.fromEntries(res.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    // No email/backend service is connected yet — never fake a success.
    setStatus("not-connected");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {fields.filter((f) => !f.group || group).map((f) => (
        <div key={f.name} className="space-y-2">
          <Label htmlFor={f.name}>{f.label}{f.required && " *"}</Label>
          <Input id={f.name} name={f.name} type={f.type ?? "text"} defaultValue={f.name === "interest" ? defaultInterest : undefined} className="min-h-11" aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `${f.name}-err` : undefined} />
          {errors[f.name] && <p id={`${f.name}-err`} className="text-sm text-destructive">{errors[f.name]}</p>}
        </div>
      ))}
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" name="message" rows={5} aria-invalid={!!errors["message"]} />
        {errors["message"] && <p className="text-sm text-destructive">{errors["message"]}</p>}
      </div>
      <p className="text-xs text-muted-foreground sm:col-span-2">
        An enquiry does not confirm availability or a booking.
      </p>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto">Send Enquiry</Button>
      </div>
      {status === "not-connected" && (
        <p role="alert" className="rounded-xl border border-primary bg-accent p-4 text-sm sm:col-span-2">
          Thanks — your details look good, but online enquiries aren’t connected yet, so this message was not sent. Please try again later.
        </p>
      )}
    </form>
  );
}
