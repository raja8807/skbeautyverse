import {
  Dancing_Script,
  Courgette,
  Marcellus as MainFont,
  Oswald,
} from "next/font/google";

const font1 = Dancing_Script({
  weight: ["variable"],
  subsets: ["latin"],
  fallback: ["sans-serif"],
});
const oswaldFont = Oswald({
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
export const oswald = oswaldFont.className;
