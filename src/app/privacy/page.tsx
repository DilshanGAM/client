"use client"
import Image from "next/image";
import React, { useState } from "react";
import logo from "../assets/images/logo.png";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState("privacy");

  const TabButton = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 font-semibold ${
        activeTab === id
          ? "text-white bg-[#0f121f] rounded-t-lg"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <header className="w-full h-[80px] lg:h-[150px] bg-[#0f121f] border flex justify-center items-center">
        <a href="/">
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={150}
            className="w-[90px] lg:w-[150px]"
          />
        </a>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex justify-center space-x-4 mb-6 border-b">
          <TabButton id="privacy" label="Privacy Policy" />
          <TabButton id="terms" label="Terms & Conditions" />
          <TabButton id="refund" label="Refund Policy" />
        </div>

        {activeTab === "privacy" && (
          <div>
            <h1 className="text-3xl font-bold text-center mb-6">
              Privacy Policy
            </h1>

            <p className="mb-4">
              At SKYREK (Pvt) Ltd, we value your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, and safeguard your data when you visit our
              website and purchase our web development courses.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              When you visit our website, sign up for our courses, or interact
              with our services, we may collect the following information:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>
                Personal identification information (Name, email address, phone
                number, etc.)
              </li>
              <li>
                Payment information (processed securely by third-party payment
                processors)
              </li>
              <li>
                Technical data such as IP address, browser type, and device
                information
              </li>
              <li>Course progress, quiz results, and feedback submissions</li>
            </ul>

            {/* Rest of the privacy policy content remains the same */}
          </div>
        )}

        {activeTab === "terms" && (
          <div>
            <h1 className="text-3xl font-bold text-center mb-6">
              Terms & Conditions
            </h1>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              1. Course Materials
            </h2>
            <ul className="list-disc ml-6 mb-4">
              <li>All course materials are for personal use only</li>
              <li>Downloading of course materials is strictly prohibited</li>
              <li>Sharing or distributing course content is not permitted</li>
              <li>Recording of live sessions is not allowed</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              2. Account Usage
            </h2>
            <ul className="list-disc ml-6 mb-4">
              <li>Each account is for single user access only</li>
              <li>Sharing of login credentials is prohibited</li>
              <li>Multiple concurrent logins are not permitted</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              3. Intellectual Property
            </h2>
            <p className="mb-4">
              All course content, materials, and resources are the intellectual
              property of SKYREK (Pvt) Ltd. Any unauthorized use, reproduction,
              or distribution will result in immediate termination of access and
              potential legal action.
            </p>
          </div>
        )}

        {activeTab === "refund" && (
          <div>
            <h1 className="text-3xl font-bold text-center mb-6">
              Refund Policy
            </h1>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              Refund Eligibility
            </h2>
            <p className="mb-4">
              Our refund policy is structured to ensure fair usage of our
              services:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="mb-2">
                <strong>No Refund After Class Attendance:</strong> Once you have
                attended one or more classes, you are no longer eligible for a
                refund
              </li>
              <li className="mb-2">
                <strong>Pre-attendance Cancellation:</strong> Full refund is
                available only if requested before attending any classes
              </li>
              <li className="mb-2">
                <strong>Processing Time:</strong> Approved refunds will be
                processed within 5-7 business days
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              How to Request a Refund
            </h2>
            <p className="mb-4">
              To request a refund, please contact our support team at
              info@skyrek.com with your order details and reason for the
              refund request.
            </p>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center items-center mt-5 h-[80px] bg-[#0f121f]">
        <p className="text-sm lg:text-base text-center text-white">
          © 2024 by
          <a
            href="https://skyrek.com/"
            className="text-white underline ml-2 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            SKYREK &nbsp;
          </a>
          (Pvt) Ltd. All Rights Reserved.
        </p>
      </div>
    </>
  );
}
