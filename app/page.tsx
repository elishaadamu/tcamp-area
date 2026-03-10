import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Sidecar, { SidecarPanel } from "./components/Sidecar";
import { ArrowDown } from "lucide-react";
import MapWidget from "./components/MapWidget";

export default function Home() {
  const sidecarPanels: SidecarPanel[] = [
    {
      id: "minority",
      title: "Minority Population",
      threshold: "27.87%",
      content: "This population group includes the following ACS racial categories: Black or African American alone, American Indian and Alaska Native alone, Asian alone, Native Hawaiian and other Pacific Islander alone, some other race alone, and two or more races.",
      source: "ACS_20_5YR_B02001",
      useMap: true,
    },
    {
      id: "hispanic",
      title: "Hispanic Population",
      threshold: "17.88%",
      content: "Though often included in many minority definitions, Hispanic is an ethnicity, not a racial category. Hispanics are defined by the U.S. Census as “persons of Mexican, Puerto Rican, Cuban, Central or South American, or other Spanish culture or origin, regardless of race.”",
      source: "ACS_20_5YR_B03003",
      useMap: true,
    },
    {
      id: "poverty",
      title: "Poverty",
      threshold: "20.45%",
      content: "Since poverty is defined at the family level and not the household level, the poverty status of the household is determined by the poverty status of the householder. Households are classified as poor when the total income of the householder’s family is below the appropriate poverty threshold, which was established in the Office of Management and Budget’s Statistical Policy Directive No. 14 and is adjusted for inflation.",
      source: "ACS_20_5YR_B17017",
      useMap: true,
    },
    {
      id: "lep",
      title: "Households",
      threshold: "4.79%",
      content: "This population is identified by households that speak a language other than English at home and speak English “less than very well.” More analysis of this population group is done in the Limited English Proficiency (LEP) Language Assistance Plan.",
      extraInfo: "*For more information on LEP, review MACOG's LEP Plan",
      source: "ACS_20_5YR_C16002",
      useMap: true,
    },
    {
      id: "elderly",
      title: "Elderly",
      threshold: "21.48%",
      content: "Elderly populations are identified as those age 65 and over.",
      source: "ACS_20_5YR_B01001",
      useMap: true,
    },
    {
      id: "carless",
      title: "Carless Households",
      threshold: "13.32%",
      content: "This population is often referred to as “transit dependent,” i.e., those who must rely on public transit for their daily travel needs and who have limited mobility. Not owning a personal automobile may be a lifestyle choice for some, but for others automobile ownership is unattainable due to various constraints, including income or disability.",
      source: "ACS_20_5YR_B25044",
      useMap: true,
    },
    {
      id: "disabilities",
      title: "Disabilities",
      threshold: "33.28%",
      content: "This population is identifying by households that have at least one (1) person with a disability. That disability may be hearing, cognitive, ambulatory, self-care, or independent living difficulty.",
      source: "ACS_20_5YR_B22010",
      useMap: true,
    }
  ];

  return (
    <div className="bg-arcgis-dark min-h-screen text-gray-100 font-body transition-colors duration-500">
      <Header />
      <Hero />
      
      {/* Process Section */}
      <section id="methodology" className="max-w-7xl mx-auto py-32 px-6 md:px-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-black mb-12 text-white leading-tight">
               Purpose of the Indicators of <span className="text-accent-yellow">Potential Disadvantage (IPD)</span>
            </h1>
            <div className="space-y-10 font-body text-xl leading-[1.8] text-gray-300">
               <p className="border-l-4 border-accent-yellow py-2 px-10">
                  MACOG supports and models their Environmental Justice (EJ) process based upon guidelines from the Delaware Valley Regional Planning Commission (DVRPC) in Pennsylvania. DVRPC developed the <a href="#" className="font-bold text-accent-yellow underline hover:text-white transition-colors underline-offset-8">Indicators of Potential Disadvantage (IPD) method</a>, which locates selected population groups in the region.
               </p>
               <p>
                  Neither Title VI, the Civil Rights Act, or Executive Order #12898 provides specific guidance to evaluate EJ within a region’s transportation planning process. Therefore, MPO&apos;s must devise their own methods for ensuring that EJ population groups and issues are represented in transportation decision-making. 
               </p>
               <p>
                  IPD information is derived from the American Community Survey (ACS) 5-year data set from the U.S. Census. The 5-year estimates set was chosen as it provides the largest sample size and information for all areas.
               </p>
               
               <div className="flex flex-col lg:flex-row gap-16 items-center mt-20">
                 <div className="w-full lg:w-1/2 transition-transform hover:scale-[1.02] duration-500">
                    <div className="w-full h-[600px] relative">
                      <Image 
                        src="/images/Screenshot 2026-03-09 162347.png" 
                        alt="Breakdown of IPD Classification" 
                        fill
                        className="object-contain rounded-2xl"
                      />
                    </div>
                 </div>
                 <div className="w-full lg:w-1/2 flex items-center">
                   <p className="font-body text-xl leading-loose text-gray-300">
                    Using this data, population groups are identified and located at the block group level. Data is gathered at the regional level, combining populations from each of the four counties, for either individuals or households, depending on the indicator. From there, the total number of persons in each demographic group is divided by the appropriate universe (either population or households) for the four-county region, providing a regional average for that population group. Each block group is given a calculation determined by the standard deviations relative to each indicator’s regional average. This calculation is used to determine the concentration of IPD population from “well below average” to “well above average.” The IPD is identified when sensitive populations are above average in each block group.
                   </p>
                 </div>
               </div>
            </div>
          </div>
      </section>

      {/* Regional Demographics Section */}
      <section id="demographics" className="w-full bg-nav-bg border-y border-gray-800">
        <div className="py-32  max-w-7xl mx-auto md:px-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-10 text-white">Regional Demographics</h2>
              <p className="text-2xl leading-relaxed font-body text-gray-400 mb-8 border-b border-gray-800 pb-12">
                EJ is concerned with the impacts of disparate funding and disparate services on defined minority and low-income groups.
              </p>
              <p className="text-xl leading-[1.8] font-body text-gray-300 text-left">
                The demographic groups that comprise the IPD are defined below, and include a definition of the population group plus the regional threshold that places IPD populations above average. Interactive maps and charts follow.
              </p>
            </div>
        </div>

        <Sidecar panels={sidecarPanels} />
      </section>

      {/* Overall Regional IPD Section */}
      <section id="index" className="w-full bg-arcgis-dark pt-32 pb-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 text-white tracking-tight">
              Interactive Overall <span className="text-accent-yellow">IPD Analysis</span>
            </h2>
            <p className="text-2xl leading-relaxed font-body text-gray-400 max-w-3xl">
              Below is the summary of where demographic groups were above average in order to identify significant concentrations of potential disadvantage.
            </p>
        </div>
        <div className="max-w-[1800px] mx-auto h-[800px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-gray-800 rounded-t-[40px] z-0 relative overflow-hidden bg-gray-900 ring-1 ring-white/10">
          <MapWidget />
        </div>
      </section>
    </div>
  );
}
