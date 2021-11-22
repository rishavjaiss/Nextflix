import Image from "next/image";
import styles from "./styles.module.scss";
import ReactPlayer from "react-player";

export default function Section({
  contentleft,
  header,
  subheader,
  image,
  videoUrl,
  imageWidth,
  imageHeight,
  videoStyles,
}) {
  return (
    <section className={styles.container}>
      {contentleft ? (
        <>
          <div className={styles.writeup}>
            <h1 className={styles.header}>{header}</h1>
            <h2 className={styles.subheader}>{subheader}</h2>
          </div>
          <div className={styles.imageContainer}>
            {image && (
              <Image src={image} width={imageWidth} height={imageHeight} />
            )}
            {videoUrl && (
              <div
                className={styles.videoPlayerContainer}
                style={{ left: videoStyles.left, bottom: videoStyles.bottom }}
              >
                <ReactPlayer
                  url={videoUrl}
                  muted
                  playing
                  autoPlay
                  loop
                  width="470px"
                  height="260px"
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={styles.imageContainer}>
            {image && (
              <Image src={image} width={imageWidth} height={imageHeight} />
            )}
            {videoUrl && (
              <div
                className={styles.videoPlayerContainer}
                style={{ left: videoStyles.left, bottom: videoStyles.bottom }}
              >
                <ReactPlayer
                  url={videoUrl}
                  muted
                  playing
                  autoPlay
                  loop
                  width="470px"
                  height="260px"
                />
              </div>
            )}
          </div>
          <div className={styles.writeup}>
            <h1 className={styles.header}>{header}</h1>
            <h2 className={styles.subheader}>{subheader}</h2>
          </div>
        </>
      )}
    </section>
  );
}
