"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GoogleLogin } from "@react-oauth/google"; 
import useAuthStore from "@/stores/authStore";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCollegeStore from "@/stores/college.store";

const MentorLoginPage = () => {
  const navigate = useNavigate();
  const { colleges, fetchColleges, loading: collegesLoading } = useCollegeStore();
  
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [flowType, setFlowType] = useState(null);
  const [step, setStep] = useState("initial"); 

  React.useEffect(() => {
    fetchColleges(); // Let the store handle whether to actually fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

 
  const sendOtp = async () => {
    if (!phone.trim()) return toast.error("Enter phone number");
    setLoading(true);  
    try {
      const res = await api.post("/mentors/send-otp", { phone });
      setUserId(res.data.userId || null);
      setFlowType("phoneFirst");
      setStep("otpSent");
      toast.success("OTP sent to your phone");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    } 
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await api.post("/mentors/verify-otp", { phone, otp, isFirstTime: true });
      
      if (res.data.needsGoogleLink) {
        setUserId(res.data.userId);
        setFlowType("phoneFirst");
        setStep("googleLink");
      } else if (res.data.needsCollegeSelection) {
        setUserId(res.data.userId);
        login(res.data.user, null, 'mentor');
        setStep("selectCollege");
      } else if (res.data.needsOnboarding) {
        login(res.data.user, null, 'mentor');
        setTimeout(() => {
          navigate("/mentor/onboarding");
        }, 10);
      } else {
        login(res.data.user, null, 'mentor');
        setTimeout(() => {
          navigate("/dashboard/mentor");
        }, 10);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLogin = async (credentialResponse) => {
    const credential = credentialResponse.credential;
    setLoading(true);
    try {
      // If in phoneFirst flow, send additional context
      const requestBody = { credential };
      if (flowType === "phoneFirst" && userId && phone) {
        requestBody.phoneVerified = true;
        requestBody.userId = userId;
        requestBody.phone = phone;
      }
      
      const res = await api.post("/mentors/google-login", requestBody);
      
      // Only set flowType to googleFirst if not already in phoneFirst flow
      if (flowType !== "phoneFirst") {
        setFlowType("googleFirst");
      }

      if (res.data.needsPhoneVerification) { 
        setUserId(res.data.userId);
        setStep("enterPhone");
      } else if (res.data.needsCollegeSelection) {
        setUserId(res.data.userId);
        login(res.data.user, null, 'mentor');
        setStep("selectCollege");
      } else if (res.data.needsOnboarding) { 
        login(res.data.user, null, 'mentor');
        setTimeout(() => {
          navigate("/mentor/onboarding");
        }, 10);
      } else {
        login(res.data.user, null, 'mentor');
        setTimeout(() => {
          navigate("/dashboard/mentor");
        }, 10);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

    const sendPhoneOtpAfterGoogle = async () => {
    if (!phone.trim()) return toast.error("Enter a valid phone number");
    setLoading(true);
    try {
      await api.post("/mentors/send-otp", { userId, phone });
      setStep("verifyPhoneOtp");
      toast.success("OTP sent to your phone");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyPhoneAfterGoogle = async () => {
    setLoading(true); 
    try {
      const res = await api.post("/mentors/verify-phone-otp", { userId, phone, otp });
      
      if (res.data.needsCollegeSelection) {
        login(res.data.user, null, 'mentor');
        setStep("selectCollege");
      } else {
        login(res.data.user, null, 'mentor');
        setTimeout(() => {
          navigate("/dashboard/mentor");
        }, 10);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Phone verification failed");
    } finally {
      setLoading(false);
    }
  };

  const selectCollege = async () => {
    if (!college.trim()) return toast.error("Please select your college");
    setLoading(true);
    try {
      await api.post("/mentors/select-college", { userId, collegeId: college });
      toast.success("College selected successfully!");
      setTimeout(() => {
        navigate("/dashboard/mentor");
      }, 10);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to select college");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <p className="text-gray-600">Welcome Please sign in to continue.</p>
        </div>

        {step === "initial" && (
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
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button 
                onClick={sendOtp} 
                disabled={loading}
                className="cursor-pointer w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          </div>
        )}

        {flowType === "phoneFirst" && step === "otpSent" && (
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
                  placeholder="Enter the 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-center tracking-wider"
                  maxLength={6}
                />
              </div>
              <Button 
                onClick={verifyOtp} 
                disabled={loading}
                className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          </div>
        )}

        {flowType === "phoneFirst" && step === "googleLink" && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Link College Account</h3>
              <p className="text-sm text-gray-600">
                Connect your college Google account to complete your mentor registration
              </p>
            </div>
            
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Google linking failed")}
                useOneTap
                size="large"
              />
            </div> 
          </div>
        )}

        {flowType === "googleFirst" && step === "enterPhone" && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Add Phone Number</h3>
              <p className="text-sm text-gray-600">
                Please provide your phone number to complete registration
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
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div> 
              <Button 
                onClick={sendPhoneOtpAfterGoogle} 
                disabled={loading}
                className="cursor-pointer w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </div>
          </div>
        )}

        {flowType === "googleFirst" && step === "verifyPhoneOtp" && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Verify Phone Number</h3>
              <p className="text-sm text-gray-600">
                We've sent an OTP to {phone}. Enter it below to verify your number.
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
                  placeholder="Enter the 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-center tracking-wider"
                  maxLength={6}
                />
              </div>
              <Button 
                onClick={verifyPhoneAfterGoogle} 
                disabled={loading}
                className="cursor-pointer w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Verifying OTP..." : "Verify Phone"}
              </Button>
            </div>
          </div>
        )}

        {step === "selectCollege" && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Select Your College</h3>
              <p className="text-sm text-gray-600">
                Please choose your college to complete your mentor profile
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="college-select-final" className="text-sm font-medium text-gray-700">
                  Choose Your College
                </Label>
                <Select value={college} onValueChange={setCollege} required disabled={collegesLoading}>
                  <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder={collegesLoading ? "Loading colleges..." : "Select your college..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((collegeItem) => (
                      <SelectItem key={collegeItem.id} value={collegeItem.id}>
                        {collegeItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={selectCollege} 
                disabled={loading || !college}
                className="cursor-pointer w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Complete Registration"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorLoginPage;
