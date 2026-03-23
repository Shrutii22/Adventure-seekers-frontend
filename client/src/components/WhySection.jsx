function WhySection() {
  return (
    <section className="px-8 py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Why TravelConnect?
      </h2>

      <p className="max-w-2xl mx-auto text-gray-600">
        Discover places, book stays, and connect with travelers — all in one
        platform.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="p-6 bg-white rounded-2xl shadow">
          🌍 Explore destinations
        </div>
        <div className="p-6 bg-white rounded-2xl shadow">
          🏨 Book stays
        </div>
        <div className="p-6 bg-white rounded-2xl shadow">
          🤝 Connect with travelers
        </div>
      </div>
    </section>
  );
}

export default WhySection;