"use client";

import Image from "next/image";

const HomePage = () => {
  return (
    <main>
      <Image
        src={"/assets/Banner (1).svg"}
        alt="Banner"
        width={100}
        height={50}
        className="w-full h-[60vh] object-cover"
      />
      <section className="text-center py-16 space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Welcome to Our Premium Store
        </h1>
        <p className="text-lg max-w-3xl mx-auto">
          Explore our premium collection with a seamless shopping experience.
        </p>
        <div className="mt-8">
          <button className="px-8 py-3 bg-transparent text-lg font-semibold rounded-full border-[2px] transition-all">
            Shop Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
