
import { useState } from "react";

const NewsLetter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            alert(`Subscribed with ${email}!`);
            setEmail("");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4 mt-24 pb-14 bg-bg py-12 rounded-2xl shadow-md">
            <h1 className="md:text-4xl text-2xl font-bold text-text-dark">
                Never Miss a Deal!
            </h1>
            <p className="md:text-lg text-gray-500/80 max-w-xl">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form 
                onSubmit={handleSubmit}
                className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 mt-4"
            >
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email id"
                    required
                    className="h-full w-full px-4 rounded-l-full border border-gray-soft outline-none text-text-dark placeholder-gray-400 focus:ring-2 focus:ring-primary"
                />
                <button 
                    type="submit"
                    className="h-full rounded-r-full px-8 md:px-12 bg-primary hover:bg-primary-light text-white font-semibold transition-all"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default NewsLetter;
