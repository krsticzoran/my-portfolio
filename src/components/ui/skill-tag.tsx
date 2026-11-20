import { getSkills } from "@/sanity/skills";

export default async function SkillTags() {
  const skills = await getSkills();

  return (
    <div
      className="text-sm sm:text-base pl-6 flex flex-wrap gap-2"
      role="list"
      aria-label="List of programming skills"
    >
      {skills.map((skill, index) => {
        const isLast = index === skills.length - 1;
        return (
          <span key={index} className="flex items-center gap-1" role="listitem">
            <span className="text-gray-400" aria-hidden="true">
              &apos;
            </span>
            <span className="text-cyan-400">{skill}</span>
            <span className="text-gray-400" aria-hidden="true">
              &apos;
            </span>
            {!isLast && (
              <span className="text-gray-400" aria-hidden="true">
                ,
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
