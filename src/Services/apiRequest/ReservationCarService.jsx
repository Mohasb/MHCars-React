export async function ReservationCar(car, booking, user) {
  console.log(user);

  const reservation = {
    startDate: booking.bookingDates.startDate,
    endDate: booking.bookingDates.endDate,
    branchId: booking.branch.id,
    returnBranchId: booking.returnBranch.id,
    clientId: user.id,
    carCategory: car.category,
    carId: car.id,
  };
  console.log(reservation);

  try {
    const response = await fetch(`http://localhost:5134/api/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    }).then((response) => {
      return response;
    });
    return response;
  } catch (error) {
    return error;
  }
}
