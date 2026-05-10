import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import {
  hallOfFameSourceNote,
  hltvHallOfFameBallots,
  hltvHallOfFameClasses,
  legacyProfiles,
} from "@/data/hall-of-fame";
import CountryFlag from "@/components/CountryFlag";

export const metadata = {
  title: "Hall of Fame - Counter-Strike Legends",
};

export default function HallOfFamePage() {
  const featuredProfile = legacyProfiles[0];
  const archiveProfiles = legacyProfiles.slice(1);

  return (
    <>
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-border bg-bg-body">
          {featuredProfile.heroImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredProfile.heroImage}
                alt={featuredProfile.nickname}
                className="absolute inset-0 h-full w-full object-cover object-right object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-body via-bg-body/86 to-bg-body/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-body via-transparent to-bg-body/20" />
            </>
          )}

          <div className="relative mx-auto max-w-[1460px] px-4 sm:px-5 py-8 md:py-10">
            <div className="mb-5 text-sm text-text-muted">
              <Link href="/" className="hover:text-text-secondary">
                Home
              </Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-text-primary">Hall of Fame</span>
            </div>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow/20 bg-yellow/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-yellow">
                Legacy Archive
              </span>
              <h1 className="mt-4 text-2xl font-black leading-none md:text-4xl">
                Hall of Fame
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
                Uma biblioteca de lendas do Counter-Strike com perfil biografico, linha do
                tempo de carreira e um recorte separado para as classes e ballots oficiais do
                Hall of Fame da HLTV.
              </p>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              <article className="rounded-2xl border border-yellow/15 bg-black/20 p-5 backdrop-blur-sm md:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-2xl">
                    <CountryFlag countryCode={featuredProfile.country} preferredFlag={featuredProfile.countryFlag} />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-yellow/80">
                    {featuredProfile.epithet}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      featuredProfile.status === "Retired"
                        ? "bg-blue/15 text-blue-light"
                        : "bg-orange/15 text-orange"
                    }`}
                  >
                    {featuredProfile.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-end md:gap-4">
                  <h2 className="text-2xl font-black text-white md:text-4xl">
                    {featuredProfile.nickname}
                  </h2>
                  <div className="pb-1">
                    <p className="text-sm font-semibold text-text-primary">
                      {featuredProfile.realName}
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-yellow/75">
                      {featuredProfile.role} • {featuredProfile.era}
                    </p>
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-text-secondary md:text-[15px]">
                  {featuredProfile.summary}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {featuredProfile.infobox.map((item) => (
                    <div key={item.label} className="rounded-xl border border-border/80 bg-bg-body/65 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-text-primary">{item.value}</p>
                    </div>
                  ))}
                </div>
              </article>

              <aside className="rounded-2xl border border-border bg-bg-card/85 p-5 backdrop-blur-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-text-muted">
                  Featured Timeline
                </p>
                <div className="mt-4 space-y-4">
                  {featuredProfile.timeline.map((entry) => (
                    <div key={entry.period} className="border-l border-yellow/25 pl-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow">
                        {entry.period}
                      </p>
                      <h3 className="mt-1 text-[13px] font-semibold">{entry.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-text-secondary">{entry.detail}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-bg-surface/30">
          <div className="mx-auto grid max-w-[1460px] gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-text-muted">
                    Legacy Biography
                  </p>
                  <h2 className="mt-2 text-xl font-black md:text-2xl">FalleN dossier</h2>
                </div>
                <Link
                  href="#hltv-hall"
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
                >
                  Jump to HLTV Hall
                </Link>
              </div>

              <div className="space-y-4 rounded-2xl border border-border bg-bg-card p-5 md:p-6">
                {featuredProfile.biography.map((paragraph, index) => (
                  <p key={index} className="text-sm leading-7 text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <section className="rounded-2xl border border-border bg-bg-card p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-yellow">
                  Signature moments
                </h3>
                <div className="mt-4 space-y-3">
                  {featuredProfile.signatureMoments.map((moment) => (
                    <div key={moment} className="rounded-xl border border-yellow/10 bg-yellow/5 px-4 py-3">
                      <p className="text-sm text-text-primary">{moment}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-bg-card p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-light">
                  Career achievements
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredProfile.achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="rounded-full border border-blue/20 bg-blue/10 px-3 py-1.5 text-xs text-text-primary"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1460px] px-4 sm:px-5 py-10">
          <div className="mb-6 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-text-muted">
              Retired Greats
            </p>
            <h2 className="mt-2 text-xl font-black md:text-2xl">Biographical archive</h2>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Perfis mais editoriais, no estilo enciclopedia, para nomes que ajudaram a
              moldar eras inteiras do Counter-Strike.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {archiveProfiles.map((profile) => (
              <article key={profile.slug} className="rounded-2xl border border-border bg-bg-card p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xl">
                    <CountryFlag countryCode={profile.country} preferredFlag={profile.countryFlag} />
                  </span>
                  <h3 className="text-xl font-black md:text-2xl">{profile.nickname}</h3>
                  <span className="text-sm text-text-secondary">{profile.realName}</span>
                  <span className="rounded-full bg-blue/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-light">
                    {profile.status}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
                  <span>{profile.role}</span>
                  <span>{profile.era}</span>
                  <span className="text-yellow">{profile.epithet}</span>
                </div>

                <p className="mt-4 text-sm leading-7 text-text-secondary">{profile.summary}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {profile.infobox.map((item) => (
                    <div key={item.label} className="rounded-xl border border-border/70 bg-bg-body/60 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-text-primary">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3">
                  {profile.biography.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-7 text-text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
                      Career timeline
                    </p>
                    <div className="mt-3 space-y-3">
                      {profile.timeline.map((entry) => (
                        <div key={`${profile.slug}-${entry.period}`} className="border-l border-border pl-4">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-light">
                            {entry.period}
                          </p>
                      <h4 className="mt-1 text-[13px] font-semibold">{entry.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-text-secondary">{entry.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
                      Hall notes
                    </p>
                    <div className="mt-3 space-y-2">
                      {profile.achievements.map((achievement) => (
                        <div
                          key={achievement}
                          className="rounded-xl border border-yellow/10 bg-yellow/5 px-3 py-2 text-sm text-text-primary"
                        >
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="hltv-hall" className="border-t border-border bg-bg-surface/25">
          <div className="mx-auto max-w-[1460px] px-4 sm:px-5 py-10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-text-muted">
                Official HLTV Hall
              </p>
              <h2 className="mt-2 text-xl font-black md:text-2xl">Classes and nominee ballots</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                Secao separada para o processo oficial da HLTV, com classes ja induzidas e as
                listas de nomeados publicadas em cada ciclo recente.
              </p>
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-2">
              {hltvHallOfFameClasses.map((hallClass) => (
                <article
                  key={hallClass.year}
                  className="rounded-2xl border border-border bg-bg-card p-5 md:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-yellow">
                        {hallClass.classLabel}
                      </p>
                      <h3 className="mt-2 text-xl font-black md:text-2xl">{hallClass.year}</h3>
                    </div>
                    <span className="rounded-full bg-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green">
                      Inducted
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-text-secondary">{hallClass.note}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {hallClass.inducted.map((name) => (
                      <span
                        key={name}
                        className="rounded-full border border-yellow/20 bg-yellow/10 px-3 py-1.5 text-sm font-semibold text-text-primary"
                      >
                        {name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-border/70 bg-bg-body/60 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                        Announcement
                      </p>
                      <p className="mt-2 text-sm font-semibold">{hallClass.announcementDate}</p>
                    </div>
                    <div className="rounded-xl border border-border/70 bg-bg-body/60 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                        Induction ceremony
                      </p>
                      <p className="mt-2 text-sm font-semibold">{hallClass.inductionDate}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-2">
              {hltvHallOfFameBallots.map((ballot) => (
                <article key={ballot.year} className="rounded-2xl border border-border bg-bg-card p-5 md:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-light">
                        Nominee ballot
                      </p>
                      <h3 className="mt-2 text-xl font-black md:text-2xl">{ballot.year}</h3>
                    </div>
                    <span className="rounded-full bg-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-light">
                      {ballot.nominees.length} nominees
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-text-secondary">{ballot.note}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {ballot.nominees.map((name) => (
                      <span
                        key={`${ballot.year}-${name}`}
                        className="rounded-full border border-blue/20 bg-blue/10 px-3 py-1.5 text-sm text-text-primary"
                      >
                        {name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-border/70 bg-bg-body/60 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                      Ballot published
                    </p>
                    <p className="mt-2 text-sm font-semibold">{ballot.ballotDate}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-bg-card p-5 md:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
                Source note
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-text-secondary">
                {hallOfFameSourceNote}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
