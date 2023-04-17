module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      '@emotion',
      {
        importMap: {
          '@mui/material': {
            styled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['@mui/material/styles', 'styled'],
            },
          },
        },
      },
    ],
  ],
};
