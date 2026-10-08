import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyActions from "@/components/layout/MobileStickyActions";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[calc(4rem)] md:pt-[calc(4rem+2rem)]">
        {children}
      </main>
      <Footer />
      <MobileStickyActions />
      {/* Add bottom padding on mobile so content isn't hidden behind sticky actions */}
      <div className="h-16 lg:hidden" />
    </>
  );
}
