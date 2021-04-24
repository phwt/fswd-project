import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import axios from "axios";

// Multer 'files' object
declare module "next" {
  interface NextApiRequest {
    files: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      destination: string;
      filename: string;
      path: string;
      size: number;
    }[];
  }
}

const apiRoute = nextConnect({
  onError: (err, req, res, next) => {
    next();
  },
});

// Upload Middleware
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});
const uploadMiddleware = upload.array("file");
apiRoute.use(uploadMiddleware);

// API Route
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ imageLocation: req.files[0].path });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
