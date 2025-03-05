function successCallback(position: any) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // You can use these coordinates to display the location on a map, etc.
}

function errorCallback(error: any) {
  console.error(`Error code: ${error.code}, Error message: ${error.message}`);
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
