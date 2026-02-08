import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'leadership' });

  return {
    title: `${t('title')} | Kalakshetra Odisha`,
    description: t('subtitle'),
  };
}

// Leadership member type
interface LeadershipMember {
  id: string;
  name: string;
  nameOr: string;
  role: string;
  roleOr: string;
  image: string;
  bio?: string;
}

// Leadership data
const leadershipTeam: {
  executives: LeadershipMember[];
  advisors: LeadershipMember[];
} = {
  executives: [
    {
      id: '1',
      name: 'Shri Ashrumohan Mohanty',
      nameOr: 'ଶ୍ରୀ ଅଶ୍ରୁମୋହନ ମହାନ୍ତି',
      role: 'President',
      roleOr: 'ସଭାପତି',
      image: '/images/President.jpg',
      bio: 'Culture is not only performance—it is identity, values, and pride. Kalakshetra stands to protect Odisha\'s folk traditions, support artists, and bring cultural awareness to every village and every generation. Let us celebrate our roots and strengthen our community through art.',
    },
    {
      id: '2',
      name: 'Shri Basudev Malbisoi',
      nameOr: 'ଶ୍ରୀ ବାସୁଦେବ ମାଲବିସୋଇ',
      role: 'Member Secretary',
      roleOr: 'ସଦସ୍ୟ ସଚିବ',
      image: '/images/Secretary.jpg',
      bio: 'Villages are the heart of India\'s culture. Through the \'Mo Biswa\' initiative and Village Day programs, we promote unity, awareness, and cultural dignity across communities. Kalakshetra will continue connecting people through folk art, cultural events, and recognition of dedicated contributors.',
    },
  ],
  advisors: [],
};

export default async function LeadershipPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LeadershipContent />;
}

function LeadershipContent() {
  const t = useTranslations('leadership');

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* Executive Team */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">
            {t('executiveTeam')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.executives.map((member) => (
              <Card
                key={member.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/30 to-transparent" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-semibold text-deep mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board - Only show if there are advisors */}
      {leadershipTeam.advisors.length > 0 && (
        <section className="section-padding bg-muted-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-12">
              {t('advisoryBoard')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {leadershipTeam.advisors.map((member) => (
                <Card key={member.id} className="text-center border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <h3 className="font-display font-semibold text-deep mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
