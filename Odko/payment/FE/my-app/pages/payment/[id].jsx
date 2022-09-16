import StripeContainer from "../../components/payment/StripeContainer";

export default function Payment() {
  //   const router = useRouter();

  return (
    <>
      <StripeContainer price={1000 * 100} />
    </>
  );
}
