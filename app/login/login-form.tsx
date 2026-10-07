"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const inputClass =
  "mt-1.5 w-full rounded-md border border-brand-sand bg-brand-cream px-3 py-2.5 text-brand-black outline-none transition focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  return (
    <form action={action} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-brand-black"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-brand-black"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-md border-l-4 border-brand-red bg-brand-red/5 px-3 py-2 text-sm text-brand-red-dark"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="font-heading w-full rounded-md bg-brand-red px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-red-dark focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Loading..." : "Sign in"}
      </button>
    </form>
  );
}
