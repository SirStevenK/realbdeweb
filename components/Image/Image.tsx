import NextImage, { ImageLoader } from "next/image";

type Props = {
  className?: string;
  src: string;
  alt?: string;
  quality?: number;
  height: number;
  width: number;
};

const Loader: ImageLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${src}?w=${width}&q=${
    quality || 75
  }`;
};

const Image: React.FC<Props> = ({
  className,
  src,
  alt = "",
  quality,
  width,
  height,
}) => {
  return (
    <NextImage
      className={className}
      loader={Loader}
      src={src}
      alt={alt}
      quality={quality}
      width={width}
      height={height}
    />
  );
};

export default Image;
