import type { Image } from "@/config/types";

/**
 * Illustrations used by the inner pages ("image" blocks). Shared by both languages; the alt text and
 * caption live in each page's content. Blank examples only: never a card with a real person's data.
 */
export const pageImages = {
  // Illustration of a Medicare card with no personal information (original: /images/medicare.jpeg).
  medicareCard: { src: "/images/medicare-card-blank.webp", width: 800, height: 520 },
  // Blank Texas Medicaid ID card (Your Texas Benefits). Web copy turned upright from /images/medicaid.png,
  // which is provided on its side.
  texasMedicaidCard: { src: "/images/medicaid-texas-card-blank.webp", width: 563, height: 355 },
} satisfies Record<string, Image>;

export type PageImageId = keyof typeof pageImages;
