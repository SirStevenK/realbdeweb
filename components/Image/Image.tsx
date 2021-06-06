import NextImage, { ImageLoader } from "next/image";

type Props = {
  className?: string;
  hidden?: boolean;
  src: string;
  alt?: string;
  quality?: number;
  onLoad?: () => void;
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
  hidden,
  src,
  alt = "",
  quality,
  onLoad,
  width,
  height,
}) => {
  if (src)
    return (
      <div className={`${hidden ? "hidden" : "block"}`}>
        <NextImage
          className={className}
          loader={Loader}
          src={src}
          alt={alt}
          quality={quality}
          width={width}
          height={height}
          onLoad={onLoad}
        />
      </div>
    );
  else return null;
};

export default Image;
