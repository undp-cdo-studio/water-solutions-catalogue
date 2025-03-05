"use client";

function addBreaksBeforeSingleDigits(str:string) {
  return str.replace(/(?<!\d)(\d)(?![\d]|[^\-\.\:][\-\.\:])/g, '\n\n$1');
}

export default function Content({ lessonsLearned }: any) {
  return (
    <section>
      <div className="max-w-5xl mx-auto mt-8 mb-16">
        <div className="">
          <div className="max-w-3xl mx-auto">
            <h3 className="h3 mb-3">Lessons Learned</h3>
            {lessonsLearned && JSON.parse(lessonsLearned) && JSON.parse(lessonsLearned).length > 0 && JSON.parse(lessonsLearned).map((lesson:any, index:any)=>(
              <div key={index} className="mt-8 mb-2">
                <div>
                  <a className="text-lg font-bold">
                    {index+1+". "+lesson.title}
                  </a>
                </div>
                <div className="mt-2">
                  <a className="text-md mt-2">
                    {lesson.description}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
