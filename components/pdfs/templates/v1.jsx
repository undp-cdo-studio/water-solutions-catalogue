import { padWithZeros, capitaliseString, addDollarSigns, capitalizeFirstLetters } from "@/lib/utils";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
  Link
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const SdgGrid = ({sdgs}) => {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
      {Array.from({ length: 17 }, (_, i) => (
        <>
          {sdgs.includes(i + 1) &&
            <View key={i + 1} style={tw("flex justify-center items-center pr-1 py-1")}>
              <Image
                src={`https://fxyqesuugrxylqqnosnh.supabase.co/storage/v1/object/public/sdg_images/${i + 1}.png`}
                alt={`SDG Goal ${i + 1}`}
                style={tw("w-full h-full")}
                width={60}
                height={60}
              />
            </View>
          }
        </>
      ))}
    </div>
  );
};

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf', // Roboto Regular
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf', // Roboto Bold
      fontWeight: 'bold',
    },
  ],
});

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ['Roboto']  
    },
    extend: {
      colors: {
        custom: "#016fb5",
      },
    },
  },
});

export default function OutputTemplate({
  id,
  name,
  category,
  description,
  summary,
  contact,
  budget,
  fundingCenters,
  countryImplemented,
  potentialFundingSource,
  lessonsLearned,
  background,
  challenges,
  replicabilityScalabilityScore,
  institutionalScore,
  locationScore,
  repeatableScore,
  mandatoryScore,
  povertyScore,
  livelihoodsScore,
  genderScore,
  waterManagementScore,
  waterQualityScore,
  waterResilienceScore,
  peaceScore,
  fundingPotentialScore,
  droughtResilienceScore,
  totalScore,
  sdgsAddressed,
  conditionsReplicability,
  expertiseRequired
}) {
  return (
    <Document>
      <Page orientation="portrait" style={tw("relative")}>
        {/* Header */}
        <View style={tw(`mb-4 flex items-center justify-center bg-[#fafafa] border-b border-slate-200`)} fixed>
          <View style={tw(`flex items-center`)}>
            <Image
              src="https://fxyqesuugrxylqqnosnh.supabase.co/storage/v1/object/public/profile_pics/logo.png"
              style={tw(`h-24 w-12 mr-4`)}
            />
          </View>
        </View>
        <Link 
          href={"http://watersolutionscatalogue.org/solutions/"+id} 
          style={tw(`text-xs font-bold text-slate-900 text-center`)}
        >
          Water Solutions Catalogue
        </Link>

        {/* Footer */}
        <View
          style={tw(
            "absolute bottom-0 left-0 right-0 h-12 bg-custom flex justify-center",
          )}
          fixed
        >
          <Text 
            href={"http://www.undp.org"} 
            style={tw("left-8 text-xs font-sans text-white")}
          >
            c. 2024 United Nations Development Programme
          </Text>
          {/* <Text style={tw('absolute bottom-16 right-1/2 text-xs')} render={({ pageNumber }) => (
          `${pageNumber}`
        	)} fixed /> */}
        </View>

        <View style={tw(`bg-white py-4 px-20`)}>
          {/* Title */}
          <View style={tw(`my-4 flex flex-row gap-5`)}>
            <Text style={tw(`text-lg text-slate-900 font-sans`)}>{name ? name : "Solution for Water"}</Text>
          </View>

          {/* Summary */}
          <View style={tw(`pb-8 pt-8`)}>
            <Text style={tw(`text-lg font-bold text-custom`)}>Summary</Text>
            <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
              {summary ? summary : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </Text>
          </View>

          <View style={tw(`py-6`)}>
            <Text style={tw(`text-lg font-bold text-custom`)}>
              Data
            </Text>
            {category &&
              <View style={tw(`py-2 flex flex-row items-start justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6 font-sans w-1/3 pr-4`)}>
                  CATEGORY
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6 w-2/3`)}>
                  {category}
                </Text>
              </View>
            }
            {countryImplemented &&
              <View style={tw(`py-2 flex flex-row items-start justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6 font-sans w-1/3 pr-4`)}>
                  IMPLEMENTING COUNTRIES
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6 w-2/3`)}>
                  {countryImplemented}
                </Text>
              </View>
            }
            {sdgsAddressed &&
              <View style={tw(`py-2 flex flex-row items-start justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6 font-sans w-1/3 pr-4`)}>
                  SDGS ADDRESSED
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6 w-2/3`)}>
                  {capitalizeFirstLetters(sdgsAddressed.replaceAll(";",", "))}
                </Text>
              </View>
            }
            {conditionsReplicability &&
              <View style={tw(`py-2 flex flex-row items-start justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6 font-sans w-1/3 pr-4`)}>
                  CONDITIONS FOR REPLICABILITY
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6 w-2/3`)}>
                  {capitalizeFirstLetters(conditionsReplicability.replaceAll(";",", "))}
                </Text>
              </View>
            }
            {contact &&
              <View style={tw(`py-2 flex flex-row items-start justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6 font-sans w-1/3 pr-4`)}>
                  CONTACT
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6 w-2/3`)}>
                  {contact}
                </Text>
              </View>
            }
            {potentialFundingSource &&
              <View style={tw(`py-2 flex flex-row items-start justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6 font-sans w-1/3 pr-4`)}>
                  POTENTIAL FUNDING SOURCE
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6 w-2/3`)}>
                  {potentialFundingSource}
                </Text>
              </View>
            }
            {budget &&
              <View style={tw(`py-2 flex flex-row items-start justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6 font-sans w-1/3 pr-4`)}>
                  BUDGET
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6 w-2/3`)}>
                  {addDollarSigns(capitaliseString(budget))}
                </Text>
              </View>
            }
            {expertiseRequired &&
              <View style={tw(`py-2 flex flex-row items-start justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6 font-sans w-1/3 pr-4`)}>
                  EXPERTISE REQUIRED
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6 w-2/3`)}>
                  {capitalizeFirstLetters(expertiseRequired.replaceAll(";",", "))}
                </Text>
              </View>
            }
            {description &&
              <View style={tw(`py-2 flex flex-row items-start justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6 font-sans w-1/3 pr-4`)}>
                  ADDITIONAL INFORMATION
                </Text>
                <Link href={"https://open.undp.org/projects/"+description} style={tw(`text-xs font-bold text-slate-600 leading-6 w-2/3`)}>
                  UNDP Open Portal
                </Link>
              </View>
            }
          </View>

          {/* Background */}
          {background &&
            <View style={tw(`py-6 `)} break >
              <Text style={tw(`text-lg font-bold text-custom`)} >
                Background
              </Text>
              <View style={tw(`pt-1`)}>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {background ? background : ""}
                </Text>
              </View>
            </View>
          }

          {/* Background */}
          {challenges && 
            <View style={tw(`pb-8 pt-4`)}>
              <Text style={tw(`text-lg font-bold text-custom`)}>
                Challenges
              </Text>
              <View style={tw(`pt-1`)}>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {challenges}
                </Text>
              </View>
            </View>
          }

          {/* Score Card */}
          <View style={tw(`py-6`)}>
            <Text style={tw(`text-lg font-bold text-custom`)}>
              Score Card
            </Text>
            {replicabilityScalabilityScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                  Replicable in different geographic locations
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {replicabilityScalabilityScore+" / 5"}
                </Text>
              </View>
            }
            {institutionalScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                  Flexible to different institutional settings
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {institutionalScore+" / 5"}
                </Text>
              </View>
            }
            {locationScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                  Scalable within the same location
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {locationScore+" / 5"}
                </Text>
              </View>
            }
            {repeatableScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                  Repeatable without additional start-up costs after establishment in a location
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {repeatableScore+" / 5"}
                </Text>
              </View>
            }
            {povertyScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                  Contributes to the reduction of poverty for the surrounding community
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {povertyScore+" / 5"}
                </Text>
              </View>
            }
            {livelihoodsScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                  Supports creation of livelihoods
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {livelihoodsScore+" / 5"}
                </Text>
              </View>
            }
            {genderScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                Supports gender mainstreaming to include positive impacts to women and girls
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {genderScore+" / 5"}
                </Text>
              </View>
            }
            {waterManagementScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                Potentially transformational in terms of improved water management
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {waterManagementScore+" / 5"}
                </Text>
              </View>
            }
            {waterQualityScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                Addresses water for nature, such as water quality and ecosystems
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {waterQualityScore+" / 5"}
                </Text>
              </View>
            }
            {waterResilienceScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                Addresses water for resilience, such as climate change impacts
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {waterResilienceScore+" / 5"}
                </Text>
              </View>
            }
            {peaceScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                Addresses water for peace and security directly, or includes marginalized communities, indigenous people or benefit sharing
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {peaceScore+" / 5"}
                </Text>
              </View>
            }
            {fundingPotentialScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                Attracts additional partners and support for funding
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {fundingPotentialScore+" / 5"}
                </Text>
              </View>
            }
            {droughtResilienceScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                Responds to drought, or drought resilience
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {droughtResilienceScore+" / 5"}
                </Text>
              </View>
            }
            {mandatoryScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                  Total for Mandatory Criteria
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {mandatoryScore+" / 20"}
                </Text>
              </View>
            }
            {totalScore &&
              <View style={tw(`py-2 flex flex-row flex-align justify-between`)}>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                  Total for All Criteria
                </Text>
                <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                  {totalScore+" / 65"}
                </Text>
              </View>
            }

          </View>


          {/* Lessons Learned */}
          <View style={tw(`py-6`)} break>
            <Text style={tw(`text-lg font-bold text-custom`)}>
              Lessons Learned
            </Text>
            {lessonsLearned.map((item, index) => (
              <View key={index} style={tw(`py-2`)}>
                <Text style={tw(`text-sm font-bold text-slate-600 leading-6`)}>
                  {(1+index)+". "+item.title}
                </Text>
                <Text style={tw(`text-xs text-slate-600 leading-6	font-sans`)}>
                  {item.description}
                </Text>
              </View>
            ))}
            {/* <View style={tw(`py-2`)}>
              <Text style={tw(`text-xs font-bold text-slate-600 leading-6	`)}>
                {lessonsLearned ? lessonsLearned : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </Text>
            </View> */}
          </View>

          {/* Documents */}
          {/* <View style={tw(`pb-12`)}>
            <Text style={tw(`text-lg font-bold text-custom`)}>Documents</Text>
              {documents.map((item:any, index:any) => (
                <View key={index} style={tw(`py-2`)}>
                  <Link src={item.url} style={tw(`text-xs font-bold `)}>
                    {"Document "+(index+1)+": "+item.title}
                  </Link>
                </View>
              ))
            }
          </View> */}
        </View>
      </Page>
    </Document>
  );
}
