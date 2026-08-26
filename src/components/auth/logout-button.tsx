"use client";

import { useRouter } from "next/navigation";

import { useSession } from "@/lib/auth/use-session";

interface LogoutButtonProps {
  className?: string;
  label?: string;
}

/** Oturumu localStorage'dan siler ve /giris adresine yönlendirir. */
export function LogoutButton({
  className,
  label = "Çıkış yap",
}: LogoutButtonProps) {
  const router = useRouter();
  const { signOut } = useSession();

  const handleClick = () => {
    signOut();
    router.replace("/giris");
  };

  return (
    <button
      className={
        className ??
        "rounded-lg border border-[#E8C7CB] bg-white px-3 py-2 text-sm font-medium text-[#93242E] transition hover:border-[#DDA0A6] hover:bg-[#FFF0F1] hover:text-[#7F1D26]"
      }
      onClick={handleClick}
      type="button"
    >
      {label}
    </button>
  );
}
