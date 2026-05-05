import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { forumThreads } from "@/data/mock";

export function generateStaticParams() {
  return forumThreads.map((t) => ({ id: t.id.toString() }));
}

const mockReplies = [
  { user: "ProAnalyst", rank: "Global Elite", time: "5 min ago", text: "Great discussion topic! I think the current meta really favors aggressive play styles. Teams that can execute fast site takes with coordinated utility will dominate.", likes: 67 },
  { user: "CasualFan22", rank: "Gold Nova", time: "12 min ago", text: "I've been watching competitive CS for about 6 months now and this is exactly what got me hooked. The tactical depth is incredible.", likes: 23 },
  { user: "VeteranGamer", rank: "Supreme", time: "28 min ago", text: "This reminds me of the old days in CS 1.6. The game has evolved so much but the core competitive spirit remains the same. Love to see it.", likes: 45 },
  { user: "StratMaster", rank: "Legendary Eagle", time: "45 min ago", text: "If you look at the stats from the last three events, there's a clear trend towards mid-control based strategies. Teams that win mid on Mirage and Inferno are winning 60%+ of their rounds.", likes: 89 },
  { user: "NewToCS", rank: "Silver", time: "1h ago", text: "Can someone explain what KAST means? I see it in every stats discussion but I'm not sure what it actually measures.", likes: 12 },
  { user: "DataDrivenCS", rank: "Legendary Eagle Master", time: "1h ago", text: "KAST stands for Kill, Assist, Survived, or Traded. It measures how often a player contributes meaningfully to a round. A good KAST is 70%+.", likes: 34 },
  { user: "OGFan", rank: "Distinguished Master Guardian", time: "2h ago", text: "The level of competition right now is the highest it's ever been. Every match in S-tier events is a banger. We're in a golden era.", likes: 56 },
];

export default async function ForumThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thread = forumThreads.find((t) => t.id.toString() === id);
  if (!thread) {
    return (<><Header /><main className="mx-auto max-w-[800px] px-5 py-16 text-center"><h1 className="text-2xl font-bold mb-4">Thread not found</h1><Link href="/forums" className="text-blue-light">Back to Forums</Link></main><Footer /></>);
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[900px] px-5 py-8">
        <div className="mb-6 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-secondary">Home</Link><span className="mx-2">&rsaquo;</span>
          <Link href="/forums" className="hover:text-text-secondary">Forums</Link><span className="mx-2">&rsaquo;</span>
          <span className="text-text-primary line-clamp-1">{thread.title}</span>
        </div>

        {/* Thread header */}
        <div className="rounded-xl border border-border bg-bg-card p-5 mb-4 card-glow animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue/15 text-blue-light px-2 py-0.5 rounded">{thread.category}</span>
            {thread.pinned && <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow/15 text-yellow px-2 py-0.5 rounded">Pinned</span>}
          </div>
          <h1 className="text-xl md:text-2xl font-black mb-3">{thread.title}</h1>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-400">{thread.author[0]}</div>
              <div>
                <span className="font-semibold text-text-secondary">{thread.author}</span>
                <span className="text-text-muted ml-1.5 text-[10px] bg-bg-surface px-1.5 py-0.5 rounded">{thread.authorRank}</span>
              </div>
            </div>
            <span>{thread.replies} replies</span>
            <span>{(thread.views / 1000).toFixed(1)}K views</span>
            <span>Last reply: {thread.lastReply}</span>
          </div>
        </div>

        {/* OP post */}
        <div className="rounded-xl border border-border bg-bg-card p-5 mb-4 card-glow animate-fade-in-up delay-1">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-400 shrink-0">{thread.author[0]}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold">{thread.author}</span>
                <span className="text-[10px] text-text-muted bg-bg-surface px-1.5 py-0.5 rounded">{thread.authorRank}</span>
                <span className="text-[10px] text-text-muted">OP</span>
              </div>
              <div className="text-sm text-text-secondary leading-relaxed space-y-2">
                <p>What do you all think about this topic? I&apos;ve been following the scene closely and wanted to get the community&apos;s perspective on this.</p>
                <p>With everything that&apos;s been happening recently in the competitive scene, I feel like this is the perfect time to discuss this. The level of play we&apos;re seeing right now is absolutely insane.</p>
                <p>Let me know your thoughts below. Interested to hear from all skill levels and perspectives!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-3">
          {mockReplies.map((r, i) => (
            <div key={i} className={`rounded-xl border border-border bg-bg-card p-5 card-glow animate-fade-in-up delay-${Math.min(i + 2, 5)}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue/20 flex items-center justify-center text-sm font-bold text-blue-light shrink-0">{r.user[0]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold">{r.user}</span>
                    <span className="text-[10px] text-text-muted bg-bg-surface px-1.5 py-0.5 rounded">{r.rank}</span>
                    <span className="text-[10px] text-text-muted">{r.time}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{r.text}</p>
                  <div className="flex items-center gap-4 mt-2 text-[10px] text-text-muted">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-green transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                      {r.likes}
                    </span>
                    <span className="cursor-pointer hover:text-text-primary transition-colors">Reply</span>
                    <span className="cursor-pointer hover:text-text-primary transition-colors">Quote</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reply box */}
        <div className="mt-6 rounded-xl border border-border bg-bg-card p-5 card-glow">
          <h3 className="text-sm font-bold mb-3">Post a Reply</h3>
          <textarea className="w-full rounded-lg border border-border bg-bg-input px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-1 focus:ring-blue transition-colors resize-none h-24" placeholder="Write your reply..." />
          <div className="flex justify-end mt-3">
            <button className="rounded-lg bg-blue px-5 py-2 text-sm font-bold text-white hover:bg-blue-light transition-colors">Post Reply</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
