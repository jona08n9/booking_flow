import Radio from "@mui/material/Radio";
import { BookingInformation } from "@/pages/_app";
import { useContext } from "react";

export function TicketType(props) {
  const price = props.radioValue === "regular" ? 799 : 1299;
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  return (
    <>
      <article
        className={`w-42 m-1 flex h-32 cursor-pointer flex-col self-center rounded-sm bg-color-black bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 py-4 pl-2 pr-3 text-lg duration-500  ${
          props.radioValue === bookingDetails.ticketType ? "bg-gradient-to-b from-color-teal to-color-purple" : ""
        }`}
        onClick={() => props.pickTicketType(props.radioValue)} /* makes the card clickable and calls 
        "pickTicketType" from parent component */
      >
        <div className="mr-0 flex justify-between">
          {/* This is the heading of the card */}
          <h3 className={` self-center text-lg duration-200 `}>{`${props.ticketType}`}</h3>

          <Radio
            checked={props.selectedValue === props.radioValue}
            value={props.radioValue}
            name="radio-buttons"
            sx={{
              //styling for radio button to make it yellow
              m: 0,
              "& .MuiSvgIcon-root": {
                color: "yellow",
                fontSize: 20,

                "& .Mui-checked": {
                  color: "yellow",
                },
                "&.MuiTouchRippe-root": {
                  color: "yellow",
                },
              },
            }}
          />
        </div>
        <div className="mt-auto flex justify-between gap-3 ">
          {/* This is the explainer text for the card */}
          <p className={` self-center text-sm duration-200 `}>{`${props.typeAddOns}`}</p>
          <div className="font-sans ">
            <span className={"text-lg font-bold text-color-yellow"}>{price},-</span>
          </div>
        </div>
      </article>
    </>
  );
}
