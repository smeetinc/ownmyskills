import Image from "next/image";
import { StepArrow } from "../ui/stepArrow";

import { CheckCircle, Award, Wallet } from "lucide-react";
import { LuArrowBigRight } from "react-icons/lu";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: CheckCircle,
      title: "Complete Work",
      description:
        "Finish your freelance project and deliver exceptional results to your client as usual.",
      step: 1,
    },
    {
      icon: Award,
      title: "Get Verification",
      description:
        "Client reviews and digitally signs off on your completed work through our secure platform.",
      step: 2,
    },
    {
      icon: Wallet,
      title: "Mint NFT Proof",
      description:
        "Automatically Mint an NFT certificate with project details, permanently stored on blockchain.",
      step: 3,
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="how-it-works">
      <div className="w-4/5 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How SkillProof Works
          </h2>
          <p className="text-base lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to transform your completed work into permanent,
            verifiable credentials.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col lg:grid grid-cols-11 gap-4 ">
          <div className="relative p-[2px] rounded-xl bg-gradient-to-b from-black to-[#2A56C6] col-span-3 hover:from-[#2A56C6] hover:to-black transition-all duration-300">
            <div className="rounded-xl bg-white  p-6 h-full">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/frame3.png"
                  alt="users"
                  width={55}
                  height={43}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-center text-black mb-4">
                Complete Work
              </h3>

              {/* Description */}
              <p className="text-center text-black leading-relaxed">
                Finish your freelance project and deliver exceptional <br />
                <span className="text-linearThree">
                  results to your client as usual
                </span>
                .
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <LuArrowBigRight className="text-linearTwo font-bold h-8 w-12" />
          </div>
          <div className="relative p-[2px] rounded-xl bg-gradient-to-b from-black to-[#2A56C6] col-span-3">
            <div className="rounded-xl bg-white  p-6 h-full">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/frame1.png"
                  alt="users"
                  width={55}
                  height={43}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-center text-black mb-4">
                Get <span className="text-linearTwo">Verification</span>
              </h3>

              {/* Description */}
              <p className="text-center text-black leading-relaxed">
                <span className="text-linearTwo">Client reviews</span> and
                digitally signs off on your completed work through our secure
                platform.
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <LuArrowBigRight className="text-linearTwo font-bold h-8 w-12" />
          </div>

          <div className="relative p-[2px] rounded-xl bg-gradient-to-b from-black to-[#2A56C6] col-span-3">
            <div className="rounded-xl bg-white  p-6 h-full">
              {/* Icon */}
              <div className="w-16 h-16  rounded-xl flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/frame2.png"
                  alt="users"
                  width={55}
                  height={43}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-center text-black mb-4">
                Mint <span className="text-linearThree">NFT</span> Proof
              </h3>

              {/* Description */}
              <p className="text-center text-black leading-relaxed">
                Automatically Mint an NFT certificate with project details,{" "}
                <span className="text-linearThree">
                  permanently stored on blockchain.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
