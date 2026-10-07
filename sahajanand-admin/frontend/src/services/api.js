// Backend base URL used by every admin page.
// Uses the host the admin app was opened from, so it also works from another PC on the LAN
// (there "localhost" would be that PC itself, not the machine running the backend).
export const API_URL = `http://${window.location.hostname}:5000`
