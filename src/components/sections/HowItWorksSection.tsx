"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowBigRight } from "react-icons/lu";

export const HowItWorksSection = () => {
  const cards = [
    {
      img: "/frame3.png",
      title: "Complete Work",
      desc: (
        <>
          Deliver your best work to your client, just as you .
          <br />
          <span className="text-linearThree">normally would</span>.
        </>
      ),
      delay: 0,
    },
    {
      img: "/frame1.png",
      title: (
        <>
          Get <span className="text-linearTwo">Verification</span>
        </>
      ),
      desc: (
        <>
          Your client securely approves your finished work with a{" "}
          <span className="text-linearTwo">digital signature</span>.
        </>
      ),
      delay: 0.2,
    },
    {
      img: "/frame2.png",
      title: (
        <>
          Mint <span className="text-linearThree">NFT</span> Proof
        </>
      ),
      desc: (
        <>
          Automatically Mint an NFT certificate with project details,{" "}
          <span className="text-linearThree">
            permanently stored on blockchain.
          </span>
        </>
      ),
      delay: 0.4,
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="how-it-works">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-4/5 mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            How OwnMySkills Works
          </motion.h2>
          <motion.p
            className="text-base lg:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Three simple steps to transform your completed work into permanent,
            verifiable credentials.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col lg:grid grid-cols-11 gap-4">
          {cards.map((card, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: card.delay, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative p-[2px] rounded-xl bg-gradient-to-b from-black to-[#2A56C6] col-span-3 hover:from-[#2A56C6] hover:to-black transition-all duration-300"
              >
                <div className="rounded-xl bg-white p-6 h-full">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Image
                      src={card.img}
                      alt="step-icon"
                      width={55}
                      height={43}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center text-black mb-4">
                    {card.title}
                  </h3>
                  <p className="text-center text-black leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>

              {/* Arrow */}
              {index < cards.length - 1 && (
                <motion.div
                  className="hidden lg:flex items-center justify-center"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: card.delay + 0.1 }}
                >
                  <LuArrowBigRight className="text-linearTwo font-bold h-8 w-12" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
