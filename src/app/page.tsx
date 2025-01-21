"use client";

import { motion } from "framer-motion";
import Button from "@/shared/components/Button";

export default function Home() {
  return (
      <main className="min-h-screen w-full flex flex-col">
        <section className="bg-mainGreen-700 text-white py-16 sm:py-24 flex items-center">
          <div className="container mx-auto px-6 text-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl font-extrabold mb-4 sm:text-6xl"
            >
              Simplify Your Investments
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="max-w-2xl mx-auto text-lg text-mainGreen-100 mb-8"
            >
              Track, optimize, and grow your portfolio with ease. Get all the tools you need in one powerful platform.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                  label="Get Started"
                  className="!bg-mainGreen-500 text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-mainGreen-400 transition-colors"
              />
              <Button
                  label="Learn More"
                  className="!bg-white text-mainGreen-700 font-semibold px-8 py-3 rounded-full shadow hover:bg-mainGreen-100 transition-colors"
              />
            </motion.div>
          </div>
        </section>

        <section className="bg-white text-mainGreen-900 py-16 sm:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Why <span className="text-mainGreen-700">Choose Us</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Powerful Analytics",
                  description:
                      "Monitor your portfolios in real time with sophisticated charts and data.",
                },
                {
                  title: "User-Centric Design",
                  description:
                      "Navigate quickly with an intuitive interface designed to simplify investments.",
                },
                {
                  title: "Data Security",
                  description:
                      "We safeguard your information with top-tier encryption and secure servers.",
                },
              ].map((feature, idx) => (
                  <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-lg shadow border-l-4 border-mainGreen-600"
                  >
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-mainGreen-700">{feature.description}</p>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-mainGreen-200 text-mainGreen-900 py-16 sm:py-24">
          <div className="container mx-auto px-6 text-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold mb-6"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto text-lg mb-8"
            >
              Experience a new era of portfolio management. Join thousands of
              investors who trust our platform to keep their finances on track.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
            >
              <Button
                  label="Join Now"
                  className="!bg-mainGreen-800 text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-mainGreen-500 transition-colors m-auto"
              />
            </motion.div>
          </div>
        </section>
      </main>
  );
}
