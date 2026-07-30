let accessToken = "";
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const Spotify = {
  async getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const randomBytes = crypto.getRandomValues(new Uint8Array(32));

    const codeVerifier = Array.from(randomBytes, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);

    const hashed = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashed));

    const base64String = btoa(String.fromCharCode(...hashArray));

    const codeChallenge = base64String
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const scope = "playlist-modify-public playlist-modify-private";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${encodeURIComponent(scope)}`;

    sessionStorage.setItem("code_verifier", codeVerifier);

    window.location.href = authUrl;
  },
};

export default Spotify;
