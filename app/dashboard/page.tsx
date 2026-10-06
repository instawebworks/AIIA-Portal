import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logoutAction } from "@/app/logout/actions";

export const metadata = { title: "My details - AIIA Member Portal" };

function Row({ label, value }: { label: string; value?: string }) {
  const shown = value?.trim();
  return (
    <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:gap-6">
      <dt className="w-40 shrink-0 text-sm text-zinc-500">{label}</dt>
      <dd className="text-sm font-medium text-zinc-900">
        {shown ? shown : <span className="text-zinc-400">not set</span>}
      </dd>
    </div>
  );
}

const sectionClass = "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm";
const headingClass = "mb-2 text-xs font-semibold uppercase tracking-wide text-sky-700";

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect("/login");

  const a = user.address ?? { street: "", city: "", state: "", zip: "", country: "" };
  const addressLine = [a.street, a.city, a.state, a.zip, a.country]
    .filter((s) => s && s.trim())
    .join(", ");

  return (
    <div className="flex flex-1 flex-col bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-700 text-sm font-bold text-white">
              AI
            </div>
            <span className="font-semibold text-zinc-900">AIIA Member Portal</span>
          </div>
          <form action={logoutAction}>
            <button className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
        <h1 className="text-2xl font-semibold text-zinc-900">Welcome, {user.first_name || user.name}</h1>
        <p className="mt-1 text-sm text-zinc-500">These details are read from Zoho CRM when you sign in.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className={sectionClass}>
            <h2 className={headingClass}>Contact</h2>
            <dl className="divide-y divide-zinc-100">
              <Row label="Full name" value={user.name} />
              <Row label="First name" value={user.first_name} />
              <Row label="Last name" value={user.last_name} />
              <Row label="Email" value={user.email} />
            </dl>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Organisation</h2>
            <dl className="divide-y divide-zinc-100">
              <Row label="Organisation" value={user.organization} />
              <Row label="CRM contact ID" value={user.id} />
            </dl>
          </section>

          <section className={`${sectionClass} md:col-span-2`}>
            <h2 className={headingClass}>Mailing address</h2>
            <dl className="divide-y divide-zinc-100">
              <Row label="Street" value={a.street} />
              <Row label="City" value={a.city} />
              <Row label="State" value={a.state} />
              <Row label="Postcode" value={a.zip} />
              <Row label="Country" value={a.country} />
              <Row label="Formatted" value={addressLine} />
            </dl>
          </section>
        </div>
      </main>
    </div>
  );
}
