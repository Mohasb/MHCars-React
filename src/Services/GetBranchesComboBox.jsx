export async function fetcBranches() {
  try {
    const response = fetch(`http://localhost:5134/api/Branches`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((branches) => {
        if (active) {
          setOptions([...branches]);
        }
      });
  } catch (error) {
    console.log(error);
  }
}