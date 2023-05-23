import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BookingInformation } from "@/pages/_app";
import { useContext, useState, useEffect } from "react";
export default function Drawer() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  const ticketPrice = bookingDetails.ticketType === "regular" ? 799 : 1299;
  const greenCampPrice = bookingDetails.greenCamp ? 249 : 0;
  const campSetUpPrice = bookingDetails.campSetUp ? 399 : 0;

  useEffect(() => {
    updateTotalPrice();
  }, [bookingDetails]);
  // this function adds to totalPrice for each ticket
  function updateTotalPrice() {
    setTotalPrice(ticketPrice * bookingDetails.ticketAmount + greenCampPrice);
  }

  /* makes sure that bookingDetails is updated everytime either  "ticketAmount" or "oneTentForEach" changes */
  useEffect(() => {
    updateBookingDetails();
  }, [totalPrice]);

  /*This function updates bookingDetails, by setting state to the new values of "ticketAmount" and oneTentForEach*/
  function updateBookingDetails() {
    setBookingDetails((prev) => ({
      ...prev,
      totalPrice,
    }));
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography className="text-lg  text-color-black">Total: {bookingDetails.totalPrice} ,-</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className=" font-light text-color-black">
            {`${bookingDetails.ticketAmount}x ${bookingDetails.ticketType} Tickets ${ticketPrice},-`}
            <br></br>
            {greenCampPrice !== 0 ? `${bookingDetails.ticketAmount}x GreenCamp ${greenCampPrice},-` : ""}
            <br></br>
            {campSetUpPrice !== 0 ? `1x GreenCamp ${campSetUpPrice},-` : ""}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
