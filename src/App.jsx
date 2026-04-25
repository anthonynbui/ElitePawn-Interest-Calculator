import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("loan");

  const [loanAmount, setLoanAmount] = useState("");
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [amount3, setAmount3] = useState(0);
  const [amount4, setAmount4] = useState(0);
  const [amount5, setAmount5] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [showLateFees, setShowLateFees] = useState(false);

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
    const amount = parseFloat(loanAmount.replace(/,/g, ""));
    if (isNaN(amount) || amount <= 0) return;

    const rate = getInitialRate(amount);
    const rate2 = getNextRate(amount);
    if (!rate || !rate2) return;

    let a1;
    if (amount <= 44.99) {
      a1 = amount + rate.serviceRate + rate.onetimeFee + storageFee;
    } else if (amount <= 99.99) {
      a1 = amount + rate.serviceRate + amount * rate.interest + storageFee;
    } else {
      a1 =
        amount +
        amount * rate.serviceRate +
        amount * rate.interest +
        storageFee;
    }

    let a2;
    if (amount <= 99.99) {
      a2 = a1 + rate2.interestRate + storageFee;
    } else {
      a2 = a1 + amount * rate2.interestRate + storageFee;
    }

    let a3;
    if (amount <= 99.99) {
      a3 = a2 + rate2.interestRate + storageFee;
    } else {
      a3 = a2 + amount * rate2.interestRate + storageFee;
    }

    const lateFee = amount * 0.05;

    let a4;
    if (amount <= 99.99) {
      a4 = a3 + rate2.interestRate + storageFee + lateFee;
    } else {
      a4 = a3 + amount * rate2.interestRate + storageFee + lateFee;
    }

    let a5;
    if (amount <= 99.99) {
      a5 = a4 + rate2.interestRate + storageFee + lateFee;
    } else {
      a5 = a4 + amount * rate2.interestRate + storageFee + lateFee;
    }

    setAmount1(a1);
    setAmount2(a2);
    setAmount3(a3);
    setAmount4(a4);
    setAmount5(a5);

    setClicked(true);
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-start justify-center pt-20 p-6 text-gray-200">
      <div className="w-full max-w-5xl bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-xl p-10">
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setPage("loan")}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              page === "loan"
                ? "bg-yellow-400 text-black shadow-[0_0_18px_#facc15]"
                : "bg-[#2a2a2a] text-gray-300 border border-gray-700 hover:bg-[#333]"
            }`}
          >
            Pawn Interest
          </button>

          <button
            onClick={() => setPage("gold")}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              page === "gold"
                ? "bg-yellow-400 text-black shadow-[0_0_18px_#facc15]"
                : "bg-[#2a2a2a] text-gray-300 border border-gray-700 hover:bg-[#333]"
            }`}
          >
            Gold Price
          </button>
        </div>

        {page === "loan" ? (
          <>
            <h1 className="text-5xl font-extrabold text-center text-yellow-400 tracking-wide drop-shadow-lg mb-10">
              Elite Pawn <br />
              Interest Calculator
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* LEFT — FIXED */}
              <div className="sticky top-32 flex flex-col items-center space-y-6">
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
                      onKeyDown={(e) => e.key === "Enter" && calculate()}
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

              {/* RIGHT — RESULTS */}
              <div
                className={`flex flex-col items-center justify-start space-y-6 transition-all ${
                  clicked ? "opacity-100 scale-105" : "opacity-90"
                }`}
              >
                {/* 30 / 60 / 90 */}
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

                {/* Toggle */}
                <button
                  onClick={() => setShowLateFees(!showLateFees)}
                  className={`mt-2 px-5 py-2 rounded-lg font-semibold transition-all duration-200
    border border-yellow-500
    ${
      showLateFees
        ? "bg-yellow-400 text-black shadow-[0_0_8px_#facc15] scale-z"
        : "bg-[#2a2a2a] text-yellow-400 hover:bg-yellow-500 hover:text-black hover:scale-105"
    }
    active:scale-95 active:shadow-inner`}
                >
                  {showLateFees ? "Hide Late Fees" : "Show Late Fees"}
                </button>

                {/* Slide Down */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    showLateFees
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-center">
                      <p className="text-gray-400 text-xl">120 Day</p>
                      <p className="text-4xl font-bold text-red-400">
                        ${amount4.toFixed(2)}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-xl">150 Day</p>
                      <p className="text-4xl font-bold text-red-400">
                        ${amount5.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <GoldCalculator />
        )}
      </div>
    </div>
  );
}

function GoldCalculator() {
  const [spot, setSpot] = useState("");

  const spotNum = parseFloat(spot.replace(/,/g, ""));
  const valid = !isNaN(spotNum) && spotNum > 0;

  const OZ_TO_G = 31.1034768;
  const spotPerGram24 = valid ? spotNum / OZ_TO_G : 0;

  const rows = [
    { kt: "10kt", purity: 10 / 24 },
    { kt: "14kt", purity: 14 / 24 },
    { kt: "18kt", purity: 18 / 24 },
    { kt: "21kt", purity: 21 / 24 },
    { kt: "22kt", purity: 22 / 24 },
    { kt: "24kt", purity: 24 / 24 },
  ].map((r) => ({
    ...r,
    perGram: spotPerGram24 * r.purity,
  }));

  return (
    <>
      <h1 className="text-5xl font-extrabold text-center text-yellow-400 tracking-wide drop-shadow-lg mb-6">
        Gold Price Calculator
      </h1>

      <div className="flex flex-col items-center gap-3 mb-4">
        <label className="text-xl font-medium text-gray-300">
          Spot Price (USD / troy oz)
        </label>

        <div className="flex items-center gap-2">
          <span className="px-3 py-2 rounded-xl bg-[#2a2a2a] border border-gray-600 text-gray-400">
            $
          </span>

          <input
            type="text"
            value={spot}
            onChange={(e) => setSpot(e.target.value)}
            placeholder="e.g. 2050"
            className="w-44 text-center p-2 rounded-lg bg-[#2a2a2a] border border-gray-600 text-gray-100
            placeholder-gray-400 placeholder-opacity-40
            focus:border-yellow-500 focus:ring-2 focus:ring-yellow-600 outline-none"
          />
        </div>

        <p className="text-sm text-gray-400">(Uses 1 troy oz = 31.1034768 g)</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-700">
        <table className="w-full text-center">
          <thead className="bg-[#222]">
            <tr>
              <th className="px-5 py-4 text-gray-300 font-semibold">Karat</th>
              <th className="px-5 py-4 text-gray-300 font-semibold">Purity</th>
              <th className="px-5 py-4 text-gray-300 font-semibold">
                Price / gram
              </th>
            </tr>
          </thead>

          <tbody className="bg-[#171717]">
            {rows.map((r) => (
              <tr key={r.kt} className="border-t border-gray-700">
                <td className="px-5 py-4 font-semibold text-yellow-400">
                  {r.kt}
                </td>
                <td className="px-5 py-4 text-gray-300">
                  {Math.round(r.purity * 1000) / 10}%
                </td>
                <td className="px-5 py-4 text-2xl font-bold text-gray-100">
                  {valid ? `$${r.perGram.toFixed(2)}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
