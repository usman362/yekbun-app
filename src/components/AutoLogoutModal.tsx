import { motion, AnimatePresence } from "framer-motion";

interface AutoLogoutModalProps {
  open: boolean;
  countdown: number;
  onStay: () => void;
  onLogout: () => void;
}

export function AutoLogoutModal({ open, countdown, onStay, onLogout }: AutoLogoutModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/25 w-full max-w-sm p-8 flex flex-col items-center text-center">

              {/* Icon */}
              <div className="relative mb-5">
                <div
                  className="h-20 w-20 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #fb923c, #ef4444)" }}
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {/* Pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.42, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border-2 border-orange-400"
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Session Timeout
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                You've been inactive for a while. For your security, you will be logged out automatically.
              </p>

              {/* Countdown box */}
              <div
                className="w-full mb-6 px-5 py-4 rounded-2xl flex items-center justify-center gap-1.5 text-sm text-gray-700"
                style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
              >
                Logging out in{" "}
                <motion.span
                  key={countdown}
                  initial={{ scale: 1.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  className="font-bold text-red-500 text-xl tabular-nums w-7 inline-block text-center"
                >
                  {countdown}
                </motion.span>
                {" "}seconds
              </div>

              {/* Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={onStay}
                  className="flex-1 h-14 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.97]"
                  style={{ background: "#10b981" }}
                >
                  Stay Online
                </button>
                <button
                  onClick={onLogout}
                  className="flex-1 h-14 rounded-2xl font-bold text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all active:scale-[0.97]"
                >
                  Log Out
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
