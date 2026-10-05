import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wallet, Landmark } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

const HISTORY = [
  { source: 'Summer Collection Launch (campaign)', amount: 25000, date: 'Dec 20' },
  { source: 'Sell & Earn — Food Reel Template', amount: 4800, date: 'Dec 18' },
  { source: 'App Launch Campaign', amount: 15000, date: 'Dec 12' }
];

const EarningsPage = () => {
  const { addNotification } = useNotifications();
  const [balance, setBalance] = useState(45000);
  const [amount, setAmount] = useState('');
  const [upi, setUpi] = useState('');

  const withdraw = () => {
    const value = Number(amount);
    if (!value || value <= 0 || value > balance || !upi.trim()) {
      addNotification({ type: 'error', title: 'Check details', message: `Enter an amount up to ₹${balance.toLocaleString('en-IN')} and your UPI / bank account.` });
      return;
    }
    setBalance(b => b - value);
    setAmount('');
    addNotification({ type: 'success', title: 'Withdrawal requested', message: `₹${value.toLocaleString('en-IN')} will reach ${upi.trim()} in 1–2 working days.` });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/creator/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Wallet className="w-7 h-7 text-orange-600" /> Withdraw Earnings
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-2xl p-6">
            <p className="text-white/80">Available balance</p>
            <p className="text-4xl font-bold mt-1">₹{balance.toLocaleString('en-IN')}</p>
            <p className="text-sm text-white/80 mt-4">From campaigns and Sell &amp; Earn sales</p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-3">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-gray-500" /> Transfer to your bank
            </h2>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Amount (₹)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              value={upi}
              onChange={e => setUpi(e.target.value)}
              placeholder="UPI ID or bank account"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button onClick={withdraw} className="w-full py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700">
              Withdraw
            </button>
          </section>
        </div>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recent earnings</h2>
          <ul className="divide-y divide-gray-100">
            {HISTORY.map(h => (
              <li key={h.source} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-gray-900">{h.source}</p>
                  <p className="text-sm text-gray-500">{h.date}</p>
                </div>
                <span className="font-semibold text-green-600">+₹{h.amount.toLocaleString('en-IN')}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default EarningsPage;
