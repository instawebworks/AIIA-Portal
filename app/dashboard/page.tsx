import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logoutAction } from "@/app/logout/actions";
import { SiteFooter, SiteHeader } from "@/app/components/brand";

export const metadata = { title: "My details - AIIA Member Portal" };

function Row({ label, value }: { label: string; value?: string }) {
  const shown = value?.trim();
  return (
    <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:gap-6">
      <dt className="w-40 shrink-0 text-sm text-brand-grey">{label}</dt>
      <dd className="text-sm font-medium text-brand-black">
        {shown ? shown : <span className="text-brand-grey/70">not set</span>}
      </dd>
    </div>
  );
}

const sectionClass = "rounded-lg border border-brand-sand bg-white p-6 shadow-sm";
const headingClass =
  "font-heading mb-2 border-b-2 border-brand-red pb-2 text-xs font-semibold uppercase tracking-wider text-brand-black";

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect("/login");

  const a = user.address ?? { street: "", city: "", state: "", zip: "", country: "" };
  const addressLine = [a.street, a.city, a.state, a.zip, a.country]
    .filter((s) => s && s.trim())
    .join(", ");

  return (
    <div className="flex flex-1 flex-col bg-brand-stone">
      <SiteHeader>
        <form action={logoutAction}>
          <button className="font-heading rounded-md border-2 border-brand-red px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-red transition hover:bg-brand-red hover:text-white">
            Sign out
          </button>
        </form>
      </SiteHeader>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <div className="border-l-4 border-brand-yellow pl-4">
          <h1 className="font-heading text-2xl font-semibold text-brand-black sm:text-3xl">
            Welcome, {user.first_name || user.name}
          </h1>
          <p className="mt-1 text-sm text-brand-grey">These details are read from Zoho CRM when you sign in.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className={sectionClass}>
            <h2 className={headingClass}>Contact</h2>
            <dl className="divide-y divide-brand-stone">
              <Row label="Full name" value={user.name} />
              <Row label="First name" value={user.first_name} />
              <Row label="Last name" value={user.last_name} />
              <Row label="Email" value={user.email} />
            </dl>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Organisation</h2>
            <dl className="divide-y divide-brand-stone">
              <Row label="Organisation" value={user.organization} />
              <Row label="CRM contact ID" value={user.id} />
            </dl>
          </section>

          <section className={`${sectionClass} md:col-span-2`}>
            <h2 className={headingClass}>Mailing address</h2>
            <dl className="divide-y divide-brand-stone">
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

      <SiteFooter />
    </div>
  );
}
