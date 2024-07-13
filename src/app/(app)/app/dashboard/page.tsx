import {
  Branding,
  ContentBlock,
  PetButton,
  PetDetails,
  PetList,
  SearchForm,
  Stats,
} from "@/components";

function Dashboard() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <Branding />

        <Stats />
      </div>

      <div className="grid md:grid-cols-3 grid-rows-[45px_300px_500px] md:grid-rows-[45px_1fr] gap-4 md:h-[600px]">
        <div className="md:row-start-1 md:col-span-1">
          <SearchForm />
        </div>
        <div className="md:row-start-2 md:col-span-1 relative">
          <ContentBlock>
            <PetList />
            <PetButton
              actionType="add"
              className="absolute bottom-3 right-3"
            />
          </ContentBlock>
        </div>
        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
export default Dashboard;
