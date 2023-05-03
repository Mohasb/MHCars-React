export async function ReservationCar(car, booking) {
  //console.log("aqui");
  //console.log(car);
  //console.log(booking);

  const reservation = {
    startDate: booking.bookingDates.startDate,
    endDate: booking.bookingDates.endDate,
    branchId: booking.branch.id,
    clientId: 1,
    carCategory: car.category,
  };
  console.log(reservation);

  try {
    const response = await fetch(`http://localhost:5134/api/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}
