import PaymentSuccessAnimation from "@/components/ui/paymentSuccess";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main className="bg-muted h-screen pt-10">
      <div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-[#253239] to-[#818181]">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <PaymentSuccessAnimation/>
        <h2 className="text-2xl">Amount paid</h2>
        <div className="bg-white p-2 rounded-md text-black mt-5 text-4xl font-bold">
          ${amount}
        </div>
      </div>
    </main>
  );
}
