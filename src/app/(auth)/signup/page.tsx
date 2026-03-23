// "use-client";

import AuthForm from "@/components/AuthFrom";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <AuthForm type="signup" />
    </main>
  );
}
