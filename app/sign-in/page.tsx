import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("tag_auth_token")?.value;
  const activeRole = cookieStore.get("tag_active_role")?.value || "candidate";

  if (token) {
    if (activeRole === "employer") {
      redirect("/employer/dashboard");
    } else if (activeRole === "admin") {
      redirect("/admin/dashboard");
    } else {
      redirect("/candidate/dashboard");
    }
  }

  const params = await searchParams;
  const urlParams = new URLSearchParams();
  urlParams.set("mode", "login");

  if (params?.redirect && typeof params.redirect === "string") {
    urlParams.set("redirect", params.redirect);
  }
  if (params?.role && typeof params.role === "string") {
    urlParams.set("role", params.role);
  }
  if (params?.reason && typeof params.reason === "string") {
    urlParams.set("reason", params.reason);
  }

  redirect(`/sign-up?${urlParams.toString()}`);
}
