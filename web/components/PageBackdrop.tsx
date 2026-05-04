import Image from "next/image";

type Props = {
  src: string;
  /** Photo visibility through the scrim. Typical 0.09 to 0.16 */
  opacity?: number;
  /** Light overlay strength so body text stays crisp (0.88–0.97) */
  scrim?: number;
};

export function PageBackdrop({ src, opacity = 0.12, scrim = 0.94 }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        style={{ opacity }}
        sizes="100vw"
        priority={false}
      />
      <div
        className="absolute inset-0 bg-[var(--background)]"
        style={{ opacity: scrim }}
        aria-hidden
      />
    </div>
  );
}
