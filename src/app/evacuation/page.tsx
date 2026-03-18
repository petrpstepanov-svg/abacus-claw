import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Evacuator 24/7 in Rostov-on-Don - AutoHub Rostov",
    description: "Evacuator 24/7 in Rostov-on-Don. Fast response, affordable prices.",
};

export default function EvacuationPage() {
    return (
          <main className="min-h-screen bg-background">
                <section className="bg-secondary text-white py-16 px-4">
                        <div className="max-w-4xl mx-auto">
                                  <Link href="/" className="text-accent hover:underline mb-6 inline-block">Back to Home</Link>
                                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                                              Evacuator 24/7
                                  </h1>
                                  <p className="text-xl text-gray-300 mb-8">
                                              Fast car evacuation in Rostov-on-Don and Rostov region
                                  </p>
                                  <a
                                                href="tel:+78634000000"
                                                className="bg-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors inline-block"
                                              >
                                              Call Evacuator
                                  </a>
                        </div>
                </section>
          
                <section className="py-16 px-4">
                        <div className="max-w-4xl mx-auto">
                                  <h2 className="text-3xl font-bold mb-8 text-secondary">Our Services</h2>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
            { title: "Passenger car evacuation", desc: "Fast response within 30 minutes" },
            { title: "Truck evacuation", desc: "Specialized equipment for trucks" },
            { title: "Motorcycle evacuation", desc: "Careful transportation of motorcycles" },
            { title: "Lock opening", desc: "Help when car is locked" },
                        ].map((service) => (
                                        <div key={service.title} className="bg-white rounded-xl p-6 shadow-md">
                                                        <h3 className="text-lg font-bold mb-2 text-secondary">{service.title}</h3>
                                                        <p className="text-gray-600">{service.desc}</p>
                                        </div>
                                      ))}
                                  </div>
                        </div>
                </section>
          </main>
        );
}
