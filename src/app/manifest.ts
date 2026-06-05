import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EduSaathi",
    short_name: "EduSaathi",
    description: "AI-powered learning assistant for rural and low-resource classrooms.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9ef",
    theme_color: "#147a6a",
    lang: "en",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
