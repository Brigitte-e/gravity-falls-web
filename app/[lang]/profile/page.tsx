"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth";

interface Props {
  params: Promise<{ lang: string }>;
}

export default function ProfilePage({ params }: Props) {
  const { lang } = use(params);
  const router = useRouter();
  const { user, loading } = useAuthStore();
  const signingOut = useRef(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user && !signingOut.current) {
      router.replace(`/${lang}/login`);
    }
  }, [loading, user, lang, router]);

  async function handleSignOut() {
    setSignOutError(null);
    signingOut.current = true;
    try {
      await signOut(getFirebaseAuth());
      router.push(`/${lang}/pokemon`);
    } catch (err: unknown) {
      signingOut.current = false;
      setSignOutError(err instanceof Error ? err.message : "Sign out failed.");
    }
  }

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-pk-red border-t-transparent animate-spin" />
      </main>
    );
  }

  const displayName = user.displayName || user.email || "Trainer";

  return (
    <main className="mx-auto max-w-md px-6 py-16 space-y-8">
      <div className="flex flex-col items-center gap-4">
        {user.photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.photoURL}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="h-24 w-24 rounded-full object-cover border-4 border-pk-red"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-pk-red text-3xl font-bold text-white border-4 border-pk-red">
            {displayName[0].toUpperCase()}
          </div>
        )}
        <div className="text-center">
          <h1 className="text-2xl font-bold">{displayName}</h1>
          {user.email && (
            <p className="text-sm text-muted-foreground">{user.email}</p>
          )}
        </div>
      </div>

      {signOutError && (
        <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {signOutError}
        </p>
      )}

      <button
        type="button"
        onClick={handleSignOut}
        className="w-full rounded-md border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
      >
        Sign out
      </button>
    </main>
  );
}
