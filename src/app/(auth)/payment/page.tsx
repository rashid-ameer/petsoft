import { H1, PaymentButton, UpdateTokenButton } from "@/components";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

function Payment({ searchParams }: Props) {
  return (
    <main className="flex flex-col gap-y-5 items-center">
      <H1>Petsoft access requires payment</H1>

      {searchParams.success && <UpdateTokenButton />}

      {!searchParams.success && <PaymentButton />}

      {searchParams.success && (
        <p className="text-green-500">
          Payment successful! You can now access PetSoft
        </p>
      )}

      {searchParams.cancelled && (
        <p className="text-red-500">Payment cancelled. You can try again.</p>
      )}
    </main>
  );
}
export default Payment;
