import ParksideNavBar from './ParksideNavBar.js';
import ClassNavBar from './ClassNavBar.js';
import React from "react";
import { Auth } from './Auth.js';
import './LoginPage.css'; 

const LoginPage = () => {

    return (
      <div>
        <ParksideNavBar />
        <ClassNavBar />
        <div className="container">
          <div className="login-wrapper">
            <h2 className="login-title">Sign in or sign up!</h2>
            <div className="auth-wrapper">
              <Auth />
            </div>
            <p className="login-subtitle">Welcome back! Please sign in or sign up to continue.</p>
            <div className="login-footer">
              <p className="login-footer-text">Forgot your password? <a href="/forgot-password" className="login-footer-link">Reset here</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

export default LoginPage;
