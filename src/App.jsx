import { useState } from "react";
import "./App.css";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [amount3, setAmount3] = useState(0);
  const [clicked, setClicked] = useState(false);

  const storageFee = 4.25;

  const getInitialRate = (amount) => {
    const tiers = [
      { max: 4.99, serviceRate: 0.85, interest: 0, onetimeFee: 1.2 },
      { max: 9.99, serviceRate: 0.85, interest: 0, onetimeFee: 2.4 },
      { max: 14.99, serviceRate: 1.06, interest: 0, onetimeFee: 3.2 },
      { max: 19.99, serviceRate: 1.06, interest: 0, onetimeFee: 3.6 },
      { max: 24.99, serviceRate: 1.27, interest: 0, onetimeFee: 4.0 },
      { max: 29.99, serviceRate: 1.48, interest: 0, onetimeFee: 4.4 },
      { max: 34.99, serviceRate: 1.48, interest: 0, onetimeFee: 4.8 },
      { max: 39.99, serviceRate: 1.7, interest: 0, onetimeFee: 5.2 },
      { max: 44.99, serviceRate: 1.91, interest: 0, onetimeFee: 5.6 },
      { max: 49.99, serviceRate: 1.91, interest: 0, onetimeFee: 6.0 },
      { max: 59.99, serviceRate: 2.12, interest: 0.1275, onetimeFee: 0 },
      { max: 69.99, serviceRate: 2.33, interest: 0.1275, onetimeFee: 0 },
      { max: 79.99, serviceRate: 2.55, interest: 0.1275, onetimeFee: 0 },
      { max: 89.99, serviceRate: 2.76, interest: 0.1275, onetimeFee: 0 },
      { max: 99.99, serviceRate: 2.9, interest: 0.1275, onetimeFee: 0 },
      { max: 249.99, serviceRate: 0.034, interest: 0.1105, onetimeFee: 0 },
      { max: 499.99, serviceRate: 0.034, interest: 0.085, onetimeFee: 0 },
      { max: 999.99, serviceRate: 0.034, interest: 0.068, onetimeFee: 0 },
      { max: 1499.99, serviceRate: 0.034, interest: 0.0637, onetimeFee: 0 },
      { max: 1999.99, serviceRate: 0.034, interest: 0.0595, onetimeFee: 0 },
      { max: Infinity, serviceRate: 0.034, interest: 0.051, onetimeFee: 0 },
    ];
    return tiers.find((tier) => amount <= tier.max);
  };

  const getNextRate = (amount) => {
    const tiers = [
      { max: 9.99, interestRate: 0.85 },
      { max: 19.99, interestRate: 1.06 },
      { max: 24.99, interestRate: 1.27 },
      { max: 34.99, interestRate: 1.48 },
      { max: 39.99, interestRate: 1.7 },
      { max: 49.99, interestRate: 1.91 },
      { max: 59.99, interestRate: 2.12 },
      { max: 69.99, interestRate: 2.33 },
      { max: 79.99, interestRate: 2.55 },
      { max: 89.99, interestRate: 2.76 },
      { max: 99.99, interestRate: 2.97 },
      { max: Infinity, interestRate: 0.034 },
    ];
    return tiers.find((tier) => amount <= tier.max);
  };

  const calculate = () => {
    const amount = parseFloat(loanAmount);
    if (isNaN(amount) || amount <= 0) return;

    const rate = getInitialRate(amount);
    const rate2 = getNextRate(amount);
    if (!rate || !rate2) return;

    // 30 Day
    let a1;
    if (amount <= 44.99) {
      // flat service + one-time + storage
      a1 = amount + rate.serviceRate + rate.onetimeFee + storageFee;
    } else if (amount <= 99.99) {
      // flat service + % interest + storage
      a1 = amount + rate.serviceRate + amount * rate.interest + storageFee;
    } else {
      // % service + % interest + storage
      a1 =
        amount +
        amount * rate.serviceRate +
        amount * rate.interest +
        storageFee;
    }

    // 60 Day
    let a2;
    if (amount <= 99.99) {
      // flat next-rate fee + storage
      a2 = a1 + rate2.interestRate + storageFee;
    } else {
      // % of amount + storage
      a2 = a1 + amount * rate2.interestRate + storageFee;
    }

    // 90 Day
    let a3;
    if (amount <= 99.99) {
      a3 = a2 + rate2.interestRate + storageFee;
    } else {
      a3 = a2 + amount * rate2.interestRate + storageFee;
    }

    setAmount1(a1);
    setAmount2(a2);
    setAmount3(a3);
    setClicked(true);

    setTimeout(() => setClicked(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-start justify-center pt-20 p-6 text-gray-200">
      <div className="w-full max-w-4xl bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-xl p-10">
        <h1 className="text-5xl font-extrabold text-center text-yellow-400 tracking-wide drop-shadow-lg mb-10">
          Elite Pawn <br />
          Interest Calculator
        </h1>

        {/* Two Column Centered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <label className="text-xl font-medium text-gray-300">
                Enter Loan Amount
              </label>

              <div className="flex items-center gap-2">
                <span className="px-3 py-2 rounded-xl bg-[#2a2a2a] border border-gray-600 text-gray-400">
                  $
                </span>

                <input
                  type="text"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && calculate()} // ⬅ ENTER triggers calculation
                  placeholder="0"
                  className="w-24 text-center p-2 rounded-lg bg-[#2a2a2a] border border-gray-600 text-gray-100
  focus:border-yellow-500 focus:ring-2 focus:ring-yellow-600 outline-none"
                />
              </div>
            </div>

            <button
              onClick={calculate}
              className={`px-12 py-4 rounded-xl font-semibold text-xl transition-all
              ${
                clicked
                  ? "bg-yellow-300 scale-110 shadow-[0_0_25px_#facc15]"
                  : "bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-300"
              } text-black`}
            >
              Calculate
            </button>
          </div>

          {/* RIGHT */}
          <div
            className={`flex flex-col items-center justify-center space-y-6 transition-all
          ${clicked ? "opacity-100 scale-105" : "opacity-90"}`}
          >
            <div className="text-center">
              <p className="text-gray-400 text-xl">30 Day</p>
              <p className="text-4xl font-bold text-yellow-400">
                ${amount1.toFixed(2)}
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-xl">60 Day</p>
              <p className="text-4xl font-bold text-yellow-400">
                ${amount2.toFixed(2)}
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-xl">90 Day</p>
              <p className="text-4xl font-bold text-yellow-400">
                ${amount3.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
