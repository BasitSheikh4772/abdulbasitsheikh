// Static export on GitHub Pages: files live under /<repo>/, so every image URL gets the base path.
export default function imageLoader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
