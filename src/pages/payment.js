import React, { useEffect, useState } from "react";
import "material-symbols";
import { BookingInformation } from "./_app";
import { useContext } from "react";
import PriceDrawer from "@/components/PriceDrawer";
import { useRouter } from "next/router";
import { PaymentForm } from "../components/PaymentForm";
import { Button } from "@mui/material";

export default function Contact(props) {
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [currentAccordionIndex, setCurrentAccordionIndex] = useState(0);
  const [formArray, setFormArray] = useState([]);
  const router = useRouter();

  console.log("number", bookingDetails.ticketAmount);

  const handleNextTicket = () => {
    setCurrentAccordionIndex(currentAccordionIndex + 1);
    console.log(formArray);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      cardNumber: event.target.cardNumber.value,
      email: event.target.email.value,
      streetAdress: event.target.streetAdress.value,
      zipCode: event.target.zipCode.value,
    };

    setFormArray((prevFormArray) => [...prevFormArray, formData]);
    handleNextTicket();
    console.log("Form Data:", JSON.stringify(formData));
    console.log(formData); // Log the stringified form data
    console.log(formArray.length);
    // event.target.reset()
  };

  useEffect(() => {
    console.log(formArray);
  }, [formArray]);

  function updateBookingDetails() {
    setBookingDetails((prev) => ({
      ...prev,
      contactInformation: {
        formArray,
      },
    }));
  }

  function goToPayment() {
    router.push("/payment");
  }

  return (
    <>
      <main>
        <h2 className="text-center">Payment</h2>
        <PaymentForm
          bookingDetails={bookingDetails}
          updateBookingDetails={updateBookingDetails}
          onNextTicket={handleNextTicket}
          handleSubmit={handleSubmit}
        />

        <div className=" mb-16 mt-10 flex justify-center">
          <Button
            className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black "
            onClick={() => console.log("button clicked")}
          >
            <span className="pt-1">Next step</span> <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>

        <div className={`fixed bottom-0 left-0 right-0 `}>
          <PriceDrawer />
        </div>
      </main>
    </>
  );
}
