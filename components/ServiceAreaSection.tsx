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
            Call now to learn how you can bundle and save even more!
          </p>
          <a
            href="tel:+18885104882"
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call (888) 510-4882
          </a>
        </div>
      </div>
    </section>
  );
}
