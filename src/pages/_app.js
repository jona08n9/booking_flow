import "@/styles/globals.css";
import { createContext, useState } from "react";
import { Playfair_Display } from "next/font/google";
import {StyledEngineProvider} from '@mui/material';



const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const BookingInformation = createContext();

export default function App({ Component, pageProps }) {
  const [bookingInformation, setBookingInformation] = useState({});
  return (
    <>
<StyledEngineProvider injectFirst>
      <BookingInformation.Provider value={[bookingInformation, setBookingInformation]}>
        <main className={`${playfairDisplay.variable} font-serif `}>
          <Component {...pageProps} />
        </main>
      </BookingInformation.Provider>
      </StyledEngineProvider>
    </>
  );
}
