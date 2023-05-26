import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IMaskInput } from "react-imask";
import { NumericFormat } from "react-number-format";
import { BookingInformation } from "./_app";
import { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PriceDrawer from "@/components/PriceDrawer";
import { useRouter } from "next/router";
import { yellow } from "@mui/material/colors";

const ValidationTextFieldPhone = styled(TextField)(({ inputValue }) => ({
  "& label.Mui-focused": {
    color: "#F9F01F",
  },
  "& label": {
    color: "#F9F01F75",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset ": {
      borderColor: "#F9F01F",
    },
    "& input": {
      color: "#F9F9F9", // Set the text color
    },

    "&:hover fieldset": {
      borderColor: "#F9F01F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
    },
    "& input:valid + fieldset": {
      borderColor: "green",
      borderColor: inputValue === 19 ? "green" : "black",
      borderWidth: 2,
    },
  },
}));

const ValidationTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#F9F01F",
  },
  "& label": {
    color: "#F9F01F75",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset ": {
      borderColor: "#F9F01F",
      color: "#F9F9F9",
    },
    "& input": {
      color: "#F9F9F9", // Set the text color
    },
    "&:hover fieldset": {
      borderColor: "#F9F01F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F9F01F",
    },
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
  },
});

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000-0000-0000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const TextMaskmonthYearValue = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00/00"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const TextMaskCvc = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

function Contact(props) {
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

function PaymentForm(props) {
  const [monthYearValue, setmonthYearValue] = useState({ monthYear: "" });
  const [cardNumberValue, setcardNumberValue] = useState({
    cardNumber: "",
  });
  const [cvcValue, setCvcValue] = useState({
    cvc: "",
  });

  const handleChangeCvc = (event) => {
    setCvcValue({
      ...cvcValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setcardNumberValue({
      ...cardNumberValue,
      [event.target.name]: event.target.value,
    });
  };

  // const handleChangeZip = (event) => {
  //   const limit = 4;

  //   setZipCode(event.target.value.slice(0, limit));
  //   // console.log(event.target.value.length);
  // };

  const handleChangemonthYearValue = (event) => {
    setmonthYearValue({
      ...monthYearValue,
      [event.target.name]: event.target.value,
    });
  };

  const inputValue = cardNumberValue.cardNumber.length;
  const inputValuemonthYearValue = monthYearValue.monthYear.length;
  const inputValueCvc = cvcValue.cvc.length;

  return (
    <form
      className="mb-2"
      onSubmit={props.handleSubmit}
    >
      <ValidationTextField
        inputProps={{ inputMode: "text" }}
        fullWidth
        type="text"
        label="Card holder name"
        required
        variant="outlined"
        defaultValue=""
        id="validation-outlined-input"
        name="card-holder-name"
      />

      <ValidationTextFieldPhone
        inputProps={{ inputMode: "decimal" }}
        className="mt-4"
        onChange={handleChange}
        id="formatted-text-mask-input"
        InputProps={{ inputComponent: TextMaskCustom }}
        fullWidth
        label="Card number"
        required
        variant="outlined"
        value={cardNumberValue.cardNumber}
        inputValue={inputValue}
        name="cardNumber"
      />
      <ValidationTextField
        inputProps={{ inputMode: "decimal" }}
        className="mt-4"
        onChange={handleChangemonthYearValue}
        id="formatted-text-mask-input"
        InputProps={{ inputComponent: TextMaskmonthYearValue }}
        fullWidth
        label="Month/Year"
        required
        variant="outlined"
        value={monthYearValue.monthYear}
        inputValue={inputValuemonthYearValue}
        name="monthYear"
      />
      <ValidationTextField
        inputProps={{ inputMode: "decimal" }}
        className="mt-4"
        onChange={handleChangeCvc}
        id="formatted-text-mask-input"
        InputProps={{ inputComponent: TextMaskCvc }}
        fullWidth
        label="CVC"
        required
        variant="outlined"
        value={cvcValue.cvc}
        inputValue={inputValueCvc}
        name="cvc"
      />
      {/* <ValidationTextField
        inputProps={{ inputMode: "text" }}
        fullWidth
        className="mt-4"
        label="cvc"
        required
        variant="outlined"
        defaultValue=""
        id="validation-outlined-input"
        name="cvc"
      /> */}

      <div className="mt-10 flex justify-center">
        <Button
          type="submit"
          onClick={() => props.updateBookingDetails}
          className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-black px-6 font-sans font-semibold text-color-black hover:bg-color-black hover:text-color-yellow "
        >
          <span className="pt-1">Next ticket</span>
        </Button>
      </div>
      {/* <Button onClick={() => console.log(props.bookingDetails)} className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-black px-6 font-sans font-semibold text-color-black hover:bg-color-black hover:text-color-yellow ">
          <span className="pt-1">log info</span>
        </Button> */}
    </form>
  );
}

export default Contact;
