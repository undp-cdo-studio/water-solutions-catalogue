import Article from "./undp/article";

export default function Content({ projects }: any) {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Articles list */}
          <div className="max-w-sm mx-auto md:max-w-none">
            <div className="grid gap-12 lg:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start">
              {projects &&
                projects.length > 0 &&
                projects.map((project: any, index: any) => (
                  <Article
                    key={project.id+"_"+index}
                    project={project}
                    index={index}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
