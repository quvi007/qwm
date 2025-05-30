import React from "react";

function Add({ addQuestionHandler, addSectionHandler, sectionIndex, index, noSection }) {
    return (
        <>
            <div className="container mt-3">
                <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
                    <button className="btn btn-outline-primary btn-sm"
                        disabled={noSection}
                        onClick={() => {
                            addQuestionHandler(sectionIndex - 1, index);
                        }}>Add Question</button>
                    <button className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                            addSectionHandler(sectionIndex, index);
                        }}>Add Section</button>
                </div>
            </div>
        </>
    );
}

export default Add;