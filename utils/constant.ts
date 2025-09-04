export const Images = {
  logo: "/simmerce.svg",
  placeholder: "/placeholder.svg",
  user: "/user.svg",
  pdf: "/pdf.svg",
};

export const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.simmerce.app";

// Helper function to check if URL points to an image
export const isValidImageUrl = (url: string | undefined): string => {
  if (!url) return Images.placeholder;
  try {
    const urlObj = new URL(url);
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    return imageExtensions.some((ext) =>
      urlObj.pathname.toLowerCase().endsWith(ext)
    )
      ? url
      : Images.placeholder;
  } catch {
    return Images.placeholder;
  }
};
