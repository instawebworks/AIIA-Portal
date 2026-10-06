# AIIA Member Portal (demo)

Next.js 16 portal that signs members in against Zoho CRM Contacts and shows their
contact, organisation and mailing-address details.

## How it works

1. `/login` posts email + password to a server action.
2. The server action calls the standalone Deluge function `portal_login` over its REST API URL (API-key auth).
3. Deluge finds the contact by `Email`, checks `Portal_Access` is ticked, compares
   SHA-256(pepper + password) with `Portal_Password`, and returns the display fields.
4. The portal stores those fields in a signed, httpOnly cookie (8 h) and renders `/dashboard`.

The browser never talks to Zoho directly, and the API key never leaves the server.

## CRM setup (once)

1. On **Contacts** make sure these fields exist (API names in brackets):
   Portal Access checkbox (`Portal_Access`), Email (standard `Email`), Portal Password single-line (`Portal_Password`).
   If you named them differently, edit the constants at the top of `deluge/portal_login.dg` and `deluge/portal_set_password.dg`.
2. Setup > Developer Hub > Functions > New Function > Standalone. Paste `deluge/portal_login.dg`, add arguments `email` and `password` (both string). Save.
3. Same again for `deluge/portal_set_password.dg`, arguments `contactId` and `newPassword`.
4. On `portal_login`: "..." > **REST API** > turn on **API Key** > copy the URL.
5. Pick a test contact, tick Portal Access, then run `portal_set_password` with that contact's record ID and a password.

## Run locally

```bash
cd portal
cp .env.example .env.local      # paste the REST API URL and a random SESSION_SECRET
npm install
npm run dev                     # http://localhost:3000
```

## Deploy to Vercel

Import the repo, set **Root Directory** to `portal`, add the two environment variables
`ZOHO_PORTAL_LOGIN_URL` and `SESSION_SECRET`, deploy.

## Demo script

- Sign in with the test contact: dashboard shows name, organisation, address.
- In CRM untick **Portal Access** on that contact, sign out, sign in again: "Portal access has not been enabled".
- Wrong password: "Invalid email or password".
