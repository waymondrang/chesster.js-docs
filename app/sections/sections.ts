interface SectionData {
    id: string;
    title: string;
    category?: string;
    content: React.ReactNode;
}

interface SectionCategory {
    name: string;
    sections: SectionData[];
}

function groupSectionsByCategory(
    sections: SectionData[]
): (SectionData | SectionCategory)[] {
    const result: (SectionData | SectionCategory)[] = [];

    let currentCategory: string = "";
    let currentSectionCategory: SectionCategory = { name: "", sections: [] };

    // todo: check for duplicate ids (disallow)

    for (let i = 0; i < sections.length; i++) {
        if (sections[i].category) {
            // section has category
            if (sections[i].category === currentCategory) {
                // if category equals current category being collected, push
                currentSectionCategory.sections.push(sections[i]);
            } else {
                // else push category and start new one
                if (currentSectionCategory.name) {
                    // only push if name is defined (no blank categories)
                    result.push(currentSectionCategory);
                }

                currentCategory = sections[i].category ?? "";
                currentSectionCategory = {
                    name: currentCategory,
                    sections: [sections[i]],
                };
            }
        } else {
            // push last section category if exists
            if (currentSectionCategory.name) {
                result.push(currentSectionCategory);

                // reset category
                currentCategory = "";
                currentSectionCategory = { name: "", sections: [] };
            }

            // section does not have category
            result.push(sections[i]);
        }
    }

    // push remaining section category if exists
    if (currentSectionCategory.name) result.push(currentSectionCategory);

    return result;
}

export { type SectionData, type SectionCategory, groupSectionsByCategory };
