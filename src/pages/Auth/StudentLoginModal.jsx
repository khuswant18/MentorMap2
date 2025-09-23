"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import { toast } from "react-toastify";

export default function StudentLoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [flowType, setFlowType] = useState(null);
  const [state, setState] = useState("initial");
  const [sendOtpFlag, setSendOtpFlag] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setPhone("");
    setOtp("");
    setUserId(null);
    setFlowType(null);
    setState("initial");
    setSendOtpFlag(false);
    onClose();
  };

  const sendPhoneOtp = async () => {
    setLoading(true);
    try {
      const res = await api.post("/student/send-otp", { phone });
      setUserId(res.data.userId || null);
      setFlowType("phoneFirst");

      setState(res.data.hasExistingAccount ? "verifyOtp" : "otpSent");
      setSendOtpFlag(true);
      toast.success("OTP sent to your phone");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }; 

  const verifyPhoneOtp = async () => {
    setLoading(true);
    try {
      const res = await api.post("/student/verify-otp", {
        phone,
        otp,
        isFirstTime: true,
      });

      if (res.data.needsGoogleLink) {
        setUserId(res.data.userId);
        setState("googleLink");
      } else {
        login(res.data.user, null, 'student');
        navigate("/student/dashboard");
        handleClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const linkGoogleAfterOtp = async (credentialResponse) => {
    const credential = credentialResponse.credential;
    setLoading(true);
    try {
      const res = await api.post("/student/link-google", { userId, credential });
      login(res.data.user, null, 'student');
      navigate("/student/dashboard");
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Google linking failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const credential = credentialResponse.credential;
    setLoading(true);
    try {
      const res = await api.post("/student/google-login", { credential });

      setFlowType("googleFirst");

      if (res.data.needsPhoneVerification) {
        setUserId(res.data.userId);
        setState("verifyPhone");
      } else {
        login(res.data.user, null, 'student');
        navigate("/student/dashboard");
        handleClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const sendOtpAfterGoogle = async () => {
    setLoading(true);
    try {
      await api.post("/student/send-otp", { phone });
      setSendOtpFlag(true);
      toast.success("OTP sent to your phone");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false); 
    }
  };

  const verifyOtpAfterGoogle = async () => {
    setLoading(true);
    try {
      const res = await api.post("/student/verify-phone", { userId, phone, otp });
      login(res.data.user, null, 'student');
      navigate("/student/dashboard");
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Phone verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={handleClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Login</h2>
              <p className="text-gray-600">Join our community of learners!</p>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {state === "initial" && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => toast.error("Google login failed")}
                  useOneTap
                  size="large"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">or</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="Enter your phone number" 
                    className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
                  />
                </div>
                <Button 
                  onClick={sendPhoneOtp} 
                  disabled={loading} 
                  className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </div>
            </div>
          )}

          {flowType === "phoneFirst" && (state === "otpSent" || state === "verifyOtp") && sendOtpFlag && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Verify Your Phone</h3>
                <p className="text-sm text-gray-600">
                  We've sent an OTP to {phone}. Enter it below to continue.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                    Enter OTP
                  </Label>
                  <Input 
                    id="otp" 
                    type="text" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    placeholder="Enter the 6-digit OTP"
                    className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-center tracking-wider" 
                    maxLength={6}
                  />
                </div>
                <Button 
                  onClick={verifyPhoneOtp} 
                  disabled={loading} 
                  className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Verifying OTP..." : "Verify OTP"}
                </Button>
              </div>
            </div>
          )} 

          {flowType === "phoneFirst" && state === "googleLink" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Link Your Account</h3>
                <p className="text-sm text-gray-600">
                  Connect your Google account to complete your student registration
                </p>
              </div>
              
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={linkGoogleAfterOtp}
                  onError={() => toast.error("Google linking failed")}
                  useOneTap
                  size="large"
                />
              </div>
            </div>
          )}

          {flowType === "googleFirst" && state === "verifyPhone" && (
            <div className="space-y-6">
              {!sendOtpFlag ? (
                <>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">Add Phone Number</h3>
                    <p className="text-sm text-gray-600">
                      Please provide your phone number to complete your profile
                    </p> 
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone-google" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <Input 
                        id="phone-google" 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="Enter your phone number"
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
                      />
                    </div>
                    <Button 
                      onClick={sendOtpAfterGoogle} 
                      disabled={loading} 
                      className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "Sending..." : "Send OTP"} 
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">Verify Phone Number</h3>
                    <p className="text-sm text-gray-600">
                      We've sent an OTP to {phone}. Enter it below to verify.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone-otp" className="text-sm font-medium text-gray-700">
                        Enter OTP
                      </Label>
                      <Input 
                        id="phone-otp" 
                        type="text" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        placeholder="Enter the 6-digit OTP"
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-center tracking-wider" 
                        maxLength={6}
                      />
                    </div>
                    <Button 
                      onClick={verifyOtpAfterGoogle} 
                      disabled={loading} 
                      className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
