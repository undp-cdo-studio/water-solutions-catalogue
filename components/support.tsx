"use client"

import { useState, useEffect } from 'react'

export default function Support() {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  return (
    <>
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h4">HAVE QUESTIONS OR FEEDBACK? CONTACT US</h1>
            </div>

            {/* Contact form */}
            <form className="max-w-xl mx-auto">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-textarea w-full text-gray-800"
                    placeholder="Write your message"
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-4">
                <div className="w-full px-3">
                  <a 
                    href={`mailto:ahmed.elseoud@undp.org?subject=Water Solutions Catalogue Inquiry&body=${encodeURIComponent(message)}`}
                    className="btn rounded-none text-white bg-undp-blue hover:bg-sky-800 w-full"
                  >
                    SUBMIT
                  </a>
                </div>
              </div>
              {/* <div className="text-sm text-gray-600 mt-4">
                By clicking "send" you consent to allow UNDP to store and
                process the personal information submitted above and agree to
                our{" "}
                <a className="underline" href="#0">
                  terms and conditions
                </a>{" "}
                as well as our{" "}
                <a className="underline" href="#0">
                  Privacy Policy
                </a>
                .
              </div> */}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
