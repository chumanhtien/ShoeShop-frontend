import React, { Fragment, useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router";
import {useDispatch, useSelector} from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Actions/CartActions";
const CartScreen = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  //NOTE: useParams() tra ve Object => muon lay id phai la {id} = useParams()
  const {id} = useParams();
  const location = useLocation();
  // console.log(location)
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;// Lay qty tu link url
  // console.log(id, qty);

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  // console.log(cartItems);

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
  useEffect(() => {
    if(id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const navigate = useNavigate();
  
  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping")
    // if(!localStorage.getItem("userInfo")) {
    //   navigate("/login");
    // }
    // else {
    //   navigate("/shipping");
    // }
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  return (
    <Fragment>
      <Header />
      {/* Cart */}
      <div className="container">
        {
          cartItems.length === 0 ? (
            <div className=" alert alert-info text-center mt-3">
              Your cart is empty
              <Link
                className="btn btn-success mx-5 px-5 py-3"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                SHOPPING NOW
              </Link>
            </div>
          ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartitems */}
            {cartItems.map((item, index) => (
                <div className="cart-iterm row" key={index}>
                  <div className="remove-button d-flex justify-content-center align-items-center"
                   onClick={() => removeFromCartHandler(item.productId)}>
                    <i className="fas fa-times"></i>
                  </div>
                  <div className="cart-image col-md-3">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-text col-md-5 d-flex align-items-center">
                    <Link to={`/products/${item.productId}`}>
                      <h4>{item.name}</h4>
                    </Link>
                  </div>
                  <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                    <h6>QUANTITY</h6>
                    <select value={item.qty} 
                      onChange={(e) => {
                        navigate(`/cart/${item.productId}/?qty=${e.target.value}`);// Thay ca thong tin tren duong dan
                        dispatch(addToCart(item.productId, Number(e.target.value)))}}>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                    <h6>PRICE</h6>
                    <h4>${item.price}</h4>
                  </div>
                </div>
              ))
            }
            

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">total:</span>
              <span className="total-price">${total}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Continue To Shopping</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>
                    {/* <Link to="/shipping" className="text-white"> */}
                      Checkout
                    {/* </Link> */}
                  </button>
                </div>
              )}
            </div>
          </>
          )
        }
       </div>
    </Fragment>
  );
};

export default CartScreen;
