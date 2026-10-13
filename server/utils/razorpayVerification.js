import crypto from "node:crypto";

const isValidHexSignature = (signature) =>
  typeof signature === "string" && /^[\da-f]{64}$/i.test(signature);

const safeCompareSignature = (expected, received) => {
  if (!isValidHexSignature(received)) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(received, "hex");
  return (
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  );
};

export const verifyRazorpayPaymentSignature = ({
  orderId,
  paymentId,
  signature,
  secret,
}) => {
  if (!orderId || !paymentId || !secret) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return safeCompareSignature(expected, signature);
};

export const verifyRazorpayWebhookSignature = ({ body, signature, secret }) => {
  if (!Buffer.isBuffer(body) || !secret) {
    return false;
  }

  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return safeCompareSignature(expected, signature);
};

export const isCapturedPaymentForOrder = (payment, order) =>
  payment?.order_id === order?.razorpayOrderId &&
  payment?.status === "captured" &&
  payment?.amount === Math.round(order.amount * 100) &&
  payment?.currency === "INR";
