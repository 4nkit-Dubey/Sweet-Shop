import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';




const cartRoutes = express.Router();

cartRoutes.post('/get', isAuth, getUserCart);
cartRoutes.post('/add', isAuth, addToCart);
cartRoutes.post('/update', isAuth, updateCart);



export default cartRoutes;