// Google Apps Script - Email Service
// Deploy as Web App

function doGet(e) {
  return handleRequest(e)
}

function doPost(e) {
  return handleRequest(e)
}

function handleRequest(e) {
  // Parse data from POST body or query params
  let data = {}
  
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    // GET params or FormData
    data = e.parameter
  } else if (e.postData) {
    try {
      data = JSON.parse(e.postData.contents)
    } catch (err) {
      // Try parsing as string
      const str = e.postData.contents
      str.split('&').forEach(part => {
        const [key, val] = part.split('=')
        if (key) data[decodeURIComponent(key)] = decodeURIComponent(val || '')
      })
    }
  }
  
  const clientName = data.client_name || 'Customer'
  const clientEmail = data.client_email || ''
  const spaceName = data.space_name || 'Booking'
  const bookingDate = data.booking_date || ''
  const timeSlot = data.time_slot || ''
  
  // Email to Client - Confirmation
  if (clientEmail) {
    const clientBody = `Hi ${clientName},

Congratulations! Your reservation for ${spaceName} has been successfully received.

Date: ${bookingDate}
Time: ${timeSlot}
Location: KaFlix Space, Kuala Lumpur

Note: Please arrive 30 minutes early for check-in.

Thank you for choosing KaFlix Space!

Best regards,
KaFlix Space Team`

    MailApp.sendEmail({
      to: clientEmail,
      subject: `Booking Confirmed: ${spaceName}`,
      body: clientBody,
      name: 'KaFlix Space'
    })
  }
  
  // Also notify ADMIN
  MailApp.sendEmail({
    to: 'kalincreativee@gmail.com',
    subject: `New Booking: ${spaceName}`,
    body: `New Booking Received!\n\nClient: ${clientName}\nEmail: ${clientEmail}\nSpace: ${spaceName}\nDate: ${bookingDate}\nTime: ${timeSlot}`
  })
  
  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT)
}