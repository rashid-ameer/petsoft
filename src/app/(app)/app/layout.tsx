import BackgroundPattern from "@/components/background-pattern";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PetContextProvider from "@/contexts/pet-context-provider";
import { Pet } from "@/lib/types";

async function AppLayout({ children }: { children: React.ReactNode }) {
  const res = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pets");
  }

  const data: Pet[] = await res.json();

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col min-h-screen max-w-screen-xl mx-auto px-3 md:px-6 xl:px-10">
        <Header />
        <PetContextProvider data={data}>{children}</PetContextProvider>
        <Footer />
      </div>
    </>
  );
}
export default AppLayout;
