export async function fetchCars(consulta) {
  return await fetch(
    `http://localhost:5134/api/Custom/getCarsAvailables/${consulta.branch.id}/${consulta.bookingDates.startDate}/${consulta.bookingDates.endDate}/${consulta.age}`
  )
    .then((response) => {
      return response.json();
    })
    .then((cars) => {
      setDataStorage({ cars, consulta });
    });
}

function setDataStorage(data) {
  sessionStorage.setItem("data", JSON.stringify(data));
}
