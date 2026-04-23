"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ruler, ArrowRight } from "lucide-react";
import Link from "next/link";

const fitTypes = [
  {
    name: "Oversized Fit",
    description: "Dropped shoulders, boxy silhouette. Falls 3–4 inches below the waist. Perfect for a statement streetwear look.",
    tip: "If you prefer a tighter oversized look, size down by one.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=800&fit=crop",
  },
  {
    name: "Relaxed Fit",
    description: "Slightly loose through the body without being oversized. Comfortable drape that works tucked or untucked.",
    tip: "Go true to size for the ideal relaxed fit.",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&h=800&fit=crop",
  },
  {
    name: "Regular Fit",
    description: "Classic cut that follows the body's natural shape. Not too tight, not too loose — the everyday essential.",
    tip: "Standard sizing. If between sizes, size up for comfort.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&h=800&fit=crop",
  },
  {
    name: "Tapered Fit (Bottoms)",
    description: "Relaxed through the thigh, tapering to a narrow cuff at the ankle. Gives a clean, modern silhouette to joggers and cargos.",
    tip: "If you have muscular thighs, size up by one.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop",
  },
];

const topsSizeChart = [
  { size: "S", chest: "36–38″", length: "27″", shoulder: "17″" },
  { size: "M", chest: "38–40″", length: "28″", shoulder: "18″" },
  { size: "L", chest: "40–42″", length: "29″", shoulder: "19″" },
  { size: "XL", chest: "42–44″", length: "30″", shoulder: "20″" },
  { size: "XXL", chest: "44–46″", length: "31″", shoulder: "21″" },
];

const bottomsSizeChart = [
  { size: "28", waist: "28″", hip: "36″", length: "40″" },
  { size: "30", waist: "30″", hip: "38″", length: "41″" },
  { size: "32", waist: "32″", hip: "40″", length: "42″" },
  { size: "34", waist: "34″", hip: "42″", length: "43″" },
  { size: "36", waist: "36″", hip: "44″", length: "43″" },
];

const measureTips = [
  { label: "Chest", desc: "Measure around the fullest part of your chest, keeping the tape level." },
  { label: "Shoulder", desc: "Measure from one shoulder seam across the back to the other." },
  { label: "Waist", desc: "Measure around your natural waistline, keeping the tape comfortably loose." },
  { label: "Hip", desc: "Measure around the fullest part of your hips, about 8″ below your waist." },
  { label: "Length (Top)", desc: "Measure from the highest point of the shoulder down to the desired length." },
  { label: "Length (Bottom)", desc: "Measure from the top of the waistband down the outer seam to the ankle." },
];

type Tab = "tops" | "bottoms";

export default function FitGuidePage() {
  const [activeTab, setActiveTab] = useState<Tab>("tops");

  const chart = activeTab === "tops" ? topsSizeChart : bottomsSizeChart;
  const headers =
    activeTab === "tops"
      ? ["Size", "Chest", "Length", "Shoulder"]
      : ["Size", "Waist", "Hip", "Length"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Ruler className="w-8 h-8 text-[var(--color-gold)] mx-auto mb-4" />
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              FIT GUIDE & SIZE CHART
            </h1>
            <p className="mt-3 text-white/60 text-sm sm:text-base max-w-xl mx-auto">
              Find your perfect fit. Every NOIR piece is crafted with intent — here&apos;s how to choose the right size.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to Measure */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-wide mb-8"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            HOW TO MEASURE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {measureTips.map((tip, idx) => (
              <motion.div
                key={tip.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="border border-border p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-gold-dark)] mb-2">
                  {tip.label}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Chart */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-wide mb-6"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            SIZE CHART
          </h2>

          {/* Tabs */}
          <div className="flex gap-0 mb-6 border-b border-border">
            {(["tops", "bottoms"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "tops" ? "T-Shirts / Hoodies / Jackets" : "Joggers / Cargo / Shorts"}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F5F5]">
                  {headers.map((h) => (
                    <th key={h} className="px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.map((row, idx) => (
                  <motion.tr
                    key={row.size}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                    className="border-b border-border last:border-b-0 hover:bg-[#FAFAFA] transition-colors"
                  >
                    <td className="px-5 py-3.5 text-sm font-bold">{row.size}</td>
                    {Object.values(row)
                      .slice(1)
                      .map((val, i) => (
                        <td key={i} className="px-5 py-3.5 text-sm text-muted-foreground">
                          {val}
                        </td>
                      ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            * All measurements are in inches and may vary ±0.5″ due to the nature of garment production.
          </p>
        </div>
      </section>

      {/* Fit Types */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-wide mb-8"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            OUR FIT TYPES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fitTypes.map((fit, idx) => (
              <motion.div
                key={fit.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="group border border-border overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F5]">
                  <img
                    src={fit.image}
                    alt={fit.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <h3
                    className="absolute bottom-3 left-3 text-xl font-bold text-white tracking-wide"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    {fit.name}
                  </h3>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">{fit.description}</p>
                  <p className="text-xs font-semibold text-[var(--color-gold-dark)]">💡 {fit.tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still unsure CTA */}
      <section className="py-12 md:py-16 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-wide mb-3"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            STILL NOT SURE?
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Our team is here to help. Reach out and we&apos;ll recommend the perfect size for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
            >
              Contact Us <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground text-xs font-bold uppercase tracking-[0.15em] hover:bg-secondary transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
