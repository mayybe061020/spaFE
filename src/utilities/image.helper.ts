export function linkImage(src?: string | null | Blob | File) {
  if (!src) {
    return src;
  }

  if (typeof src !== "string") {
    return URL.createObjectURL(src as Blob);
  }

  if (src.startsWith("blob:")) {
    return src;
  }

  return `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/image/getImage?image=${encodeURIComponent(src)}`;
}
