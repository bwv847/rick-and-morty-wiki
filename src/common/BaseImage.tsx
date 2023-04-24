import Image, { ImageProps } from 'next/image';

export const imageProps = {
  responsive: (aspectRatio: string): Partial<ImageProps> => ({
    width: 1,
    height: 1,
    style: {
      width: '100%',
      height: 'auto',
      display: 'block',
      objectFit: 'cover',
      aspectRatio,
    },
  }),
};

const BaseImage = (props: ImageProps) => (
  <Image {...props} unoptimized alt={props.alt} />
);

export default BaseImage;
