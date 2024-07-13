import BackgroundPattern from "@/components/background-pattern";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";

async function AppLayout({ children }: { children: React.ReactNode }) {
  const data = await prisma.pet.findMany();

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col min-h-screen max-w-screen-xl mx-auto px-3 md:px-6 xl:px-10">
        <Header />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
export default AppLayout;
