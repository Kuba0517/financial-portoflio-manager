"use client";

import { motion } from "framer-motion";
import Button from "@/shared/components/Button";

export default function Home() {
  return (
      <main className="bg-gradient-to-br from-mainGreen-100 to-mainGreen-300 text-mainGreen-900 min-h-screen">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-24 text-center">
          <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-extrabold leading-tight sm:text-7xl"
          >
            Elevate Your Investments
            <br />
            <span className="text-mainGreen-700">Manage with Confidence</span>
          </motion.h1>
          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-6 text-lg text-mainGreen-800 max-w-3xl mx-auto leading-relaxed"
          >
            Simplify your portfolio management with our cutting-edge platform. Track, analyze, and grow your investments effortlessly.
          </motion.p>
          <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-8 flex justify-center gap-6"
          >
            <Button
                label="Get Started"
                className="bg-mainGreen-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
            />
            <Button
                label="Learn More"
                className="bg-transparent border-2 border-mainGreen-600 text-mainGreen-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-mainGreen-600 hover:text-white hover:scale-105 transition-transform"
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-mainGreen-700">Us</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white text-mainGreen-900 rounded-lg shadow-xl"
            >
              <h3 className="text-2xl font-semibold mb-4">User-Friendly Design</h3>
              <p className="leading-relaxed text-mainGreen-700">
                Navigate effortlessly with a sleek, intuitive interface that adapts to your needs.
              </p>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white text-mainGreen-900 rounded-lg shadow-xl"
            >
              <h3 className="text-2xl font-semibold mb-4">Real-Time Insights</h3>
              <p className="leading-relaxed text-mainGreen-700">
                Stay ahead with up-to-date analytics and performance metrics for your portfolios.
              </p>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white text-mainGreen-900 rounded-lg shadow-xl"
            >
              <h3 className="text-2xl font-semibold mb-4">Secure & Reliable</h3>
              <p className="leading-relaxed text-mainGreen-700">
                Your data is safeguarded with the latest encryption technologies for ultimate peace of mind.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-6 py-24 bg-mainGreen-200 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white rounded-lg shadow-lg text-center"
            >
              <h3 className="text-xl font-semibold mb-4">1. Create Your Portfolio</h3>
              <p className="text-mainGreen-700">
                Set up personalized investment portfolios tailored to your goals.
              </p>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white rounded-lg shadow-lg text-center"
            >
              <h3 className="text-xl font-semibold mb-4">2. Add Assets</h3>
              <p className="text-mainGreen-700">
                Add stocks, bonds, and other investments with ease using our search tools.
              </p>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white rounded-lg shadow-lg text-center"
            >
              <h3 className="text-xl font-semibold mb-4">3. Track & Optimize</h3>
              <p className="text-mainGreen-700">
                Monitor performance and make data-driven decisions with our analytics dashboard.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold mb-12">
            What Our <span className="text-mainGreen-700">Users</span> Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white text-mainGreen-900 rounded-lg shadow-lg"
            >
              <p className="text-mainGreen-700 italic">
                “This platform transformed the way I manage my investments. Highly recommended!”
              </p>
              <p className="mt-4 font-bold">- Alex J.</p>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white text-mainGreen-900 rounded-lg shadow-lg"
            >
              <p className="text-mainGreen-700 italic">
                “The insights and analytics are top-notch. It’s a must-have tool for investors.”
              </p>
              <p className="mt-4 font-bold">- Sarah W.</p>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white text-mainGreen-900 rounded-lg shadow-lg"
            >
              <p className="text-mainGreen-700 italic">
                “User-friendly, secure, and reliable. I’m amazed by how seamless it is to use!”
              </p>
              <p className="mt-4 font-bold">- Michael T.</p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-6 py-24 text-center">
          <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl font-bold"
          >
            Start Managing Your Investments Today
          </motion.h2>
          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-4 text-lg text-mainGreen-800 max-w-2xl mx-auto"
          >
            Join thousands of users who trust our platform to take their investments to the next level.
          </motion.p>
          <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-8"
          >
            <Button
                label="Get Started Now"
                className="bg-mainGreen-600 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
            />
          </motion.div>
        </section>
      </main>
  );
}
