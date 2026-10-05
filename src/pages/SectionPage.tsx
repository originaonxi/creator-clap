import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

interface Row {
  title: string;
  detail: string;
  value?: string;
  action?: string;
}

interface Section {
  title: string;
  subtitle: string;
  back: string;
  rows: Row[];
}

const SECTIONS: Record<string, Section> = {
  '/creator/bookings': {
    title: 'My Bookings',
    subtitle: 'Your upcoming and past crew bookings',
    back: '/creator/dashboard',
    rows: [
      { title: 'Raj Photography', detail: 'Photography · Dec 28, 10:00 AM · Bandra, Mumbai', value: 'Confirmed', action: 'Reschedule' },
      { title: 'Creative Films Studio', detail: 'Videographer with Editor · Dec 30, 2:00 PM · Juhu, Mumbai', value: 'Pending', action: 'Cancel' },
      { title: 'Styling by Priya', detail: 'Styling · Dec 15 · Andheri, Mumbai', value: 'Completed', action: 'Leave review' }
    ]
  },
  '/provider/reviews': {
    title: 'All Reviews',
    subtitle: 'What creators say about your work',
    back: '/provider/dashboard',
    rows: [
      { title: 'Ananya Sharma ★★★★★', detail: 'Super professional, delivered the edit in 24 hours.', action: 'Reply' },
      { title: 'Rohit Verma ★★★★★', detail: 'Great drone shots and very easy to work with.', action: 'Reply' },
      { title: 'Meera Iyer ★★★★☆', detail: 'Lovely colour grading, slightly late on the first draft.', action: 'Reply' }
    ]
  },
  '/brand/campaigns': {
    title: 'Campaigns',
    subtitle: 'All your running and finished campaigns',
    back: '/brand/dashboard',
    rows: [
      { title: 'Summer Collection Launch', detail: 'Instagram · 12 creators', value: 'Active', action: 'Manage' },
      { title: 'Festive Snack Challenge', detail: 'TikTok · 8 creators', value: 'Active', action: 'Manage' },
      { title: 'Monsoon Sale', detail: 'YouTube · 5 creators', value: 'Completed', action: 'View report' }
    ]
  },
  '/brand/creators': {
    title: 'Find Creators',
    subtitle: 'Creators matched to your brand',
    back: '/brand/dashboard',
    rows: [
      { title: '@fitwithriya', detail: 'Fitness · Instagram · 450K followers', value: '94% match', action: 'Invite' },
      { title: '@gadgetguru', detail: 'Tech · YouTube · 1.2M subscribers', value: '89% match', action: 'Invite' },
      { title: '@chefreels', detail: 'Food · TikTok · 320K followers', value: '86% match', action: 'Invite' }
    ]
  },
  '/brand/analytics': {
    title: 'Analytics',
    subtitle: 'Performance across all campaigns',
    back: '/brand/dashboard',
    rows: [
      { title: 'Total reach', detail: 'Last 30 days', value: '4.8M' },
      { title: 'Engagement rate', detail: 'Average across platforms', value: '6.2%' },
      { title: 'Cost per engagement', detail: 'Blended', value: '₹1.40' }
    ]
  },
  '/brand/billing': {
    title: 'Billing',
    subtitle: 'Invoices and payment methods',
    back: '/brand/dashboard',
    rows: [
      { title: 'Invoice #CC-1042', detail: 'Summer Collection Launch · Dec 20', value: '₹3,00,000', action: 'Download' },
      { title: 'Invoice #CC-1031', detail: 'Monsoon Sale · Nov 12', value: '₹1,50,000', action: 'Download' },
      { title: 'Payment method', detail: 'HDFC Corporate card ending 4417', action: 'Update' }
    ]
  },
  '/cc-tv/schedule': {
    title: 'CC TV Schedule',
    subtitle: 'Upcoming live shows and premieres',
    back: '/cc-tv',
    rows: [
      { title: 'Creator Pitch Night', detail: 'Today · 8:00 PM', action: 'Remind me' },
      { title: 'Behind the Shoot: Music Video', detail: 'Tomorrow · 6:00 PM', action: 'Remind me' },
      { title: 'Short Film Premiere', detail: 'Saturday · 9:00 PM', action: 'Remind me' }
    ]
  }
};

const SectionPage = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const section = SECTIONS[pathname];

  if (!section) {
    const home = user ? `/${user.userType}/dashboard` : '/';
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Compass className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page not found</h1>
          <p className="text-gray-600 mb-6">This page doesn't exist yet.</p>
          <Link to={home} className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
            {user ? 'Back to Dashboard' : 'Go Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to={section.back} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-fit">
            <ArrowLeft className="w-5 h-5" /> Back
          </Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{section.title}</h1>
        <p className="text-gray-600 mb-8">{section.subtitle}</p>
        <ul className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-100">
          {section.rows.map(r => (
            <li key={r.title} className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{r.title}</p>
                <p className="text-sm text-gray-600">{r.detail}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {r.value && <span className="font-semibold text-purple-700">{r.value}</span>}
                {r.action && (
                  <button
                    onClick={() => addNotification({ type: 'success', title: r.action!, message: `${r.action} — ${r.title}` })}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    {r.action}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default SectionPage;
