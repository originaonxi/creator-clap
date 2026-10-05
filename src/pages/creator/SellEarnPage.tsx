import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Lightbulb,
  LayoutTemplate,
  Hash,
  Music,
  UploadCloud,
  FileCheck2,
  X,
  Send,
  CheckCircle2,
  Trash2,
  IndianRupee,
  Eye,
  Sparkles,
  Check
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface Submission {
  id: string;
  category: string;
  tagline: string;
  usedTemplate?: string;
  captions: string;
  template?: { name: string; size: number };
  hashtags: string[];
  price: number;
  submittedAt: string;
}

const CONTENT_CATEGORIES = [
  { id: 'Fashion', emoji: '👗' },
  { id: 'Beauty', emoji: '💄' },
  { id: 'Fitness', emoji: '💪' },
  { id: 'Food', emoji: '🍜' },
  { id: 'Travel', emoji: '✈️' },
  { id: 'Tech', emoji: '📱' },
  { id: 'Comedy', emoji: '😂' },
  { id: 'Education', emoji: '🎓' },
  { id: 'Lifestyle', emoji: '🌿' },
  { id: 'Gaming', emoji: '🎮' },
  { id: 'Music', emoji: '🎵' },
  { id: 'Business', emoji: '💼' }
];

const STORAGE_KEY = 'sellEarn.submissions';
const EMPTY_FORM = { category: '', tagline: '', captions: '', hashtags: '', price: '' };

const READY_TEMPLATES = [
  { name: 'Viral Hook Reel', desc: '3-sec hook, fast cuts, bold captions', emoji: '⚡' },
  { name: 'Day in My Life', desc: 'Time-stamped scenes, soft transitions', emoji: '🌅' },
  { name: 'Product Review', desc: 'Unbox → test → verdict', emoji: '📦' },
  { name: 'Before / After', desc: 'Beat-synced split reveal', emoji: '✨' },
  { name: 'Tutorial in 5 Steps', desc: 'Numbered steps, on-screen text', emoji: '🎓' },
  { name: 'Trend Remix', desc: 'Matches a trending audio', emoji: '🔥' }
];
const MAX_TEMPLATE_MB = 200;
const TAGLINE_MAX = 120;
const CAPTION_MAX = 2200; // Instagram caption limit

const SellEarnPage = () => {
  const { addNotification } = useNotifications();
  const fileInput = useRef<HTMLInputElement>(null);
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Submission[];
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState(EMPTY_FORM);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [usedTemplate, setUsedTemplate] = useState('');
  const [dragging, setDragging] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions)), [submissions]);

  // "travel, #reels  fashion" → ["#travel", "#reels", "#fashion"], de-duplicated
  const hashtags = useMemo(
    () =>
      form.hashtags
        .split(/[\s,]+/)
        .map(t => t.replace(/^#+/, '').trim())
        .filter(Boolean)
        .map(t => `#${t}`)
        .filter((t, i, all) => all.indexOf(t) === i),
    [form.hashtags]
  );

  const update = (field: keyof typeof EMPTY_FORM) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const acceptFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_TEMPLATE_MB * 1024 * 1024) {
      addNotification({ type: 'error', title: 'File too large', message: `Templates can be up to ${MAX_TEMPLATE_MB} MB.` });
      return;
    }
    setTemplateFile(file);
  };

  const removeFile = () => {
    setTemplateFile(null);
    if (fileInput.current) fileInput.current.value = '';
  };

  const hasIdea = Boolean(form.tagline.trim() || form.captions.trim());
  const hasTemplate = Boolean(templateFile || usedTemplate);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.category) {
      addNotification({ type: 'error', title: 'Select a category', message: 'Pick the category your content is for.' });
      return;
    }
    if (!hasIdea && !hasTemplate && hashtags.length === 0) {
      addNotification({ type: 'error', title: 'Nothing to sell yet', message: 'Write an idea, attach a template or add hashtags.' });
      return;
    }
    setSubmissions(prev => [
      {
        id: Date.now().toString(),
        category: form.category,
        tagline: form.tagline.trim(),
        captions: form.captions.trim(),
        template: templateFile ? { name: templateFile.name, size: templateFile.size } : undefined,
        usedTemplate: usedTemplate || undefined,
        hashtags,
        price: Number(form.price) || 0,
        submittedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      },
      ...prev
    ]);
    setForm(EMPTY_FORM);
    removeFile();
    setUsedTemplate('');
    setJustSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addNotification({ type: 'success', title: 'Submitted!', message: 'Your work is in review and will be listed in the Creator Marketplace.' });
  };

  const selectedCategory = CONTENT_CATEGORIES.find(c => c.id === form.category);
  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-gray-50 to-gray-50">
      <header className="bg-white/80 backdrop-blur shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/creator/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-500 via-purple-600 to-pink-500 text-white p-8 md:p-12 shadow-xl">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute right-24 -bottom-20 w-48 h-48 rounded-full bg-white/10" />
          <div className="relative">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/90 mb-3">
              <Heart className="w-4 h-4 fill-white" /> We Hear You. We Value You.
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Sell and Earn</h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">Share your creativity &amp; earn from it.</p>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 text-sm font-medium"><Lightbulb className="w-4 h-4" /> Content Ideas</span>
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 text-sm font-medium"><LayoutTemplate className="w-4 h-4" /> Templates</span>
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 text-sm font-medium"><Hash className="w-4 h-4" /> Suitable Hashtags</span>
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 text-sm font-medium text-white/80"><Music className="w-4 h-4" /> Trendy Audios · soon</span>
            </div>
          </div>
        </section>

        {justSubmitted && (
          <section className="rounded-2xl border border-green-200 bg-green-50 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-600 shrink-0" />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-green-800">Submitted! Thank you for sharing your creativity.</h2>
              <p className="text-green-700">We review new work within 24 hours. Once it's listed, you earn every time someone buys it.</p>
            </div>
            <button
              type="button"
              onClick={() => setJustSubmitted(false)}
              className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
            >
              Submit another
            </button>
          </section>
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <form onSubmit={submit} className="lg:col-span-2 space-y-6">
            {/* 1. Content Ideas */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold">1</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-500" /> Content Ideas</h2>
                  <p className="text-sm text-gray-500">Select a category, then write your tagline and captions.</p>
                </div>
              </div>

              <label className="block text-sm font-semibold text-gray-700 mb-3">Select category *</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6">
                {CONTENT_CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, category: c.id }))}
                    aria-pressed={form.category === c.id}
                    className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-sm font-medium transition ${
                      form.category === c.id
                        ? 'border-purple-500 bg-purple-50 text-purple-700 ring-2 ring-purple-200'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    <span className="text-xl">{c.emoji}</span>
                    {c.id}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="tagline" className="text-sm font-semibold text-gray-700">Tagline</label>
                    <span className="text-xs text-gray-400">{form.tagline.length}/{TAGLINE_MAX}</span>
                  </div>
                  <input
                    id="tagline"
                    value={form.tagline}
                    onChange={update('tagline')}
                    maxLength={TAGLINE_MAX}
                    placeholder="e.g. Glow up in 30 seconds — no filters needed"
                    className={inputClass}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="captions" className="text-sm font-semibold text-gray-700">Captions</label>
                    <span className="text-xs text-gray-400">{form.captions.length}/{CAPTION_MAX}</span>
                  </div>
                  <textarea
                    id="captions"
                    value={form.captions}
                    onChange={update('captions')}
                    rows={4}
                    maxLength={CAPTION_MAX}
                    placeholder="Write captions buyers can post straight away…"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* 2. Templates */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">2</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><LayoutTemplate className="w-5 h-5 text-purple-600" /> Templates</h2>
                  <p className="text-sm text-gray-500">Attach your own template, or use a ready-made CreatorClap template.</p>
                </div>
              </div>

              {templateFile ? (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-green-200 bg-green-50">
                  <FileCheck2 className="w-8 h-8 text-green-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{templateFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {templateFile.size < 1024 * 1024
                        ? `${Math.max(1, Math.round(templateFile.size / 1024))} KB`
                        : `${(templateFile.size / 1024 / 1024).toFixed(1)} MB`}{' '}
                      · attached
                    </p>
                  </div>
                  <button type="button" onClick={removeFile} className="p-2 rounded-lg text-gray-500 hover:bg-white hover:text-red-600" aria-label="Remove template">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="template-file"
                  onDragOver={e => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={e => {
                    e.preventDefault();
                    setDragging(false);
                    acceptFile(e.dataTransfer.files[0]);
                  }}
                  className={`flex flex-col items-center justify-center gap-2 py-10 px-4 rounded-2xl border-2 border-dashed cursor-pointer text-center transition ${
                    dragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50/50'
                  }`}
                >
                  <UploadCloud className="w-10 h-10 text-purple-500" />
                  <span className="font-semibold text-gray-900">Attach Template</span>
                  <span className="text-sm text-gray-500">Drag &amp; drop here or click to browse · up to {MAX_TEMPLATE_MB} MB</span>
                </label>
              )}
              <input
                id="template-file"
                ref={fileInput}
                type="file"
                className="sr-only"
                accept=".zip,.capcut,.prproj,.aep,.mogrt,.psd,.json,video/*,image/*"
                onChange={e => acceptFile(e.target.files?.[0])}
              />

              <div className="flex items-center gap-3 my-6">
                <span className="flex-1 h-px bg-gray-200" />
                <span className="text-sm font-semibold text-gray-500">or Use Template</span>
                <span className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {READY_TEMPLATES.map(t => {
                  const selected = usedTemplate === t.name;
                  return (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setUsedTemplate(selected ? '' : t.name)}
                      aria-pressed={selected}
                      className={`relative text-left p-4 rounded-xl border transition ${
                        selected ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm'
                      }`}
                    >
                      {selected && (
                        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                      <span className="text-2xl">{t.emoji}</span>
                      <p className="font-semibold text-gray-900 mt-1">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.desc}</p>
                      <span className={`mt-2 inline-block text-xs font-semibold ${selected ? 'text-purple-700' : 'text-gray-400'}`}>
                        {selected ? 'Using this template' : 'Use template'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 3. Suitable Hashtags */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">3</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Hash className="w-5 h-5 text-blue-600" /> Suitable Hashtags</h2>
                  <p className="text-sm text-gray-500">Write hashtags separated by spaces or commas — we add the # for you.</p>
                </div>
              </div>
              <textarea
                id="hashtags"
                value={form.hashtags}
                onChange={update('hashtags')}
                rows={3}
                placeholder="reels, fashion, ootd, stylehacks, trending"
                className={inputClass}
              />
              {hashtags.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {hashtags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">{tag}</span>
                    ))}
                  </div>
                  <p className={`mt-2 text-xs ${hashtags.length > 30 ? 'text-red-600' : 'text-gray-500'}`}>
                    {hashtags.length} hashtag{hashtags.length === 1 ? '' : 's'} · best reach with 5–15, Instagram allows up to 30
                  </p>
                </div>
              )}
            </section>

            {/* Price + Submit */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">Your price (optional)</label>
              <div className="relative mb-6">
                <IndianRupee className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input id="price" type="number" min="0" value={form.price} onChange={update('price')} placeholder="e.g. 199" className={`${inputClass} pl-11`} />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-teal-500 via-purple-600 to-pink-500 text-white text-lg font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition"
              >
                <Send className="w-5 h-5" /> Submit
              </button>
            </section>
          </form>

          {/* Live preview */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2"><Eye className="w-4 h-4" /> Buyer preview</h3>
              <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-purple-50 p-5 space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                  {selectedCategory ? `${selectedCategory.emoji} ${selectedCategory.id}` : 'Choose a category'}
                </span>
                <p className={`text-lg font-bold ${form.tagline ? 'text-gray-900' : 'text-gray-300'}`}>{form.tagline || 'Your tagline appears here'}</p>
                {form.captions.trim() && <p className="text-sm text-gray-600 line-clamp-3">{form.captions}</p>}
                {(templateFile || usedTemplate) && (
                  <p className="text-sm text-gray-700 flex items-center gap-1"><LayoutTemplate className="w-4 h-4 text-purple-600" /> {[templateFile?.name, usedTemplate].filter(Boolean).join(' + ')}</p>
                )}
                {hashtags.length > 0 && <p className="text-sm text-blue-700">{hashtags.slice(0, 6).join(' ')}{hashtags.length > 6 ? ` +${hashtags.length - 6}` : ''}</p>}
                <p className="text-xl font-extrabold text-green-600">{Number(form.price) > 0 ? `₹${Number(form.price).toLocaleString('en-IN')}` : 'Free / set price'}</p>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-600" /> How you earn</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span> Submit your ideas, templates or hashtags</li>
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span> We review it within 24 hours</li>
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span> It's listed in the Creator Marketplace</li>
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">4</span>
                  <span>Earn on every sale — <Link to="/creator/earnings" className="text-purple-700 font-semibold hover:underline">withdraw anytime</Link></span>
                </li>
              </ol>
            </section>
          </aside>
        </div>

        {/* My submissions */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">My submissions</h2>
            <span className="text-sm text-gray-500">{submissions.length} total</span>
          </div>
          {submissions.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">Nothing submitted yet. Your first sale is one idea away ✨</p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-4">
              {submissions.map(s => (
                <li key={s.id} className="p-5 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">{s.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">In review</span>
                      <button type="button" onClick={() => setSubmissions(p => p.filter(x => x.id !== s.id))} className="text-gray-400 hover:text-red-600" aria-label="Delete submission">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">{s.tagline || s.captions.slice(0, 60) || 'Untitled submission'}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    {(s.tagline || s.captions) && <span className="flex items-center gap-1"><Lightbulb className="w-4 h-4" /> Content idea</span>}
                    {(s.template || s.usedTemplate) && <span className="flex items-center gap-1"><LayoutTemplate className="w-4 h-4" /> {s.template?.name || s.usedTemplate}</span>}
                    {s.hashtags.length > 0 && <span className="flex items-center gap-1"><Hash className="w-4 h-4" /> {s.hashtags.length} hashtags</span>}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{s.price > 0 ? `₹${s.price.toLocaleString('en-IN')}` : 'Price not set'} · submitted {s.submittedAt}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default SellEarnPage;
