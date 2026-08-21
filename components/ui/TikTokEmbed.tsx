import Link from "next/link";
import type { TikTokVideo } from "@/content/tiktok-videos";

interface TikTokEmbedProps {
  video: TikTokVideo;
  className?: string;
}

/**
 * A single portrait TikTok video via TikTok's public iframe embed
 * (`tiktok.com/embed/v2/{id}`) — no `embed.js` script/MutationObserver
 * needed, so it behaves like any other lazy-loaded iframe inside a
 * scroll-snap carousel (no re-init required when slides mount/unmount).
 * Wrapped in a `Link` to the source blog post so the caption is clickable.
 */
export default function TikTokEmbed({ video, className = "" }: TikTokEmbedProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* TikTok's embed widget is not truly fluid — it's designed around a
          325x738 frame and clips/misrenders its own video + UI overlay
          (username, caption, share icons) if squeezed into a narrower or
          differently-proportioned box than that. Match those dimensions
          exactly instead of stretching to a generic 9:16 box. */}
      <div className="h-[738px] w-[325px] max-w-full overflow-hidden rounded-card">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${video.id}`}
          title={video.caption}
          width={325}
          height={738}
          loading="lazy"
          allow="encrypted-media; fullscreen"
          className="h-full w-full border-0"
        />
      </div>
      <Link
        href={video.href}
        className="mt-3 text-sm font-medium leading-snug text-ink transition-colors hover:text-primary"
      >
        {video.caption}
      </Link>
    </div>
  );
}
