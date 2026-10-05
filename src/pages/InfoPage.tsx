import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Zap, Mail } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

interface InfoContent {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

const CONTENT: Record<string, InfoContent> = {
  about: {
    title: 'About Creator Clap',
    intro: "India's first AI-powered creator economy platform — connecting creators, service providers and brands.",
    sections: [
      { heading: 'Our mission', body: 'Give every creator the crew, tools and brand deals that used to be available only to big studios.' },
      { heading: 'What we do', body: 'Book videographers and editors on demand, plan content on your Mood Board with AI, sell your templates, audios and ideas, and get paid for brand campaigns.' },
      { heading: 'Who we serve', body: 'Creators on YouTube, Instagram, Facebook, Snapchat and TikTok, the professionals who help them shoot and edit, and the brands that want to work with them.' }
    ]
  },
  careers: {
    title: 'Careers',
    intro: 'Help us build the home of Indian creators.',
    sections: [
      { heading: 'Founding Engineer — Full Stack', body: 'React, TypeScript, Node. Mumbai / Remote.' },
      { heading: 'Creator Partnerships Lead', body: 'Grow our creator and service-provider network. Mumbai.' },
      { heading: 'AI Video Engineer', body: 'Build the AI editing and template engine behind Mood Board. Bengaluru / Remote.' }
    ]
  },
  blog: {
    title: 'Blog',
    intro: 'Playbooks for creators, crews and brands.',
    sections: [
      { heading: 'How to brief a videographer in 5 minutes', body: 'A one-page template that gets you the shots you want the first time.' },
      { heading: 'Trending audio: when to use it and when to skip it', body: 'What the data says about reach on Reels, Shorts and TikTok.' },
      { heading: 'Pricing your first brand deal', body: 'A simple formula based on reach, engagement and deliverables.' }
    ]
  },
  press: {
    title: 'Press',
    intro: 'News and media resources.',
    sections: [
      { heading: 'Press kit', body: 'Logos, product screenshots and founder bios are available on request.' },
      { heading: 'Media enquiries', body: 'Write to press@creatorclap.com and we will reply within one working day.' }
    ]
  },
  help: {
    title: 'Help Center',
    intro: 'Answers to the most common questions.',
    sections: [
      { heading: 'How do I book a crew?', body: 'Go to Dashboard → Book Services, pick Videographer with Editor, Only Videographer or Only Editor, set your budget (up to ₹1 lakh) and press Book Now.' },
      { heading: 'How does the Mood Board work?', body: 'Save reference links, write ideas, then choose "Edit with my idea" or "Improve with AI". AI templates and the creator marketplace sit underneath.' },
      { heading: 'How do I get paid?', body: 'Earnings from campaigns and Sell & Earn collect in Withdraw Earnings. Withdraw to UPI or your bank in 1–2 working days.' }
    ]
  },
  terms: {
    title: 'Terms of Service',
    intro: 'The rules for using Creator Clap.',
    sections: [
      { heading: 'Accounts', body: 'You are responsible for your account and the content you upload or sell.' },
      { heading: 'Payments', body: 'Bookings and campaign payments are held until work is delivered and approved.' },
      { heading: 'Content ownership', body: 'You keep ownership of your content. Buyers of templates, audios and ideas get a licence to use them.' }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    intro: 'How we handle your data.',
    sections: [
      { heading: 'What we collect', body: 'Account details, profile information, bookings and payout details.' },
      { heading: 'How we use it', body: 'To match you with crews and brands, process payments and improve recommendations.' },
      { heading: 'Your choices', body: 'You can export or delete your data at any time from Settings.' }
    ]
  },
  contact: {
    title: 'Contact Us',
    intro: "We'd love to hear from you.",
    sections: [
      { heading: 'Email', body: 'hello@creatorclap.com' },
      { heading: 'Office', body: 'Mumbai, Maharashtra, India' }
    ]
  },
  'forgot-password': {
    title: 'Reset your password',
    intro: "Enter your email and we'll send you a reset link.",
    sections: []
  }
};

const InfoPage = () => {
  const { pathname } = useLocation();
  const { addNotification } = useNotifications();
  const slug = pathname.replace(/^\//, '');
  const page = CONTENT[slug] ?? CONTENT.about;
  const hasForm = slug === 'contact' || slug === 'forgot-password';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Creator Clap</span>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{page.title}</h1>
        <p className="text-lg text-gray-600 mb-10">{page.intro}</p>

        <div className="space-y-6">
          {page.sections.map(s => (
            <section key={s.heading} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{s.heading}</h2>
              <p className="text-gray-600">{s.body}</p>
              {slug === 'careers' && (
                <button
                  onClick={() => addNotification({ type: 'success', title: 'Application started', message: `We'll email you about ${s.heading}.` })}
                  className="mt-4 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700"
                >
                  Apply
                </button>
              )}
            </section>
          ))}
        </div>

        {hasForm && (
          <form
            onSubmit={e => {
              e.preventDefault();
              (e.target as HTMLFormElement).reset();
              addNotification({
                type: 'success',
                title: slug === 'contact' ? 'Message sent' : 'Reset link sent',
                message: slug === 'contact' ? "We'll get back to you within one working day." : 'Check your inbox for the reset link.'
              });
            }}
            className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4"
          >
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input required type="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
            {slug === 'contact' && (
              <textarea required rows={4} placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            )}
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold">
              {slug === 'contact' ? 'Send message' : 'Send reset link'}
            </button>
            {slug === 'forgot-password' && (
              <p className="text-center text-sm text-gray-600">
                Remembered it? <Link to="/login" className="text-purple-600 font-semibold">Back to login</Link>
              </p>
            )}
          </form>
        )}
      </main>
    </div>
  );
};

export default InfoPage;
