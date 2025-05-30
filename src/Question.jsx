import { useEffect, useRef } from "react";
import React from "react";
import Add from "./Add";

function Question({ addQuestionHandler, addSectionHandler, editQuestionHandler,
    deleteQuestionHandler, sectionIndex, index, value }) {

    const mathRef = useRef(null);

    useEffect(() => {
        if (window.MathJax && mathRef.current) {
            window.MathJax.typesetPromise([mathRef.current]);
        }
    }, [value]);

    return (
        <div className="container mt-3">
            <div className="card shadow-sm rounded border-0 mb-5" style={{ backgroundColor: "#f0f2f5" }}>
                <div className="card-body">
                    <div className="row align-items-start mb-3">
                        <div className="col-auto"></div>
                        <div className="col-auto"></div>
                        <div className="col-auto"></div>
                        <div className="col-auto"></div>
                        <div className="col">
                            <div
                                ref={mathRef}
                                style={{ maxWidth: "1000px", fontSize: "1.25rem" }}
                            >
                                {value || " "}
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-start mb-3">
                        <div className="col-auto">
                            <span className="badge bg-primary fs-5">{sectionIndex + 1}.{index + 1}</span>
                        </div>
                        <div className="col">
                            <textarea
                                className="form-control form-control-lg"
                                id="questionTxt"
                                style={{ maxWidth: "1050px" }}
                                value={value}
                                onChange={(e) => {
                                    e.preventDefault();
                                    editQuestionHandler(sectionIndex, index, e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-danger btn-lg"
                                onClick={() => {
                                    deleteQuestionHandler(sectionIndex, index);
                                }}>Delete</button>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <button className="btn btn-secondary btn-lg">
                                Add Images
                            </button>
                        </div>
                    </div>

                    <Add
                        addQuestionHandler={addQuestionHandler}
                        addSectionHandler={addSectionHandler}
                        sectionIndex={sectionIndex + 1}
                        index={index + 1}
                        noSection={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default Question;