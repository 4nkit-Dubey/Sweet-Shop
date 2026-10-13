achha suno jb maine tumse aapna PlaceOrder page (PlaceOrder.jsx) ki styling karai thi aur functionality ko refine karwa tha tb tumne uske functionality ko changes kiya tha taaki woh work kr sake. 

uss time pr hamne razorpay ka setup nhi kiya tha. 
kyuki mujhe nhi aata tha tabhi lekin abhi aata hai.
aur maine aapne project ke according code likh toh liya hai aur mujhe lagta hai code kuchh isi parkar hoga jaise maine nichhe likha hai. lekin chuki tunmne chnages kiya tha isliye mujhe abhi understanding nhi ho rha hai ki kaha implement karna hai. so kya tum mere liye isko add kar doge aur bata bhi dena kaha add kiya sath me  proper working ko test and confirm kar lena ek baar.



const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
      console.log(response);

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  }


case 'razorpay':
const resultRazorpay = await axios.post(
  serverUrl + "/api/order/razorpay", orderData,
  { withCredentials: true }
);
if (resultRazorpay.data)
{
  initPay(orderData);
}
}