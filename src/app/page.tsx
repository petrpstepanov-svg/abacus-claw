import Link from "next/link";

export default function Home() {
    return (
          <main className="min-h-screen bg-background">
            {/* Hero Section */}
                <section className="bg-secondary text-white py-20 px-4">
                        <div className="max-w-6xl mx-auto text-center">
                                  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                                              AutoHub Rostov
                                  </h1>
                                  <p className="text-xl md:text-2xl mb-8 text-gray-300">
                                              Evacuator 24/7 - Autoservice - Accident Commissioner
                                  </p>
                                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                              <Link
                                                              href="/evacuation"
                                                              className="bg-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
                                                            >
                                                            Call Evacuator
                                              </Link>
                                              <Link
                                                              href="/autoservice"
                                                              className="bg-accent hover:bg-sky-400 text-secondary font-bold py-4 px-8 rounded-lg text-lg transition-colors"
                                                            >
                                                            Autoservice
                                              </Link>
                                  </div>
                        </div>
                </section>
          
            {/* Services Grid */}
                <section className="py-16 px-4">
                        <div className="max-w-6xl mx-auto">
                                  <h2 className="text-3xl font-bold text-center mb-12 text-secondary">
                                              Our Services
                                  </h2>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                              <Link href="/evacuation" className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary">
                                                            <div className="text-4xl mb-4">Evacuator 24/7</div>
                                                            <p className="text-gray-600">Fast evacuation any time of day</p>
                                              </Link>
                                              <Link href="/autoservice" className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-accent">
                                                            <div className="text-4xl mb-4">Autoservice</div>
                                                            <p className="text-gray-600">Professional car repair and maintenance</p>
                                              </Link>
                                              <Link href="/accident-commissioner" className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-secondary">
                                                            <div className="text-4xl mb-4">Accident Commissioner</div>
                                                            <p className="text-gray-600">Help with accidents, document processing</p>
                                              </Link>
                                  </div>
                        </div>
                </section>
          
            {/* Footer */}
                <footer className="bg-secondary text-white py-8 px-4">
                        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                                  <p className="font-bold text-lg">AutoHub Rostov</p>
                                  <div className="flex gap-6">
                                              <Link href="/contacts" className="hover:text-accent transition-colors">Contacts</Link>
                                              <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                                  </div>
                        </div>
                </footer>
          </main>
        );
}
