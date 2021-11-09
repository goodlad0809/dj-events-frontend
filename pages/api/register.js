import { API_URL,IS_PROD } from "@/config/index";
import { data } from "autoprefixer";
import cookie from "cookie"

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    //console.log("Login", { identifier, password });
    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username,email, password }),
    });
    const strapiData = await strapiRes.json();
    if (strapiRes.ok) {
      //set cookie
      res.setHeader('Set-Cookie', cookie.serialize('token', strapiData.jwt, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week,
        secure: IS_PROD,
        sameSite: 'strict',
        path: "/"
      }));
      res.status(200).json({ user: strapiData.user });
    } else {
      res
        .status(strapiData.statusCode)
        .json({ message: strapiData.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};
