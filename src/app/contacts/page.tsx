import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacts - AutoHub Rostov",
    description: "AutoHub Rostov contacts. Address, phone, working hours.",
};

export default function ContactsPage() {
    return (
          <main className="min-h-screen bg-background">
                <section className="bg-secondary text-white py-16 px-4">
                        <div className="max-w-4xl mx-auto">
                                  <Link href="/" className="text-accent hover:underline mb-6 inline-block">Back to Home</Link>
                                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                              Contacts
                                  </h1>
                                  <p className="text-xl text-gray-300">
                                              We are always available - call anytime!
                                  </p>
                        </div>
                </section>
          
                <section className="py-16 px-4">
                        <div className="max-w-4xl mx-auto">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                              <div className="bg-white rounded-xl p-8 shadow-lg">
                                                            <h2 className="text-2xl font-bold mb-6 text-secondary">Contact Us</h2>
                                                            <div className="space-y-4">
                                                                            <div className="flex items-center gap-3">
                                                                                              <div>
                                                                                                                  <p className="font-semibold text-secondary">Phone</p>
                                                                                                                  <a href="tel:+78634000000" className="text-primary hover:underline text-lg font-mono">
                                                                                                                                        +7-863-XXX-XX-XX
                                                                                                                    </a>
                                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center gap-3">
                                                                                              <div>
                                                                                                                  <p className="font-semibold text-secondary">Working Hours</p>
                                                                                                                  <p className="text-gray-600">24/7, around the clock</p>
                                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center gap-3">
                                                                                              <div>
                                                                                                                  <p className="font-semibold text-secondary">City</p>
                                                                                                                  <p className="text-gray-600">Rostov-on-Don</p>
                                                                                                </div>
                                                                            </div>
                                                            </div>
                                              </div>
                                              <div className="bg-white rounded-xl p-8 shadow-lg">
                                                            <h2 className="text-2xl font-bold mb-6 text-secondary">Our Services</h2>
                                                            <div className="space-y-3">
                                                                            <Link href="/evacuation" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                                                              <span className="text-secondary font-medium">Evacuator 24/7</span>
                                                                            </Link>
                                                                            <Link href="/autoservice" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                                                              <span className="text-secondary font-medium">Autoservice</span>
                                                                            </Link>
                                                                            <Link href="/accident-commissioner" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                                                              <span className="text-secondary font-medium">Accident Commissioner</span>
                                                                            </Link>
                                                            </div>
                                              </div>
                                  </div>
                        </div>
                </section>
          </main>
        );
}
