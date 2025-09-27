import React from "react";
import applePaySVG from "@/public/images/apple-pay.svg";
import googlePaySVG from "@/public/images/google-pay.svg";
import Image from "next/image";

function PaymentBadges() {
  return (
    <>
      <div
        className="mt-3 flex items-center gap-3"
        aria-label="Payment methods available at checkout"
      >
        <Image
          src={applePaySVG}
          height={1000}
          width={800}
          alt="apple pay logo svg"
          priority
          className="w-24 h-10 object-cover p-1 border-2 shadow-xl rounded-md"
        />
        <Image
          src={googlePaySVG}
          height={1000}
          width={800}
          alt="google pay logo svg"
          priority
          className="w-24 h-10 object-cover p-1 border-2 shadow-lg rounded-md"
        />
      </div>
      <p className="my-2">Payment methods also available at checkout</p>
    </>
  );
}

export default PaymentBadges;
