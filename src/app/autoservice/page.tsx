import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Autoservice in Rostov-on-Don - AutoHub Rostov",
    description: "Professional autoservice in Rostov-on-Don. Car repair and maintenance.",
};

export default function AutoservicePage() {
    return (
          <main className="min-h-screen bg-background">
                <section className="bg-secondary text-white py-16 px-4">
                        <div className="max-w-4xl mx-auto">
                                  <Link href="/" className="text-accent hover:underline mb-6 inline-block">Back to Home</Link>Link>
                                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">
                                              Autoservice
                                  </h1>h1>
                                  <p className="text-xl text-gray-300 mb-8">
                                              Professional car repair and maintenance
                                  </p>p>
                                  <a
                                                href="tel:+78634000000"
                                                className="bg-accent hover:bg-sky-400 text-secondary font-bold py-4 px-8 rounded-lg text-xl transition-colors inline-block"
                                              >
                                              Book Service
                                  </a>a>
                        </div>div>
                </section>section>
          
                <section className="py-16 px-4">
                        <div className="max-w-4xl mx-auto">
                                  <h2 className="text-3xl font-bold mb-8 text-secondary">Services</h2>h2>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
            { title: "Oil and filter change", desc: "Regular car maintenance" },
            { title: "Engine repair", desc: "Diagnostics and engine repair" },
            { title: "Tire service", desc: "Tire replacement and balancing" },
            { title: "Electrical", desc: "Diagnostics and electrical repair" },
            { title: "Air conditioning", desc: "AC recharge and repair" },
            { title: "Suspension", desc: "Suspension and steering repair" },
                        ].map((service) => (
                                        <div key={service.title} className="bg-white rounded-xl p-6 shadow-md">
                                                        <h3 className="text-lg font-bold mb-2 text-secondary">{service.title}</h3>h3>
                                                        <p className="text-gray-600">{service.desc}</p>p>
                                        </div>div>
                                      ))}
                                  </div>div>
                        </div>div>
                </section>section>
          </main>main>
        );
}</main>
