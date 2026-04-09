export default function ServiceAreaSection() {
  return (
    <section id="service-area" className="py-16 sm:py-20 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-spectrum-blue font-semibold text-sm uppercase tracking-wider mb-2">
            Coverage
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Is Spectrum Available in Your Area?
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Spectrum provides service across 41 states. Enter your address on the Spectrum site to
            confirm availability and see plans for your location.
          </p>
        </div>

        {/* States grid */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">
            Spectrum serves customers across the US, including:
          </h3>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {[
              "Alabama", "Arizona", "California", "Colorado", "Connecticut",
              "Florida", "Georgia", "Idaho", "Illinois", "Indiana",
              "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
              "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
              "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
              "New Mexico", "New York", "North Carolina", "Ohio", "Oregon",
              "Pennsylvania", "South Carolina", "Tennessee", "Texas", "Utah",
              "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin",
              "Wyoming",
            ].map((state) => (
              <span
                key={state}
                className="bg-blue-50 text-spectrum-blue px-3 py-1 rounded-full border border-blue-100"
              >
                {state}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-5">
            Not sure if your address is covered? Check availability instantly on the Spectrum website.
          </p>
          <a
            href="https://www.spectrum.com/services.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-spectrum-blue hover:bg-spectrum-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Check My Address
          </a>
        </div>
      </div>
    </section>
  );
}
