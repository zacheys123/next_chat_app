import Image from "next/image";

export default function AppBgImg({ bgCover }) {
  return (
    <Image
      src={bgCover}
      placeholder="blur"
      fill
      alt="background Image"
      sizes="100vw"
      style={{
        objectFit: "cover",
        zIndex: -1,
      }}
    />
  );
}
