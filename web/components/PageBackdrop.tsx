import Image from "next/image";

type Props = {
  src: string;
  /** How much of the photo shows through the cream scrim. Typical 0.18 to 0.32 */
  opacity?: number;
  /** Cream overlay: lower = more photo visible (about 0.65 to 0.88) */
  scrim?: number;
  /** Focal point so portraits are not awkwardly cropped in the frame */
  objectPosition?: string;
};

export function PageBackdrop({
  src,
  opacity = 0.26,
  scrim = 0.72,
  objectPosition = "center 30%",
}: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        style={{ opacity, objectPosition }}
        sizes="100vw"
        priority={false}
      />
      <div
        className="absolute inset-0 bg-[var(--background)]"
        style={{ opacity: scrim }}
      />
    </div>
  );
}
