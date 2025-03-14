import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

const FullPageLoader = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hiệu ứng ánh sáng vàng lan tỏa */}
      <div className="absolute w-[400px] h-[400px] bg-yellow-500 blur-[150px] opacity-30 rounded-full" />

      <motion.div
        className="relative flex flex-col items-center p-6 bg-black/90 rounded-xl shadow-xl border border-yellow-500"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <LoaderCircle className="w-12 h-12 text-yellow-400" />
        </motion.div>
        <motion.p
          className="mt-2 text-lg font-semibold text-yellow-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default FullPageLoader;
