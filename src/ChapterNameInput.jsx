import React from "react";

function ChapterNameInput({ onChange, onSave }) {
    return (
        <div className="container mt-5">
            <div className="d-flex align-items-center gap-3 flex-wrap">
                {/* Label */}
                <label htmlFor="chapterName" className="form-label fs-4 mb-0">
                    Chapter Name
                </label>

                {/* Input */}
                <input
                    type="text"
                    className="form-control form-control-lg"
                    id="chapterName"
                    placeholder="Enter chapter name"
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                    style={{ maxWidth: "600px" }}
                />

                {/* Buttons */}
                <button className="btn btn-success btn-lg"
                onClick={() => {
                    onSave();
                }}>Save</button>
                <button className="btn btn-primary btn-lg">Download</button>
                <button className="btn btn-danger btn-lg">Delete</button>
            </div>
        </div>
    );
}

export default ChapterNameInput;
