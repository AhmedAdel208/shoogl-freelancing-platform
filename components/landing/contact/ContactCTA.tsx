"use client";

import Link from "next/link";
import { MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useUiStore } from "@/stores/useUiStore";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.6, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
};

export default function ContactCTA() {
  const { contactAnimationPlayed, setContactAnimationPlayed } = useUiStore();
  const { isRtl } = useTranslation();

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-bg transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          className="relative overflow-hidden bg-card-bg rounded-[32px] sm:rounded-[48px] md:rounded-[60px] p-6 sm:p-10 md:p-16 lg:p-20 text-center group border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
          initial={contactAnimationPlayed ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setContactAnimationPlayed(true)}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.4, 0.25, 1] as const,
          }}
        >
          {/* Background Decorative Elements */}
          <div className={`absolute top-0 ${isRtl ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 opacity-60`} />
          <div className={`absolute bottom-0 ${isRtl ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 opacity-60`} />

          <motion.div
            className="relative z-10 flex flex-col items-center max-w-3xl mx-auto space-y-10"
            variants={containerVariants}
            initial={contactAnimationPlayed ? "visible" : "hidden"}
            whileInView="visible"
            onViewportEnter={() => setContactAnimationPlayed(true)}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              variants={bounceIn}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-primary/10 rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] flex items-center justify-center text-primary mb-4 sm:mb-6 ring-1 ring-primary/20 shadow-xl shadow-primary/5 transition-transform duration-500 group-hover:rotate-12"
            >
              <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11" strokeWidth={2.5} />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-heading font-cairo leading-tight"
            >
              {isRtl ? (
                <>لديك <span className="text-primary italic">استفسار</span> أو تحتاج لمساعدة؟</>
              ) : (
                <>Have an <span className="text-primary italic">Inquiry</span> ? or Need Help</>
              )}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-medium font-bold font-cairo text-base sm:text-lg md:text-xl leading-relaxed opacity-90"
            >
              {isRtl 
                ? "فريقنا متواجد دائماً للرد على أسئلتك وتقديم الدعم اللازم لك. لا تتردد في التواصل معنا في أي وقت."
                : "Our team is always available to answer your questions and provide the necessary support. Don't hesitate to reach out at any time."}
            </motion.p>

            <motion.div variants={scaleIn} className="w-full sm:w-auto">
              <Link href="/contact" className="block w-full">
                <button className="group cursor-pointer relative px-6 py-3.5 sm:px-10 sm:py-4.5 lg:px-12 lg:py-5 bg-primary text-white rounded-[18px] sm:rounded-[24px] font-black font-cairo text-base sm:text-lg lg:text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 transition-all duration-500 flex items-center justify-center gap-3 sm:gap-4 w-full md:w-auto overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {!isRtl && <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 sm:group-hover:translate-x-2 transition-transform" strokeWidth={3} />}
                  <span>{isRtl ? "تواصل معنا الآن" : "Contact Us Now"}</span>
                  {isRtl && <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1.5 sm:group-hover:-translate-x-2 transition-transform" strokeWidth={3} />}
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Subtle Border Glow */}
          <div className="absolute inset-0 ring-1 ring-primary/10 rounded-[32px] sm:rounded-[48px] md:rounded-[60px] pointer-events-none transition-all duration-500 group-hover:ring-primary/40" />
        </motion.div>
      </div>
    </section>
  );
}
