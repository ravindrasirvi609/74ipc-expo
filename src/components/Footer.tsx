import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-green)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[var(--primary-orange)] rounded-full flex items-center justify-center text-white font-bold text-xl">
                74
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  74th Indian Pharmaceutical Congress
                </h3>
                <p className="text-[var(--light-orange)]">
                  AI & TECHNOLOGY IN PHARMA: EDUCATE, INNOVATE, EMPOWER
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-[var(--primary-orange)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Bangalore International Exhibition Centre (BIEC), Bengaluru
              </p>
              <p className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-[var(--primary-orange)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                December 19-21, 2025 | Friday-Sunday
              </p>
              <p className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-[var(--primary-orange)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                12,000+ Expected Attendees
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--primary-orange)]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--primary-orange)] transition-colors"
                >
                  About IPC
                </Link>
              </li>
              <li>
                <Link
                  href="/exhibitors"
                  className="hover:text-[var(--primary-orange)] transition-colors"
                >
                  Exhibitors
                </Link>
              </li>
              <li>
                <Link
                  href="/speakers"
                  className="hover:text-[var(--primary-orange)] transition-colors"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="hover:text-[var(--primary-orange)] transition-colors"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/floor-plan"
                  className="hover:text-[var(--primary-orange)] transition-colors"
                >
                  Floor Plan
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-[var(--primary-orange)] transition-colors"
                >
                  Registration
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[var(--primary-orange)] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--primary-orange)]">
              Important Dates
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Abstract Submissions:</span>
                <span className="font-semibold">Sep 30, 2025</span>
              </li>
              <li className="flex justify-between">
                <span>Regular Registration:</span>
                <span className="font-semibold">Aug 13, 2025</span>
              </li>
              <li className="flex justify-between">
                <span>Main Conference:</span>
                <span className="font-semibold">Dec 19-21, 2025</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-[var(--primary-orange)]">
                Follow Us
              </h5>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="text-white hover:text-[var(--primary-orange)] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[var(--primary-orange)] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[var(--primary-orange)] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017-.017z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[var(--primary-orange)] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Federating Associations */}
        <div className="mt-8 pt-8 border-t border-green-600">
          <h4 className="text-lg font-semibold mb-4 text-[var(--primary-orange)] text-center">
            Federating Associations
          </h4>
          <div className="flex flex-wrap justify-center items-center space-x-8 text-sm">
            <span className="bg-white text-[var(--primary-green)] px-3 py-1 rounded-full font-semibold">
              IPA
            </span>
            <span className="bg-white text-[var(--primary-green)] px-3 py-1 rounded-full font-semibold">
              IHPA
            </span>
            <span className="bg-white text-[var(--primary-green)] px-3 py-1 rounded-full font-semibold">
              APTI
            </span>
            <span className="bg-white text-[var(--primary-green)] px-3 py-1 rounded-full font-semibold">
              IPGA
            </span>
            <span className="bg-white text-[var(--primary-green)] px-3 py-1 rounded-full font-semibold">
              AIDCOC
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-green-600 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">
            <p>
              &copy; 2025 74th Indian Pharmaceutical Congress. All Rights
              Reserved.
            </p>
          </div>
          <div className="flex space-x-6 text-sm mt-4 md:mt-0">
            <Link
              href="/terms"
              className="hover:text-[var(--primary-orange)] transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[var(--primary-orange)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cancellation"
              className="hover:text-[var(--primary-orange)] transition-colors"
            >
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
