import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LoginForm from "./login-form";

export const metadata = { title: "Sign in - AIIA Member Portal" };

export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-700 text-xl font-bold text-white">
            AI
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900">AIIA Member Portal</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Sign in with the email and password registered in the CRM.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-zinc-400">
          Access is controlled by the <span className="font-medium">Portal Access</span> flag on your CRM contact.
        </p>
      </div>
    </main>
  );
}
