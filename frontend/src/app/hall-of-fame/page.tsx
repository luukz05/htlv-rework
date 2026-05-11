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
    <main>
      <section className="relative overflow-hidden border-b border-border bg-bg-body">
        {featuredProfile.heroImage && (
          <>
            {/* Mobile: image inline at top */}
            <div className="relative sm:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredProfile.heroImage}
                alt={featuredProfile.nickname}
                className="block h-auto w-full"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-body via-bg-body/70 to-transparent" />
            </div>
            {/* Desktop: image as full-bleed background */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredProfile.heroImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 hidden h-full w-full object-cover object-right object-center sm:block"
            />
            <div className="absolute inset-0 hidden bg-gradient-to-r from-bg-body via-bg-body/90 to-bg-body/45 sm:block" />
            <div className="absolute inset-0 hidden bg-gradient-to-t from-bg-body via-transparent to-bg-body/20 sm:block" />
          </>
        )}

        <div className="relative mx-auto max-w-[1460px] px-4 py-5 sm:px-5 sm:py-6 md:py-8">
          <div className="mb-3 text-sm text-text-muted sm:mb-4">
            <Link href="/" className="hover:text-text-secondary">
              Home
            </Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-text-primary">Hall of Fame</span>
          </div>

          <div className="grid gap-5 sm:gap-7 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.55fr)]">
            <div>
              <span className="inline-flex items-center gap-2 border-l-2 border-yellow pl-3 text-[10px] font-black uppercase tracking-[0.25em] text-yellow">
                Legacy Archive
              </span>
              <h1 className="mt-2 text-2xl font-black leading-none sm:mt-3 md:text-4xl">
                Hall of Fame
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary sm:mt-3 md:text-base">
                A library of Counter-Strike legends with biographical profiles, career
                timelines, and a dedicated section for official HLTV Hall of Fame classes and
                nominee ballots.
              </p>

              <div className="mt-4 border-l border-yellow/35 pl-3 sm:mt-6 sm:pl-5">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">
                    <CountryFlag countryCode={featuredProfile.country} preferredFlag={featuredProfile.countryFlag} />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow/80 sm:text-[11px] sm:tracking-[0.25em]">
                    {featuredProfile.epithet}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider sm:px-2.5 sm:py-1 ${
                      featuredProfile.status === "Retired"
                        ? "bg-blue/15 text-blue-light"
                        : "bg-orange/15 text-orange"
                    }`}
                  >
                    {featuredProfile.status}
                  </span>
                </div>

                <div className="mt-2 flex flex-col gap-1 sm:mt-3 sm:gap-2 md:flex-row md:items-end md:gap-4">
                  <h2 className="text-2xl font-black text-white sm:text-3xl md:text-5xl">
                    {featuredProfile.nickname}
                  </h2>
                  <div className="pb-1">
                    <p className="text-sm font-semibold text-text-primary">
                      {featuredProfile.realName}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-yellow/75 sm:text-[11px]">
                      {featuredProfile.role} &bull; {featuredProfile.era}
                    </p>
                  </div>
                </div>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary sm:mt-3 md:text-[15px]">
                  {featuredProfile.summary}
                </p>
              </div>
            </div>

            <div className="self-end">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted sm:text-[11px] sm:tracking-[0.22em]">
                Dossier facts
              </p>
              <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 sm:mt-3 sm:gap-x-4 sm:gap-y-3">
                {featuredProfile.infobox.map((item) => (
                  <div key={item.label} className="border-t border-border/70 pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-text-primary sm:text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-border/70 pt-4 sm:mt-7 sm:pt-5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted sm:text-[11px] sm:tracking-[0.25em]">
                Featured Timeline
              </p>
              <Link
                href="#hltv-hall"
                className="text-xs font-semibold text-text-secondary transition-colors hover:text-text-primary"
              >
                Jump to HLTV Hall
              </Link>
            </div>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-6">
              {featuredProfile.timeline.map((entry) => (
                <div key={entry.period} className="border-l border-yellow/25 pl-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow">
                    {entry.period}
                  </p>
                  <h3 className="mt-1 text-[13px] font-semibold">{entry.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-text-secondary">{entry.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg-surface/20">
        <div className="mx-auto grid max-w-[1460px] gap-5 px-4 py-6 sm:gap-7 sm:px-5 sm:py-8 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted sm:text-[11px] sm:tracking-[0.25em]">
              Legacy Biography
            </p>
            <h2 className="mt-1.5 text-lg font-black sm:mt-2 sm:text-xl md:text-2xl">FalleN dossier</h2>

            <div className="mt-3 columns-1 gap-8 sm:mt-4 lg:columns-2">
              {featuredProfile.biography.map((paragraph, index) => (
                <p key={index} className="mb-3 break-inside-avoid text-sm leading-6 text-text-secondary sm:mb-4 sm:leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-5 sm:gap-6">
            <section>
              <h3 className="border-b border-yellow/20 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-yellow sm:text-sm sm:tracking-[0.2em]">
                Signature moments
              </h3>
              <div className="mt-3 space-y-2">
                {featuredProfile.signatureMoments.map((moment) => (
                  <p key={moment} className="border-l border-yellow/25 pl-3 text-sm leading-6 text-text-primary">
                    {moment}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h3 className="border-b border-blue/20 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-light sm:text-sm sm:tracking-[0.2em]">
                Career achievements
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                {featuredProfile.achievements.map((achievement) => (
                  <span
                    key={achievement}
                    className="rounded-full border border-blue/20 bg-blue/10 px-2.5 py-1 text-[11px] text-text-primary sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1460px] px-4 py-6 sm:px-5 sm:py-8">
        <div className="mb-4 max-w-3xl sm:mb-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted sm:text-[11px] sm:tracking-[0.25em]">
            Retired Greats
          </p>
          <h2 className="mt-1.5 text-lg font-black sm:mt-2 sm:text-xl md:text-2xl">Biographical archive</h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Editorial, encyclopedia-style profiles for names who helped shape entire eras of
            Counter-Strike.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-5 sm:gap-y-7 xl:grid-cols-2">
          {archiveProfiles.map((profile) => (
            <article key={profile.slug} className="border-t border-border pt-4 sm:pt-5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xl">
                  <CountryFlag countryCode={profile.country} preferredFlag={profile.countryFlag} />
                </span>
                <h3 className="text-lg font-black sm:text-xl md:text-2xl">{profile.nickname}</h3>
                <span className="text-xs text-text-secondary sm:text-sm">{profile.realName}</span>
                <span className="rounded-full bg-blue/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-light sm:px-2.5 sm:py-1">
                  {profile.status}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted sm:gap-x-4 sm:gap-y-2 sm:text-[11px] sm:tracking-[0.2em]">
                <span>{profile.role}</span>
                <span>{profile.era}</span>
                <span className="text-yellow">{profile.epithet}</span>
              </div>

              <p className="mt-3 text-sm leading-6 text-text-secondary">{profile.summary}</p>

              <div className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3 sm:grid-cols-2">
                {profile.infobox.map((item) => (
                  <div key={item.label} className="border-l border-border pl-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-text-primary sm:text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 space-y-3 sm:mt-4">
                {profile.biography.map((paragraph, index) => (
                  <p key={index} className="text-sm leading-6 text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted sm:text-[11px] sm:tracking-[0.2em]">
                    Career timeline
                  </p>
                  <div className="mt-2 space-y-2.5 sm:mt-3 sm:space-y-3">
                    {profile.timeline.map((entry) => (
                      <div key={`${profile.slug}-${entry.period}`} className="border-l border-border pl-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-light">
                          {entry.period}
                        </p>
                        <h4 className="mt-1 text-[13px] font-semibold">{entry.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-text-secondary">{entry.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted sm:text-[11px] sm:tracking-[0.2em]">
                    Hall notes
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                    {profile.achievements.map((achievement) => (
                      <span
                        key={achievement}
                        className="rounded-full border border-yellow/15 bg-yellow/5 px-2.5 py-1 text-[11px] text-text-primary sm:px-3 sm:py-1.5 sm:text-xs"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="hltv-hall" className="border-t border-border bg-bg-surface/20">
        <div className="mx-auto max-w-[1460px] px-4 py-6 sm:px-5 sm:py-8">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted sm:text-[11px] sm:tracking-[0.25em]">
              Official HLTV Hall
            </p>
            <h2 className="mt-1.5 text-lg font-black sm:mt-2 sm:text-xl md:text-2xl">Classes and nominee ballots</h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              A separate section for HLTV's official process, covering inducted classes and
              nominee lists published in each recent cycle.
            </p>
          </div>

          <div className="mt-5 grid gap-x-8 gap-y-5 sm:mt-6 sm:gap-y-6 xl:grid-cols-2">
            {hltvHallOfFameClasses.map((hallClass) => (
              <article key={hallClass.year} className="border-t border-border pt-4 sm:pt-5">
                <div className="flex items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow sm:text-[11px] sm:tracking-[0.2em]">
                      {hallClass.classLabel}
                    </p>
                    <h3 className="mt-1 text-lg font-black sm:text-xl md:text-2xl">{hallClass.year}</h3>
                  </div>
                  <span className="rounded-full bg-green/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green sm:px-3 sm:py-1">
                    Inducted
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-text-secondary">{hallClass.note}</p>

                <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                  {hallClass.inducted.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-yellow/20 bg-yellow/10 px-2.5 py-1 text-xs font-semibold text-text-primary sm:px-3 sm:py-1.5 sm:text-sm"
                    >
                      {name}
                    </span>
                  ))}
                </div>

                <div className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3 sm:grid-cols-2">
                  <div className="border-l border-border pl-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                      Announcement
                    </p>
                    <p className="mt-1 text-xs font-semibold sm:text-sm">{hallClass.announcementDate}</p>
                  </div>
                  <div className="border-l border-border pl-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                      Induction ceremony
                    </p>
                    <p className="mt-1 text-xs font-semibold sm:text-sm">{hallClass.inductionDate}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-x-8 gap-y-5 sm:mt-7 sm:gap-y-6 xl:grid-cols-2">
            {hltvHallOfFameBallots.map((ballot) => (
              <article key={ballot.year} className="border-t border-border pt-4 sm:pt-5">
                <div className="flex items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-light sm:text-[11px] sm:tracking-[0.2em]">
                      Nominee ballot
                    </p>
                    <h3 className="mt-1 text-lg font-black sm:text-xl md:text-2xl">{ballot.year}</h3>
                  </div>
                  <span className="rounded-full bg-blue/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-light sm:px-3 sm:py-1">
                    {ballot.nominees.length} nominees
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-text-secondary">{ballot.note}</p>

                <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                  {ballot.nominees.map((name) => (
                    <span
                      key={`${ballot.year}-${name}`}
                      className="rounded-full border border-blue/20 bg-blue/10 px-2.5 py-1 text-xs text-text-primary sm:px-3 sm:py-1.5 sm:text-sm"
                    >
                      {name}
                    </span>
                  ))}
                </div>

                <div className="mt-3 border-l border-border pl-3 sm:mt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                    Ballot published
                  </p>
                  <p className="mt-1 text-xs font-semibold sm:text-sm">{ballot.ballotDate}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 border-t border-border pt-4 sm:mt-7 sm:pt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted sm:text-[11px] sm:tracking-[0.2em]">
              Source note
            </p>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-text-secondary">
              {hallOfFameSourceNote}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
