import { NavbarActions } from "@/components/layout/navbar-actions";
import { NavbarDesktopNav, NavbarMobileNav } from "@/components/layout/navbar-links";
import { SiteLogo } from "@/components/layout/site-logo";
import { Container } from "@/components/ui/container";
import { getCollections } from "@/lib/shopify/fetchers";
import { partitionCollectionsForNav } from "@/lib/navigation/partition-collections";

export async function Navbar() {
  const collections = await getCollections(100);
  const groups = partitionCollectionsForNav(collections);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/85 backdrop-blur-xl">
      <Container>
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4">
          <div className="justify-self-start">
            <SiteLogo variant="nav" priority />
          </div>

          <div className="hidden justify-self-center md:block">
            <NavbarDesktopNav groups={groups} />
          </div>

          <div className="flex items-center justify-end gap-1 justify-self-end">
            <NavbarMobileNav groups={groups} />
            <NavbarActions />
          </div>
        </div>
      </Container>
    </header>
  );
}
