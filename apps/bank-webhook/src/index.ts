import express, { Request, Response, NextFunction } from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();
app.use(express.json());

const paymentSchema = z.object({
  token: z.string(),
  user_identifier: z.number(),
  amount: z.number(),
});

// Middleware to validate HDFC webhook source
const verifyHDFCWebhook = (req: Request, res: Response, next: NextFunction) => {
  const hdfcSignature = req.headers['x-hdfc-signature'];

  // Replace with the actual logic to verify the signature
  if (hdfcSignature !== process.env.HDFC_WEBHOOK_SECRET) {
    return res.status(403).json({ message: "Invalid webhook source" });
  }

  next();
};

app.post("/hdfcwebhook", verifyHDFCWebhook, async (req: Request, res: Response) => {
  try {
    // Validate the incoming request body using Zod
    const paymentinformation = paymentSchema.parse({
      token: req.body.token,
      user_identifier: req.body.user_identifier,
      amount: req.body.amount,
    });

    // Wrap the database calls in a transaction
    await db.$transaction(async (prisma) => {
      // Update the balance
      await prisma.balance.update({
        where: {
          userId: paymentinformation.user_identifier,
        },
        data: {
          amount: {
            increment: paymentinformation.amount,
          },
        },
      });

      // Update the transaction status
      await prisma.onRampTransaction.update({
        where: {
          token: paymentinformation.token,
        },
        data: {
          status: "Success",
        },
      });
    });

    res.status(200).json({
      message: "Payment captured successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid data format",
        errors: error.errors,
      });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
