import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const CreateCourse = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButton,
  handleImageRemove,
}) => {
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<option key={i.toFixed(2)}>${i.toFixed(2)}</option>);
  }

  return (
    <center>
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Course Name"
            aria-label="Course Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center border-b border-teal-500 py-2">
          <textarea
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Course description"
            aria-label="Course description"
            name="description"
            cols="45"
            rows="7"
            value={values.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex items-center border-b border-teal-500 py-2">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={values.paid}
            onChange={(e) => setValues({ ...values, paid: !values.paid })}
          >
            <option value={true}>Paid</option>
            <option value={false}>Free</option>
          </select>
        </div>
        {values.paid && (
          <div className="flex items-center border-b border-teal-500 py-2">
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              defaultValue="$9.99"
              onChange={(e) => setValues({ ...values, price: e.target.value })}
              tokenseparators={[,]}
            >
              {children}
            </select>
          </div>
        )}
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            aria-label="Course Name"
            name="category"
            placeholder="Category"
            value={values.category}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center border-b border-teal-500 py-2">
          <div>
            <label
              className="block uppercase tracking-wide text-center text-gray-700 text-xs font-bold mb-2"
              htmlFor="image"
            >
              {uploadButton}
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="file"
                name="image"
                onChange={handleImage}
                accept="image/*"
                // hidden
              />
            </label>
          </div>
          {preview && (
            <div className="flex">
              <div className="relative">
                <img
                  className="object-cover w-26 h-16 rounded-lg"
                  src={preview}
                  alt="Avatar"
                />
                <span className="absolute right-0 bottom-1">
                  <DeleteOutlineIcon
                    className="cursor-pointer"
                    onClick={handleImageRemove}
                  />
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center border-b border-teal-500 py-2">
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            color="success"
            sx={{ width: 350 }}
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            loading={values.loading}
          >
            {values.loading ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </form>
    </center>
  );
};

export default CreateCourse;
