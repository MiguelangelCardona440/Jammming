let accessToken = "";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const Spotify = {
  async getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const codeVerifier = sessionStorage.getItem("code_verifier");

      if (!codeVerifier) {
        throw new Error("Code verifier not found");
      }

      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      });

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_description || "Failed to get access token");
      }

      accessToken = data.access_token;

      sessionStorage.removeItem("code_verifier");

      window.history.replaceState({}, document.title, window.location.pathname);

      return accessToken;
    }

    const randomBytes = crypto.getRandomValues(new Uint8Array(32));

    const codeVerifier = Array.from(randomBytes, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");

    const encoder = new TextEncoder();
    const encodedVerifier = encoder.encode(codeVerifier);

    const hashed = await crypto.subtle.digest("SHA-256", encodedVerifier);

    const hashArray = Array.from(new Uint8Array(hashed));

    const base64String = btoa(String.fromCharCode(...hashArray));

    const codeChallenge = base64String
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const scope = "playlist-modify-public playlist-modify-private";

    const authUrl =
      `https://accounts.spotify.com/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&code_challenge_method=S256` +
      `&code_challenge=${codeChallenge}` +
      `&scope=${encodeURIComponent(scope)}`;

    sessionStorage.setItem("code_verifier", codeVerifier);

    window.location.href = authUrl;

    return null;
  },

  async search(term) {
    if (!term.trim()) {
      return [];
    }

    const token = await this.getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
        term,
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to search Spotify");
    }

    return data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      album: track.album.name,
      uri: track.uri,
    }));
  },

  async savePlaylist(name, trackURIs) {
    if (!name.trim()) {
      throw new Error("Playlist name is required");
    }

    if (!trackURIs.length) {
      throw new Error("Add at least one song to the playlist");
    }

    const token = await this.getAccessToken();

    const playlistResponse = await fetch(
      "https://api.spotify.com/v1/me/playlists",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          public: false,
        }),
      },
    );

    const playlistData = await playlistResponse.json();

    if (!playlistResponse.ok) {
      throw new Error(
        playlistData.error?.message || "Failed to create playlist",
      );
    }

    const addTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistData.id}/items`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackURIs,
        }),
      },
    );

    const addTracksData = await addTracksResponse.json();

    if (!addTracksResponse.ok) {
      throw new Error(addTracksData.error?.message || "Failed to add tracks");
    }

    return playlistData;
  },
};

export default Spotify;
