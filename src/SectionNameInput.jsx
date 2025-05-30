import React from "react";

function SectionNameInput({ onChange, sectionIndex, sectionName, deleteSection }) {
    return (
        <div className="container mt-5">
            <div className="d-flex align-items-center gap-3 flex-wrap">
                {/* Label */}
                {/* <label htmlFor="chapterName" className="form-label fs-4 mb-0">
                    Section {sectionIndex + 1}
                </label> */}
                <span className="badge bg-danger fs-4">{sectionIndex + 1}</span>

                {/* Input */}
                <input
                    type="text"
                    className="form-control form-control-lg"
                    id="sectionName"
                    value={sectionName}
                    onChange={(e) => {
                        e.preventDefault();
                        onChange(sectionIndex, e.target.value);
                    }}
                    style={{ maxWidth: "600px" }}
                />
                <button onClick={() => {
                    deleteSection(sectionIndex);
                }} className="btn btn-danger btn-lg">
                    Delete Section
                </button>
            </div>
        </div>
    );
}

export default SectionNameInput;
