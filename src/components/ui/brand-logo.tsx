import Image from "next/image";

interface BrandLogoProps {
  compact?: boolean;
}

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <Image
      alt="TikTak Türkiye logosu"
      className="shrink-0 object-contain"
      height={compact ? 30 : 40}
      src="/logo/tiktak-logo.png"
      width={compact ? 30 : 40}
    />
  );
}
