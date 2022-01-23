import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import HeroSection from "../components/HeroSection";
import Section from "../components/Section";
import Footer from "../components/Footer";
import tvImage from "../assets/images/tv.png";
import downloadMobile from "../assets/images/download-mobile.jpg";
import deviceStreaming from "../assets/images/device-streaming.png";
import childrenCreateProfile from "../assets/images/children-create-profile.png";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    axios
      .get("/api/session")
      .then((user) => {
        if (user) {
          router.replace("/browse");
        }
      })
      .catch((e) => console.log("No user"));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>
          Nextflix India – Watch TV Shows Online, Watch Movies Online
        </title>
        <meta
          name="description"
          content="Watch unlimited TV shows and movies only on Nextflix."
        />
        <link rel="icon" href="./netflix-icon.ico" />
      </Head>
      <HeroSection />
      <Section
        contentleft
        videoUrl="https://www.youtube.com/watch?v=sY2djp46FeY"
        header="Enjoy on your TV."
        subheader="Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
          players and more."
        image={tvImage}
        videoStyles={{ left: "82px", bottom: "382px" }}
      />
      <Section
        header="Download your shows to watch offline."
        subheader="Save your favourites easily and always have something to watch."
        image={downloadMobile}
      />
      <Section
        contentleft
        header="Watch everywhere."
        subheader="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
        image={deviceStreaming}
        videoUrl="https://www.youtube.com/watch?v=GV3HUDMQ-F8"
        videoStyles={{ left: "125px", bottom: "500px" }}
        imageHeight="550"
        imageWidth="750"
      />
      <Section
        header="Create profiles for children."
        subheader="Send children on adventures with their favourite characters in a space made just for them—free with your membership."
        image={childrenCreateProfile}
        imageHeight="550"
        imageWidth="750"
      />
      <Footer page="homepage" />
    </div>
  );
}
