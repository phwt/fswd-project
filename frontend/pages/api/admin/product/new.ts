import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import path from "path";

// Multer 'files' object
declare module "next" {
  interface NextApiRequest {
    files: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      bucket: string;
      key: string;
      acl: string;
      contentType: string;
      // contentDisposition: null,
      storageClass: string;
      // serverSideEncryption: null,
      // metadata: null,
      location: string;
      etag: string;
      versionId: undefined;
    }[];
  }
}

const apiRoute = nextConnect({
  onError: (err) => {
    console.log(err.toString());
  },
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Upload Middleware
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    key: (req, file, cb) => {
      return cb(
        null,
        `${path.parse(file.originalname).name}-${Math.random()
          .toString(36)
          .substring(7)}${path.parse(file.originalname).ext}`
      );
    },
  }),
});
const uploadMiddleware = upload.array("file");
apiRoute.use(uploadMiddleware);

// API Route
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ imageLocation: req.files[0].location });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
