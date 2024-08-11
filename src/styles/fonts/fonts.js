import {
  Dancing_Script,
  Courgette,
  Marcellus as MainFont,
} from "next/font/google";

// console.log(Dancing_Script.name);

const font1 = Dancing_Script({
  weight: ["variable"],
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

const mainFont = MainFont({
  weight: ["400"],
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

const fonts = {
  mainFont: mainFont.className,
};

export default fonts;
export const customFont1 = font1.className;
