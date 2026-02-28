export function reservationEmailTemplate({
	firstname,
	lastname,
	email,
	phone,
	slot,
	partySize,
	job,
	ownsSonyCamera,
	sonyModel,
	currentCamera,
	matchingEnvironment,
	colorWorkflow,
}) {
	return `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0; padding:0; background:#0a0a0a; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">

    <div style="max-width:620px; margin:40px auto; background:#111111; border-radius:4px; overflow:hidden;">

      <!-- Header -->
      <div style="background:#000000; padding:32px 40px; border-bottom:1px solid #1e1e1e;">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div>
            <p style="margin:0; font-size:10px; letter-spacing:4px; text-transform:uppercase; color:#f0a500; font-weight:700;">Sony</p>
            <h1 style="margin:4px 0 0; font-size:22px; font-weight:300; color:#ffffff; letter-spacing:2px; text-transform:uppercase;">Sony Venice 2</h1>
          </div>
          <div style="text-align:right;">
            <p style="margin:0; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#555555;">RSVP Confirmed</p>
          </div>
        </div>
      </div>

      <!-- Hero Strip -->
      <div style="background:linear-gradient(135deg, #f0a500 0%, #c47d00 100%); padding:20px 40px;">
        <p style="margin:0; font-size:11px; letter-spacing:4px; text-transform:uppercase; color:#000000; font-weight:700; opacity:0.7;">Your reservation is confirmed</p>
        <h2 style="margin:6px 0 0; font-size:26px; font-weight:700; color:#000000; letter-spacing:-0.5px;">
          ${firstname} ${lastname}
        </h2>
      </div>

      <!-- Body -->
      <div style="padding:36px 40px; background:#111111;">

        <p style="font-size:15px; color:#cccccc; margin:0 0 24px; line-height:1.7;">
          Thank you for registering for the <strong style="color:#ffffff;">Sony Venice 2 Experience</strong>. 
          We've received your RSVP and your spot is locked in. Here's a summary of your submission:
        </p>

        <!-- Event Details Block -->
        <div style="background:#1a1a1a; border:1px solid #2a2a2a; border-radius:4px; padding:24px; margin-bottom:24px;">
          <p style="margin:0 0 14px; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#f0a500; font-weight:700;">Event Details</p>
          <table style="width:100%; border-collapse:collapse; font-size:14px; color:#cccccc;">
            <tr>
              <td style="padding:6px 0; color:#666666; width:45%;">Date / Slot</td>
              <td style="padding:6px 0; color:#ffffff; font-weight:600;">${slot}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#666666;">Party Size</td>
              <td style="padding:6px 0; color:#ffffff; font-weight:600;">${partySize} ${Number(partySize) === 1 ? 'person' : 'people'}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#666666;">Role</td>
              <td style="padding:6px 0; color:#ffffff; font-weight:600;">${job}</td>
            </tr>
          </table>
        </div>

        <!-- Contact Block -->
        <div style="background:#1a1a1a; border:1px solid #2a2a2a; border-radius:4px; padding:24px; margin-bottom:24px;">
          <p style="margin:0 0 14px; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#f0a500; font-weight:700;">Contact Info</p>
          <table style="width:100%; border-collapse:collapse; font-size:14px; color:#cccccc;">
            <tr>
              <td style="padding:6px 0; color:#666666; width:45%;">Email</td>
              <td style="padding:6px 0; color:#ffffff;">${email}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#666666;">Phone</td>
              <td style="padding:6px 0; color:#ffffff;">${phone}</td>
            </tr>
          </table>
        </div>

        <!-- Camera Details Block -->
        <div style="background:#1a1a1a; border:1px solid #2a2a2a; border-radius:4px; padding:24px; margin-bottom:24px;">
          <p style="margin:0 0 14px; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#f0a500; font-weight:700;">Camera Profile</p>
          <table style="width:100%; border-collapse:collapse; font-size:14px; color:#cccccc;">
            <tr>
              <td style="padding:6px 0; color:#666666; width:45%;">Owns Sony Camera</td>
              <td style="padding:6px 0; color:#ffffff; font-weight:600;">${ownsSonyCamera ? 'Yes' : 'No'}</td>
            </tr>
            ${
							ownsSonyCamera && sonyModel ?
								`
            <tr>
              <td style="padding:6px 0; color:#666666;">Sony Model</td>
              <td style="padding:6px 0; color:#ffffff;">${sonyModel}</td>
            </tr>`
							:	''
						}
            <tr>
              <td style="padding:6px 0; color:#666666;">Current Camera</td>
              <td style="padding:6px 0; color:#ffffff;">${currentCamera}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#666666;">Multi-Camera Matching</td>
              <td style="padding:6px 0; color:#ffffff;">${matchingEnvironment}</td>
            </tr>
          </table>

          <!-- Color Workflow -->
          <div style="margin-top:16px; padding-top:16px; border-top:1px solid #2a2a2a;">
            <p style="margin:0 0 6px; font-size:12px; color:#666666; text-transform:uppercase; letter-spacing:2px;">Color Workflow</p>
            <p style="margin:0; font-size:14px; color:#cccccc; line-height:1.6;">${colorWorkflow}</p>
          </div>
        </div>

        <p style="font-size:14px; color:#888888; margin:0 0 8px; line-height:1.7;">
          We'll be in touch with any updates closer to the event. If you have any questions, 
          don't hesitate to reach out.
        </p>

        <p style="font-size:14px; color:#888888; margin:0; line-height:1.7;">
          See you on <strong style="color:#f0a500;">${slot}</strong>.
        </p>

      </div>

      <!-- Divider -->
      <div style="height:1px; background:linear-gradient(to right, transparent, #f0a500, transparent);"></div>

      <!-- Footer -->
      <div style="padding:28px 40px; background:#0d0d0d;">
        <p style="font-size:12px; color:#444444; margin:0 0 8px; line-height:1.7;">
          This confirmation was sent to 
          <a href="mailto:${email}" style="color:#f0a500; text-decoration:none;">${email}</a>. 
          If this wasn't you, please disregard this message.
        </p>
        <p style="font-size:11px; color:#333333; margin:16px 0 0; letter-spacing:2px; text-transform:uppercase;">
          Sony CineAlta &nbsp;&bull;&nbsp; ${new Date().getFullYear()}
        </p>
      </div>

    </div>

  </body>
</html>`;
}
