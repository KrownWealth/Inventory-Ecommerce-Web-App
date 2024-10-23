
export const uploadImageToCloudinary = async (
  file: File,
  preset: string
): Promise<string | null> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = preset; 

  if (!cloudName) {
    throw new Error("Cloudinary cloud name is not set.");
  }

  const validTypes = ["image/jpeg", "image/png"];
  const maxSizeMB = 5 * 1024 * 1024;

  if (!validTypes.includes(file.type)) {
    throw new Error("Only JPG and PNG images are allowed.");
  }

  if (file.size > maxSizeMB) {
    throw new Error("File size exceeds 5MB.");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const fileData = await response.json();

    if (!response.ok) {
      throw new Error(fileData.error?.message || "Failed to upload image.");
    }

    return fileData.secure_url; 
  } catch (error: any) {
    console.error("Image upload failed", error);
    throw new Error(error.message || "Image upload failed.");
  }
};
