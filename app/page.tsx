import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Sidecar, { SidecarPanel } from "./components/Sidecar";
import { ArrowDown } from "lucide-react";
import ImageLightbox from "./components/ImageLightbox";
import MapWidget from "./components/MapWidget";

export default function Home() {
  const sidecarPanels: SidecarPanel[] = [
    {
      id: "minority",
      title: "Racial Minority Population",
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
      title: "Households in Poverty",
      threshold: "20.45%",
      content: "Since poverty is defined at the family level and not the household level, the poverty status of the household is determined by the poverty status of the householder. Households are classified as poor when the total income of the householder’s family is below the appropriate poverty threshold, which was established in the Office of Management and Budget’s Statistical Policy Directive No. 14 and is adjusted for inflation.",
      source: "ACS_20_5YR_B17017",
      useMap: true,
    },
    {
      id: "lep",
      title: "Limited English Proficiency (LEP) Households",
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
      title: "Households with Person(s) with Disabilities",
      threshold: "33.28%",
      content: "This population is identifying by households that have at least one (1) person with a disability. That disability may be hearing, cognitive, ambulatory, self-care, or independent living difficulty.",
      source: "ACS_20_5YR_B22010",
      useMap: true,
    }
  ];

  return (
    <div className="bg-white min-h-screen text-arcgis-dark font-body">
      <Header />
      <Hero />
      
      {/* Process Section */}
      <section id="process" className="max-w-6xl mx-auto py-24 px-6 md:px-0 relative z-10 bg-white text-left">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-10 text-arcgis-teal text-left pb-4">
             Purpose of the Indicators of Potential Disadvantage (IPD)
          </h1>
          <div className="space-y-8 font-body text-xl leading-[1.8] text-gray-800">
             <p>
                MACOG supports and models their Environmental Justice (EJ) process based upon guidelines from the Delaware Valley Regional Planning Commission (DVRPC) in Pennsylvania. DVRPC developed the <a href="#" className="font-semibold text-arcgis-teal underline hover:text-arcgis-dark hover:decoration-2 hover:underline-offset-4">Indicators of Potential Disadvantage (IPD) method</a>, which locates selected population groups in the region to better inform how the regional transportation system and MPO programs, policies, and investments might impact these groups. These population groups include minorities, low-income, carless households, persons with physical disabilities, elderly over age 65, Hispanic, and Limited English Profiency (LEP).
             </p>
             <p>
                Neither Title VI, the Civil Rights Act, or Executive Order #12898 provides specific guidance to evaluate EJ within a region’s transportation planning process. Therefore, MPOs must devise their own methods for ensuring that EJ population groups and issues are represented in transportation decision-making. This is a challenging assignment, and serious consideration must be given to the available types of quantifiable data, as well as how the data is to be used and interpreted. It should be noted that while the IPD method helps ascertain population data, it is only one tool in a larger strategy involving public participation, stakeholder outreach, data sources, and other research.
             </p>
             <p>
                IPD information is derived from the American Community Survey (ACS) 5-year data set from the U.S. Census. The ACS is conducted every year to provide up-to-date information about the social and economic needs of the country. ACS data is in 1-year and 5-year estimates. The 5-year estimates set was chosen as it provides the largest sample size, includes data for all areas, and information can be found at the census tract and block group level.
             </p>
             
             <div className="flex flex-col md:flex-row gap-12 items-stretch mt-12 pt-8">
               <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg border border-gray-100 flex">
                 <ImageLightbox 
                   src="/images/Screenshot 2026-03-09 162347.png" 
                   alt="Breakdown of IPD Classification" 
                   width={900} 
                   height={600} 
                   containerClassName="w-full h-full"
                   imageClassName="w-full h-full object-cover"
                 />
               </div>
               <div className="w-full md:w-1/2 flex items-center">
                 <p className="font-body text-xl leading-[1.8] text-gray-800">
                    Using this data, population groups are identified and located at the block group level. Data is gathered at the regional level, combining populations from each of the four counties, for either individuals or households, depending on the indicator. From there, the total number of persons in each demographic group is divided by the appropriate universe (either population or households) for the four-county region, providing a regional average for that population group. Each block group is given a calculation determined by the standard deviations relative to each indicator&apos;s regional average. This calculation is used to determine the concentration of IPD population from &quot;well below average&quot; to &quot;well above average.&quot; The IPD is identified when sensitive populations are above average in each block group.
                 </p>
               </div>
             </div>
          </div>
      </section>

      {/* Added regional demographics dummy section */}
      <section id="regional-demographics" className="w-full bg-arcgis-gray border-t border-gray-200">
        <div className="py-24 px-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-extrabold mb-8 text-arcgis-dark">Regional Demographics</h2>
            <p className="text-xl leading-relaxed font-body text-gray-800">
              EJ is concerned with the impacts of disparate funding and disparate services on defined  minority and low-income groups. Some programs employ the EJ IPD method as the first step of a demographic analysis, identifying the potentially disadvantaged population groups first, and then using this knowledge as a planning tool for further recommendations and outreach. 
            </p>
            <p className="text-xl mt-10 leading-relaxed font-body text-gray-800">
              The demographic groups that comprise the IPD are defined below, and include a definition of the population group plus the regional threshold that places IPD populations above average. This analysis is based on Block Group level data from the American Community Survey (ACS) 2020 5-Year Estimate. Interactive maps of each demographic group can be found below.
            </p>
        </div>

        <Sidecar panels={sidecarPanels} />
      </section>

      <section id="Overall Regional IPD" className="w-full bg-white pt-24 pb-0">
        <div className="max-w-5xl mx-auto px-6 mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 text-[#0f343a]">
              Interactive Overall Indicator of Potential Disadvantage (IPD)
            </h2>
            <p className="text-xl leading-relaxed font-body text-gray-600">
              Below is the summary of where each demographic groups was above average in order to identify where there is a concentration of potential disadvantage.
            </p>
        </div>
        <div className="max-w-7xl mx-auto h-[600px] shadow-xl border border-gray-200 rounded-2xl mb-24 z-0 relative overflow-hidden bg-gray-50">
          <MapWidget />
        </div>
      </section>

      <section id="conclusion" className="max-w-4xl mx-auto py-32 px-6">
         <h2 className="text-4xl font-heading font-extrabold mb-8 text-arcgis-teal">Conclusion & Next Steps</h2>
         <p className="text-xl leading-relaxed mb-10 font-body text-gray-800">
            This visual approach provides just the tip of the iceberg in understanding complex regional dynamics. Similar to the ArcGIS StoryMaps, the strength is in combining narratives directly with geospatial visualizations. By layering demographic, infrastructure, and economic data, a comprehensive picture emerges.
         </p>
         <button className="bg-arcgis-teal text-white px-8 py-4 font-heading font-bold rounded-sm shadow-xl hover:bg-opacity-90 hover:scale-[1.02] hover:-translate-y-1 transition-all uppercase tracking-widest text-sm flex items-center justify-center">
           Explore Full Dataset
         </button>
      </section>
      
      {/* <footer className="bg-arcgis-dark text-gray-300 py-16 px-6 text-center border-t-8 border-arcgis-teal">
         <p className="font-heading font-semibold text-lg mb-4 text-white uppercase tracking-widest">Michiana StoryMap Clone</p>
         <p className="text-sm opacity-60 max-w-lg mx-auto leading-loose">Built with Next.js 16, Tailwind CSS v4, Framer Motion, and Lucide React. Designed based on the elegant ArcGIS Scrollytelling format.</p>
      </footer> */}
    </div>
  );
}
