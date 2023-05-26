import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { IMaskInput } from "react-imask";
import { BookingInformation } from "./_app";
import { useContext } from "react";
import PriceDrawer from "@/components/PriceDrawer";
import { useRouter } from "next/router";
import { PaymentForm } from "../components/PaymentForm";

// export const ValidationTextFieldCardNum = styled(TextField)(({ inputValue }) => ({
//   "& label.Mui-focused": {
//     color: "#F9F01F",
//   },
//   "& label": {
//     color: "#F9F01F75",
//   },

//   "& .MuiOutlinedInput-root": {
//     "& fieldset ": {
//       borderColor: "#F9F01F",
//     },
//     "& input": {
//       color: "#F9F01F", // Set the text color
//     },

//     "&:hover fieldset": {
//       borderColor: "#F9F01F",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#F9F01F",
//     },
//     "& input:valid + fieldset": {
//       borderColor: inputValue === 19 ? "green" : "F9F01F",
//       borderWidth: 2,
//     },
//   },
// }));

// export const ValidationTextFieldCardHolderName = styled(TextField)({
//   "& label.Mui-focused": {
//     color: "#F9F01F",
//   },
//   "& label": {
//     color: "#F9F01F75",
//   },

//   "& .MuiOutlinedInput-root": {
//     "& fieldset ": {
//       borderColor: "#F9F01F",
//       color: "#F9F01F",
//     },
//     "& input": {
//       color: "#F9F01F", // Set the text color
//     },
//     "&:hover fieldset": {
//       borderColor: "#F9F01F",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#F9F01F",
//     },
//     "& input:valid + fieldset": {
//       borderColor: "green",
//       borderWidth: 2,
//     },
//   },
// });
// export const ValidationTextFieldMonthYear = styled(TextField)(({ inputValue }) => ({
//   "& label.Mui-focused": {
//     color: "#F9F01F",
//   },
//   "& label": {
//     color: "#F9F01F75",
//   },

//   "& .MuiOutlinedInput-root": {
//     "& fieldset ": {
//       borderColor: "#F9F01F",
//     },
//     "& input": {
//       color: "#F9F01F", // Set the text color
//     },

//     "&:hover fieldset": {
//       borderColor: "#F9F01F",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#F9F01F",
//     },
//     "& input:valid + fieldset": {
//       borderColor: inputValue === 5 ? "green" : "F9F01F",
//       borderWidth: 2,
//     },
//   },
// }));
// export const ValidationTextFieldCvc = styled(TextField)(({ inputValue }) => ({
//   "& label.Mui-focused": {
//     color: "#F9F01F",
//   },
//   "& label": {
//     color: "#F9F01F75",
//   },

//   "& .MuiOutlinedInput-root": {
//     "& fieldset ": {
//       borderColor: "#F9F01F",
//     },
//     "& input": {
//       color: "#F9F01F", // Set the text color
//     },

//     "&:hover fieldset": {
//       borderColor: "#F9F01F",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#F9F01F",
//     },
//     "& input:valid + fieldset": {
//       borderColor: "green",
//       borderColor: inputValue === 3 ? "green" : "F9F01F",
//       borderWidth: 2,
//     },
//   },
// }));

// export const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
//   const { onChange, ...other } = props;
//   return (
//     <IMaskInput
//       {...other}
//       mask="0000-0000-0000-0000"
//       definitions={{
//         "#": /[1-9]/,
//       }}
//       inputRef={ref}
//       onAccept={(value) => onChange({ target: { name: props.name, value } })}
//       overwrite
//     />
//   );
// });

// export const TextMaskmonthYearValue = React.forwardRef(function TextMaskCustom(props, ref) {
//   const { onChange, ...other } = props;
//   return (
//     <IMaskInput
//       {...other}
//       mask="00/00"
//       definitions={{
//         "#": /[1-9]/,
//       }}
//       inputRef={ref}
//       onAccept={(value) => onChange({ target: { name: props.name, value } })}
//       overwrite
//     />
//   );
// });

// export const TextMaskCvc = React.forwardRef(function TextMaskCustom(props, ref) {
//   const { onChange, ...other } = props;
//   return (
//     <IMaskInput
//       {...other}
//       mask="000"
//       definitions={{
//         "#": /[1-9]/,
//       }}
//       inputRef={ref}
//       onAccept={(value) => onChange({ target: { name: props.name, value } })}
//       overwrite
//     />
//   );
// });

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

        <div className={`fixed bottom-0 left-0 right-0 `}>
          <PriceDrawer />
        </div>
      </main>
    </>
  );
}
