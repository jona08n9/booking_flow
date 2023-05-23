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

const ValidationTextFieldPhone = styled(TextField)(({ inputValue }) => ({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1D1C29",
    },
    "& input:valid + fieldset": {
      borderColor: "green",
      borderColor: inputValue === 11 ? "green" : "black",
      borderWidth: 2,
    },
  },
}));

const ValidationTextFieldZip = styled(TextField)(({ inputValueZip }) => ({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1D1C29",
    },
    "& input:valid + fieldset": {
      borderColor: "green",
      borderColor: inputValueZip === 4 ? "green" : "black",
      borderWidth: 2,
    },
  },
}));

const ValidationTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1D1C29",
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
      mask="00 00 00 00"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});

function Contact(props) {
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const [currentAccordionIndex, setCurrentAccordionIndex] = useState(0);
  const [formArray, setFormArray] = useState([]);
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
      phoneNumber: event.target.phoneNumber.value,
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

  return (
    <>
      {[...Array(bookingDetails.ticketAmount)].map((_, index) => (
        <ContactForm bookingDetails={bookingDetails} updateBookingDetails={updateBookingDetails} numOfTickets={index + 1} key={index} fromIndex={index} isExpanded={index === currentAccordionIndex} onNextTicket={handleNextTicket} handleSubmit={handleSubmit} onClickAccordion={() => setCurrentAccordionIndex(index)} />
      ))}
      {bookingDetails.ticketAmount === formArray.length ? (
        <div className="mt-10 flex justify-center">
          <Button onClick={updateBookingDetails} className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-yellow px-6 font-sans font-semibold text-color-yellow hover:bg-color-yellow hover:text-color-black ">
            <span className="pt-1">Go to payment</span>
          </Button>
        </div>
      ) : (
        <div className="mt-10 flex justify-center">
          <Button disabled={true} className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-gray bg-color-gray px-6 font-sans font-semibold text-color-black hover:bg-color-yellow hover:text-color-black ">
            <span className="pt-1">Go to payment</span>
          </Button>
        </div>
      )}
    </>
  );
}

function ContactForm(props) {
  const [zipCode, setZipCode] = useState("");
  const [values, setValues] = React.useState({
    phoneNumber: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeZip = (event) => {
    const limit = 4;

    setZipCode(event.target.value.slice(0, limit));
    // console.log(event.target.value.length);
  };

  const inputValue = values.phoneNumber.length;
  const inputValueZip = zipCode.length;

  return (
    <form onSubmit={props.handleSubmit}>
      <Accordion className="bg-color-white " expanded={props.isExpanded}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" onClick={props.onClickAccordion}>
          <Typography className="text-color-black">Ticket #{props.numOfTickets} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ValidationTextField fullWidth type="text" label="First name" required variant="outlined" defaultValue="" id="validation-outlined-input" name="firstName" />
          <ValidationTextField fullWidth className="mt-4" type="text" label="Last name" required variant="outlined" defaultValue="" id="validation-outlined-input" name="lastName" />
          <ValidationTextFieldPhone className="mt-4" onChange={handleChange} id="formatted-text-mask-input" InputProps={{ inputComponent: TextMaskCustom }} fullWidth label="Phone number" required variant="outlined" value={values.phoneNumber} inputValue={inputValue} name="phoneNumber" />
          <ValidationTextField type="email" fullWidth className="mt-4" label="Email" required variant="outlined" defaultValue="" id="validation-outlined-input" name="email" />
          <ValidationTextField fullWidth className="mt-4" type="text" label="Street and house number" required variant="outlined" defaultValue="" id="validation-outlined-input" name="streetAdress" />
          <ValidationTextFieldZip type="number" fullWidth className="mt-4" label="Zip code" required variant="outlined" value={zipCode} defaultValue="" id="validation-outlined-input" onChange={handleChangeZip} inputValueZip={inputValueZip} name="zipCode" />
        </AccordionDetails>

        <div className="mt-10 flex justify-center">
          <Button type="submit" onClick={() => props.updateBookingDetails} className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-black px-6 font-sans font-semibold text-color-black hover:bg-color-black hover:text-color-yellow ">
            <span className="pt-1">Next ticket</span>
          </Button>
        </div>
        {/* <Button onClick={() => console.log(props.bookingDetails)} className=" mb-10 h-10 gap-5 place-self-center rounded-none border-2 border-solid border-color-black px-6 font-sans font-semibold text-color-black hover:bg-color-black hover:text-color-yellow ">
          <span className="pt-1">log info</span>
        </Button> */}
      </Accordion>
    </form>
  );
}

export default Contact;
