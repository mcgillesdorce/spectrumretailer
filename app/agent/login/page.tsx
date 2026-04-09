import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default function AgentLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-spectrum-dark via-spectrum-blue to-spectrum-purple flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-spectrum-blue px-8 py-6 text-center">
            <Link href="/" className="inline-block">
              <div className="text-white text-2xl font-bold tracking-tight">
                HIWS
                <span className="block text-spectrum-gold text-sm font-normal tracking-wider mt-0.5 uppercase">
                  Home Internet &amp; Wireless Solutions
                </span>
              </div>
            </Link>
          </div>
          <div className="px-8 py-8">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Agent Portal</h1>
            <p className="text-sm text-gray-500 mb-6">Sign in with your agent credentials to access the order portal.</p>
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
        <p className="text-center text-white/60 text-sm mt-6">
          <Link href="/" className="hover:text-white transition-colors">
            &larr; Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}