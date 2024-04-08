import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import config from '../config';
import './Carty.css'
import Header from './Header';
import Footer from './Footer';

const baseURL = config.getBackendUrl();

function findObjectById(objects, id) {
    return objects.find(obj => obj._id === id);
}

const Carty = ({ userdetails, ogproducts, setuserdetails }) => {
    async function removeFromCart(p_id, u_id, p_name) {
        try {
            await axios.patch(`${baseURL}/productsrem/${p_id}/${u_id}`, { pid: p_id }).then((res) => {
                // console.log(res.data);
                let index = userdetails.cart.indexOf(p_id);
                if (index !== -1) {
                    userdetails.cart.splice(index, 1);
                }
                setuserdetails({ ...userdetails });
                toast.success(`${p_name} has been removed from the cart successfully`);
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header headerTitle={"Cart"} />
            <div className="cart-page">
                <div className="cart-main">
                    <div className="cart-page-items">
                        {(userdetails.cart && ogproducts.length > 0) ?
                            userdetails.cart.map((ele, index) => {
                                const p = findObjectById(ogproducts, ele);
                                return (
                                    <div className="cart-item" key={index}>
                                        <img src={p.image}></img>
                                        <h4 className='cart-item-title'>{p.title}</h4>
                                        <h4>{`Rs. ${p.price}`}</h4>
                                        <button className='rem-cart'
                                            onClick={() => removeFromCart(p._id, userdetails.userid, p.title)}>  <svg width="28" className='ant-designdelete-filled-icon' height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M23.625 7H20.125V4.8125C20.125 3.84727 19.3402 3.0625 18.375 3.0625H9.625C8.65977 3.0625 7.875 3.84727 7.875 4.8125V7H4.375C3.89102 7 3.5 7.39102 3.5 7.875V8.75C3.5 8.87031 3.59844 8.96875 3.71875 8.96875H5.37031L6.0457 23.2695C6.08945 24.202 6.86055 24.9375 7.79297 24.9375H20.207C21.1422 24.9375 21.9105 24.2047 21.9543 23.2695L22.6297 8.96875H24.2812C24.4016 8.96875 24.5 8.87031 24.5 8.75V7.875C24.5 7.39102 24.109 7 23.625 7ZM18.1562 7H9.84375V5.03125H18.1562V7Z" fill="#B88E2F" />
                                            </svg></button>
                                    </div>
                                )
                            }) : null
                        }
                    </div>
                    <div className="cart-summary"></div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Carty

