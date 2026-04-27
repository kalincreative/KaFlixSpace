// Google Apps Script - Email Service
// Deploy as Web App and use the URL below

function doGet(e) {
  return handleRequest(e)
}

function doPost(e) {
  return handleRequest(e)
}

function handleRequest(e) {
  // Handle both POST and GET (for redirect workaround)
  let data = e.parameter
  if (e.postData) {
    try {
      data = JSON.parse(e.postData.contents)
    } catch (err) {
      data = e.parameter
    }
  }
  
  // Email to Client - Confirmation
  const clientSubject = `Booking Confirmed: ${data.space_name}`
  const clientBody = `Hi ${data.client_name},

Congratulations! Your reservation for ${data.space_name} has been successfully received.

Date: ${data.booking_date}
Time: ${data.time_slot}
Location: KaFlix Space, Kuala Lumpur

Note: Please arrive 30 minutes early for check-in.

Thank you for choosing KaFlix Space!

Best regards,
KaFlix Space Team`

  try {
    MailApp.sendEmail({
      to: data.client_email,
      subject: clientSubject,
      body: clientBody,
      name: 'KaFlix Space'
    })
  } catch (err) {
    Logger.log('Client email error: ' + err)
  }
  
  // Also notify ADMIN
  try {
    MailApp.sendEmail({
      to: 'kalincreativee@gmail.com',
      subject: `New Booking: ${data.space_name}`,
      body: `Client: ${data.client_name}\nEmail: ${data.client_email}\nSpace: ${data.space_name}\nDate: ${data.booking_date}\nTime: ${data.time_slot}`
    })
  } catch (err) {
    Logger.log('Admin email error: ' + err)
  }
  
  // Return with CORS headers
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON)
}