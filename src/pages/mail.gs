// Google Apps Script - Email Service
// Deploy as Web App and use the URL below

function doPost(e) {
  const data = JSON.parse(e.postData.contents)
  
  // Email to Client - Confirmation
  const clientSubject = `Booking Confirmed: ${data.space_name}`
  const clientBody = `
Hi ${data.client_name},

Congratulations! Your reservation for ${data.space_name} has been successfully received.

📅 Date: ${data.booking_date}
⏰ Time: ${data.time_slot}
📍 Location: KaFlix Space, Kuala Lumpur

Note: Please arrive 30 minutes early for check-in. We have included a complimentary 30 minute setup and cleanup buffer for your session.

Thank you for choosing KaFlix Space!

Best regards,
KaFlix Space Team
  `
  
  // Send confirmation to CLIENT
  MailApp.sendEmail({
    to: data.client_email,
    subject: clientSubject,
    body: clientBody,
    name: 'KaFlix Space'
  })
  
  // Also notify ADMIN
  const adminSubject = `New Booking: ${data.space_name} - ${data.client_name}`
  const adminBody = `
New booking received!

Client: ${data.client_name}
Email: ${data.client_email}
Space: ${data.space_name}
Date: ${data.booking_date}
Time: ${data.time_slot}
  `
  
  MailApp.sendEmail({
    to: 'kalincreativee@gmail.com',
    subject: adminSubject,
    body: adminBody,
    name: 'KaFlix Space System'
  })
  
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON)
}