import Image from "next/image";
import { Logo } from "@/components";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[#5dc9a8] flex flex-col xl:flex-row items-center justify-center gap-10 py-10">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt=""
        width={519}
        height={472}
        priority
      />

      <div className="text-center xl:text-left">
        <Logo />

        <h1 className="mx-auto xl:mx-0 text-5xl font-semibold max-w-[500px] my-6">
          Manage your <strong>pet daycare</strong> with ease
        </h1>

        <p className="mx-auto xl:mx-0 text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for <strong>$299</strong>.
        </p>

        <div className="mt-10 space-x-4">
          <Button
            variant="secondary"
            asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
