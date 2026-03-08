import { createServiceSupabase } from '@/lib/supabase';
import Header from '@/components/public/Header';
import Hero from '@/components/public/Hero';
import TrustBar from '@/components/public/TrustBar';
import About from '@/components/public/About';
import Advisor from '@/components/public/Advisor';
import Calculator from '@/components/public/Calculator';
import LifeStages from '@/components/public/LifeStages';
import Products from '@/components/public/Products';
import ClaimProcess from '@/components/public/ClaimProcess';
import CaseStudies from '@/components/public/CaseStudies';
import Testimonials from '@/components/public/Testimonials';
import FAQ from '@/components/public/FAQ';
import LeadFunnel from '@/components/public/LeadFunnel';
import KnowledgeHub from '@/components/public/KnowledgeHub';
import Footer from '@/components/public/Footer';
import FloatingCTA from '@/components/public/FloatingCTA';

export default async function HomePage() {
  const supabase = createServiceSupabase();

  // Fetch real data from database
  const [productsRes, testimonialsRes] = await Promise.all([
    supabase.from('products').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('testimonials').select('*').eq('is_active', true).order('sort_order'),
  ]);

  const products = productsRes.data || [];
  const testimonials = testimonialsRes.data || [];

  return (
    <main>
      <Header />
      <Hero />
      <TrustBar />
      <About />
      <Advisor />
      <Calculator />
      <LifeStages />
      <Products products={products} />
      <ClaimProcess />
      <CaseStudies />
      <Testimonials testimonials={testimonials} />
      <FAQ />
      <LeadFunnel />
      <KnowledgeHub />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
