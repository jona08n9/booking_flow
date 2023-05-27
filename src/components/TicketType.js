import Radio from "@mui/material/Radio";
import { BookingInformation } from "@/pages/_app";
import { useContext } from "react";

export function TicketType(props) {
  const price = props.radioValue === "regular" ? 799 : 1299;
  const [bookingDetails, setBookingDetails] = useContext(BookingInformation);
  return (
    <>
      <article
        className="bg-color-back w-42 m-2.5 flex cursor-pointer flex-col rounded-sm bg-gradient-to-b from-color-opacity-20 to-color-opacity-10 py-4 pl-2 pr-3"
        onClick={() => props.pickTicketType(props.radioValue)} /* makes the card clickable and calls 
        "pickTicketType" from parent component */
      >
        <div className="mr-0 flex justify-between">
          {/* This is the heading of the card */}
          <h3 className={` text-2lg self-center duration-200 `}>{`${props.ticketType}`}</h3>

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
        <div className="mt-2 flex flex-col justify-start">
          {/* This is the explainer text for the card */}
          <p className={`duration-200 `}>{`${props.ticketType} tickets includes:`}</p>
          {/* <p className={`duration-200 `}>Regular tickets includes:</p> */}
          {props.ticketType === "Regular" ? (
            <ul className="pl-5">
              <li className="my-2 list-disc text-color-white">
                <span className="font-bold">Dirt:</span> <span className="font-light">to eat</span>
              </li>
              <li className="mb-2 list-disc text-color-white">
                <span className="font-bold">Water:</span> <span className="font-light">When it rains</span>
              </li>
              <li className="mb-2 list-disc text-color-white">
                <span className="font-bold">A bucket:</span> <span className="font-light">to sh*t in</span>
              </li>
            </ul>
          ) : (
            <ul className="pl-5">
              <li className="my-2 list-disc text-color-white">
                <span className="font-bold">Early Entry:</span> <span className="font-light">VIP ticket holders gains quicker access to the festival grounds.</span>
              </li>
              <li className="mb-2 list-disc text-color-white">
                <span className="font-bold">Power Banks:</span> <span className="font-light">Portable phone chargers that can be switched for new fully charged ones during the whole festival.</span>
              </li>
              <li className="mb-2 list-disc text-color-white">
                <span className="font-bold">VIP Restrooms:</span> <span className="font-light">Separate, well-maintained restroom facilities exclusive to VIP attendees, reducing wait times and offering a more comfortable and convenient experience.</span>
              </li>
              <li className="mb-2 list-disc text-color-white">
                <span className="font-bold">VIP Merchendaise:</span> <span className="font-light">Exclusive festival merchandise and limited edition items specifically for VIP ticket holders to buy.</span>
              </li>
              <li className="mb-2 list-disc text-color-white">
                <span className="font-bold">VIP Lounge:</span> <span className="font-light">A dedicated lounge area with comfortable seating, premium food and beverage options, and access to private bars or specialty cocktails.</span>
              </li>
            </ul>
          )}
        </div>
      </article>
    </>
  );
}
