import { ContentBlock, H1 } from "@/components";

function Account() {
  return (
    <main>
      <H1 className="my-10">Your Account</H1>
      <ContentBlock className="h-[500px]">
        <p>This is your account</p>
      </ContentBlock>
    </main>
  );
}
export default Account;
