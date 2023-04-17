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

type BaseImageProps = Omit<ImageProps, 'alt'> &
  Required<Pick<ImageProps, 'alt'>>;

function BaseImage(props: BaseImageProps) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      unoptimized
    />
  );
}

export default BaseImage;
