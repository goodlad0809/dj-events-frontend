import { API_URL,IS_PROD } from "@/config/index";
import { data } from "autoprefixer";
import cookie from "cookie"

export default async (req, res) => {
  if (req.method === "POST") {
      if(!req.headers.cookie){
          res.status(403).json({message: "Not login"})
          return
      }
      else
      {
        res.setHeader('Set-Cookie', cookie.serialize('token', "", {
            httpOnly: true,
            expires: new Date(0),
            secure: IS_PROD,
            sameSite: 'strict',
            path: "/"
          }));
          res.status(200).json({ message:"logout success" });
      }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};
