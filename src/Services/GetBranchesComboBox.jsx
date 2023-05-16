export async function fetcBranches(active, setOptions) {
  try {
    const response = fetch(`http://localhost:5134/api/Branches`)
      .then((response) => {
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