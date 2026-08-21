import TikTokEmbed from "@/components/ui/TikTokEmbed";
import Container from "@/components/ui/Container";
import { TIKTOK_VIDEOS } from "@/content/tiktok-videos";
import Carousel from "@/components/ui/Carousel";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./theme";

/**
 * Home2 variant of the TikTok carousel — reuses the shared `Carousel`
 * (prev/next + dot indicators) rather than `home/TikTokSection`'s bespoke
 * scroller, to stay consistent with every other Home2 section.
 */
export default function TikTokVideos2() {
  const slides = TIKTOK_VIDEOS.map((video) => <TikTokEmbed key={video.id} video={video} />);

  return (
    <section className={SECTION_PADDING}>
      <Container>
        <SectionHeading
          eyebrow="From Our TikTok"
          heading="Bite-Sized Answers, Straight From Dr. Autoimmune"
          accent="Straight From"
        />

        <div className="mt-14">
          <Carousel ariaLabel="TikTok videos" slides={slides} />
        </div>
      </Container>
    </section>
  );
}
