"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface EditorialPosterProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  align?: "left" | "right";
}

export function EditorialPoster({ imageUrl, title, subtitle, buttonText, link, align = "left" }: EditorialPosterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  const isRight = align === "right";

  return (
    <section ref={containerRef} className="w-full py-8 overflow-hidden">
      <div className={`relative w-full h-[60vh] lg:h-[70vh] overflow-hidden`}>
        {/* Parallax Image */}
        <motion.div style={{ y }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        </motion.div>

        {/* Content Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`absolute z-20 bottom-8 sm:bottom-12 ${isRight ? "right-6 sm:right-12 text-right items-end" : "left-6 sm:left-12 text-left items-start"} flex flex-col max-w-lg`}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4" style={{ fontFamily: "var(--font-bebas)" }}>
            {title}
          </h2>
          <p className="text-white/90 text-sm md:text-lg mb-8 leading-relaxed max-w-[400px]">
            {subtitle}
          </p>
          <Link href={link} className="group flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-primary hover:text-white transition-all duration-300">
            {buttonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
