"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import OAuthLogin from "../components/OAuthLogin";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] relative overflow-hidden">

        {/* Floating Particles or Flares */}
        <motion.div
          animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 20, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-fuchsia-400 opacity-20 rounded-full blur-2xl"
        />

        {/* Glass Card */}
        <main className="z-10 p-10 w-full max-w-2xl mx-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            Enter the Future with <span className="text-cyan-300">Xeno CRM</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-6 text-lg text-white/80"
          >
            One powerful platform to manage <span className="text-fuchsia-300">Sales, Support & Success</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-2 text-sm text-white/60"
          >
            Empower your teams, simplify processes, and grow your customer relationships with ease.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10"
          >
            <OAuthLogin />
          </motion.div>
        </main>
      </div>
    </GoogleOAuthProvider>
  );
}
