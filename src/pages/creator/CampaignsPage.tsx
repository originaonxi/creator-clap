import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Megaphone, Upload, CheckCircle2, Clock, Handshake } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

type Status = 'in_progress' | 'deal_done' | 'submitted';

interface Campaign {
  id: string;
  brand: string;
  name: string;
  platform: string;
  budget: string;
  deadline: string;
  status: Status;
  uploadLink?: string;
}

const INITIAL: Campaign[] = [
  { id: '1', brand: 'Fashion Brand', name: 'Summer Collection Launch', platform: 'Instagram', budget: '₹25,000', deadline: 'Jan 5', status: 'deal_done' },
  { id: '2', brand: 'Tech Startup', name: 'App Launch Campaign', platform: 'YouTube', budget: '₹15,000', deadline: 'Jan 10', status: 'in_progress' },
  { id: '3', brand: 'Snack Co.', name: 'Festive Snack Challenge', platform: 'TikTok', budget: '₹40,000', deadline: 'Jan 18', status: 'deal_done' },
  { id: '4', brand: 'Travel App', name: 'Weekend Getaways', platform: 'Facebook', budget: '₹30,000', deadline: 'Jan 22', status: 'in_progress' }
];

const STATUS_LABEL: Record<Status, { text: string; style: string; icon: typeof Clock }> = {
  in_progress: { text: 'Brand deal in progress', style: 'bg-yellow-100 text-yellow-800', icon: Clock },
  deal_done: { text: 'Deal finished — upload content', style: 'bg-green-100 text-green-700', icon: Handshake },
  submitted: { text: 'Content submitted', style: 'bg-blue-100 text-blue-700', icon: CheckCircle2 }
};

const CampaignsPage = () => {
  const { addNotification } = useNotifications();
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const submit = (id: string) => {
    const link = (drafts[id] || '').trim();
    if (!link) {
      addNotification({ type: 'error', title: 'Add your content', message: 'Paste the link to your post or video file.' });
      return;
    }
    setCampaigns(prev => prev.map(c => (c.id === id ? { ...c, status: 'submitted', uploadLink: link } : c)));
    addNotification({ type: 'success', title: 'Content uploaded', message: 'The brand will review it and release your payment.' });
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-3">
          <Megaphone className="w-7 h-7 text-blue-600" /> View Campaigns
        </h1>
        <p className="text-gray-600 mb-8">Active Campaigns — upload your content once a brand deal is finished.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {campaigns.map(c => {
            const s = STATUS_LABEL[c.status];
            return (
              <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-sm text-gray-500">{c.brand}</p>
                    <h3 className="text-lg font-semibold text-gray-900">{c.name}</h3>
                  </div>
                  <span className="text-lg font-bold text-green-600">{c.budget}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{c.platform} · Due {c.deadline}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${s.style}`}>
                  <s.icon className="w-3 h-3" /> {s.text}
                </span>

                {c.status === 'deal_done' && (
                  <div className="mt-4 flex gap-2">
                    <input
                      value={drafts[c.id] || ''}
                      onChange={e => setDrafts(d => ({ ...d, [c.id]: e.target.value }))}
                      placeholder="Link to your post / video file"
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button onClick={() => submit(c.id)} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
                      <Upload className="w-4 h-4" /> Upload Content
                    </button>
                  </div>
                )}
                {c.status === 'in_progress' && (
                  <p className="mt-4 text-sm text-gray-500">Upload Content unlocks after the brand deal is finished.</p>
                )}
                {c.status === 'submitted' && c.uploadLink && (
                  <p className="mt-4 text-sm text-gray-600 truncate">Submitted: {c.uploadLink}</p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CampaignsPage;
