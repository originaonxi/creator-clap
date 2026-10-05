import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, LayoutTemplate, Hash, Music, Plus, Trash2, IndianRupee, Heart } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

type Category = 'ideas' | 'templates' | 'hashtags' | 'audios';

interface Listing {
  id: string;
  category: Category;
  title: string;
  description: string;
  price: number;
  link: string;
  sales: number;
}

const CATEGORIES: { id: Category; label: string; hint: string; icon: typeof Music; style: string }[] = [
  { id: 'ideas', label: 'Content Ideas', hint: 'Scripts, hooks, content calendars', icon: Lightbulb, style: 'bg-yellow-100 text-yellow-700' },
  { id: 'templates', label: 'Templates', hint: 'CapCut, Premiere, Canva edit templates', icon: LayoutTemplate, style: 'bg-purple-100 text-purple-700' },
  { id: 'hashtags', label: 'Suitable Hashtags', hint: 'Niche-tested hashtag packs', icon: Hash, style: 'bg-blue-100 text-blue-700' },
  { id: 'audios', label: 'Trendy Audios', hint: 'Original sounds & trending beats', icon: Music, style: 'bg-pink-100 text-pink-700' }
];

const STORAGE_KEY = 'sellEarn.listings';

const SellEarnPage = () => {
  const { addNotification } = useNotifications();
  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Listing[];
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState({ category: 'ideas' as Category, title: '', description: '', price: '', link: '' });

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(listings)), [listings]);

  const totalEarned = listings.reduce((sum, l) => sum + l.sales * l.price, 0);

  const publish = () => {
    const price = Number(form.price);
    if (!form.title.trim() || !price || price <= 0) {
      addNotification({ type: 'error', title: 'Missing details', message: 'Add a title and a price to publish.' });
      return;
    }
    setListings(prev => [
      { id: Date.now().toString(), category: form.category, title: form.title.trim(), description: form.description.trim(), price, link: form.link.trim(), sales: 0 },
      ...prev
    ]);
    setForm(f => ({ ...f, title: '', description: '', price: '', link: '' }));
    addNotification({ type: 'success', title: 'Listed for sale', message: 'Your item is now live in the Creator Marketplace.' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/creator/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero */}
        <section className="rounded-3xl bg-gradient-to-r from-teal-500 to-purple-600 text-white p-8 md:p-12">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/80 mb-3">
            <Heart className="w-4 h-4" /> We Hear You. We Value You.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Sell and Earn</h1>
          <p className="text-lg text-white/90">Share your creativity &amp; earn from it.</p>
          <div className="mt-6 flex flex-wrap gap-6">
            <div>
              <p className="text-3xl font-bold">{listings.length}</p>
              <p className="text-sm text-white/80">Items listed</p>
            </div>
            <div>
              <p className="text-3xl font-bold">₹{totalEarned.toLocaleString('en-IN')}</p>
              <p className="text-sm text-white/80">Earned so far</p>
            </div>
          </div>
        </section>

        {/* What you can sell */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What you can sell</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setForm(f => ({ ...f, category: c.id }))}
                className={`text-left p-5 rounded-2xl border bg-white transition-shadow hover:shadow-md ${form.category === c.id ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.style}`}>
                  <c.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">{c.label}</h3>
                <p className="text-sm text-gray-500">{c.hint}</p>
              </button>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Listing form */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" /> List an item
            </h2>
            <div className="space-y-3">
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
              <input
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Title, e.g. 30 Reel Ideas for Food Creators"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="What buyers get"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <IndianRupee className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="Price"
                    className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <input
                  value={form.link}
                  onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                  placeholder="File / preview link"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={publish}
                className="w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg"
              >
                Publish &amp; start earning
              </button>
            </div>
          </section>

          {/* My listings */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My listings</h2>
            {listings.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-10">Nothing listed yet. Your first sale is one idea away.</p>
            ) : (
              <ul className="space-y-3 max-h-[28rem] overflow-y-auto">
                {listings.map(l => {
                  const cat = CATEGORIES.find(c => c.id === l.category)!;
                  return (
                    <li key={l.id} className="p-4 rounded-lg border border-gray-100 bg-gray-50 flex items-start gap-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${cat.style}`}>{cat.label}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{l.title}</p>
                        {l.description && <p className="text-sm text-gray-600">{l.description}</p>}
                        <p className="text-sm text-gray-500 mt-1">₹{l.price} · {l.sales} sold</p>
                      </div>
                      <button onClick={() => setListings(p => p.filter(x => x.id !== l.id))} className="text-gray-400 hover:text-red-600" aria-label="Remove listing">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default SellEarnPage;
