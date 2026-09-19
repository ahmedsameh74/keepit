import { getDictionary } from "../../../dictionaries/getDictionary";
import Navbar from "../../../components/Navbar";
import ProfileForm from "../../../components/ProfileForm";
import Footer from "../../../components/Footer";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar dict={dict} lang={lang} />
      
      <div className="flex-grow flex items-center justify-center pt-32 pb-12 px-4 md:px-6">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="w-full h-full text-[20vw] font-black leading-none break-all overflow-hidden text-[var(--text-primary)] whitespace-nowrap opacity-10 flex items-center justify-center select-none">
            PROFILE PROFILE PROFILE
          </div>
        </div>
        
        <div className="w-full relative z-10">
          <ProfileForm dict={dict} />
        </div>
      </div>
      
      <Footer dict={dict} lang={lang} />
    </main>
  );
}
