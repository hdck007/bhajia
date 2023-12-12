import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "../auth/[...nextauth]/route"

// a post request that take bcc, cc, email a image url and sends mail throught node mailer
const nodemailer = require("nodemailer")

const handler = async (req, res) => {
  const { bcc, cc, email, image, name, years } = await req.json()

  console.log({ bcc, cc, email, image, name })

  const data = await getServerSession(authOptions)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: data?.user?.email,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessToken: data?.accessToken,
    },
  })

  const mailOptions = {
    from: data?.user?.email,
    to: email,
    bcc: bcc,
    cc: cc,
    subject: `Happy work anniversary ${name}`,
    html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
          <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>${name}</title>
            <!--[if (mso 16)]>
                                    <style type="text/css"> a {text-decoration: none;} </style>
                                    <![endif]-->
            <!--[if gte mso 9]>
                                    <style>sup { font-size: 100% !important; }</style>
                                    <![endif]-->
            <!--[if gte mso 9]>
                                    <xml>
                                        <o:OfficeDocumentSettings>
                                            <o:AllowPNG></o:AllowPNG>
                                            <o:PixelsPerInch>96</o:PixelsPerInch>
                                        </o:OfficeDocumentSettings>
                                    </xml>
                                    <![endif]-->
            <style type="text/css">
              #outlook a {
                padding: 0;
              }
        
              .ExternalClass {
                width: 100%;
              }
        
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                line-height: 100%;
              }
        
              .es-button {
                mso-style-priority: 100 !important;
                text-decoration: none !important;
              }
        
              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
              }
        
              .es-desk-hidden {
                display: none;
                float: left;
                overflow: hidden;
                width: 0;
                max-height: 0;
                line-height: 0;
                mso-hide: all;
              }
        
              [data-ogsb] .es-button {
                border-width: 0 !important;
                padding: 10px 20px 10px 20px !important;
              }
        
              @media only screen and (max-width:600px) {
        
                p,
                ul li,
                ol li,
                a {
                  line-height: 150% !important
                }
        
                h1,
                h2,
                h3,
                h1 a,
                h2 a,
                h3 a {
                  line-height: 120% !important
                }
        
                h1 {
                  font-size: 30px !important;
                  text-align: center
                }
        
                h2 {
                  font-size: 26px !important;
                  text-align: center
                }
        
                h3 {
                  font-size: 20px !important;
                  text-align: center
                }
        
                .es-header-body h1 a,
                .es-content-body h1 a,
                .es-footer-body h1 a {
                  font-size: 30px !important
                }
        
                .es-header-body h2 a,
                .es-content-body h2 a,
                .es-footer-body h2 a {
                  font-size: 26px !important
                }
        
                .es-header-body h3 a,
                .es-content-body h3 a,
                .es-footer-body h3 a {
                  font-size: 20px !important
                }
        
                .es-header-body p,
                .es-header-body ul li,
                .es-header-body ol li,
                .es-header-body a {
                  font-size: 16px !important
                }
        
                .es-content-body p,
                .es-content-body ul li,
                .es-content-body ol li,
                .es-content-body a {
                  font-size: 16px !important
                }
        
                .es-footer-body p,
                .es-footer-body ul li,
                .es-footer-body ol li,
                .es-footer-body a {
                  font-size: 16px !important
                }
        
                .es-infoblock p,
                .es-infoblock ul li,
                .es-infoblock ol li,
                .es-infoblock a {
                  font-size: 12px !important
                }
        
                *[class="gmail-fix"] {
                  display: none !important
                }
        
                .es-m-txt-c,
                .es-m-txt-c h1,
                .es-m-txt-c h2,
                .es-m-txt-c h3 {
                  text-align: center !important
                }
        
                .es-m-txt-r,
                .es-m-txt-r h1,
                .es-m-txt-r h2,
                .es-m-txt-r h3 {
                  text-align: right !important
                }
        
                .es-m-txt-l,
                .es-m-txt-l h1,
                .es-m-txt-l h2,
                .es-m-txt-l h3 {
                  text-align: left !important
                }
        
                .es-m-txt-r img,
                .es-m-txt-c img,
                .es-m-txt-l img {
                  display: inline !important
                }
        
                .es-button-border {
                  display: block !important
                }
        
                a.es-button,
                button.es-button {
                  font-size: 20px !important;
                  display: block !important;
                  border-width: 10px 0px 10px 0px !important
                }
        
                .es-btn-fw {
                  border-width: 10px 0px !important;
                  text-align: center !important
                }
        
                .es-adaptive table,
                .es-btn-fw,
                .es-btn-fw-brdr,
                .es-left,
                .es-right {
                  width: 100% !important
                }
        
                .es-content table,
                .es-header table,
                .es-footer table,
                .es-content,
                .es-footer,
                .es-header {
                  width: 100% !important;
                  max-width: 600px !important
                }
        
                .es-adapt-td {
                  display: block !important;
                  width: 100% !important
                }
        
                .adapt-img {
                  width: 100% !important;
                  height: auto !important
                }
        
                .es-m-p0 {
                  padding: 0px !important
                }
        
                .es-m-p0r {
                  padding-right: 0px !important
                }
        
                .es-m-p0l {
                  padding-left: 0px !important
                }
        
                .es-m-p0t {
                  padding-top: 0px !important
                }
        
                .es-m-p0b {
                  padding-bottom: 0 !important
                }
        
                .es-m-p20b {
                  padding-bottom: 20px !important
                }
        
                .es-mobile-hidden,
                .es-hidden {
                  display: none !important
                }
        
                tr.es-desk-hidden,
                td.es-desk-hidden,
                table.es-desk-hidden {
                  width: auto !important;
                  overflow: visible !important;
                  float: none !important;
                  max-height: inherit !important;
                  line-height: inherit !important
                }
        
                tr.es-desk-hidden {
                  display: table-row !important
                }
        
                table.es-desk-hidden {
                  display: table !important
                }
        
                td.es-desk-menu-hidden {
                  display: table-cell !important
                }
        
                .es-menu td {
                  width: 1% !important
                }
        
                table.es-table-not-adapt,
                .esd-block-html table {
                  width: auto !important
                }
        
                table.es-social {
                  display: inline-block !important
                }
        
                table.es-social td {
                  display: inline-block !important
                }
        
                .es-menu td a {
                  font-size: 14px !important
                }
        
                .es-desk-hidden {
                  display: table-row !important;
                  width: auto !important;
                  overflow: visible !important;
                  max-height: inherit !important
                }
        
                .h-auto {
                  height: auto !important
                }
              }
            </style>
          </head>
          <body data-new-gr-c-s-loaded="8.902.0" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;padding:0;Margin:0">
            <div class="es-wrapper-color" style="background-color:#EFEFEF">
              <!--[if gte mso 9]>
                                        <v:background
                                            xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                            <v:fill type="tile" color="#efefef"></v:fill>
                                        </v:background>
                                        <![endif]-->
              <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
                <tr style="border-collapse:collapse">
                  <td valign="top" style="padding:0;Margin:0">
                    <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                      <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0">
                          <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                            <tr style="border-collapse:collapse">
                              <td align="left" style="padding:0;Margin:0">
                                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                      <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#f7f7f7" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f7f7f7" role="presentation">
                                        <tr style="border-collapse:collapse">
                                          <td style="padding:0;Margin:0;font-size:0px" align="center">
                                            <img class="adapt-img" src="https://wauzoc.stripocdn.email/content/guids/CABINET_e85a1c4c35e64810d3738032bdb89fa6/images/logo.jpg" alt="Vision trade india" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px" title="Vision trade india" height="73" width="348">
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                      <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0">
                          <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                            <tr style="border-collapse:collapse">
                              <td style="padding:0;Margin:0;background-color:#43285f" bgcolor="#43285f" align="left">
                                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                      <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr style="border-collapse:collapse">
                                          <td style="padding:0;Margin:0;font-size:0" align="center">
                                            <img class="adapt-img" src="https://wauzoc.stripocdn.email/content/guids/CABINET_18b9b37a94ea92e75434475b4360dcd0/images/36441502442545607.jpg" alt="Happy Birthday!" title="Happy Birthday!" width="600" height="270" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                              <td style="padding:0;Margin:0;padding-bottom:30px;background-color:#43285f" bgcolor="#43285f" align="left">
                                <!--[if mso]>
                                                                                    <table style="width:600px" cellpadding="0" cellspacing="0">
                                                                                        <tr>
                                                                                            <td style="width:130px">
                                                                                                <![endif]-->
                                <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                  <tr style="border-collapse:collapse">
                                    <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:130px">
                                      <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr class="es-hidden" style="border-collapse:collapse">
                                          <td style="padding:0;Margin:0;font-size:0" align="left">
                                            <img src="https://wauzoc.stripocdn.email/content/guids/CABINET_18b9b37a94ea92e75434475b4360dcd0/images/27021502445622301.jpg" alt="Very lovely balloon" title="Very lovely balloon" width="116" height="277" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                                                                                                </td>
                                                                                                <td style="width:336px">
                                                                                                    <![endif]-->
                                <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                  <tr style="border-collapse:collapse">
                                    <td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:336px">
                                      <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr style="border-collapse:collapse">
                                          <td style="padding:0;Margin:0;font-size:0px" align="center">
                                            <img class="adapt-img" src="https://drive.google.com/uc?export=view&id=${image}" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="110" width="156">
                                          </td>
                                        </tr>
                                        <tr style="border-collapse:collapse">
                                          <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:15px">
                                            <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#ffffff;font-size:16px">Dear <strong>${name}</strong>, <br>Thank you for all your hard work during the past ${years}. Wishing you a happy work anniversary and a great year to come!
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                                                                                                        </td>
                                                                                                        <td style="width:0px"></td>
                                                                                                        <td style="width:134px">
                                                                                                            <![endif]-->
                                <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                  <tr style="border-collapse:collapse">
                                    <td align="center" style="padding:0;Margin:0;width:134px">
                                      <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr class="es-hidden" style="border-collapse:collapse">
                                          <td style="padding:0;Margin:0;font-size:0" align="right">
                                            <img src="https://wauzoc.stripocdn.email/content/guids/CABINET_18b9b37a94ea92e75434475b4360dcd0/images/77061502445629778.jpg" alt="Very lovely balloon" title="Very lovely balloon" width="111" height="278" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                    <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                      <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0">
                          <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
                            <tr style="border-collapse:collapse">
                              <td align="left" style="padding:0;Margin:0">
                                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr style="border-collapse:collapse">
                                    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                      <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr style="border-collapse:collapse">
                                          <td style="padding:0;Margin:0;font-size:0px" align="center"></td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </body>
        </html>
        `,
  }

  console.log(mailOptions)

  await new Promise((resolve) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        resolve(error)
      } else {
        console.log("Email sent: " + info.response)
        resolve(info.response)
      }
    })
  })

  return res.status(200).json({
    success: true
  })

}

export { handler as POST }
