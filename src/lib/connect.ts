import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const connectSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  city: z.string().trim().max(80).optional(),
  message: z.string().trim().max(600).optional(),
});

export type ConnectInput = z.infer<typeof connectSchema>;

export const submitConnect = createServerFn({ method: "POST" })
  .validator((raw: unknown) => connectSchema.parse(raw))
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`
      insert into connect_requests (name, email, city, message)
      values (
        ${data.name},
        ${data.email},
        ${data.city ?? ""},
        ${data.message ?? ""}
      )
    `;
    return { ok: true as const };
  });
