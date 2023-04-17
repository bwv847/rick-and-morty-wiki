import proxy from '@/api/proxy';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default proxy({
  target: process.env.API_URL,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  logLevel: 'silent',
});
