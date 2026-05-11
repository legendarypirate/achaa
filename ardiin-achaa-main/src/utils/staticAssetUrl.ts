/**
 * Next.js / webpack static imports often return `{ src, height, width }`, not a string.
 * Using that object as `img src` becomes the literal "[object Object]" and resolves
 * relative to the current page (e.g. /user/1/profile → /user/1/[object Object]).
 */
export function staticAssetUrl(
  mod:
    | string
    | { src?: string; default?: unknown }
    | null
    | undefined
): string {
  if (mod == null || mod === "") return "";
  if (typeof mod === "string") return mod;
  if (typeof mod === "object") {
    const o = mod as { src?: string; default?: unknown };
    if (typeof o.src === "string") return o.src;
    const d = o.default;
    if (typeof d === "string") return d;
    if (d && typeof d === "object" && typeof (d as { src?: string }).src === "string") {
      return (d as { src: string }).src;
    }
  }
  return "";
}
