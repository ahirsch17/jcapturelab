import Image from "next/image";

type Props = {
  src: string;
  /** Photo strength before scrim. Higher = image reads clearly (typical 0.4 to 0.65) */
  opacity?: number;
  /** Cream wash over the photo. Lower = more photo visible (typical 0.28 to 0.52) */
  scrim?: number;
  /** Focal point so portraits are not awkwardly cropped in the frame */
  objectPosition?: string;
};

export function PageBackdrop({
  src,
  opacity = 0.52,
  scrim = 0.38,
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
