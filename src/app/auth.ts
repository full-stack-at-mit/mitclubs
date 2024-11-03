import { headers } from "next/headers";

export function getAppServerSession(request: Request | undefined = undefined) {
  // return { user: { name: "Test user", email: "kle@mit.edu" } };
  const hdrs = request === undefined ? headers() : request.headers;
  console.log("hdrs", hdrs);
  const name = hdrs.get("nickname");
  const email = hdrs.get("eppn");
  if (!name || !email) return null;
  return { user: { name, email } };
}

export function isAdmin(user: string): boolean {
  return user === "kle@mit.edu";
}
