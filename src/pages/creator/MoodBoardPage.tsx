import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Link2,
  Lightbulb,
  Sparkles,
  Scissors,
  Trash2,
  LayoutTemplate,
  Music,
  Hash,
  ShoppingCart,
  Plus,
  ExternalLink,
  Wand2
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

type Platform = 'YouTube' | 'Instagram' | 'Facebook' | 'Snapchat' | 'TikTok' | 'Other';

interface Reference {
  id: string;
  url: string;
  note: string;
  platform: Platform;
}

interface Idea {
  id: string;
  text: string;
  mode?: 'self' | 'ai';
  aiPlan?: string[];
}

const PLATFORM_STYLE: Record<Platform, string> = {
  YouTube: 'bg-red-100 text-red-700',
  Instagram: 'bg-pink-100 text-pink-700',
  Facebook: 'bg-blue-100 text-blue-700',
  Snapchat: 'bg-yellow-100 text-yellow-800',
  TikTok: 'bg-gray-900 text-white',
  Other: 'bg-gray-100 text-gray-700'
};

const detectPlatform = (url: string): Platform => {
  const u = url.toLowerCase();
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'YouTube';
  if (u.includes('instagram.com')) return 'Instagram';
  if (u.includes('facebook.com') || u.includes('fb.watch')) return 'Facebook';
  if (u.includes('snapchat.com')) return 'Snapchat';
  if (u.includes('tiktok.com')) return 'TikTok';
  return 'Other';
};

const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

// Front-end preview of AI suggestions until a real AI backend is connected.
const aiImprovise = (idea: string): string[] => {
  const topic = idea.trim().split(/\s+/).slice(0, 6).join(' ');
  return [
    `Hook (first 2 sec): open on the most surprising moment of "${topic}" before any intro.`,
    'Structure: hook → problem → 3 quick beats → payoff → call to action.',
    'Editing: jump cuts every 1.5–2 sec, zoom punch-ins on key lines, captions burned in.',
    'Audio: pick a trending sound from the marketplace and cut on the beat.',
    'Length: 20–30 sec for Reels/Shorts/TikTok, 60–90 sec cut for Facebook/YouTube.',
    `Hashtags: #${topic.split(' ')[0]?.replace(/[^a-z0-9]/gi, '') || 'creator'} #reels #shorts #trending #creatorclap`
  ];
};

const AI_TEMPLATES = [
  { name: 'Viral Hook Reel', desc: '3-sec hook, fast cuts, bold captions', length: '15–30s', emoji: '⚡' },
  { name: 'Day in My Life Vlog', desc: 'Time-stamped scenes, soft transitions', length: '45–60s', emoji: '🌅' },
  { name: 'Product Review', desc: 'Unbox → test → verdict layout', length: '30–60s', emoji: '📦' },
  { name: 'Before / After', desc: 'Split reveal with beat-synced transition', length: '10–20s', emoji: '✨' },
  { name: 'Tutorial in 5 Steps', desc: 'Numbered steps with on-screen text', length: '30–45s', emoji: '🎓' },
  { name: 'Trend Remix', desc: 'Matches a trending audio structure', length: '15s', emoji: '🔥' }
];

type MarketTab = 'templates' | 'audios' | 'ideas' | 'hashtags';

const MARKETPLACE: Record<MarketTab, { title: string; creator: string; price: number; meta: string }[]> = {
  templates: [
    { title: 'Cinematic Travel Pack (10 templates)', creator: '@wanderframes', price: 499, meta: 'CapCut + Premiere' },
    { title: 'Fashion Transition Kit', creator: '@stylecuts', price: 299, meta: '12 transitions' },
    { title: 'Food Reel Starter', creator: '@chefreels', price: 199, meta: '6 templates' }
  ],
  audios: [
    { title: 'Desi Lo-fi Beat #12', creator: '@beatsbyaman', price: 149, meta: 'Trending · 45s' },
    { title: 'Hype Drop for Transitions', creator: '@soundsmith', price: 99, meta: 'Trending · 15s' },
    { title: 'Emotional Piano Loop', creator: '@keysofmumbai', price: 129, meta: '30s loop' }
  ],
  ideas: [
    { title: '30 Reel Ideas for Fitness Creators', creator: '@fitwithriya', price: 249, meta: 'PDF + scripts' },
    { title: 'Festive Season Content Calendar', creator: '@contentkaro', price: 349, meta: '60 ideas' },
    { title: 'Tech Review Script Bank', creator: '@gadgetguru', price: 199, meta: '25 scripts' }
  ],
  hashtags: [
    { title: 'Fashion & Beauty Hashtag Pack', creator: '@tagmaster', price: 79, meta: '150 tags, grouped' },
    { title: 'Travel India Hashtag Pack', creator: '@yatrareels', price: 79, meta: '120 tags' },
    { title: 'Food Creator Hashtag Pack', creator: '@chefreels', price: 59, meta: '100 tags' }
  ]
};

const MARKET_TABS: { id: MarketTab; label: string; icon: typeof Music }[] = [
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'audios', label: 'Trending Audios', icon: Music },
  { id: 'ideas', label: 'Content Ideas', icon: Lightbulb },
  { id: 'hashtags', label: 'Hashtags', icon: Hash }
];

const MoodBoardPage = () => {
  const { addNotification } = useNotifications();
  const [references, setReferences] = useState<Reference[]>(() => load('moodboard.references', []));
  const [ideas, setIdeas] = useState<Idea[]>(() => load('moodboard.ideas', []));
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [ideaText, setIdeaText] = useState('');
  const [marketTab, setMarketTab] = useState<MarketTab>('templates');

  useEffect(() => localStorage.setItem('moodboard.references', JSON.stringify(references)), [references]);
  useEffect(() => localStorage.setItem('moodboard.ideas', JSON.stringify(ideas)), [ideas]);

  const addReference = () => {
    if (!url.trim()) return;
    setReferences(prev => [
      { id: Date.now().toString(), url: url.trim(), note: note.trim(), platform: detectPlatform(url) },
      ...prev
    ]);
    setUrl('');
    setNote('');
  };

  const addIdea = () => {
    if (!ideaText.trim()) return;
    setIdeas(prev => [{ id: Date.now().toString(), text: ideaText.trim() }, ...prev]);
    setIdeaText('');
  };

  const chooseMode = (id: string, mode: 'self' | 'ai') => {
    setIdeas(prev =>
      prev.map(i => (i.id === id ? { ...i, mode, aiPlan: mode === 'ai' ? aiImprovise(i.text) : undefined } : i))
    );
    if (mode === 'self') {
      addNotification({ type: 'info', title: 'Edit with your idea', message: 'Book an editor or open the idea in your editing app.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/creator/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-sm text-gray-500">Saved on this device</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mood Board</h1>
          <p className="text-gray-600">
            Save references, write ideas, then edit them yourself or let AI improve them.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* References */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-purple-600" /> Save References
            </h2>
            <p className="text-sm text-gray-500 mb-4">YouTube, Instagram, Facebook, Snapchat or TikTok links</p>
            <div className="space-y-3 mb-4">
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Paste a video link"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addReference()}
                  placeholder="What do you like about it? (optional)"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={addReference}
                  className="bg-purple-600 text-white px-5 rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
            {references.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No references yet.</p>
            ) : (
              <ul className="space-y-3 max-h-80 overflow-y-auto">
                {references.map(r => (
                  <li key={r.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${PLATFORM_STYLE[r.platform]}`}>{r.platform}</span>
                    <div className="flex-1 min-w-0">
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-700 hover:underline truncate flex items-center gap-1">
                        <span className="truncate">{r.url}</span> <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                      {r.note && <p className="text-sm text-gray-600 mt-1">{r.note}</p>}
                    </div>
                    <button onClick={() => setReferences(p => p.filter(x => x.id !== r.id))} className="text-gray-400 hover:text-red-600" aria-label="Delete reference">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Ideas */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" /> Write Ideas
            </h2>
            <p className="text-sm text-gray-500 mb-4">Then choose: edit it your way, or let AI improvise.</p>
            <div className="flex gap-2 mb-4">
              <textarea
                value={ideaText}
                onChange={e => setIdeaText(e.target.value)}
                placeholder="e.g. Morning routine reel with a twist ending"
                rows={2}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button onClick={addIdea} className="bg-purple-600 text-white px-5 rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            {ideas.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No ideas yet.</p>
            ) : (
              <ul className="space-y-3 max-h-96 overflow-y-auto">
                {ideas.map(idea => (
                  <li key={idea.id} className="p-4 rounded-lg border border-gray-100 bg-gray-50">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-gray-900">{idea.text}</p>
                      <button onClick={() => setIdeas(p => p.filter(x => x.id !== idea.id))} className="text-gray-400 hover:text-red-600" aria-label="Delete idea">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 mt-3">
                      <button
                        onClick={() => chooseMode(idea.id, 'self')}
                        className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold border ${idea.mode === 'self' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
                      >
                        <Scissors className="w-4 h-4" /> Edit with my idea
                      </button>
                      <button
                        onClick={() => chooseMode(idea.id, 'ai')}
                        className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold border ${idea.mode === 'ai' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'}`}
                      >
                        <Sparkles className="w-4 h-4" /> Improve with AI
                      </button>
                    </div>
                    {idea.mode === 'self' && (
                      <div className="mt-3 text-sm text-gray-700 flex items-center justify-between gap-2">
                        <span>You're in control. Need hands?</span>
                        <Link to="/creator/book" className="text-blue-700 font-semibold hover:underline">Book an editor →</Link>
                      </div>
                    )}
                    {idea.mode === 'ai' && idea.aiPlan && (
                      <div className="mt-3 rounded-lg bg-purple-50 border border-purple-100 p-3">
                        <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                          <Wand2 className="w-3 h-3" /> AI editing plan
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                          {idea.aiPlan.map((line, i) => <li key={i}>{line}</li>)}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* AI Templates */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" /> AI Templates
          </h2>
          <p className="text-sm text-gray-500 mb-4">Ready-made edit structures generated by AI</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_TEMPLATES.map(t => (
              <div key={t.name} className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{t.emoji}</div>
                <h3 className="font-semibold text-gray-900">{t.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{t.desc}</p>
                <p className="text-xs text-gray-400 mb-3">{t.length}</p>
                <button onClick={() => addNotification({ type: 'success', title: 'Template applied', message: `"${t.name}" added to your mood board.` })} className="w-full py-2 rounded-lg bg-purple-50 text-purple-700 font-semibold text-sm hover:bg-purple-100">
                  Use template
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Creator Marketplace */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-green-600" /> Creator Marketplace
          </h2>
          <p className="text-sm text-gray-500 mb-4">Buy templates, trending audios, content ideas and hashtags from creators</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {MARKET_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setMarketTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${marketTab === tab.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MARKETPLACE[marketTab].map(item => (
              <div key={item.title} className="p-4 rounded-xl border border-gray-200 flex flex-col">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">by {item.creator}</p>
                <p className="text-xs text-gray-400 mb-3">{item.meta}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                  <button onClick={() => addNotification({ type: 'success', title: 'Added to cart', message: `${item.title} — ₹${item.price}` })} className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700">
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MoodBoardPage;
