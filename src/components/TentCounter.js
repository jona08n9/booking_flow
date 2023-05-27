import { BookingInformation } from "@/pages/_app";
import Button from "@mui/material/Button";
import { useContext, useState, useEffect } from "react";

export function TentCounter(props) {
  return (
    <>
      <div className="mb-6 pt-6">
        <p className="mb-8 text-center underline underline-offset-8 ">
          {`${props.size} Person tent`} <span className="font-bold">{`${props.price !== 0 && props.price !== undefined ? props.price + ",-" : ""}`}</span>
        </p>

        <div className="flex items-center	 justify-center">
          <Button className="rounded-2 h-14 place-self-center border-2 border-solid border-color-yellow font-sans text-5xl font-bold text-color-blue md:h-6 md:text-3xl" variant="contained" style={{ backgroundColor: "yellow" }} onClick={() => props.addOrSubtractTent(false, props.size, props.type)} /* this button subtracts one from ticketAmount */>
            -
          </Button>

          <p className="mx-16 text-5xl font-bold">{props.PersonInTentNum}</p>

          <Button className="rounded-2 h-14 place-self-center border-2 border-solid border-color-yellow font-sans text-5xl font-bold text-color-blue md:h-6 md:text-3xl" variant="text" style={{ backgroundColor: "yellow" }} onClick={() => props.addOrSubtractTent(true, props.size, props.type)} /* this button adds one to ticketAmount */>
            +
          </Button>
        </div>
      </div>
    </>
  );
}
