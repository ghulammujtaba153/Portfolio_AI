import Image from "next/image";
import { logoForSkillName, skillLogoSrc } from "./skill-logos";

export default function SkillLogo({
  name,
  size = 18,
}: {
  name: string;
  size?: number;
}) {
  const id = logoForSkillName(name);
  if (!id) return null;
  return (
    <Image
      src={skillLogoSrc[id]}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="shrink-0 opacity-90"
    />
  );
}
