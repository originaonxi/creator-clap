import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Scissors,
  Clapperboard,
  Youtube,
  Mic,
  Megaphone,
  UploadCloud,
  FileVideo,
  X,
  Clock,
  CheckCircle2,
  Star,
  Sparkles
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface EditOrder {
  id: string;
  packageName: string;
  style: string;
  turnaround: string;
  footage: string;
  notes: string;
  total: number;
  orderedAt: string;
}

const PACKAGES = [
  { name: 'Reel / Short Edit', price: 999, length: 'Up to 60 sec', icon: Clapperboard, perks: ['Hook-first cut', 'Captions & sound sync', '2 revisions'] },
  { name: 'YouTube Video Edit', price: 2499, length: 'Up to 15 min', icon: Youtube, perks: ['Story structure', 'B-roll & graphics', 'Thumbnail frame'] },
  { name: 'Podcast / Long-form', price: 3999, length: 'Up to 60 min', icon: Mic, perks: ['Multi-cam switch', 'Audio clean-up', '3 short clips free'] },
  { name: 'Brand / Ad Edit', price: 4999, length: 'Up to 90 sec', icon: Megaphone, perks: ['Brand colour grade', 'Motion text', 'All aspect ratios'] }
];

const STYLES = ['Cinematic', 'Fast-paced Viral', 'Vlog', 'Minimal & Clean', 'Funny / Meme', 'Aesthetic'];

const TURNAROUND = [
  { label: 'Standard · 3 days', extra: 0 },
  { label: 'Express · 24 hours', extra: 499 },
  { label: 'Same day', extra: 999 }
];

const STORAGE_KEY = 'ccEdits.orders';

const CreatorClapEditsPage = () => {
  const { addNotification } = useNotifications();
  const fileInput = useRef<HTMLInputElement>(null);
  const [orders, setOrders] = useState<EditOrder[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as EditOrder[];
    } catch {
      return [];
    }
  });
  const [pkg, setPkg] = useState(PACKAGES[0].name);
  const [style, setStyle] = useState(STYLES[0]);
  const [turnaround, setTurnaround] = useState(TURNAROUND[0].label);
  const [footage, setFootage] = useState<File | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(orders)), [orders]);

  const selectedPkg = PACKAGES.find(p => p.name === pkg)!;
  const selectedTurnaround = TURNAROUND.find(t => t.label === turnaround)!;
  const total = selectedPkg.price + selectedTurnaround.extra;

  const clearFootage = () => {
    setFootage(null);
    if (fileInput.current) fileInput.current.value = '';
  };

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!footage) {
      addNotification({ type: 'error', title: 'Add your footage', message: 'Upload the raw video you want edited.' });
      return;
    }
    setOrders(prev => [
      {
        id: Date.now().toString(),
        packageName: pkg,
        style,
        turnaround,
        footage: footage.name,
        notes: notes.trim(),
        total,
        orderedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      },
      ...prev
    ]);
    clearFootage();
    setNotes('');
    addNotification({ type: 'success', title: 'Edit ordered!', message: `Our editors have your ${pkg}. Delivery: ${turnaround.split(' · ')[0]}.` });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-gray-50 to-gray-50">
      <header className="bg-white/80 backdrop-blur shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/creator/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white p-8 md:p-12 shadow-xl">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="relative">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/90 mb-3">
              <Scissors className="w-4 h-4" /> By the CreatorClap team
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">CreatorClap Edits</h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">Send your raw footage. Get back scroll-stopping edits.</p>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-white" /> 4.9 average rating</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Delivery from 24 hours</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Revisions included</span>
            </div>
          </div>
        </section>

        <form onSubmit={placeOrder} className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Choose your edit</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {PACKAGES.map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPkg(p.name)}
                    aria-pressed={pkg === p.name}
                    className={`text-left p-5 rounded-2xl border transition ${
                      pkg === p.name ? 'border-red-400 bg-red-50 ring-2 ring-red-200' : 'border-gray-200 bg-white hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p.icon className="w-6 h-6 text-red-500" />
                      <span className="text-lg font-extrabold text-gray-900">₹{p.price.toLocaleString('en-IN')}</span>
                    </div>
                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{p.length}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {p.perks.map(perk => (
                        <li key={perk} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {perk}</li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Upload raw footage</h2>
              {footage ? (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-green-200 bg-green-50">
                  <FileVideo className="w-8 h-8 text-green-600 shrink-0" />
                  <p className="flex-1 font-semibold text-gray-900 truncate">{footage.name}</p>
                  <button type="button" onClick={clearFootage} className="p-2 rounded-lg text-gray-500 hover:bg-white hover:text-red-600" aria-label="Remove footage">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="footage-file"
                  className="flex flex-col items-center justify-center gap-2 py-10 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50/50 cursor-pointer text-center transition"
                >
                  <UploadCloud className="w-10 h-10 text-red-500" />
                  <span className="font-semibold text-gray-900">Upload footage</span>
                  <span className="text-sm text-gray-500">MP4, MOV or a .zip of clips</span>
                </label>
              )}
              <input
                id="footage-file"
                ref={fileInput}
                type="file"
                accept="video/*,.zip"
                className="sr-only"
                onChange={e => setFootage(e.target.files?.[0] ?? null)}
              />
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Style &amp; delivery</h2>
              <p className="text-sm font-semibold text-gray-700 mb-2">Edit style</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {STYLES.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStyle(s)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      style === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Delivery</p>
              <div className="grid sm:grid-cols-3 gap-2 mb-6">
                {TURNAROUND.map(t => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setTurnaround(t.label)}
                    className={`p-3 rounded-xl border text-sm font-medium transition ${
                      turnaround === t.label ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-200 text-gray-700 hover:border-red-300'
                    }`}
                  >
                    {t.label}
                    <span className="block text-xs text-gray-500">{t.extra ? `+₹${t.extra}` : 'Included'}</span>
                  </button>
                ))}
              </div>
              <label htmlFor="edit-notes" className="block text-sm font-semibold text-gray-700 mb-2">Notes for the editor</label>
              <textarea
                id="edit-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="e.g. Keep it under 30 sec, use a trending audio, add my logo at the end"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
              />
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2"><Sparkles className="w-5 h-5 text-red-500" /> Order summary</h3>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between"><dt className="text-gray-500">Edit</dt><dd className="font-medium text-gray-900">{pkg}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Style</dt><dd className="font-medium text-gray-900">{style}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Delivery</dt><dd className="font-medium text-gray-900">{turnaround.split(' · ')[0]}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Footage</dt><dd className="font-medium text-gray-900 truncate max-w-[10rem]">{footage ? footage.name : 'Not added'}</dd></div>
            </dl>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="font-semibold text-gray-700">Total</span>
              <span className="text-2xl font-extrabold text-gray-900">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white text-lg font-bold shadow-lg hover:shadow-xl transition"
            >
              <Scissors className="w-5 h-5" /> Order Edit
            </button>
          </aside>
        </form>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">My edit orders</h2>
            <span className="text-sm text-gray-500">{orders.length} total</span>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">No edits ordered yet. Upload your footage above to get started.</p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-4">
              {orders.map(o => (
                <li key={o.id} className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="font-semibold text-gray-900">{o.packageName}</p>
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">In editing</span>
                  </div>
                  <p className="text-sm text-gray-500">{o.style} · {o.turnaround.split(' · ')[0]} · ₹{o.total.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-gray-500 truncate">Footage: {o.footage} · ordered {o.orderedAt}</p>
                  {o.notes && <p className="text-sm text-gray-600 mt-1">“{o.notes}”</p>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default CreatorClapEditsPage;
