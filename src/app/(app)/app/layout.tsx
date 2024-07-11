import BackgroundPattern from "@/components/background-pattern";
import Footer from "@/components/footer";
import Header from "@/components/header";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col min-h-screen max-w-screen-xl mx-auto px-3 md:px-6 xl:px-10">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
export default AppLayout;
