import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Accident Commissioner in Rostov-on-Don - AutoHub Rostov",
    description: "Accident commissioner in Rostov-on-Don. Help with accidents, document processing.",
};

export default function AccidentCommissionerPage() {
    return (
          <main className="min-h-screen bg-background">
                <section className="bg-secondary text-white py-16 px-4">
                        <div className="max-w-4xl mx-auto">
                                  <Link href="/" className="text-accent hover:underline mb-6 inline-block">Back to Home</Link>Link>
                                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                              Accident Commissioner
                                  </h1>h1>
                                  <p className="text-xl text-gray-300 mb-8">
                                              Professional help with accidents in Rostov-on-Don
                                  </p>p>
                                  <a
                                                href="tel:+78634000000"
                                                className="bg-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors inline-block"
                                              >
                                              Call Commissioner
                                  </a>a>
                        </div>div>
                </section>section>
          
                <section className="py-16 px-4">
                        <div className="max-w-4xl mx-auto">
                                  <h2 className="text-3xl font-bold mb-8 text-secondary">What We Do</h2>h2>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
            { title: "Accident documentation", desc: "Professional photo and video documentation" },
            { title: "Document processing", desc: "Help with all necessary documents" },
            { title: "Insurance negotiations", desc: "Protecting your interests with insurance" },
            { title: "Legal assistance", desc: "Legal consultation after accidents" },
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
