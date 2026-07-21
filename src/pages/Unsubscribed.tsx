import { Link, useSearchParams } from "react-router-dom";

export default function Unsubscribed() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const isSuccess = status === "ok";

  const heading = isSuccess
    ? "You've been unsubscribed."
    : status === "invalid"
      ? "That unsubscribe link isn't valid."
      : "Something went wrong.";

  const body = isSuccess
    ? "You won't receive any more emails from the Foot Capacity System. If this was a mistake, you can re-enable emails from the Profile settings inside the app."
    : status === "invalid"
      ? "We couldn't match that link to an account. Please use the unsubscribe link at the bottom of a recent email, or contact us and we'll take care of it."
      : "We weren't able to update your email preferences just now. Please try the unsubscribe link in your email again in a few minutes.";

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <img
          src="https://app.fixyourmovement.com/images/fcs-logo-v2.jpg"
          alt="Foot Capacity System"
          className="h-16 w-auto mx-auto mb-8 rounded-lg"
        />
        <h1 className="text-2xl font-bold text-slate-900 mb-4">{heading}</h1>
        <p className="text-[15px] text-slate-500 leading-relaxed mb-10">{body}</p>
        <Link
          to="/"
          className="inline-block text-blue-600 text-sm font-medium hover:underline"
        >
          Return to fixyourmovement.com
        </Link>
        <p className="text-[13px] text-slate-400 mt-10">
          The Foot Capacity System
        </p>
      </div>
    </div>
  );
}
