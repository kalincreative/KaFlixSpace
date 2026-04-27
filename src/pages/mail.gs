// Google Apps Script - Email Service
// Deploy as Web App and use the URL below

function doPost(e) {
  const data = JSON.parse(e.postData.contents)
  
  const emailSubject = `New Booking: ${data.space_name}`
  const emailBody = `
Hi KaFlix Team,

New booking received!

Client: ${data.client_name}
Email: ${data.client_email}
Space: ${data.space_name}
Date: ${data.booking_date}
Time: ${data.time_slot}

---
This email was sent from KaFlix Space booking system.
  `
  
  // Send email to admin
  MailApp.sendEmail({
    to: 'kalincreativee@gmail.com',
    subject: emailSubject,
    body: emailBody,
    name: 'KaFlix Space'
  })
  
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON)
}