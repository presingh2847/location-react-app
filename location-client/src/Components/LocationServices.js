export async function getLocation(inputIp) {
  try {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`/api/geoData?ip=${inputIp}`, requestOptions);
    if (!response.ok) {
      const message = "Address was not found";
      return Promise.reject(message);
    }
    return await response.json();
  } catch (error) {
    return Promise.reject("Something bad happened, try again");
  }
}
