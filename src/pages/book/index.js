import BookingScreen from "@/components/screens/booking/booking";


const Booking = ({ customer, setCustomer, bookingData=[] }) => {
//   console.log();
  return <BookingScreen customer={customer} setCustomer={setCustomer} bookingData={bookingData} />;
};

export default Booking;

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`http://${context.req.headers.host}/api/booking`);
    const bookingData = await res.json();
    return { props: { bookingData } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { images: "errr-->" + err.message } };
  }
}
