import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/authentic")({
  validateSearch: (search: Record<string, unknown>) => ({
    p: typeof search.p === "string" ? search.p : undefined,
  }),
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/verify", search });
  },
});
