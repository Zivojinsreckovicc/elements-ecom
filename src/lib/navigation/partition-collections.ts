import type { CollectionListItem } from "@/types/shopify";

function text(c: CollectionListItem): string {
  return `${c.handle} ${c.title}`.toLowerCase();
}

function matchesSupplements(c: CollectionListItem): boolean {
  return /supplement|vitamin|gut|immune|probiotic|mineral|omega|collagen|digest|detox|herb|tonic|capsule|tablet|nutrient/.test(
    text(c),
  );
}

function matchesPerformance(c: CollectionListItem): boolean {
  return /performance|energy|sport|athletic|endurance|recovery|pre[\s-]?workout|electrolyte|creatine|hydration|stamina|muscle/.test(
    text(c),
  );
}

function matchesFamily(c: CollectionListItem): boolean {
  return /baby|kid|child|family|maternity|nursing|toddler|infant|prenatal|mom|parent/.test(
    text(c),
  );
}

export type PartitionedNavCollections = {
  supplements: CollectionListItem[];
  performance: CollectionListItem[];
  family: CollectionListItem[];
  /** Full store list for Catalog menu */
  catalog: CollectionListItem[];
};

/**
 * Assigns each collection to at most one themed group (first match wins).
 * Every collection still appears under Catalog.
 */
export function partitionCollectionsForNav(
  all: CollectionListItem[],
): PartitionedNavCollections {
  const used = new Set<string>();

  const take = (predicate: (c: CollectionListItem) => boolean): CollectionListItem[] => {
    const out: CollectionListItem[] = [];
    for (const c of all) {
      if (used.has(c.id)) continue;
      if (predicate(c)) {
        out.push(c);
        used.add(c.id);
      }
    }
    return out;
  };

  return {
    supplements: take(matchesSupplements),
    performance: take(matchesPerformance),
    family: take(matchesFamily),
    catalog: all,
  };
}
