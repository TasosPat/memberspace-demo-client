import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

// login endpoint in the mock app
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const response = await axios.post(
      `${process.env.MEMBERS_API_URL}/login`,
      { email, password },
      {
        headers: {
          "x-api-key": process.env.MEMBERS_API_KEY!,
        },
      }
    );

    // return the tokens to the frontend of this mock app
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      message: err.response?.data?.message || "Error logging in",
    });
  }
});

// token validation example
router.post("/validate-token", async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const response = await axios.post(
      `${process.env.MEMBERS_API_URL}/validate-token`,
      { token },
      {
        headers: {
          "x-api-key": process.env.MEMBERS_API_KEY!,
        },
      }
    );

    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      message: err.response?.data?.message || "Token validation failed",
    });
  }
});

export default router;
