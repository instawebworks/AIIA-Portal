import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { Logo, SiteFooter } from "@/app/components/brand";
import LoginForm from "./login-form";

export const metadata = { title: "Sign in - AIIA Member Portal" };

export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");

  return (
    <>
      <div className="h-1.5 bg-brand-red" />
      <main className="flex flex-1 items-center justify-center bg-brand-stone px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <Logo className="mb-5 h-28 w-28" />
            <h1 className="font-heading text-2xl font-semibold text-brand-black">Member Portal</h1>
          </div>

          <div className="overflow-hidden rounded-lg border border-brand-sand bg-white shadow-sm">
            <div className="h-1.5 bg-brand-yellow" />
            <div className="p-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
