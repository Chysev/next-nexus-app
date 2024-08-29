import { uploadImage } from "@/lib/cloudinary";
import { Request } from "@/types/express-types";

class CloudService {
  /**
   * Uploads a static content image to the cloud and returns the image URL.
   *
   * @public
   * @async
   * @param {Request} req
   * @returns {Promise<Object>}
   */
  public async UploadStaticContent(req: Request) {
    const file = req.file;

    if (!file) {
      return { message: "No content" };
    }

    const image_url = await uploadImage(file?.buffer);

    return { image_url };
  }
}

export default CloudService;
