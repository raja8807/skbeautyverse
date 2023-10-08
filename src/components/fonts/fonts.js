import {Lora  } from "next/font/google";
// import {Petit_Formal_Script  as SubFont } from "next/font/google";

// Kaushan_Script

const lora = Lora({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: [  "400"],
  // weight: ["400"],
  subsets: ["latin"],
});

import {Petit_Formal_Script  } from "next/font/google";

const petit = Petit_Formal_Script({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: [  "400"],
  subsets: ["latin"],
});

const fonts = {
    lora : lora.className,
    petit : petit.className,
}
export default fonts