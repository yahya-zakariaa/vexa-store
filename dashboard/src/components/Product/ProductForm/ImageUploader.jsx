"use client";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader({ images, setImages, isEditable }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!isEditable) return; 
      const newImages = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
      }));
      setImages((prev) => [...(Array.isArray(prev) ? prev : []), ...newImages]);
    },
    [images, setImages, isEditable]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    disabled: !isEditable, 
  });

  const removeImage = (index) => {
    if (!isEditable) return;
    setImages((prev) => {
      const updated = Array.isArray(prev) ? [...prev] : [];
      updated.splice(index, 1);
      return updated;
    });
  };

  // useEffect(() => {
  //   return () => {
  //     images?.forEach((img) => URL.revokeObjectURL(img.preview));
  //   };
  // }, [images]);

  return (
    <div className="container flex-col bg-gray-100 w-full h-fit rounded-md p-4">
      <div className="header mb-7">
        <h2 className="text-[20px] font-bold">Upload Images</h2>
      </div>

      <div
        {...getRootProps()}
        className={`w-full h-[170px] border-2 border-dashed border-gray-400 text-center md:px-5 px-2 flex items-center justify-center rounded-lg ${
          isEditable ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag and drop an image here,<br></br> or click to select one</p>
        )}
      </div>

      <div className="imagePreview md:h-[165px] h-[200px] grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-7 mt-3 bg-slate-200 overflow-auto rounded-md p-4">
        {Array.isArray(images) &&
          images.map((img, index) => (
            <div key={index} className="group relative">
              {isEditable && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute cursor-pointer top-[-10px] right-[-5px] bg-black text-white w-[20px] text-[12px] h-[20px] flex items-center justify-center rounded-full"
                >
                  X
                </button>
              )}
              <img
                src={img.preview || img}
                alt={img.name}
                className={`object-contain rounded-sm ${
                  !isEditable ? "opacity-50" : ""
                }`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
