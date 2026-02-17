/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images : {
    remotePatterns :[
      {
        protocol : 'http',
        hostname : '10.120.79.14',
        port : '3000',
        pathname : '/api/v1/uploads/blogs/**'
      }
    ]
  }
};

export default nextConfig;
