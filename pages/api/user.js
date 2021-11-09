import { API_URL,IS_PROD } from "@/config/index";
import { data } from "autoprefixer";
import cookie from "cookie"

export default async (req, res) => {
  if (req.method === "GET") {
      if(!req.headers.cookie){
          res.status(403).json({message: "Not login"})
          return
      }
      else
      {
          const {token} = cookie.parse(req.headers.cookie)
          const strapiRes = await fetch(`${API_URL}/users/me`,{
              method: "GET",
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          const user = await strapiRes.json()
          if(strapiRes.ok)
          {
              res.status(200).json({user})
          }
          else{
              res.status(403).json({message: "user forbidden"})
          }
      }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};
