import assert from "node:assert/strict";
import crypto from "node:crypto";
import test from "node:test";
import {
  isCapturedPaymentForOrder,
  verifyRazorpayPaymentSignature,
  verifyRazorpayWebhookSignature,
} from "../utils/razorpayVerification.js";

const testSecret = "local-test-webhook-secret";

const sign = (value) =>
  crypto.createHmac("sha256", testSecret).update(value).digest("hex");

test("accepts a valid Razorpay payment signature", () => {
  const orderId = "order_test_123";
  const paymentId = "pay_test_456";

  assert.equal(
    verifyRazorpayPaymentSignature({
      orderId,
      paymentId,
      signature: sign(`${orderId}|${paymentId}`),
      secret: testSecret,
    }),
    true,
  );
});

test("rejects invalid or incomplete Razorpay payment signatures", () => {
  const orderId = "order_test_123";
  const paymentId = "pay_test_456";

  assert.equal(
    verifyRazorpayPaymentSignature({
      orderId,
      paymentId,
      signature: "not-a-signature",
      secret: testSecret,
    }),
    false,
  );
  assert.equal(
    verifyRazorpayPaymentSignature({
      orderId,
      paymentId,
      signature: sign(`${orderId}|another-payment`),
      secret: testSecret,
    }),
    false,
  );
  assert.equal(
    verifyRazorpayPaymentSignature({
      orderId,
      paymentId,
      signature: sign(`${orderId}|${paymentId}`),
      secret: "",
    }),
    false,
  );
});

test("accepts webhook signatures only for the exact raw request body", () => {
  const body = Buffer.from('{"event":"payment.captured"}');

  assert.equal(
    verifyRazorpayWebhookSignature({
      body,
      signature: sign(body),
      secret: testSecret,
    }),
    true,
  );
  assert.equal(
    verifyRazorpayWebhookSignature({
      body: Buffer.from('{"event": "payment.captured"}'),
      signature: sign(body),
      secret: testSecret,
    }),
    false,
  );
  assert.equal(
    verifyRazorpayWebhookSignature({
      body: JSON.parse(body.toString()),
      signature: sign(body),
      secret: testSecret,
    }),
    false,
  );
});

test("only accepts captured INR payments with the exact expected order and amount", () => {
  const order = { razorpayOrderId: "order_test_123", amount: 149.5 };
  const payment = {
    order_id: order.razorpayOrderId,
    status: "captured",
    amount: 14950,
    currency: "INR",
  };

  assert.equal(isCapturedPaymentForOrder(payment, order), true);
  assert.equal(
    isCapturedPaymentForOrder({ ...payment, status: "authorized" }, order),
    false,
  );
  assert.equal(isCapturedPaymentForOrder({ ...payment, amount: 1 }, order), false);
  assert.equal(
    isCapturedPaymentForOrder({ ...payment, order_id: "another-order" }, order),
    false,
  );
  assert.equal(
    isCapturedPaymentForOrder({ ...payment, currency: "USD" }, order),
    false,
  );
});
