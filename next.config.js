/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

module.exports = {  //this allows the ui to render the api image which is an outside url
  images:{
    domains: ['res.cloudinary.com']  //response of the domain
  },
}