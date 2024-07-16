import { ContentBlock, H1, SignoutButton } from "@/components";
import { checkAuth } from "@/lib/server-utils";

async function Account() {
  const session = await checkAuth();

  return (
    <main>
      <H1 className="my-10">Your Account</H1>
      <ContentBlock className="h-[500px] flex flex-col gap-y-3 items-center justify-center">
        <p>
          Logged in as <strong>{session.user.email}</strong>
        </p>
        <SignoutButton />
      </ContentBlock>
    </main>
  );
}
export default Account;
