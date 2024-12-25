/** @type {import('next').NextConfig} */
const { createSecureHeaders } = require("next-secure-headers");
const nextConfig = {
  output: 'export',
  swcMinify: true,
  env: {
    API_KEY: process.env.API_KEY,
    APP_BASE_URL: process.env.APP_BASE_URL,
    APP_BACKEND_HOME_URL: process.env.APP_BACKEND_HOME_URL,
    APP_BACK_END_URL: process.env.APP_BACK_END_URL,
    APP_IMAGE_BASE_URL: process.env.APP_IMAGE_BASE_URL,
  },
  /*
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: [
                "'self'",
                "https://edu.bdevs.net",
                "https://www.google.com",
              ],
              styleSrc: [
                "'self'", 
                "'unsafe-inline'"
              ],
              imgSrc: [
                "'self'",
                "https://edu.bdevs.net",
              ],
              fontSrc: [
                "*",
                "data:",
                "blob:",
                "'unsafe-inline'"
              ],
              baseUri: "self",
              formAction: "self",
              frameAncestors: true,
            },
          },
          referrerPolicy: "same-origin",
         
        }),
      },
    ];
  },
  */
}

module.exports = nextConfig
