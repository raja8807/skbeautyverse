import BookingScreen from "@/components/screens/booking/booking";

const Booking = ({ customer, setCustomer, bookingData = [],packages }) => {
  //   console.log();
  return (
    <BookingScreen
      customer={customer}
      setCustomer={setCustomer}
      bookingData={bookingData}
      packages={packages}
    />
  );
};

export default Booking;

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`http://${context.req.headers.host}/api/booking`);
    const bookingData = await res.json();

    return {
      props: {
        bookingData: bookingData.bookings,
        packages: bookingData.packages,
      },
    };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { images: "errr-->" + err.message } };
  }
}
