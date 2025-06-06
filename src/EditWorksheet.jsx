import { useState, useEffect } from "react";
import axios from "axios";
import ChapterNameInput from "./ChapterNameInput";
import Add from "./Add";
import Question from "./Question";
import SectionNameInput from "./SectionNameInput";

function EditWorksheet() {
    const [chapterName, setChapterName] = useState("");
    const [sectionsQuestions, setSectionsQuestions] = useState([
        // { sectionName: "Beginner", questions: [] }
    ]);

    const changeChapterName = (value) => {
        setChapterName(value);
    };

    const changeSectionName = (sectionIndex, value) => {
        setSectionsQuestions(sectionsQuestions => {
            const newSectionsQuestions = [...sectionsQuestions];
            newSectionsQuestions[sectionIndex].sectionName = value;
            return newSectionsQuestions;
        });
    }

    const addQuestion = (sectionIndex, index) => {
        setSectionsQuestions(sectionsQuestions => {
            // Copy outer array
            const newSectionsQuestions = [...sectionsQuestions];

            // Copy questions array immutably
            const oldQuestions = sectionsQuestions[sectionIndex].questions;
            const newQuestions = [
                ...oldQuestions.slice(0, index),
                "",
                ...oldQuestions.slice(index)
            ];

            // Create a new section object to maintain immutability
            const updatedSection = {
                ...sectionsQuestions[sectionIndex],
                questions: newQuestions
            };

            // Replace section in the copied array
            newSectionsQuestions[sectionIndex] = updatedSection;

            return newSectionsQuestions;
        });
    };

    const addSection = (sectionIndex, index) => {
        setSectionsQuestions(prevSectionsQuestions => {
            const oldSectionsQuestions = [...prevSectionsQuestions];
            const newSection = {
                sectionName: "",
                questions: sectionIndex === 0
                    ? []
                    : oldSectionsQuestions[sectionIndex - 1].questions.slice(index)
            };
            const prev_prev_questions = sectionIndex === 0 ? [] : oldSectionsQuestions.slice(0, sectionIndex - 1);
            const prev_section_questions_trimmed = sectionIndex === 0 ? null : {
                sectionName: oldSectionsQuestions[sectionIndex - 1].sectionName,
                questions: oldSectionsQuestions[sectionIndex - 1].questions.slice(0, index)
            };
            if (prev_section_questions_trimmed === null) {
                return [
                    ...prev_prev_questions,
                    newSection,
                    ...oldSectionsQuestions.slice(sectionIndex)
                ];
            } else {
                return [
                    ...prev_prev_questions,
                    prev_section_questions_trimmed,
                    newSection,
                    ...oldSectionsQuestions.slice(sectionIndex)
                ]
            }
        });
    };

    const editQuestion = (sectionIndex, index, value) => {
        setSectionsQuestions(sectionsQuestions => {
            const newSectionsQuestions = [...sectionsQuestions];
            newSectionsQuestions[sectionIndex].questions[index] = value;
            return newSectionsQuestions;
        });
    };

    const deleteQuestion = (sectionIndex, index) => {
        setSectionsQuestions(sectionsQuestions => {
            // Copy outer array
            const newSectionsQuestions = [...sectionsQuestions];

            // Copy questions array immutably
            const oldQuestions = sectionsQuestions[sectionIndex].questions;
            const newQuestions = [
                ...oldQuestions.slice(0, index),
                ...oldQuestions.slice(index + 1)
            ];

            // Create a new section object to maintain immutability
            const updatedSection = {
                ...sectionsQuestions[sectionIndex],
                questions: newQuestions
            };

            // Replace section in the copied array
            newSectionsQuestions[sectionIndex] = updatedSection;

            return newSectionsQuestions;
        });
    };

    const deleteSection = (sectionIndex) => {
        setSectionsQuestions(sectionsQuestions => {
            const newSectionsQuestions = [
                ...sectionsQuestions.slice(0, sectionIndex),
                ...sectionsQuestions.slice(sectionIndex + 1)
            ];
            return newSectionsQuestions;
        });
    };

    const copy = () => {
        let text = "";
        for (let i = 0; i < sectionsQuestions.length; ++i) {
            text += `<h1>${sectionsQuestions[i].sectionName}</h1>\n`;
            // text += "<ol>\n"
            for (let j = 0; j < sectionsQuestions[i].questions.length; ++j) {
                text += `<li>${sectionsQuestions[i].questions[j]}</li>\n`;
            }
            // text += "</ol>\n";
        }
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="container my-5">
            <h1 className="mb-4">Worksheet Maker {chapterName === "" ? "" : `for ${chapterName}`}</h1>
            <ChapterNameInput onChange={changeChapterName} onSave={copy}/>
            <Add addQuestionHandler={addQuestion} addSectionHandler={addSection} sectionIndex={0} noSection={true} />
            {sectionsQuestions.map((sectionQuestions, sectionIndex) => (
                <div className="card bg-light shadow-sm rounded border-0 mt-5" key={sectionIndex}>
                    <div className="card-body">
                        <SectionNameInput
                            onChange={changeSectionName}
                            sectionIndex={sectionIndex}
                            sectionName={sectionQuestions.sectionName}
                            deleteSection={deleteSection}
                        />
                        <Add
                            addQuestionHandler={addQuestion}
                            addSectionHandler={addSection}
                            sectionIndex={sectionIndex + 1}
                            index={0}
                            noSection={false}
                        />
                        <div className="mt-4">
                            {sectionQuestions.questions.map((question, index) => (
                                <Question
                                    key={`${sectionIndex}-${index}`}
                                    addQuestionHandler={addQuestion}
                                    addSectionHandler={addSection}
                                    editQuestionHandler={editQuestion}
                                    deleteQuestionHandler={deleteQuestion}
                                    sectionIndex={sectionIndex}
                                    index={index}
                                    value={question}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EditWorksheet;